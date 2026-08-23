import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getPeaks } from '../api/samples/samples';
import type { DecodedPeaks } from '../lib/peaks';

/**
 * Loads decoded peaks for a media peaks path.
 * Pass a relative sample path (`ownerId/id.peaks`) or an absolute URL
 * (`/tracks/…`, `/samples/…`) — see `getPeaks` / `trackMediaUrl`.
 */
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
