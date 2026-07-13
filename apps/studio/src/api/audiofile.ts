import { apiFetch } from '@auth/src';
import { ApiErrorReponse } from '@auth/src/errors';
import type { Sample } from '../lib/types';

const BACK_URL = import.meta.env.VITE_API_URL;

export async function getlistAudioFile(): Promise<Sample[]> {
  const query = new URLSearchParams({
    visibility: 'PUBLIC',
  });

  const res = await apiFetch(`${BACK_URL}/api/audio/get?${query.toString()}`);
  if (!res.ok) throw new ApiErrorReponse(`[/api/audio/get] : ${res.statusText}`, res.status);

  const data = (await res.json()) as Sample[];
  return data;
}
