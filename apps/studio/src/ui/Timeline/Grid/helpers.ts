import type { Clip, Track } from '../../../lib/types';
import { ROW_HEIGTH } from '../constants';

export function findTrackAt(tracks: Track[], y: number): Track | undefined {
  const index = Math.floor(y / ROW_HEIGTH);
  return tracks[index];
}

export function mergeClipChanges(
  prev: Clip[],
  { createdClip, truncatedClip }: { createdClip: Clip | null; truncatedClip: Clip | null },
): Clip[] {
  const next = [...prev];

  if (truncatedClip) {
    const i = next.findIndex((c) => c.regionBox === truncatedClip.regionBox);
    if (i !== -1) next[i] = truncatedClip;
  }

  if (createdClip) next.push(createdClip);

  return next;
}
