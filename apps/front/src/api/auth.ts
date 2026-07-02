import type { SignInValues } from '../utils/types.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginFetch = async (body: SignInValues) => {
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
  const data = await res.json();
  return data;
};
