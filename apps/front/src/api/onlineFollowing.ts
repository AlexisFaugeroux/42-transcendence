import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { OnlineUser } from '../pages/Home/home.data';

export async function getOnlineFollowing(ids: string[]): Promise<OnlineUser[]> {
  const query = new URLSearchParams();

  ids.forEach((id) => {
    query.append('ids', id);
  });
  const res = await apiFetch(`api/user/getById?${query.toString()}`, {
    method: 'GET',
  });
  if (!res) throw new ApiErrorReponse('[/api/user/getById] Failed to fetch online following users');
  return (await res.json()) as OnlineUser[];
}
