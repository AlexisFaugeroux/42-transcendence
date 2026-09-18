import { apiError, apiFetch } from '@transcendence/auth';
import type { Paginated } from '../../types/pagination';
import type { ApiKey, CreateApiKeyFields, CreatedApiKey } from './types';

export async function getApiKeys(): Promise<Paginated<ApiKey>> {
  const res = await apiFetch('/api/keys/get');
  if (!res.ok) throw await apiError(res, '/api/keys/get');

  return (await res.json()) as Paginated<ApiKey>;
}

export async function createApiKey(fields: CreateApiKeyFields): Promise<CreatedApiKey> {
  const res = await apiFetch('/api/keys/create', {
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  if (!res.ok) throw await apiError(res, '/api/keys/create');

  return (await res.json()) as CreatedApiKey;
}

export async function revokeApiKey(id: string): Promise<void> {
  const searchParams = new URLSearchParams({ id });

  const res = await apiFetch(`/api/keys/revoke?${searchParams.toString()}`, { method: 'DELETE' });
  if (!res.ok) throw await apiError(res, '/api/keys/revoke');
}
