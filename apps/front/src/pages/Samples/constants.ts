import type { TranslationKey } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import type { Family, Sample, Visibility } from '../../types/sample';
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

export const GROUP_BY_FAMILY = Object.entries(FAMILY_GROUPS).reduce<
  Partial<Record<Family, FamilyGroup>>
>((acc, [group, families]) => {
  for (const family of families) acc[family] = group as FamilyGroup;
  return acc;
}, {});

// Family and Kind are shown as their raw values: producers read them as English
// jargon (KICK, LOOP) in every DAW. Musical vocabulary is different and IS
// localised — that lives in @transcendence/i18n.
export const SORT_LABEL: Record<SortKey, TranslationKey> = {
  bpm: 'samples.sort.bpm',
  duration: 'samples.sort.duration',
  name: 'samples.sort.name',
  recent: 'samples.sort.recent',
  size: 'samples.sort.size',
};

export const VISIBILITY_LABEL: Record<Visibility, TranslationKey> = {
  PRIVATE: 'samples.visibility.private',
  PUBLIC: 'samples.visibility.public',
  SHARED: 'samples.visibility.shared',
};

export const UPLOAD_STATUS_LABEL: Record<'error' | 'queued' | 'uploading', TranslationKey> = {
  error: 'samples.upload.status.error',
  queued: 'samples.upload.status.queued',
  uploading: 'samples.upload.status.uploading',
};

export const SAMPLE_COMPARATORS: Record<SortKey, (a: Sample, b: Sample) => number> = {
  bpm: (a, b) => (a.bpm ?? Number.POSITIVE_INFINITY) - (b.bpm ?? Number.POSITIVE_INFINITY),
  duration: (a, b) => a.duration - b.duration,
  name: (a, b) => a.name.localeCompare(b.name),
  recent: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  size: (a, b) => b.bytes - a.bytes,
};
