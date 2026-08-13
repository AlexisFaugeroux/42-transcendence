import { apiError, apiFetch } from '@transcendence/auth';
import type { ConversationSummary } from './types';

export async function getConversations(): Promise<ConversationSummary[]> {
  const res = await apiFetch('/api/chat/conversations');
  if (!res.ok) throw await apiError(res, '/api/chat/conversations');

  return (await res.json()) as ConversationSummary[];
}
