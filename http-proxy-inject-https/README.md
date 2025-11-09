# HTTPS HTTP Inject Proxy for FiveM (players.json) — Self-Signed Cert + Persistence
This package provides an HTTPS reverse-proxy that intercepts JSON responses for player endpoints
(e.g. `/players.json`, `/profileData.json`) and injects fake player entries for testing/debug.
It also persists injected entries to `injected.json`.

> **Warning:** Use only on servers/environments you control or have authorization for. Modifying responses
for servers you do not own may violate rules or laws.

## Files
- `http-inject-proxy-players-https.js` - main HTTPS proxy + control API (same server)
- `package.json` - dependencies and start script
- `README.md` - this file
- `generate-self-signed.sh` - helper script to generate a self-signed certificate (openssl)
- `start-example-https.sh` - example start script

## Requirements
- Node.js (v14+ recommended)
- npm
- openssl (to generate self-signed cert)

## Generate self-signed cert (example)
```bash
chmod +x generate-self-signed.sh
# generates cert.pem and key.pem (RSA 2048) valid for 365 days
./generate-self-signed.sh cert.pem key.pem "CN=localhost"
```

## Install
```bash
npm install
```

## Run (example)
```bash
# listens on 8443 and forwards to 127.0.0.1:30120 (target is HTTP)
node http-inject-proxy-players-https.js 8443 127.0.0.1 30120 ./cert.pem ./key.pem false
```

- The proxy serves HTTPS on `LISTEN_PORT` (e.g. 8443)
- Control API is available under same server on `/api/*` (e.g. `https://localhost:8443/api/inject`)
- Injected entries are saved to `injected.json` automatically.

## Example: add an injected player
```bash
curl -k -X POST "https://localhost:8443/api/inject" -H 'Content-Type: application/json' -d '{
  "endpoint":"127.0.0.1",
  "id":123456,
  "identifiers":["license:52a8be797f2925ddeae69b7fcb6818008f6b8bfd","license2:..."],
  "name":"Fake Player",
  "ping":5
}'
```

## Test the proxy
```bash
curl -k "https://localhost:8443/players.json" | jq .
```

## Notes
- `-k` used with curl to ignore self-signed cert verification.
- If your real server uses HTTPS, set the 6th argument to `true` when running the script so the proxy forwards to target via HTTPS.
- For production or public-facing setups, use a proper CA-signed certificate and secure the control API.
