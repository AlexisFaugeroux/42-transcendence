import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getSavedSessions } from '../api/session';
import type { Session } from '../pages/Sessions/sessions.data';

export function useSavedSessions() {
  const user = useAuthUser();

  return useQuery<Session[]>({
    queryFn: getSavedSessions,
    queryKey: ['sessions', user.id],
  });
}