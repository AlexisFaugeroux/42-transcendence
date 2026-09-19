import { ApiErrorReponse } from './errors';
import type { AuthResponse, AuthUser, LoginBody, MeResponse } from './types';

export async function loginRequest(body: LoginBody): Promise<AuthResponse> {
  const res = await fetch(`/api/auth/login`, {
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!res.ok)
    throw new ApiErrorReponse(`[/api/auth/login] Login failed ${res.status}`, res.status);
  const data = (await res.json()) as AuthResponse;

  return data;
}

export async function logoutRequest(): Promise<void> {
  const res = await fetch(`/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!res.ok)
    throw new ApiErrorReponse(`[api/auth/logout] Logout request failed ${res.status}`, res.status);
}

export async function meRequest(): Promise<AuthUser | null> {
  const res = await fetch(`/api/auth/me`, {
    credentials: 'include',
    method: 'GET',
  });

  if (!res.ok)
    throw new ApiErrorReponse(`[api/auth/me] me request failed ${res.status}`, res.status);
  const data = (await res.json()) as MeResponse;

  return data.user;
}

// The message carried here is the backend's own, and it is deliberately NOT
// translated: pages pair it with a translated title and show it as the detail.
// See "What deliberately stays in English" in docs/i18n.md.
export async function apiError(res: Response, route: string): Promise<ApiErrorReponse> {
  const body = (await res.json().catch(() => null)) as {
    error?: string;
  } | null;
  const fallback = res.statusText || `HTTP ${String(res.status)}`;

  return new ApiErrorReponse(body?.error ?? `[${route}] ${fallback}`, res.status);
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(`${path}`, {
    credentials: 'include',
    ...init,
  });

  if (res.status === 401) window.dispatchEvent(new Event('auth:unauthorized'));

  return res;
}

// fetch() reports no upload progress, so multipart uploads go through
// XMLHttpRequest instead.
export function apiUpload(
  path: string,
  body: FormData,
  onProgress?: (ratio: number) => void,
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', path);
    xhr.withCredentials = true;

    if (onProgress)
      xhr.upload.onprogress = (event: ProgressEvent): void => {
        if (event.lengthComputable) onProgress(event.loaded / event.total);
      };

    xhr.onload = (): void => {
      if (xhr.status === 0) {
        reject(new ApiErrorReponse(`[${path}] Network error`, 0));
        return;
      }

      if (xhr.status === 401) window.dispatchEvent(new Event('auth:unauthorized'));

      const headers = new Headers();
      const contentType = xhr.getResponseHeader('Content-Type');
      if (contentType) headers.set('Content-Type', contentType);

      const bodyless = xhr.status === 204 || xhr.status === 205 || xhr.status === 304;

      resolve(
        new Response(bodyless ? null : xhr.responseText, {
          headers,
          status: xhr.status,
          statusText: xhr.statusText,
        }),
      );
    };

    xhr.onerror = (): void => {
      reject(new ApiErrorReponse(`[${path}] Network error`, 0));
    };

    xhr.onabort = (): void => {
      reject(new ApiErrorReponse(`[${path}] Upload aborted`, 0));
    };

    xhr.send(body);
  });
}
