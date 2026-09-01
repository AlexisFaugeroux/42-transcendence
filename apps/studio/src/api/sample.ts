import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { Sample } from '../lib/types';

interface PaginatedSamples {
  items: Sample[];
  total: number;
  page: number;
  limit: number;
}

export async function getlistSample(): Promise<Sample[]> {
  const query = new URLSearchParams({
    visibilities: 'PUBLIC',
  });

  const res = await apiFetch(`/api/samples/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/samples/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as PaginatedSamples;
  return data.items;
}

export async function getSampleById(id: string): Promise<Sample> {
  const query = new URLSearchParams({
    ids: id,
  });

  const res = await apiFetch(`/api/samples/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/samples/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as PaginatedSamples;
  const sample = data.items[0];
  if (!sample) {
    throw new ApiErrorReponse(`[/api/samples/get] Sample not found: ${id}`, 404);
  }
  return sample;
}
