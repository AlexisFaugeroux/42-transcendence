import { apiFetch } from '@transcendence/auth';
import { ApiErrorReponse } from '@transcendence/auth';
import type { ProjectProperties } from '../lib/types';

export async function saveProject(properties: ProjectProperties) {
  const res = await apiFetch(`/api/project/save`, {
    body: JSON.stringify({
      ...properties,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
  if (!res.ok) throw new ApiErrorReponse(`[/api/project/save] : ${res.statusText}`, res.status);
}

export async function loadProject(uuid: string) {
  const queryString = new URLSearchParams({
    id: uuid,
  });
  const res = await apiFetch(`/api/project/load?${queryString.toString()}`, {
    method: 'GET',
  });
  if (!res.ok) throw new ApiErrorReponse(`[/api/project/load] : ${res.statusText}`, res.status);
  const data = (await res.json()) as ProjectProperties;
  return data;
}
