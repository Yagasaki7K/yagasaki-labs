#!/bin/bash
# generate-self-signed.sh <cert_out> <key_out> "<subject>"
CERT_OUT=${1:-cert.pem}
KEY_OUT=${2:-key.pem}
SUBJECT=${3:-"CN=localhost"}
echo "Generating self-signed cert: $CERT_OUT and key: $KEY_OUT (subject: $SUBJECT)"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "$KEY_OUT" -out "$CERT_OUT" -subj "/${SUBJECT}"
echo "Done."
