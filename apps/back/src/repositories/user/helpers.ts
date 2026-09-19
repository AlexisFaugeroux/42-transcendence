import type { JsonValue } from '../../generated/prisma/internal/prismaNamespace';

export function toLinks(value: JsonValue | null): { kind: string; url: string }[] {
  if (!Array.isArray(value)) return [];
  const links: { kind: string; url: string }[] = [];
  for (const entry of value) {
    if (
      entry !== null &&
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      typeof entry.kind === 'string' &&
      typeof entry.url === 'string'
    ) {
      links.push({ kind: entry.kind, url: entry.url });
    }
  }
  return links;
}
