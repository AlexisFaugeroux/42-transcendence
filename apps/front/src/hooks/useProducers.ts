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
import type { Paginated } from '../types/pagination';
import type { PublicProducer, PublicProducerProfile } from '../types/producer';

// Reads hooks

export function useProducers(page: number, limit = 20, q = '') {
  const search = q?.trim();

  return useQuery({
    queryKey: ['producers', page, limit, search],
    queryFn: () => listProducers(page, limit, search),
  });
}

export function useProducer(handle: string) {
  return useQuery({
    enabled: Boolean(handle),
    queryKey: ['producer', handle],
    queryFn: () => getProducer(handle),
  });
}

export function useFollowers(handle: string, enabled = true, page = 1, limit = 20, q = '') {
  const search = q.trim();
  return useQuery({
    enabled: Boolean(handle) && enabled,
    queryKey: ['producer', handle, 'followers', page, limit, search],
    queryFn: () => getFollowers(handle, page, limit, search),
  });
}

export function useFollowing(handle: string, enabled = true, page = 1, limit = 20, q = '') {
  const search = q.trim();
  return useQuery({
    enabled: Boolean(handle) && enabled,
    queryKey: ['producer', handle, 'following', page, limit, search],
    queryFn: () => getFollowing(handle, page, limit, search),
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
        queryClient.setQueryData(['producer', handle], context.previous);
      }
      if (context?.previousFollowing) {
        for (const [key, data] of context.previousFollowing) {
          queryClient.setQueryData(key, data);
        }
      }
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] });
      void queryClient.invalidateQueries({ queryKey: myFollowingKey });
    },

    onMutate: async (handle: string) => {
      await queryClient.cancelQueries({ queryKey: ['producer', handle] });
      await queryClient.cancelQueries({ queryKey: myFollowingKey });

      const previous = queryClient.getQueryData<PublicProducerProfile>(['producer', handle]);
      const previousFollowing = queryClient.getQueriesData<Paginated<PublicProducer>>({
        queryKey: myFollowingKey,
      });

      if (previous) {
        queryClient.setQueryData<PublicProducerProfile>(['producer', handle], {
          ...previous,
          followersCount: Math.max(0, previous.followersCount - 1),
          isFollowing: false,
        });
      }

      queryClient.setQueriesData<Paginated<PublicProducer>>({ queryKey: myFollowingKey }, (old) => {
        if (!old) return old;
        // update the cache with the new data
        return {
          ...old,
          items: old.items.filter((p) => p.handle !== handle),
          total: Math.max(0, old.total - 1),
        };
      });

      return { previous, previousFollowing };
    },

    onSuccess: (_data, handle) => {
      void queryClient.invalidateQueries({ queryKey: ['producer', handle] });
      void queryClient.invalidateQueries({ queryKey: myFollowingKey });
    },
  });
}
