import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import {
  deleteProject,
  getSavedSessions,
  updateProject,
  type UpdateProjectFields,
} from '../api/session';
import type { Session } from '../pages/Sessions/sessions.data';

export function useSavedSessions() {
  const user = useAuthUser();

  return useQuery<Session[]>({
    queryFn: getSavedSessions,
    queryKey: ['sessions', user.id],
  });
}

function useInvalidateSessions() {
  const queryClient = useQueryClient();
  const user = useAuthUser();

  return (): void => {
    void queryClient.invalidateQueries({ queryKey: ['sessions', user.id] });
  };
}

export function useUpdateSession() {
  const invalidateSessions = useInvalidateSessions();

  return useMutation({
    mutationFn: ({ fields, id }: { id: string; fields: UpdateProjectFields }) =>
      updateProject(id, fields),
    onSuccess: invalidateSessions,
  });
}

export function useDeleteSession() {
  const invalidateSessions = useInvalidateSessions();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: invalidateSessions,
  });
}
