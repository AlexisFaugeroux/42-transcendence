import { theme } from '@transcendence/ui';
import {
  type AudioFile,
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

export type FamilyGroup = 'KICKS' | 'DRUMS' | 'BASS' | 'SYNTH' | 'VOCAL' | 'FX' | 'AMBIENCE' | 'OTHER';

export type SortKey = 'recent' | 'name' | 'duration' | 'size' | 'bpm';

export const FAMILY_GROUPS: Record<FamilyGroup, Family[]> = {
  AMBIENCE: ['AMBIENCE'],
  BASS: ['BASS'],
  DRUMS: ['SNARE', 'CLAP', 'HAT', 'CYMBAL', 'TOM', 'PERC'],
  FX: ['FX'],
  KICKS: ['KICK'],
  OTHER: [],
  SYNTH: ['SYNTH', 'LEAD', 'PAD', 'KEYS', 'PLUCK', 'STRINGS', 'BRASS'],
  VOCAL: ['VOCAL'],
};

export const FAMILY_COLOR: Record<FamilyGroup, string> = {
  AMBIENCE: theme.blue,
  BASS: theme.purple,
  DRUMS: theme.yellow,
  FX: theme.fg1,
  KICKS: theme.red,
  OTHER: theme.lineHover,
  SYNTH: theme.orange,
  VOCAL: theme.cyan,
};

const GROUP_BY_FAMILY = Object.entries(FAMILY_GROUPS).reduce<Partial<Record<Family, FamilyGroup>>>(
  (acc, [group, families]) => {
    for (const family of families) acc[family] = group as FamilyGroup;
    return acc;
  },
  {},
);

export const SAMPLE_COMPARATORS: Record<SortKey, (a: AudioFile, b: AudioFile) => number> = {
  bpm: (a, b) => (a.bpm ?? Number.POSITIVE_INFINITY) - (b.bpm ?? Number.POSITIVE_INFINITY),
  duration: (a, b) => a.duration - b.duration,
  name: (a, b) => a.name.localeCompare(b.name),
  recent: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  size: (a, b) => b.bytes - a.bytes,
};

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

// 'A_sharp_key' → 'A♯', 'B_flat_key' → 'B♭', 'C_key' → 'C'
export function formatKey(key: Key): string {
  return key.replace(/_key$/, '').replace('_sharp', '♯').replace('_flat', '♭');
}

export function formatKind(kind: Kind): string {
  return kind === 'ONE_SHOT' ? 'ONE-SHOT' : kind;
}

interface Option<T> {
  label: string;
  value: T;
}

export const FAMILY_OPTIONS: Option<Family>[] = FAMILIES.map((family) => ({ label: family, value: family }));
export const KIND_OPTIONS: Option<Kind>[] = USER_KINDS.map((kind) => ({ label: formatKind(kind), value: kind }));
export const KEY_OPTIONS: Option<Key>[] = KEYS.map((key) => ({ label: formatKey(key), value: key }));
export const MODE_OPTIONS: Option<Mode>[] = MODES.map((mode) => ({ label: mode, value: mode }));
export const VISIBILITY_OPTIONS: Option<Visibility>[] = VISIBILITIES.map((visibility) => ({
  label: visibility,
  value: visibility,
}));
