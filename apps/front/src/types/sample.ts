export type Key =
  | 'A_key'
  | 'A_sharp_key'
  | 'B_flat_key'
  | 'B_key'
  | 'C_key'
  | 'C_sharp_key'
  | 'D_flat_key'
  | 'D_key'
  | 'D_sharp_key'
  | 'E_flat_key'
  | 'E_key'
  | 'F_key'
  | 'F_sharp_key'
  | 'G_flat_key'
  | 'G_key'
  | 'G_sharp_key'
  | 'A_flat_key';

export type Mode = 'MAJOR' | 'MINOR';

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

export const KEYS: Key[] = [
  'A_key',
  'A_sharp_key',
  'B_flat_key',
  'B_key',
  'C_key',
  'C_sharp_key',
  'D_flat_key',
  'D_key',
  'D_sharp_key',
  'E_flat_key',
  'E_key',
  'F_key',
  'F_sharp_key',
  'G_flat_key',
  'G_key',
  'G_sharp_key',
  'A_flat_key',
];

export const VISIBILITIES: Visibility[] = ['PRIVATE', 'SHARED', 'PUBLIC'];

export const MODES: Mode[] = ['MAJOR', 'MINOR'];

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
