#!/bin/sh
set -e

CERT_DIR="infra/nginx/certs"
if [ ! -f "$CERT_DIR/cert.pem" ]; then
  echo "Generating self-signed certificate..."
  mkdir -p "$CERT_DIR"
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$CERT_DIR/key.pem" \
    -out "$CERT_DIR/cert.pem" \
    -subj "/C=FR/ST=Ile-de-France/L=Paris/O=42/OU=makesomenoise/CN=localhost"
else
  echo "Certificate already present, skipping."
fi
