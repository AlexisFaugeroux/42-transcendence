import { ApiErrorReponse } from './errors.ts';
import type { RegisterBody, RegisterResponse } from './types.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function registerRequest(body: RegisterBody): Promise<RegisterResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      pseudo: body.pseudo,
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
