import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { listAllFollowers } from '../api/user';

export function useFollowers() {
  const user = useAuthUser();
  return useQuery({
    queryFn: () => listAllFollowers(),
    queryKey: ['followers', user.id],
  });
}
