import { apiError, apiFetch } from '@transcendence/auth';
import { type DecodedPeaks, decodePeak } from '../../lib/peaks';
import type { AudioFile } from '../../types/audioFile';
import type { AudioStorageUsage, GetSamplesFilters, UpdateSampleFields, UploadSampleFields } from './types';

export async function getSamples(filters: GetSamplesFilters): Promise<AudioFile[]> {
  const searchParams = new URLSearchParams();

  for (const kind of filters.kinds ?? []) searchParams.append('kinds', kind);
  for (const visibility of filters.visibilities ?? []) searchParams.append('visibilities', visibility);

  const res = await apiFetch(`/api/audio/get?${searchParams.toString()}`);
  if (!res.ok) throw await apiError(res, '/api/audio/get');

  const data = (await res.json()) as AudioFile[];

  return data;
}

export async function getStorageUsage(): Promise<AudioStorageUsage> {
  const res = await apiFetch('/api/audio/storage');
  if (!res.ok) throw await apiError(res, '/api/audio/storage');

  const data = (await res.json()) as AudioStorageUsage;

  return data;
}

export async function uploadSample(file: File, fields: UploadSampleFields): Promise<void> {
  const form = new FormData();
  // ⚠️ Append text fields BEFORE the file. With req.file() the busboy stream
  // only exposes fields that arrived *before* the file part — fields appended
  // after `file` silently won't reach parseUploadAudioFileFields.
  form.append('visibility', fields.visibility);
  if (fields.bpm !== undefined) form.append('bpm', String(fields.bpm));
  if (fields.family) form.append('family', fields.family);
  if (fields.kind) form.append('kind', fields.kind);
  if (fields.key) form.append('key', fields.key);
  if (fields.mode) form.append('mode', fields.mode);
  form.append('sample', file);

  // do NOT set Content-Type — the browser sets the multipart boundary.
  const res = await apiFetch('/api/audio/upload', {
    body: form,
    method: 'POST',
  });

  if (!res.ok) throw await apiError(res, '/api/audio/upload');
}

export async function updateSample(uuid: string, fields: UpdateSampleFields): Promise<AudioFile> {
  const searchParams = new URLSearchParams({ id: uuid });

  const res = await apiFetch(`/api/audio/update?${searchParams.toString()}`, {
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  });

  if (!res.ok) throw await apiError(res, '/api/audio/update');

  const data = (await res.json()) as AudioFile;

  return data;
}

export async function deleteSample(uuid: string): Promise<void> {
  const searchParams = new URLSearchParams({
    id: uuid,
  });

  const res = await apiFetch(`/api/audio/delete?${searchParams.toString()}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw await apiError(res, '/api/audio/delete');
}

export async function getPeaks(peaksUrl: string): Promise<DecodedPeaks> {
  const res = await apiFetch(`/audio/${peaksUrl}`);
  if (!res.ok) throw await apiError(res, peaksUrl);
  return decodePeak(await res.arrayBuffer());
}
