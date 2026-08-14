import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getPeaks } from '../api/samples/samples';
import type { DecodedPeaks } from '../lib/peaks';

export function useSamplePeaks(peaksUrl: string, enabled: boolean): DecodedPeaks | null {
  const user = useAuthUser();

  const { data } = useQuery({
    enabled,
    queryFn: () => getPeaks(peaksUrl),
    queryKey: ['peaks', user.id, peaksUrl],
    staleTime: Infinity,
  });

  return data ?? null;
}
