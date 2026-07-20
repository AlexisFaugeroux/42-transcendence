import { ApiErrorReponse } from "./errors";
import type { AuthResponse, AuthUser, LoginBody } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginRequest(body: LoginBody): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!res.ok)
    throw new ApiErrorReponse(
      `[/api/auth/login] Login failed ${res.status}`,
      res.status,
    );
  const data = (await res.json()) as AuthResponse;

  return data;
}

export async function logoutRequest(): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/auth/logout] Logout request failed ${res.status}`,
      res.status,
    );
}

export async function meRequest(): Promise<AuthUser | null> {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    credentials: "include",
    method: "GET",
  });

  if (res.status === 401) return null;

  if (!res.ok)
    throw new ApiErrorReponse(
      `[api/auth/me] me request failed ${res.status}`,
      res.status,
    );
  const data = (await res.json()) as AuthResponse;

  return data.user;
}

export async function apiError(
  res: Response,
  route: string,
): Promise<ApiErrorReponse> {
  const body = (await res.json().catch(() => null)) as {
    error?: string;
  } | null;
  const fallback = res.statusText || `HTTP ${String(res.status)}`;

  return new ApiErrorReponse(
    body?.error ?? `[${route}] ${fallback}`,
    res.status,
  );
}

export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...init,
  });

  if (res.status === 401) window.dispatchEvent(new Event("auth:unauthorized"));

  return res;
}
