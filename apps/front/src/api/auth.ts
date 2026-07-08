import type { AuthResponse, SignInValues } from './types.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginFetch(body: SignInValues): Promise<AuthResponse> {
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

  if (!res.ok) throw new Error(`[/api/auth/login] Login failed ${res.status}`);
  const data = (await res.json()) as AuthResponse;

  return data;
}
