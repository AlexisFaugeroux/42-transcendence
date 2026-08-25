import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { OnlineUser } from '../pages/Home/home.data';

export async function getFollowing(): Promise<OnlineUser[]> {
  const res = await apiFetch(`api/user/listFollowing`, {
    method: 'GET',
  });
  if (!res) throw new ApiErrorReponse('[/api/user/getById] Failed to fetch online following users');
  return (await res.json()) as OnlineUser[];
}
