import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getlistSample } from '../api/sample';
import type { Sample } from '../lib/types';

export function useSamples() {
  const user = useAuthUser();

  return useQuery<Sample[]>({
    enabled: !!user,
    queryFn: () => getlistSample(),
    queryKey: ['samples', user.id],
  });
}
