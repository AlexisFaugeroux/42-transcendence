import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { Sample } from '../lib/types';

export async function getlistAudioFile(): Promise<Sample[]> {
  const query = new URLSearchParams({
    visibility: 'PUBLIC',
  });

  const res = await apiFetch(`/api/audio/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/audio/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as Sample[];
  return data;
}

export async function getAudioById(id: string): Promise<Sample> {
  const query = new URLSearchParams({
    id,
  });

  const res = await apiFetch(`/api/audio/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/audio/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as Sample;
  return data;
}
