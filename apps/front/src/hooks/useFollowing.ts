import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getFollowing } from '../api/onlineFollowing';

export function useFollowing() {
  const user = useAuthUser();
  return useQuery({
    queryFn: () => getFollowing(),
    queryKey: ['following', user.id],
  });
}
