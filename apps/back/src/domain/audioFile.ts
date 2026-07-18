export type Key = 'A_key' | 'B_key' | 'C_key' | 'D_key' | 'E_key' | 'F_key' | 'G_key';

export type Visibility = 'PRIVATE' | 'SHARED' | 'PUBLIC';

export interface AudioFile {
  id: string;
  bpm: number | null;
  ownerId: string;
  key: Key | null;
  visibility: Visibility | null;
  url: string;
  duration: number;
  bytes: number;
  name: string;
}

export interface CreateAudioFileInput {
  id: string;
  name: string;
  ownerId: string;
  visibility: Visibility;
  url: string;
  duration: number;
  bytes: number;
  bpm?: number | null;
  key?: Key | null;
}

export interface GetAudioFileInput {
  visibilities?: Visibility[];
  ids?: string[];
  bpms?: number[];
  keys?: Key[];
  ownerIds?: string[];
}

export interface UpdateAudioFileInput {
  visibility?: Visibility;
  url?: string;
  duration?: number;
  bytes?: number;
  bpm?: number | null;
  key?: Key | null;
}

export interface UploadAudioFileFields {
  visibility: Visibility;
  bpm?: number;
  key?: Key;
}
