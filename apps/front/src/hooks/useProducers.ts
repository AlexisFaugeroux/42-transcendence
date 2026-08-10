import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  followProducer,
  getFollowers,
  getFollowing,
  getProducer,
  listProducers,
  unfollowProducer,
} from '../api/producers';
import type { PublicProducerProfile } from '../types/producer';

// Reads hooks

export function useProducers() {
  return useQuery({
    queryFn: () => listProducers(),
    queryKey: ['producers'],
  });
}

export function useProducer(handle: string) {
  return useQuery({
    enabled: Boolean(handle),
    queryFn: () => getProducer(handle),
    queryKey: ['producer', handle],
  });
}

export function useFollowers(handle: string, enabled = true) {
  return useQuery({
    enabled: Boolean(handle) && enabled,
    queryFn: () => getFollowers(handle),
    queryKey: ['producer', handle, 'followers'],
  });
}

export function useFollowing(handle: string, enabled = true) {
  return useQuery({
    enabled: Boolean(handle) && enabled,
    queryFn: () => getFollowing(handle),
    queryKey: ['producer', handle, 'following'],
  });
}

// Mutations hooks

export function useFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (handle: string) => followProducer(handle),

    onError: (_err, handle, context) => {
      if (context?.previous) {
        // rollback to snapshot ('previous')
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], context.previous);
      }
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] }); // invalidate query -> trigger a new fetch
    },

    onMutate: async (handle: string) => {
      await queryClient.cancelQueries({ queryKey: ['producer', handle] }); // cancel, avoid race condition

      const previous = queryClient.getQueryData<PublicProducerProfile>(['producer', handle]);

      if (previous) {
        // update the cache with the new data
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], {
          ...previous,
          followersCount: previous.followersCount + 1,
          isFollowing: true,
        });
      }

      return { previous }; // snapshot for rollback
    },

    onSuccess: (_data, handle) => {
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] }); // invalidate query -> trigger a new fetch
    },
  });
}

// mirror of useFollow
export function useUnfollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (handle: string) => unfollowProducer(handle),

    onError: (_err, handle, context) => {
      if (context?.previous) {
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], context.previous);
      }
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] });
    },

    onMutate: async (handle: string) => {
      await queryClient.cancelQueries({ queryKey: ['producer', handle] });

      const previous = queryClient.getQueryData<PublicProducerProfile>(['producer', handle]);

      if (previous) {
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], {
          ...previous,
          followersCount: Math.max(0, previous.followersCount - 1),
          isFollowing: false,
        });
      }

      return { previous };
    },

    onSuccess: (_data, handle) => {
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] });
    },
  });
}
