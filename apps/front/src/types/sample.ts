// Key and Mode live in @transcendence/i18n: they are the one part of the audio
// domain we localise, and the studio needs them too. Re-exported here so this
// file stays the single door to the sample domain types.
import type { Key, Mode } from '@transcendence/i18n';

export type { Key, Mode };
export { KEYS, MODES } from '@transcendence/i18n';

export type Family =
  | 'KICK'
  | 'SNARE'
  | 'CLAP'
  | 'HAT'
  | 'TOM'
  | 'PERC'
  | 'CYMBAL'
  | 'BASS'
  | 'SYNTH'
  | 'LEAD'
  | 'PAD'
  | 'KEYS'
  | 'PLUCK'
  | 'STRINGS'
  | 'BRASS'
  | 'VOCAL'
  | 'FX'
  | 'AMBIENCE';

export type Kind = 'ONE_SHOT' | 'LOOP';

export type Visibility = 'PRIVATE' | 'SHARED' | 'PUBLIC';

export interface Sample {
  id: string;
  bpm: number | null;
  ownerId: string;
  key: Key | null;
  mode: Mode | null;
  family: Family | null;
  kind: Kind | null;
  visibility: Visibility | null;
  url: string;
  peaksUrl: string;
  duration: number;
  bytes: number;
  name: string;
  createdAt: string;
}

export const VISIBILITIES: Visibility[] = ['PRIVATE', 'SHARED', 'PUBLIC'];

export const FAMILIES: Family[] = [
  'KICK',
  'SNARE',
  'CLAP',
  'HAT',
  'TOM',
  'PERC',
  'CYMBAL',
  'BASS',
  'SYNTH',
  'LEAD',
  'PAD',
  'KEYS',
  'PLUCK',
  'STRINGS',
  'BRASS',
  'VOCAL',
  'FX',
  'AMBIENCE',
];

export const KINDS: Kind[] = ['ONE_SHOT', 'LOOP'];

export const USER_KINDS: Kind[] = ['ONE_SHOT', 'LOOP'];
