# HTTP Inject Proxy for FiveM (players.json)
This package provides a simple HTTP reverse-proxy that intercepts JSON responses for player endpoints
(e.g. `/players.json`, `/profileData.json`) and injects fake player entries for testing/debug.

> **Warning:** Use only on servers/environments you control or have authorization for. Modifying responses
for servers you do not own may violate rules or laws.

## Files
- `http-inject-proxy-players.js` - main proxy + control API
- `package.json` - basic package info and deps
- `README.md` - this file
- `start-example.sh` - example start script

## Requirements
- Node.js (v14+ recommended)
- npm

## Install
```bash
# in the extracted folder
npm install
```

## Run (example)
```bash
# listens on 8080 and forwards to 127.0.0.1:30120
node http-inject-proxy-players.js 8080 127.0.0.1 30120
```

- The proxy listens on `LISTEN_PORT` (e.g. 8080)
- Control API is available on `LISTEN_PORT + 1` (e.g. 8081)
  - `POST /api/inject` - add injected entry (JSON body)
  - `GET /api/inject` - list injected entries
  - `DELETE /api/inject/:id` - remove entry
  - `GET /api/captures?n=100` - tail last N capture log lines

## Example: add an injected player
```bash
curl -X POST http://localhost:8081/api/inject -H 'Content-Type: application/json' -d '{
  "endpoint":"127.0.0.1",
  "id":123456,
  "identifiers":["license:52a8be797f2925ddeae69b7fcb6818008f6b8bfd","license2:..."],
  "name":"Fake Player",
  "ping":5
}'
```

## Test the proxy
```bash
curl http://localhost:8080/players.json | jq .
```

## Notes & Next steps
- If your server uses HTTPS, you'll need to adapt the proxy to use `https.request` and optionally handle certs.
- Persistence: injected entries are in-memory only. Add a simple file-based persistence if needed.
- Performance: this is for testing. For production use, consider a faster proxy or native implementation.
