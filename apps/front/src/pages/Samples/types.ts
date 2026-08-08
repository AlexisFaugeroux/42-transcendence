export type FamilyGroup =
  | 'KICKS'
  | 'DRUMS'
  | 'BASS'
  | 'SYNTH'
  | 'VOCAL'
  | 'FX'
  | 'AMBIENCE'
  | 'OTHER';

export type SortKey = 'recent' | 'name' | 'duration' | 'size' | 'bpm';

export interface Option<T> {
  label: string;
  value: T;
}
