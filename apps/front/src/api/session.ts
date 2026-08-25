import { apiError, apiFetch } from '@transcendence/auth';
import type { Session } from '../pages/Sessions/sessions.data';

export interface UpdateProjectFields {
  name?: string;
  archived?: boolean;
}

export async function getSavedSessions(): Promise<Session[]> {
  const res = await apiFetch('/api/project/list');
  if (!res.ok) throw await apiError(res, '/api/project/list');

  return (await res.json()) as Session[];
}

export async function updateProject(id: string, fields: UpdateProjectFields): Promise<Session> {
  const searchParams = new URLSearchParams({ id });
  const res = await apiFetch(`/api/project/update?${searchParams.toString()}`, {
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  });
  if (!res.ok) throw await apiError(res, '/api/project/update');

  return (await res.json()) as Session;
}

export async function deleteProject(id: string): Promise<void> {
  const searchParams = new URLSearchParams({ id });
  const res = await apiFetch(`/api/project/delete?${searchParams.toString()}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw await apiError(res, '/api/project/delete');
}
