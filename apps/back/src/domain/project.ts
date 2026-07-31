import type { VisibilityType } from '../generated/prisma/enums';
import type { Key, Mode } from './audioFile';

export interface Project {
  id: string;
  state: string;
  samples: string[];
  name: string;
  ownerId: string;
  duration: number;
  bpm: number;
  key?: Key;
  mode?: Mode;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaveProjectBody {
  id: string;
  name: string;
  bpm: number;
  duration: number;
  visibility: VisibilityType;
  samples: string[] | null;
  state: string; // base64
  key?: Key;
  mode?: Mode;
}

export interface UpsertProjectInput {
  id: string;
  state: Uint8Array<ArrayBuffer>;
  samples: string[] | null;
  ownerId: string;
  name: string;
  duration: number;
  bpm: number;
  visibility: VisibilityType;
  key?: Key;
  mode?: Mode;
}

export interface GetProjectInput {
  ids: string[];
  ownerIds: string[];
  visibilities: VisibilityType[];
}
