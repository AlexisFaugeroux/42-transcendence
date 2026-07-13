import { useQuery } from '@tanstack/react-query';
import { useUser } from '@auth/src';
import { getlistAudioFile } from '../api/audiofile';
import type { Sample } from '../lib/types';

export function useSamples() {
  const { user } = useUser();

  return useQuery<Sample[]>({
    enabled: !!user,
    queryFn: () => getlistAudioFile(),
    queryKey: ['samples', user?.id],
  });
}
