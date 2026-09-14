import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { Paginated } from '../../types/pagination';
import type { SessionList, UpdateUserBody, User } from './types';
import type { Role } from '@transcendence/permissions';

export async function getUsers(page = 1, limit = 20, q = ''): Promise<Paginated<User>> {
  const searchParams = new URLSearchParams({ page: String(page), limit: String(limit) });

  const search = q.trim();
  if (search) searchParams.set('q', search);

  const res = await apiFetch(`/api/admin/users/get?${searchParams.toString()}`, { method: 'GET' });
  if (!res.ok) throw new ApiErrorReponse('[api/admin/users/get] Failed to fetch users', res.status);

  return (await res.json()) as Paginated<User>;
}

export async function updateUser(values: UpdateUserBody): Promise<User> {
  const res = await apiFetch('/api/admin/users/update', {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok)
    throw new ApiErrorReponse(`[api/admin/users/update] Update failed: ${res.status}`, res.status);

  const updatedUser = (await res.json()) as User;

  return updatedUser;
}

export async function updateUserRole(payload: { id: string; role: Role }): Promise<void> {
  const res = await apiFetch('/api/admin/users/role', {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/admin/users/role] Failed to update role: ${res.status}`,
      res.status,
    );
}

export async function deleteUser(id: string): Promise<void> {
  const searchParams = new URLSearchParams({
    id,
  });

  const res = await apiFetch(`/api/admin/users/delete?${searchParams}`, {
    method: 'DELETE',
  });

  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/admin/users/delete] Deletion failed: ${res.status}`,
      res.status,
    );
}

export async function revokeAllUserSessions(id: string): Promise<void> {
  const res = await apiFetch('/api/admin/users/revoke', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/admin/users/revoke] Sessions revoke failed: ${res.status}`,
      res.status,
    );
}

export async function getUserSessions(id: string): Promise<SessionList> {
  const res = await apiFetch(`/api/admin/users/sessions?id=${id}`);
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/admin/users/sessions] Failed to fetch sessions: ${res.status}`,
      res.status,
    );

  return (await res.json()) as SessionList;
}
