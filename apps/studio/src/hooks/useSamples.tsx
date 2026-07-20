import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getlistAudioFile } from '../api/audiofile';
import type { Sample } from '../lib/types';

export function useSamples() {
  const user = useAuthUser();

  return useQuery<Sample[]>({
    enabled: !!user,
    queryFn: () => getlistAudioFile(),
    queryKey: ['samples', user.id],
  });
}
