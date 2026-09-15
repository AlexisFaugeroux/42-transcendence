import { formatISO } from '@transcendence/date';
import type { GetTracksInput, Track } from '../../domain/track';
import type { Track as PrismaTrack } from '../../generated/prisma/client';
import type { TrackWhereInput } from '../../generated/prisma/models';
import { inFilter } from '../helpers';

export function formatTrack(
  track: PrismaTrack,
  likes: { likesCount: number; isLiked: boolean } = { likesCount: 0, isLiked: false },
): Track {
  const { createdAt, updatedAt, ...rest } = track;

  const formattedCreatedAt = formatISO(createdAt);

  return {
    ...rest,
    bpm: rest.bpm ?? undefined,
    createdAt: formattedCreatedAt,
    peaksUrl: rest.url.replace(/\.[a-z0-9]+$/i, '.peaks'),
    likesCount: likes.likesCount,
    isLiked: likes.isLiked,
  };
}

export function accessFilter(viewerId: string): TrackWhereInput {
  return {
    OR: [
      { owner: { user: { id: viewerId } } },
      { visibility: 'PUBLIC' },
      { owner: { user: { followedBy: { some: { id: viewerId } } } }, visibility: 'SHARED' },
    ],
  };
}

export function criteriaFilters(input: GetTracksInput): TrackWhereInput {
  const { bpms, handles, ids, keys, modes, userIds, visibilities } = input;

  return {
    bpm: inFilter(bpms),
    id: inFilter(ids),
    key: inFilter(keys),
    mode: inFilter(modes),
    owner: { user: { handle: inFilter(handles), id: inFilter(userIds) } },
    visibility: inFilter(visibilities),
  };
}

export function buildFilters(input: GetTracksInput & { viewerId: string }): TrackWhereInput {
  return { AND: [criteriaFilters(input), accessFilter(input.viewerId)] };
}
