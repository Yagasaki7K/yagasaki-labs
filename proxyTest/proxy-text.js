#!/usr/bin/env node
/**
 * proxy-test.js
 * Usage examples:
 *  node proxy-test.js --proxy http://user:pass@1.2.3.4:8080 --url https://httpbin.org/ip
 *  node proxy-test.js --proxy socks5://1.2.3.4:1080 --url https://httpbin.org/ip
 *  node proxy-test.js --proxy http://1.2.3.4:8080 --url https://httpbin.org/ip --curl
 */

const { execFile } = require('child_process');
const axios = require('axios');
const { HttpsProxyAgent, HttpProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { URL } = require('url');

function parseArgs() {
  const args = {};
  const raw = process.argv.slice(2);
  for (let i = 0; i < raw.length; i++) {
    const a = raw[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = raw[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

async function testWithAxios(proxy, targetUrl, timeout = 10000) {
  console.log(`-> Testing with axios through proxy: ${proxy} -> ${targetUrl}`);
  let agent;
  try {
    const pUrl = new URL(proxy);
    const scheme = pUrl.protocol.replace(':', '').toLowerCase();

    if (scheme === 'socks' || scheme === 'socks5' || scheme === 'socks5h') {
      // socks proxy
      agent = new SocksProxyAgent(proxy);
    } else if (scheme === 'http' || scheme === 'https') {
      // http(s) proxy (use https agent for https target)
      // choose HttpsProxyAgent for both http(s) target because node will use agent for TLS as well
      agent = scheme === 'http' ? new HttpProxyAgent(proxy) : new HttpsProxyAgent(proxy);
    } else {
      throw new Error(`Unsupported proxy scheme: ${scheme}`);
    }
  } catch (err) {
    throw new Error(`Invalid proxy URL: ${err.message}`);
  }

  const isHttpsTarget = targetUrl.startsWith('https://');

  const instance = axios.create({
    timeout,
    // axios uses 'httpAgent' and 'httpsAgent' depending on target
    httpAgent: agent,
    httpsAgent: agent,
    validateStatus: null
  });

  const start = Date.now();
  const res = await instance.get(targetUrl).catch(e => {
    // normalize axios errors
    throw new Error(e && e.message ? e.message : String(e));
  });
  const elapsed = Date.now() - start;

  return {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
    data: res.data,
    elapsed
  };
}

function testWithCurl(proxy, targetUrl, timeout = 10000) {
  return new Promise((resolve, reject) => {
    console.log(`-> Testing with curl through proxy: ${proxy} -> ${targetUrl}`);
    // Decide curl proxy option based on scheme
    const p = new URL(proxy);
    const scheme = p.protocol.replace(':', '');

    // Build curl args
    const args = ['-sS', '--max-time', String(Math.ceil(timeout / 1000)), '-i'];

    if (scheme.startsWith('socks')) {
      // curl uses --socks5 or --socks5-hostname
      args.push('--socks5-hostname', `${p.hostname}:${p.port || 1080}`);
      if (p.username) {
        args.push('--proxy-user', `${p.username}:${p.password || ''}`);
      }
    } else if (scheme === 'http' || scheme === 'https') {
      args.push('-x', `${p.hostname}:${p.port || 80}`);
      if (p.username) {
        args.push('--proxy-user', `${p.username}:${p.password || ''}`);
      }
    } else {
      return reject(new Error(`Unsupported proxy scheme for curl: ${scheme}`));
    }

    args.push(targetUrl);

    const start = Date.now();
    execFile('curl', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      const elapsed = Date.now() - start;
      if (err) {
        return reject(new Error(`${err.message}\n${stderr ? 'curl stderr: ' + stderr : ''}`));
      }
      // return raw output
      resolve({ stdout, stderr, elapsed });
    });
  });
}

(async function main() {
  const args = parseArgs();
  const proxy = args.proxy || process.env.PROXY;
  const url = args.url || process.env.TARGET_URL || 'https://httpbin.org/ip';
  const useCurl = !!args.curl;

  if (!proxy) {
    console.error('Error: proxy not provided. Use --proxy or set PROXY env var.');
    console.error('Example: node proxy-test.js --proxy http://user:pass@1.2.3.4:8080 --url https://httpbin.org/ip');
    process.exit(1);
  }

  console.log('Proxy test script');
  console.log('Proxy:', proxy);
  console.log('Target URL:', url);
  console.log('Using curl fallback:', useCurl ? 'yes' : 'no');
  console.log('---');

  // First try axios (node native) unless --curl specified
  if (!useCurl) {
    try {
      const result = await testWithAxios(proxy, url, 15000);
      console.log(`Axios result: HTTP ${result.status} ${result.statusText} (elapsed ${result.elapsed} ms)`);
      // If result.data is JSON-like, print summary
      if (typeof result.data === 'object') {
        console.log('Response (JSON):', JSON.stringify(result.data, null, 2));
      } else {
        // Show first 1000 chars
        const body = typeof result.data === 'string' ? result.data : String(result.data);
        console.log('Response body (first 1000 chars):\n', body.slice(0, 1000));
      }
      console.log('-> Proxy appears to be working (axios).');
      process.exit(0);
    } catch (err) {
      console.error('Axios test failed:', err.message);
      if (!useCurl) {
        console.log('Trying curl fallback (you can force with --curl)...');
      }
    }
  }

  // Try curl fallback
  try {
    const cRes = await testWithCurl(proxy, url, 15000);
    console.log(`curl result (elapsed ${cRes.elapsed} ms):\n`);
    console.log(cRes.stdout.slice(0, 8000)); // print limited
    console.log('\n-> curl test succeeded — proxy appears to be working.');
    process.exit(0);
  } catch (err) {
    console.error('curl test failed:', err.message);
    process.exit(2);
  }
})();
