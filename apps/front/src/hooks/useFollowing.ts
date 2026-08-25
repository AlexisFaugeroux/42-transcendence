import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getFollowing } from '../api/onlineFollowing';

export function useFollowing() {
  const user = useAuthUser();
  const { data, isLoading } = useQuery({
    queryFn: () => getFollowing(),
    queryKey: ['following', user.id],
  });
  return { following: data ?? null, isLoading };
}
