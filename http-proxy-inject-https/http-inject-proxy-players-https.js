/**
 * http-inject-proxy-players-https.js
 *
 * HTTPS reverse-proxy that:
 *  - Accepts HTTPS connections from clients (using provided key/cert)
 *  - Forwards requests to the target server (HTTP or HTTPS, configured)
 *  - Intercepts JSON responses for paths containing "/players.json" and "/profileData.json"
 *  - Injects configured entries into arrays (array or object.data)
 *  - Persists injected entries to injected.json (auto-load/save)
 *  - Exposes Control API (HTTP over the same HTTPS server) to add/remove/list entries and view captures
 *
 * Usage:
 *   node http-inject-proxy-players-https.js <LISTEN_PORT> <TARGET_HOST> <TARGET_PORT> <CERT_PATH> <KEY_PATH> [TARGET_IS_HTTPS]
 *
 * Example:
 *   node http-inject-proxy-players-https.js 8443 127.0.0.1 30120 ./cert.pem ./key.pem false
 *
 * Requirements:
 *   npm i express body-parser node-fetch
 *
 * Notes:
 *  - This script serves HTTPS using the cert/key you provide.
 *  - Injected entries are saved to injected.json in the working directory.
 */

const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');

if (process.argv.length < 7) {
  console.log('Usage: node http-inject-proxy-players-https.js <LISTEN_PORT> <TARGET_HOST> <TARGET_PORT> <CERT_PATH> <KEY_PATH> [TARGET_IS_HTTPS]');
  process.exit(1);
}

const LISTEN_PORT = parseInt(process.argv[2], 10);
const TARGET_HOST = process.argv[3];
const TARGET_PORT = parseInt(process.argv[4], 10);
const CERT_PATH = process.argv[5];
const KEY_PATH = process.argv[6];
const TARGET_IS_HTTPS = (process.argv[7] && process.argv[7].toLowerCase() === 'true') ? true : false;

const CAPTURE_LOG = './captures.log';
const INJECTED_FILE = './injected.json';

// load or init injected entries
let injectedEntries = [];
try {
  if (fs.existsSync(INJECTED_FILE)) {
    const data = fs.readFileSync(INJECTED_FILE, 'utf8');
    injectedEntries = JSON.parse(data);
    console.log('Loaded injected entries from', INJECTED_FILE);
  }
} catch (e) {
  console.error('Failed to load injected entries:', e);
  injectedEntries = [];
}

function persistInjected() {
  try {
    fs.writeFileSync(INJECTED_FILE, JSON.stringify(injectedEntries, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to persist injected entries:', e);
  }
}

function appendLog(obj) {
  const line = `[${new Date().toISOString()}] ${JSON.stringify(obj)}\n`;
  fs.appendFile(CAPTURE_LOG, line, err => { if (err) console.error('log write err', err); });
}

function safeJsonParse(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

// HTTPS server options
const httpsOptions = {
  cert: fs.readFileSync(CERT_PATH),
  key: fs.readFileSync(KEY_PATH)
};

// main request handler
function handleClientRequest(req, res) {
  // Forward to target (http or https)
  const clientUrl = req.url || '/';
  const isTargetHttps = TARGET_IS_HTTPS;

  const forwardOptions = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: clientUrl,
    method: req.method,
    headers: Object.assign({}, req.headers)
  };

  const forwardLib = isTargetHttps ? https : http;
  const proxyReq = forwardLib.request(forwardOptions, (proxyRes) => {
    const chunks = [];
    proxyRes.on('data', (c) => chunks.push(c));
    proxyRes.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const contentType = (proxyRes.headers['content-type'] || '').toLowerCase();
      const urlPath = clientUrl;

      appendLog({
        type: 'http_transaction',
        method: req.method,
        url: urlPath,
        status: proxyRes.statusCode,
        contentType: contentType,
        length: buffer.length
      });

      const targetPaths = ['/players.json', '/profileData.json', '/players', '/profileData'];
      const shouldInspect = contentType.includes('application/json') &&
                            targetPaths.some(p => urlPath.includes(p));

      if (shouldInspect) {
        const text = buffer.toString('utf8');
        const parsed = safeJsonParse(text);
        appendLog({ type: 'json_payload_received', url: urlPath, parsedPreview: Array.isArray(parsed) ? `array(len=${parsed.length})` : (parsed && parsed.data ? `obj.data(len=${parsed.data.length})` : typeof parsed) });
        if (parsed) {
          let modified = false;
          if (Array.isArray(parsed)) {
            parsed.push(...injectedEntries);
            modified = true;
          } else if (parsed.data && Array.isArray(parsed.data)) {
            parsed.data.push(...injectedEntries);
            modified = true;
          }
          if (modified) {
            const newBody = JSON.stringify(parsed);
            const headers = Object.assign({}, proxyRes.headers);
            headers['content-length'] = Buffer.byteLength(newBody, 'utf8');
            res.writeHead(proxyRes.statusCode, headers);
            res.end(newBody);
            appendLog({ type: 'injection', url: urlPath, injectedCount: injectedEntries.length });
            return;
          }
        } else {
          appendLog({ type: 'json_parse_failed', url: urlPath, snippet: buffer.toString('utf8',0,300) });
        }
      }

      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      res.end(buffer);
    });
  });

  proxyReq.on('error', (err) => {
    appendLog({ type: 'proxy_error', err: err.message, url: clientUrl });
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  req.pipe(proxyReq);
}

// Create HTTPS server that uses Express for control API and falls back to proxy handler
const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

// Control API endpoints (mounted on same HTTPS server)
app.post('/api/inject', (req, res) => {
  const obj = req.body;
  if (!obj || typeof obj !== 'object') return res.status(400).json({ error: 'expected JSON object' });
  if (!obj._id) obj._id = `inj_${Date.now()}_${Math.floor(Math.random()*1000)}`;
  injectedEntries.push(obj);
  persistInjected();
  appendLog({ type: 'control_add', id: obj._id, objPreview: obj });
  res.json({ ok: true, id: obj._id });
});

app.get('/api/inject', (req, res) => res.json(injectedEntries));

app.delete('/api/inject/:id', (req, res) => {
  const id = req.params.id;
  const before = injectedEntries.length;
  injectedEntries = injectedEntries.filter(x => x._id !== id);
  persistInjected();
  appendLog({ type: 'control_remove', id, removed: before - injectedEntries.length });
  res.json({ ok: true, removed: before - injectedEntries.length });
});

app.get('/api/captures', (req, res) => {
  const n = Math.min(1000, Math.max(1, parseInt(req.query.n || '200', 10)));
  fs.readFile(CAPTURE_LOG, 'utf8', (err, data) => {
    if (err) return res.json({ ok: true, log: [] });
    const lines = data.trim().split('\n').slice(-n);
    res.json({ ok: true, log: lines });
  });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// If path starts with /api, let Express handle it. Otherwise act as proxy via handleClientRequest
const httpsServer = https.createServer(httpsOptions, (req, res) => {
  if (req.url.startsWith('/api/')) {
    app(req, res);
  } else {
    handleClientRequest(req, res);
  }
});

httpsServer.listen(LISTEN_PORT, () => {
  console.log(`HTTPS proxy listening ${LISTEN_PORT} -> ${TARGET_HOST}:${TARGET_PORT} (target_https=${TARGET_IS_HTTPS})`);
  appendLog({ type: 'proxy_started', listen: LISTEN_PORT, target: `${TARGET_HOST}:${TARGET_PORT}`, target_https: TARGET_IS_HTTPS });
});
