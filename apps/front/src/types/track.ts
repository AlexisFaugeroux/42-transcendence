import type { Key, Mode, Visibility } from './sample';

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
  likesCount: number;
  isLiked: boolean;
}

export interface UpdateTrackInput {
  title?: string;
  description?: string | null;
  visibility?: Visibility;
  bpm?: number | null;
  key?: Key | null;
  mode?: Mode | null;
}
