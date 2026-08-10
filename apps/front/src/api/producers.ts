import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { PublicProducer, PublicProducerProfile } from '../types/producer';

export async function listProducers(): Promise<PublicProducer[]> {
  const res = await apiFetch('/api/users');
  if (!res.ok) throw new ApiErrorReponse(`[api/users] List producers failed: ${res.status}`, res.status);

  const data = (await res.json()) as { producers: PublicProducer[] };
  return data.producers;
}

export async function getProducer(handle: string): Promise<PublicProducerProfile> {
  const res = await apiFetch(`/api/users/${encodeURIComponent(handle)}`);
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}] Get producer failed: ${res.status}`,
      res.status,
    );

  const data = (await res.json()) as { producer: PublicProducerProfile };
  return data.producer;
}

export async function getFollowers(handle: string): Promise<PublicProducer[]> {
  const res = await apiFetch(`/api/users/${encodeURIComponent(handle)}/followers`);
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}/followers] Get followers failed: ${res.status}`,
      res.status,
    );

  const data = (await res.json()) as { producers: PublicProducer[] };
  return data.producers;
}

export async function getFollowing(handle: string): Promise<PublicProducer[]> {
  const res = await apiFetch(`/api/users/${encodeURIComponent(handle)}/following`);
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}/following] Get following failed: ${res.status}`,
      res.status,
    );

  const data = (await res.json()) as { producers: PublicProducer[] };
  return data.producers;
}

export async function followProducer(handle: string): Promise<void> {
  const res = await apiFetch(`/api/users/${encodeURIComponent(handle)}/follow`, {
    method: 'POST',
  });
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}/follow] Follow producer failed: ${res.status}`,
      res.status,
    );
}

export async function unfollowProducer(handle: string): Promise<void> {
  const res = await apiFetch(`/api/users/${encodeURIComponent(handle)}/follow`, {
    method: 'DELETE',
  });
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}/follow] Unfollow producer failed: ${res.status}`,
      res.status,
    );
}
