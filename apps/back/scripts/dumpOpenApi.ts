import { writeFileSync } from 'node:fs';
import { buildApp } from '../src/app';

const app = await buildApp();
await app.ready();
writeFileSync('openapi.json', JSON.stringify(app.swagger(), null, 2));
await app.close();
