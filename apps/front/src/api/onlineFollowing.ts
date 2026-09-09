import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { UserOnlineStatus } from '../types/user';

export async function getFollowing(): Promise<UserOnlineStatus[]> {
  const res = await apiFetch(`/api/user/listFollowing`, {
    method: 'GET',
  });
  if (!res)
    throw new ApiErrorReponse('[/api/user/listFollowing] Failed to fetch online following users');
  return (await res.json()) as UserOnlineStatus[];
}
