import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const AUDIO_DIR = fileURLToPath(new URL('../public/audio', import.meta.url));
const OUT_FILE = join(AUDIO_DIR, 'manifest.json');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const res = join(dir, entry.name);
      if (entry.isDirectory()) return walk(res);
      return entry.isFile() && entry.name.toLowerCase().endsWith('.wav') ? [res] : [];
    }),
  );
  return nested.flat();
}

const files = await walk(AUDIO_DIR);

const samples = files.map((abs) => {
  const rel = relative(AUDIO_DIR, abs).split(sep).join('/');
  return {
    name: rel.split('/').at(-1),
    url: `audio/${rel}`,
  };
});

await writeFile(OUT_FILE, `${JSON.stringify(samples, null, 2)}\n`);
console.log(`✓ ${samples.length} samples → ${relative(process.cwd(), OUT_FILE)}`);
