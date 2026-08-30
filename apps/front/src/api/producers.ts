import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { PublicProducer, PublicProducerProfile } from '../types/producer';
import type { Paginated } from '../types/pagination';

export async function listProducers(
  page = 1,
  limit = 20,
  q = '',
): Promise<Paginated<PublicProducer>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const search = q?.trim();
  if (search) params.set('q', search);

  const res = await apiFetch(`/api/users?${params.toString()}`);
  if (!res.ok)
    throw new ApiErrorReponse(`[api/users] List producers failed: ${res.status}`, res.status);

  return (await res.json()) as Paginated<PublicProducer>;
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

export async function getFollowers(
  handle: string,
  page = 1,
  limit = 20,
  q = '',
): Promise<Paginated<PublicProducer>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const search = q?.trim();
  if (search) params.set('q', search);

  const res = await apiFetch(
    `/api/users/${encodeURIComponent(handle)}/followers?${params.toString()}`,
  );
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}/followers] Get followers failed: ${res.status}`,
      res.status,
    );

  return (await res.json()) as Paginated<PublicProducer>;
}

export async function getFollowing(
  handle: string,
  page = 1,
  limit = 20,
  q = '',
): Promise<Paginated<PublicProducer>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const search = q?.trim();
  if (search) params.set('q', search);

  const res = await apiFetch(
    `/api/users/${encodeURIComponent(handle)}/following?${params.toString()}`,
  );
  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/users/${encodeURIComponent(handle)}/following] Get following failed: ${res.status}`,
      res.status,
    );
  return (await res.json()) as Paginated<PublicProducer>;
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
