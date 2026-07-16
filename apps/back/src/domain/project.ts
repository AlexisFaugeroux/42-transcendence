import type { VisibilityType } from '../generated/prisma/enums';
import type { Key } from './audioFile';

export interface Project {
  id: string;
  state: string;
  samples: string[];
  name: string;
  ownerId: string;
  duration: number;
  bpm: number;
  key?: Key;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaveProjectBody {
  id: string;
  name: string;
  bpm: number;
  duration: number;
  visibility: VisibilityType;
  samples: string[];
  state: string; // base64
  key?: Key;
}

export interface UpsertProjectInput {
  id: string;
  state: Uint8Array<ArrayBuffer>;
  samples: string[];
  ownerId: string;
  name: string;
  duration: number;
  bpm: number;
  visibility: VisibilityType;
  key?: Key;
}

export interface GetProjectInput {
  ids: string[];
  ownerIds: string[];
  visibilities: VisibilityType[];
}
