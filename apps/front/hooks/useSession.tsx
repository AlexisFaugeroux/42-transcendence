import { useQuery } from '@tanstack/react-query';
import { getSavedSessions } from '../src/api/session.ts';
import type { Session } from  "../src/pages/Sessions/sessions.data.ts";
import { useAuthUser } from '@transcendence/auth';

export function useSession() {

    const user = useAuthUser();
    
    return useQuery<Session[]>({
        queryFn: getSavedSessions,
        queryKey: ['sessions', user.id]
      });
}
