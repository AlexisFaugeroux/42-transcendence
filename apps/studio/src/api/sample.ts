import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { Sample } from '../lib/types';

export async function getlistSample(): Promise<Sample[]> {
  const query = new URLSearchParams({
    visibility: 'PUBLIC',
  });

  const res = await apiFetch(`/api/samples/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/samples/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as Sample[];
  return data;
}

export async function getSampleById(id: string): Promise<Sample> {
  const query = new URLSearchParams({
    id,
  });

  const res = await apiFetch(`/api/samples/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/samples/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as Sample;
  return data;
}
