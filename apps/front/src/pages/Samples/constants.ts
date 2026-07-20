import { theme } from '@transcendence/ui';
import type { AudioFile, Family } from '../../types/audioFile';
import type { FamilyGroup, SortKey } from './types';

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

export const GROUP_BY_FAMILY = Object.entries(FAMILY_GROUPS).reduce<Partial<Record<Family, FamilyGroup>>>(
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
