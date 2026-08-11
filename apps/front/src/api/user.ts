import { ApiErrorReponse, apiFetch, type AuthResponse, type AuthUser } from '@transcendence/auth';

export async function updateUserProfile(values: AuthUser): Promise<AuthUser> {
  const res = await apiFetch('/api/user/update/profile', {
    body: JSON.stringify(values),
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
  const res = await apiFetch('/api/user/update/password', {
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/update/password] Update failed: ${res.status}`, res.status);
}

export async function deleteAccount(): Promise<void> {
  const res = await apiFetch('/api/user/delete', {
    method: 'DELETE',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/delete] Account deletion failed ${res.status}`, res.status);
}

export async function uploadAvatar(file: File): Promise<AuthUser> {
  const form = new FormData();
  form.set('avatar', file);

  const res = await apiFetch('/api/user/upload/avatar', {
    body: form,
    method: 'POST',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/upload/avatar] Avatar upload failed ${res.status}`, res.status);

  const data = (await res.json()) as AuthResponse;

  return data.user;
}

export async function deleteAvatar(): Promise<void> {
  const res = await apiFetch('/api/user/delete/avatar', {
    method: 'DELETE',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/user/delete/avatar] Avatar deletion failed ${res.status}`, res.status);
}
