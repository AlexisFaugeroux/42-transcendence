import {
  FAMILIES,
  type Family,
  type Key,
  KEYS,
  type Kind,
  type Mode,
  MODES,
  USER_KINDS,
  VISIBILITIES,
  type Visibility,
} from '../../types/audioFile';
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

export function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  if (mb < 1) return `${Math.round(mb * 1024).toString()} KB`;
  return `${mb.toFixed(1)} MB`;
}

export function formatKey(key: Key): string {
  return key.replace(/_key$/, '').replace('_sharp', '♯').replace('_flat', '♭');
}

export function formatKind(kind: Kind): string {
  return kind === 'ONE_SHOT' ? 'ONE-SHOT' : kind;
}

export const FAMILY_OPTIONS: Option<Family>[] = FAMILIES.map((family) => ({ label: family, value: family }));
export const KIND_OPTIONS: Option<Kind>[] = USER_KINDS.map((kind) => ({ label: formatKind(kind), value: kind }));
export const KEY_OPTIONS: Option<Key>[] = KEYS.map((key) => ({ label: formatKey(key), value: key }));
export const MODE_OPTIONS: Option<Mode>[] = MODES.map((mode) => ({ label: mode, value: mode }));
export const VISIBILITY_OPTIONS: Option<Visibility>[] = VISIBILITIES.map((visibility) => ({
  label: visibility,
  value: visibility,
}));
