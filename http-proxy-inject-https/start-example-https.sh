#!/bin/bash
# Example start script (assumes cert.pem/key.pem exist)
node http-inject-proxy-players-https.js 8443 127.0.0.1 30120 ./cert.pem ./key.pem false
