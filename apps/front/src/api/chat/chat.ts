import { apiError, apiFetch } from '@transcendence/auth';
import type { Conversation, Message } from './types';

export async function getConversations(): Promise<Conversation[]> {
  const res = await apiFetch('api/chat/listConversations', { method: 'GET' });
  if (!res.ok) throw await apiError(res, '/api/chat/listConversations');

  return (await res.json()) as Conversation[];
}

export async function sendMessage(message: Message) {
  const res = await apiFetch('api/chat/sendMessage', {
    body: JSON.stringify({ message: message }),
    method: 'POST',
  });
  if (!res.ok) throw await apiError(res, '/api/chat/senMessage');
}

export async function createConversation(message: Message, recipientId: string) {
  const res = await apiFetch('api/chat/createConversation', {
    body: JSON.stringify({
      message: message,
      recipientId: recipientId,
    }),
    method: 'POST',
  });
  if (!res.ok) throw await apiError(res, '/api/chat/createConversation');
}

export async function markAsRead(conversationId: string) {
  const res = await apiFetch('api/chat/markAsRead', {
    body: JSON.stringify({
      conversationId,
    }),
    method: 'POST',
  });
  if (!res.ok) throw await apiError(res, '/api/chat/markAsRaed');
}
