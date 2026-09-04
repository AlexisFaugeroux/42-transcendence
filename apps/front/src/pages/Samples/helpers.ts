import { apiFetch } from '@transcendence/auth';
import { FAMILIES, type Family, type Kind, type Sample, USER_KINDS } from '../../types/sample';
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

export async function downloadSample(sample: Sample): Promise<void> {
  const response = await apiFetch(`/samples/${encodeURI(sample.url)}`);
  if (!response.ok) {
    throw new Error(`HTTP: ${response.status}`);
  }
  const blob = await response.blob();
  const filename = sample.name.toLowerCase().endsWith('.wav') ? sample.name : `${sample.name}.wav`;

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}
