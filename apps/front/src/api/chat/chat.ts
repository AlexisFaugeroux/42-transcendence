import { apiError, apiFetch } from '@transcendence/auth';
import type { Conversation, Message } from '../../types/chat';
import type { NewMessage } from '../../types/chat';
import type { FirstMessage } from '../../types/chat';

export async function openConversation( message : FirstMessage ) : Promise<Conversation> {
  console.log( message );
  const res = await apiFetch('/api/chat/createConversation',{ 
    method : 'POST',
    headers : { 
      'Content-Type' : 'application/json' 
    },
    body : JSON.stringify({...message})
    });
  if (!res.ok) throw await apiError(res, 'api/chat/createConversation');
  return ( await res.json()) as Conversation;
}

export async function getConversations(): Promise<Conversation[]> {
  const res = await apiFetch('/api/chat/listConversations', { method: 'GET' });
  if (!res.ok) throw await apiError(res, '/api/chat/listConversations');

  return (await res.json()) as Conversation[];
}

export async function sendMessage(message: NewMessage) {
  const res = await apiFetch('/api/chat/sendMessage', {
    body: JSON.stringify({ ...message }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (!res.ok) throw await apiError(res, '/api/chat/senMessage');
}

export async function markAsRead(conversationId: string) {
  const res = await apiFetch('/api/chat/markAsRead', {
    body: JSON.stringify({
      conversationId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (!res.ok) throw await apiError(res, '/api/chat/markAsRaed');
}

export async function listMessages(conversationId: string): Promise<Message[]> {
  const res = await apiFetch(`/api/chat/listMessages?conversationId=${conversationId}`, {
    method: 'GET',
  });
  if (!res.ok) throw await apiError(res, '/api/chat/listMessages');
  return (await res.json()) as Message[];
}
