import { ApiErrorReponse } from './errors.ts';
import type { AuthResponse, LoginBody, RegisterBody, RegisterResponse } from './types.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginRequest(body: LoginBody): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
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

  if (!res.ok) throw new ApiErrorReponse(`[/api/auth/login] Login failed ${res.status}`, res.status);
  const data = (await res.json()) as AuthResponse;

  return data;
}

export async function registerRequest(body: RegisterBody): Promise<RegisterResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    body: JSON.stringify({
      email: body.email,
      pseudo: body.pseudo,
      password: body.password,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!res.ok) throw new ApiErrorReponse(`[api/auth/register] Register failed ${res.status}`, res.status);
  const data = (await res.json()) as RegisterResponse;

  return data;
}
