#!/bin/sh
set -e
npx prisma migrate deploy
node build/seedDb.prod.js
exec "$@"

# ENTRYPOINT recieves CMD as arguments
# "$@" = all args passed to the script
# So "$@" = "node build/index.js"
