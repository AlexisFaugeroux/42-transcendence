import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser, usePermissions } from '@transcendence/auth';
import { Permissions } from '@transcendence/permissions';
import {
  deleteProject,
  getSavedSessions,
  updateProject,
  type UpdateProjectFields,
} from '../api/session';
import type { Session } from '../pages/Sessions/sessions.data';

export function useSavedSessions() {
  const user = useAuthUser();

  const perm = usePermissions(Permissions.STUDIO_ACCESS);
  if (!perm) return { data: [], isError: false, isLoading: false, error: null };

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
