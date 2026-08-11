import { apiFetch } from '@transcendence/auth';
import type { Session } from '../../src/pages/Sessions/sessions.data.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getSavedSessions(): Promise<Session[]> {
  const res = await apiFetch(`${BASE_URL}/api/project/list`);
  if (!res.ok) throw new Error('[/api/project/list] Failed to fetch project');

  const project = (await res.json()) as Session[];
  return project;
}
