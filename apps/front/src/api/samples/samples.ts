import { apiError, apiFetch } from '@transcendence/auth';
import { type DecodedPeaks, decodePeak } from '../../lib/peaks';
import type { Paginated } from '../../types/pagination';
import type { Sample } from '../../types/sample';
import type {
  GetSamplesFilters,
  SampleStorageUsage,
  UpdateSampleFields,
  UploadSampleFields,
} from './types';

export async function getSamples(
  filters: GetSamplesFilters,
  page = 1,
  limit = 20,
  q = '',
): Promise<Paginated<Sample>> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  for (const kind of filters.kinds ?? []) searchParams.append('kinds', kind);
  for (const visibility of filters.visibilities ?? [])
    searchParams.append('visibilities', visibility);

  const search = q?.trim();
  if (search) searchParams.set('q', search);

  const res = await apiFetch(`/api/samples/get?${searchParams.toString()}`);
  if (!res.ok) throw await apiError(res, '/api/samples/get');

  const data = (await res.json()) as Paginated<Sample>;

  return data;
}

export async function getStorageUsage(): Promise<SampleStorageUsage> {
  const res = await apiFetch('/api/samples/storage');
  if (!res.ok) throw await apiError(res, '/api/samples/storage');

  const data = (await res.json()) as SampleStorageUsage;

  return data;
}

export async function uploadSample(file: File, fields: UploadSampleFields): Promise<void> {
  const form = new FormData();
  // ⚠️ Append text fields BEFORE the file. With req.file() the busboy stream
  // only exposes fields that arrived *before* the file part — fields appended
  // after `file` silently won't reach parseUploadSampleFields.
  form.append('visibility', fields.visibility);
  if (fields.bpm !== undefined) form.append('bpm', String(fields.bpm));
  if (fields.family) form.append('family', fields.family);
  if (fields.kind) form.append('kind', fields.kind);
  if (fields.key) form.append('key', fields.key);
  if (fields.mode) form.append('mode', fields.mode);
  form.append('sample', file);

  // do NOT set Content-Type — the browser sets the multipart boundary.
  const res = await apiFetch('/api/samples/upload', {
    body: form,
    method: 'POST',
  });

  if (!res.ok) throw await apiError(res, '/api/samples/upload');
}

export async function updateSample(uuid: string, fields: UpdateSampleFields): Promise<Sample> {
  const searchParams = new URLSearchParams({ id: uuid });

  const res = await apiFetch(`/api/samples/update?${searchParams.toString()}`, {
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  });

  if (!res.ok) throw await apiError(res, '/api/samples/update');

  const data = (await res.json()) as Sample;

  return data;
}

export async function deleteSample(uuid: string): Promise<void> {
  const searchParams = new URLSearchParams({
    id: uuid,
  });

  const res = await apiFetch(`/api/samples/delete?${searchParams.toString()}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw await apiError(res, '/api/samples/delete');
}

export async function getPeaks(peaksUrl: string): Promise<DecodedPeaks> {
  // Absolute paths (/tracks/…, /samples/…) are used as-is; bare urls stay under /samples/.
  const path = peaksUrl.startsWith('/') ? peaksUrl : `/samples/${peaksUrl}`;
  const res = await apiFetch(path);
  if (!res.ok) throw await apiError(res, peaksUrl);
  return decodePeak(await res.arrayBuffer());
}
