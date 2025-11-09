/**
 * http-inject-proxy-players.js
 *
 * Proxy HTTP reverso que:
 *  - encaminha requisições para o servidor real
 *  - intercepta respostas JSON para caminhos contendo "/players.json" e "/profileData.json"
 *  - faz inject de entradas em arrays (array direto ou objeto com campo `data`)
 *  - expõe API de controle para adicionar/remover/listar entradas injetadas
 *  - grava logs em ./captures.log
 *
 * Uso:
 *   node http-inject-proxy-players.js <LISTEN_PORT> <TARGET_HOST> <TARGET_PORT>
 * Ex:
 *   node http-inject-proxy-players.js 8080 127.0.0.1 30120
 *
 * Requisitos:
 *   npm i express body-parser node-fetch
 *
 * Nota:
 *   Aponte nomes/dns do seu servidor (ou edite hosts) para que os clientes usem este proxy.
 */

const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch'); // para uso interno se necessário

if (process.argv.length < 5) {
  console.log('Usage: node http-inject-proxy-players.js <LISTEN_PORT> <TARGET_HOST> <TARGET_PORT>');
  process.exit(1);
}

const LISTEN_PORT = parseInt(process.argv[2], 10);
const TARGET_HOST = process.argv[3];
const TARGET_PORT = parseInt(process.argv[4], 10);

const CAPTURE_LOG = './captures.log';
function appendLog(obj) {
  const line = `[${new Date().toISOString()}] ${JSON.stringify(obj)}\n`;
  fs.appendFile(CAPTURE_LOG, line, err => { if (err) console.error('log write err', err); });
}

// in-memory injected entries (persist only in memory)
let injectedEntries = [];

// helper safe JSON parse
function safeJsonParse(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

// --- Main HTTP proxy server (raw proxy for game HTTP endpoints) ---
const proxyServer = http.createServer((clientReq, clientRes) => {
  // Build options to forward to target
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: clientReq.url,
    method: clientReq.method,
    headers: Object.assign({}, clientReq.headers)
  };

  const proxyReq = http.request(options, (proxyRes) => {
    const chunks = [];
    proxyRes.on('data', (c) => chunks.push(c));
    proxyRes.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const contentType = (proxyRes.headers['content-type'] || '').toLowerCase();
      const urlPath = clientReq.url || '';

      // Log basic request/response metadata
      appendLog({
        type: 'http_transaction',
        method: clientReq.method,
        url: urlPath,
        status: proxyRes.statusCode,
        contentType: contentType,
        length: buffer.length
      });

      // Intercept JSON responses for players/profile endpoints
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
            // array of players
            parsed.push(...injectedEntries);
            modified = true;
          } else if (parsed.data && Array.isArray(parsed.data)) {
            parsed.data.push(...injectedEntries);
            modified = true;
          }

          if (modified) {
            const newBody = JSON.stringify(parsed);
            // forward headers but adjust content-length
            const headers = Object.assign({}, proxyRes.headers);
            headers['content-length'] = Buffer.byteLength(newBody, 'utf8');
            clientRes.writeHead(proxyRes.statusCode, headers);
            clientRes.end(newBody);
            appendLog({ type: 'injection', url: urlPath, injectedCount: injectedEntries.length });
            return;
          }
        } else {
          appendLog({ type: 'json_parse_failed', url: urlPath, snippet: buffer.toString('utf8',0,300) });
        }
      }

      // fallback passthrough
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      clientRes.end(buffer);
    });
  });

  proxyReq.on('error', (err) => {
    appendLog({ type: 'proxy_error', err: err.message, url: clientReq.url });
    clientRes.writeHead(502);
    clientRes.end('Bad Gateway');
  });

  // pipe request body if any
  clientReq.pipe(proxyReq);
});

proxyServer.listen(LISTEN_PORT, () => {
  console.log(`HTTP proxy listening ${LISTEN_PORT} -> ${TARGET_HOST}:${TARGET_PORT}`);
  appendLog({ type: 'proxy_started', listen: LISTEN_PORT, target: `${TARGET_HOST}:${TARGET_PORT}` });
});

// --- Control API (Express) to manage injected entries and view captures ---
const api = express();
api.use(bodyParser.json({ limit: '1mb' }));

// add entry
api.post('/api/inject', (req, res) => {
  const obj = req.body;
  if (!obj || typeof obj !== 'object') return res.status(400).json({ error: 'expected JSON object' });
  if (!obj._id) obj._id = `inj_${Date.now()}_${Math.floor(Math.random()*1000)}`;
  injectedEntries.push(obj);
  appendLog({ type: 'control_add', id: obj._id, objPreview: obj });
  res.json({ ok: true, id: obj._id });
});

// list injected
api.get('/api/inject', (req, res) => res.json(injectedEntries));

// remove by _id
api.delete('/api/inject/:id', (req, res) => {
  const id = req.params.id;
  const before = injectedEntries.length;
  injectedEntries = injectedEntries.filter(x => x._id !== id);
  appendLog({ type: 'control_remove', id, removed: before - injectedEntries.length });
  res.json({ ok: true, removed: before - injectedEntries.length });
});

// tail captures (last N lines)
api.get('/api/captures', (req, res) => {
  const n = Math.min(1000, Math.max(1, parseInt(req.query.n || '200', 10)));
  fs.readFile(CAPTURE_LOG, 'utf8', (err, data) => {
    if (err) return res.json({ ok: true, log: [] });
    const lines = data.trim().split('\n').slice(-n);
    res.json({ ok: true, log: lines });
  });
});

// small health check
api.get('/api/health', (req, res) => res.json({ ok: true }));

const API_PORT = LISTEN_PORT + 1; // default control port
api.listen(API_PORT, () => {
  console.log(`Control API running on port ${API_PORT} (endpoints: POST /api/inject, GET /api/inject, DELETE /api/inject/:id, GET /api/captures)`);
});
