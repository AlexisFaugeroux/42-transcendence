import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import {
  deleteTrack,
  getProducerTracks,
  getTracks,
  likeTrack,
  unlikeTrack,
  updateTrack,
} from '../api/track/tracks';
import type { GetTracksFilters } from '../api/track/types';
import type { Paginated } from '../types/pagination';
import type { Track, UpdateTrackInput } from '../types/track';

export function useTracks(filters: GetTracksFilters = {}) {
  const user = useAuthUser();

  return useQuery({
    queryFn: () => getTracks(filters),
    queryKey: ['tracks', user.id, filters],
  });
}

export function useProducerTracks(handle: string, filters: GetTracksFilters = {}, enabled = true) {
  return useQuery({
    enabled: Boolean(handle) && enabled,
    queryFn: () => getProducerTracks(handle, filters),
    queryKey: ['producer', handle, 'tracks', filters],
  });
}

function useInvalidateTrackQueries() {
  const queryClient = useQueryClient();
  const user = useAuthUser();

  return (): void => {
    void queryClient.invalidateQueries({ queryKey: ['tracks', user.id] });
    void queryClient.invalidateQueries({ queryKey: ['producer'] });
    void queryClient.invalidateQueries({ queryKey: ['liked'] });
  };
}

function patchTrackLike(track: Track, liked: boolean): Track {
  if (track.isLiked === liked) return track;
  return {
    ...track,
    isLiked: liked,
    likesCount: Math.max(0, track.likesCount + (liked ? 1 : -1)),
  };
}

function mapTrackList(
  tracks: Track[] | undefined,
  id: string,
  liked: boolean,
): Track[] | undefined {
  if (!tracks) return tracks;
  return tracks.map((track) => (track.id === id ? patchTrackLike(track, liked) : track));
}

export function useUpdateTrack() {
  const invalidateTrackQueries = useInvalidateTrackQueries();

  return useMutation({
    mutationFn: ({ fields, id }: { id: string; fields: UpdateTrackInput }) =>
      updateTrack(id, fields),
    onSuccess: invalidateTrackQueries,
  });
}

export function useDeleteTrack() {
  const invalidateTrackQueries = useInvalidateTrackQueries();

  return useMutation({
    mutationFn: (id: string) => deleteTrack(id),
    onSuccess: invalidateTrackQueries,
  });
}

type ToggleTrackLikeContext = {
  previousTracks: [readonly unknown[], Track[] | undefined][];
  previousProducerTracks: [readonly unknown[], Track[] | undefined][];
  previousLiked: [readonly unknown[], Paginated<Track> | undefined][];
};

export function useToggleTrackLike() {
  const queryClient = useQueryClient();
  const invalidateTrackQueries = useInvalidateTrackQueries();

  return useMutation<void, Error, { id: string; isLiked: boolean }, ToggleTrackLikeContext>({
    mutationFn: ({ id, isLiked }) => (isLiked ? unlikeTrack(id) : likeTrack(id)),

    onError: (_err, _vars, context) => {
      if (context?.previousTracks) {
        for (const [key, data] of context.previousTracks) {
          queryClient.setQueryData(key, data);
        }
      }
      if (context?.previousProducerTracks) {
        for (const [key, data] of context.previousProducerTracks) {
          queryClient.setQueryData(key, data);
        }
      }
      if (context?.previousLiked) {
        for (const [key, data] of context.previousLiked) {
          queryClient.setQueryData(key, data);
        }
      }
      invalidateTrackQueries();
    },

    onMutate: async ({ id, isLiked }) => {
      const liked = !isLiked;

      await queryClient.cancelQueries({ queryKey: ['tracks'] });
      await queryClient.cancelQueries({ queryKey: ['producer'] });
      await queryClient.cancelQueries({ queryKey: ['liked'] });

      const previousTracks = queryClient.getQueriesData<Track[]>({ queryKey: ['tracks'] });
      const previousProducerTracks = queryClient.getQueriesData<Track[]>({
        predicate: (query) => query.queryKey[0] === 'producer' && query.queryKey[2] === 'tracks',
      });
      const previousLiked = queryClient.getQueriesData<Paginated<Track>>({
        queryKey: ['liked'],
      });

      // update the cache with the new data
      queryClient.setQueriesData<Track[]>({ queryKey: ['tracks'] }, (old) =>
        mapTrackList(old, id, liked),
      );
      queryClient.setQueriesData<Track[]>(
        {
          predicate: (query) => query.queryKey[0] === 'producer' && query.queryKey[2] === 'tracks',
        },
        (old) => mapTrackList(old, id, liked),
      );
      queryClient.setQueriesData<Paginated<Track>>({ queryKey: ['liked'] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: mapTrackList(old.items, id, liked) ?? old.items,
        };
      });

      return { previousLiked, previousProducerTracks, previousTracks }; // snapshot for rollback
    },

    onSuccess: () => {
      invalidateTrackQueries();
    },
  });
}
