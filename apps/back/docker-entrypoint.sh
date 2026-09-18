#!/bin/sh
set -e
npx prisma migrate deploy

for archive in samples/platform*.zip; do
  unzip -o "$archive" -d samples/platform
done
rm -f samples/platform*.zip

unzip -o samples/alex -d samples/alex
rm -rf samples/alex.zip

unzip -o samples/julien -d samples/julien
rm -rf samples/julien.zip

unzip -o avatars/avatars.zip -d avatars
rm -rf avatars/avatars.zip

for archive in tracks/*.zip; do
  unzip -o "$archive" -d tracks
done
rm -f tracks/*.zip

node build/seedDb.prod.js
exec "$@"

# ENTRYPOINT recieves CMD as arguments
# "$@" = all args passed to the script
# So "$@" = "node build/index.js"
