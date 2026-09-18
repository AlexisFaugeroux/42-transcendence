import { ApiErrorReponse } from '@transcendence/auth';
import type { RegisterBody, RegisterResponse } from './types.ts';

export async function registerRequest(body: RegisterBody): Promise<RegisterResponse> {
  const res = await fetch(`/api/auth/register`, {
    body: JSON.stringify({
      artistName: body.artistName,
      email: body.email,
      firstname: body.firstname,
      handle: body.handle,
      lastname: body.lastname,
      password: body.password,
      role: body.role,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!res.ok)
    throw new ApiErrorReponse(`[api/auth/register] Register failed ${res.status}`, res.status);
  const data = (await res.json()) as RegisterResponse;

  return data;
}
