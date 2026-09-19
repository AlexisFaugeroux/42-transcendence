export type FamilyGroup =
  | 'KICKS'
  | 'DRUMS'
  | 'BASS'
  | 'SYNTH'
  | 'VOCAL'
  | 'FX'
  | 'AMBIENCE'
  | 'OTHER';

export type { SortKey } from '../../types/sample';

export interface Option<T> {
  label: string;
  value: T;
}
