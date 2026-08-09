#!/bin/sh
set -e
npx prisma migrate deploy

unzip -o samples/platform -d samples/platform
rm -rf samples/platform.zip

unzip -o samples/alex -d samples/alex
rm -rf samples/alex.zip

unzip -o samples/julien -d samples/julien
rm -rf samples/julien.zip

unzip -o avatars/avatars.zip -d avatars
rm -rf avatars/avatars.zip

node build/seedDb.prod.js
exec "$@"

# ENTRYPOINT recieves CMD as arguments
# "$@" = all args passed to the script
# So "$@" = "node build/index.js"
