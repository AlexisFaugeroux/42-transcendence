import type { ParseKeys, TFunction } from 'i18next';

// Note names and modes are the one part of the audio domain we localise (fr/es
// name notes in solfège), so they live next to the keys that translate them
// rather than in either app. Both mirror enums in apps/back/prisma/schema.prisma.

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

export const MODES: Mode[] = ['MAJOR', 'MINOR'];

/** The letter part of a `Key` ('C_sharp_key' → 'C'). */
type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

const NOTE_LABEL: Record<NoteLetter, ParseKeys> = {
  A: 'music.note.a',
  B: 'music.note.b',
  C: 'music.note.c',
  D: 'music.note.d',
  E: 'music.note.e',
  F: 'music.note.f',
  G: 'music.note.g',
};

const MODE_LABEL: Record<Mode, ParseKeys> = {
  MAJOR: 'samples.mode.major',
  MINOR: 'samples.mode.minor',
};

const MODE_ABBR: Record<Mode, ParseKeys> = {
  MAJOR: 'samples.modeAbbr.major',
  MINOR: 'samples.modeAbbr.minor',
};

const ACCIDENTAL = { flat: '♭', sharp: '♯' };

// 'C_sharp_key' → 'C♯' in English, 'Do♯' in French. The accidental is a symbol,
// so it needs no translation.
export function formatKey(key: Key, t: TFunction): string {
  const [letter, accidental] = key.replace(/_key$/, '').split('_');
  const symbol = accidental ? ACCIDENTAL[accidental as keyof typeof ACCIDENTAL] : '';

  return `${t(NOTE_LABEL[letter as NoteLetter])}${symbol}`;
}

export const formatMode = (mode: Mode, t: TFunction): string => t(MODE_LABEL[mode]);

/** The short form used next to a key in dense tables ("Do♯ maj"). */
export const formatModeAbbr = (mode: Mode, t: TFunction): string => t(MODE_ABBR[mode]);

// Translated, so these are built per render rather than frozen at module load.
export const keyOptions = (t: TFunction): { label: string; value: Key }[] =>
  KEYS.map((key) => ({ label: formatKey(key, t), value: key }));

export const modeOptions = (t: TFunction): { label: string; value: Mode }[] =>
  MODES.map((mode) => ({ label: formatMode(mode, t), value: mode }));
