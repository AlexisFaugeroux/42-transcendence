export type Key = 'A_key' | 'B_key' | 'C_key' | 'D_key' | 'E_key' | 'F_key' | 'G_key';

export type Visibility = 'PRIVATE' | 'SHARED' | 'PUBLIC';

export interface AudioFile {
  id: string;
  ownerId: string;
  bpm: number | null;
  key: Key | null;
  visibility: Visibility | null;
  url: string;
  length: number;
  bytes: number;
}

export interface CreateAudioFileInput {
  ownerId: string;
  visibility: Visibility;
  url: string;
  length: number;
  bytes: number;
  bpm?: number | null;
  key?: Key | null;
}

export interface GetAudioFileInput {
  ids?: string[];
  bpms?: number[];
  keys?: Key[];
}

export interface UpdateAudioFileInput {
  visibility?: Visibility;
  url?: string;
  length?: number;
  bytes?: number;
  bpm?: number | null;
  key?: Key | null;
}
