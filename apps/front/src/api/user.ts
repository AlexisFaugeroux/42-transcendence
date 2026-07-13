import { apiFetch, type AuthResponse, type AuthUser } from '@transcendence/auth';
import { ApiErrorReponse } from '@auth/src/errors';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function updateUserProfile(values: AuthUser): Promise<AuthUser> {
  const res = await apiFetch(`${BASE_URL}/api/user/update/profile`, {
    body: JSON.stringify(values),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/update.profile] Update failed: ${res.status}`, res.status);

  const data = (await res.json()) as AuthResponse;

  return data.user;
}

export async function updateUserPassword(values: { oldPassword: string; newPassword: string }): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/api/user/update/password`, {
    body: JSON.stringify(values),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/update/password] Update failed: ${res.status}`, res.status);
}

export async function deleteAccount(): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/api/user/delete`, {
    credentials: 'include',
    method: 'DELETE',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/delete] Account deletion failed ${res.status}`, res.status);
}
