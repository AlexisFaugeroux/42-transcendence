import type { Key, Mode } from '../generated/prisma/enums';
import type { Visibility } from './sample';

export interface Track {
  id: string;
  ownerId: string;
  owner?: { artistName: string; handle: string };
  projectId: string | null;
  key: Key | null;
  mode: Mode | null;
  visibility: Visibility;
  url: string;
  peaksUrl: string;
  duration: number;
  title: string;
  description?: string | null;
  bpm?: number;
  bytes: number;
  createdAt: string;
}

export interface CreateTrackInput {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  projectId?: string;
  visibility: Visibility;
  url: string;
  duration: number;
  bytes: number;
  bpm?: number | null;
  key?: Key | null;
  mode?: Mode | null;
}

export interface GetTracksInput {
  visibilities?: Visibility[];
  handles?: string[];
  ids?: string[];
  bpms?: number[];
  keys?: Key[];
  modes?: Mode[];
  userIds: string[];
}

export interface UpdateTrackInput {
  title?: string;
  description?: string;
  visibility?: Visibility;
  url?: string;
  duration?: number;
  bytes?: number;
  bpm?: number | null;
  key?: Key | null;
  mode?: Mode | null;
}

export interface UploadTrackFields {
  title: string;
  description?: string;
  projectId?: string;
  visibility: Visibility;
  bpm?: number;
  key?: Key;
  mode?: Mode;
}
