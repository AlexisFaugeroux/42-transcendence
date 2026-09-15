import { apiError, apiFetch } from '@transcendence/auth';
import type { Track, UpdateTrackInput } from '../../types/track';
import { getPeaks } from '../samples/samples';
import type { GetTracksFilters } from './types';
import type { Paginated } from '../../types/pagination';

/** Public media URL for a track `.wav` / `.peaks` path returned by the API. */
export function trackMediaUrl(path: string): string {
  return `/tracks/${path}`;
}

function toTrackSearchParams(filters: GetTracksFilters): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const visibility of filters.visibilities ?? [])
    searchParams.append('visibilities', visibility);
  for (const id of filters.ids ?? []) searchParams.append('ids', id);
  for (const bpm of filters.bpms ?? []) searchParams.append('bpms', String(bpm));
  for (const key of filters.keys ?? []) searchParams.append('keys', key);
  for (const mode of filters.modes ?? []) searchParams.append('modes', mode);

  return searchParams;
}

export async function getTracks(filters: GetTracksFilters = {}): Promise<Track[]> {
  const query = toTrackSearchParams(filters).toString();
  const res = await apiFetch(`/api/tracks/get${query ? `?${query}` : ''}`);
  if (!res.ok) throw await apiError(res, '/api/tracks/get');

  return (await res.json()) as Track[];
}

export async function getProducerTracks(
  handle: string,
  filters: GetTracksFilters = {},
): Promise<Track[]> {
  const query = toTrackSearchParams(filters).toString();
  const path = `/api/users/${encodeURIComponent(handle)}/tracks`;
  const res = await apiFetch(`${path}${query ? `?${query}` : ''}`);
  if (!res.ok) throw await apiError(res, path);

  return (await res.json()) as Track[];
}

export async function updateTrack(id: string, fields: UpdateTrackInput): Promise<Track> {
  const searchParams = new URLSearchParams({ id });

  const res = await apiFetch(`/api/tracks/update?${searchParams.toString()}`, {
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  });

  if (!res.ok) throw await apiError(res, '/api/tracks/update');

  return (await res.json()) as Track;
}

export async function deleteTrack(id: string): Promise<void> {
  const searchParams = new URLSearchParams({ id });

  const res = await apiFetch(`/api/tracks/delete?${searchParams.toString()}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw await apiError(res, '/api/tracks/delete');
}

export async function likeTrack(id: string): Promise<void> {
  const searchParams = new URLSearchParams({ id });

  const res = await apiFetch(`/api/tracks/like?${searchParams.toString()}`, {
    method: 'POST',
  });

  if (!res.ok) throw await apiError(res, '/api/tracks/like');
}

export async function unlikeTrack(id: string): Promise<void> {
  const searchParams = new URLSearchParams({ id });

  const res = await apiFetch(`/api/tracks/unlike?${searchParams.toString()}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw await apiError(res, '/api/tracks/unlike');
}

export async function getLikedTracks(page = 1, limit = 20): Promise<Paginated<Track>> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await apiFetch(`/api/tracks/liked?${searchParams.toString()}`);
  if (!res.ok) throw await apiError(res, '/api/tracks/liked');

  return (await res.json()) as Paginated<Track>;
}

export async function getTrackPeaks(peaksUrl: string) {
  return getPeaks(trackMediaUrl(peaksUrl));
}
