import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getSavedSessions } from '../src/api/session.ts';
import type { Session } from '../src/pages/Sessions/sessions.data.ts';

export function useSession() {
  const user = useAuthUser();

  return useQuery<Session[]>({
    queryFn: getSavedSessions,
    queryKey: ['sessions', user.id],
  });
}
