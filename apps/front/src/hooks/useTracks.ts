import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { deleteTrack, getProducerTracks, getTracks, updateTrack } from '../api/track/tracks';
import type { GetTracksFilters } from '../api/track/types';
import type { UpdateTrackInput } from '../types/track';

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
  };
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
