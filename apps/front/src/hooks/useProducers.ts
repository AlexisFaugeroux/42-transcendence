import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import {
  followProducer,
  getFollowers,
  getFollowing,
  getProducer,
  listProducers,
  unfollowProducer,
} from '../api/producers';
import type { PublicProducer, PublicProducerProfile } from '../types/producer';

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
  const myHandle = useAuthUser().handle;
  const myFollowingKey = ['producer', myHandle, 'following'] as const;

  return useMutation({
    mutationFn: (handle: string) => followProducer(handle),

    onError: (_err, handle, context) => {
      if (context?.previous) {
        // rollback to snapshot ('previous')
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], context.previous);
      }
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] }); // invalidate query -> trigger a new fetch
      void queryClient.invalidateQueries({ queryKey: myFollowingKey });
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
      void queryClient.invalidateQueries({ queryKey: myFollowingKey });
    },
  });
}

export function useUnfollow() {
  const queryClient = useQueryClient();
  const myHandle = useAuthUser().handle;
  const myFollowingKey = ['producer', myHandle, 'following'] as const;

  return useMutation({
    mutationFn: (handle: string) => unfollowProducer(handle),

    onError: (_err, handle, context) => {
      if (context?.previous) {
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], context.previous);
      }
      if (context?.previousFollowing) {
        queryClient.setQueryData(myFollowingKey, context.previousFollowing);
      }
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] });
      void queryClient.invalidateQueries({ queryKey: myFollowingKey });
    },

    onMutate: async (handle: string) => {
      await queryClient.cancelQueries({ queryKey: ['producer', handle] });
      await queryClient.cancelQueries({ queryKey: myFollowingKey });

      const previous = queryClient.getQueryData<PublicProducerProfile>(['producer', handle]);
      const previousFollowing = queryClient.getQueryData<PublicProducer[]>(myFollowingKey);

      if (previous) {
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], {
          ...previous,
          followersCount: Math.max(0, previous.followersCount - 1),
          isFollowing: false,
        });
      }

      if (previousFollowing) {
        queryClient.setQueryData<PublicProducer[]>(
          myFollowingKey,
          previousFollowing.filter((p) => p.handle !== handle),
        );
      }

      return { previous, previousFollowing };
    },

    onSuccess: (_data, handle) => {
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] });
      void queryClient.invalidateQueries({ queryKey: myFollowingKey });
    },
  });
}
