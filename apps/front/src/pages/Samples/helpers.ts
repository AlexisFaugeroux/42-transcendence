import { FAMILIES, type Family, type Key, KEYS, type Kind, USER_KINDS } from '../../types/audioFile';
import { FAMILY_COLOR, GROUP_BY_FAMILY } from './constants';
import type { FamilyGroup, Option } from './types';

export function familyGroup(family: Family | null): FamilyGroup {
  if (!family) return 'OTHER';
  return GROUP_BY_FAMILY[family] ?? 'OTHER';
}

export function familyColor(family: Family | null): string {
  return FAMILY_COLOR[familyGroup(family)];
}

export function formatDuration(durationMs: number): string {
  const seconds = Math.floor(durationMs / 1000);
  const milliseconds = Math.round(durationMs % 1000);

  return `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function formatDecimal(value: number, locale: string, digits: number): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

// `locale` is the active UI language, so the decimal separator follows it (1,5 MB in fr/es).
export function formatBytes(bytes: number, locale: string): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${formatDecimal(mb / 1024, locale, 2)} GB`;
  if (mb < 1) return `${formatDecimal(Math.round(mb * 1024), locale, 0)} KB`;
  return `${formatDecimal(mb, locale, 1)} MB`;
}

export function formatKey(key: Key): string {
  return key.replace(/_key$/, '').replace('_sharp', '♯').replace('_flat', '♭');
}

export function formatKind(kind: Kind): string {
  return kind === 'ONE_SHOT' ? 'ONE-SHOT' : kind;
}

export const FAMILY_OPTIONS: Option<Family>[] = FAMILIES.map((family) => ({
  label: family,
  value: family,
}));
export const KIND_OPTIONS: Option<Kind>[] = USER_KINDS.map((kind) => ({
  label: formatKind(kind),
  value: kind,
}));
export const KEY_OPTIONS: Option<Key>[] = KEYS.map((key) => ({
  label: formatKey(key),
  value: key,
}));
