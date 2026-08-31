import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { User } from '../types/user';

export async function getFollowing(): Promise<User[]> {
  const res = await apiFetch(`api/user/listFollowing`, {
    method: 'GET',
  });
  if (!res) throw new ApiErrorReponse('[/api/user/getById] Failed to fetch online following users');
  return (await res.json()) as User[];
}
