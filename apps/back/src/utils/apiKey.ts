import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const API_KEY_HEADER = 'x-api-key';

const PREFIX_BYTES = 6;
const SECRET_BYTES = 32;
const SCHEME = 'msn';

export interface GeneratedApiKey {
  key: string;
  prefix: string;
  hash: string;
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

export function generateApiKey(): GeneratedApiKey {
  const prefix = randomBytes(PREFIX_BYTES).toString('base64url');
  const secret = randomBytes(SECRET_BYTES).toString('base64url');
  const key = `${SCHEME}_${prefix}_${secret}`;

  return { hash: hashApiKey(key), key, prefix };
}

export function readKeyPrefix(key: string): string | null {
  const parts = key.split('_');
  if (parts.length !== 3) return null;
  const [scheme, prefix, secret] = parts;
  if (scheme !== SCHEME || !prefix || !secret) return null;
  return prefix;
}

export function verifyApiKey(key: string, storedHash: string): boolean {
  const candidate = Buffer.from(hashApiKey(key), 'hex');
  const expected = Buffer.from(storedHash, 'hex');
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}
