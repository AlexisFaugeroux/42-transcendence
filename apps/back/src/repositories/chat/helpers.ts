import type { Conversation } from '../../domain/chat';
import type { HydratedConversation } from './types';

export function formatConversation(conv: HydratedConversation): Conversation {
  const messages = conv.participants[0].messagesReceived.concat(conv.participants[0].messagesSent);
  messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const participants = conv.participants.map(({ unreadCount, user }) => ({
    handle: user.handle,
    id: user.id,
    artistName: user.artistName,
    unreadCount,
  }));

  return {
    id: conv.id,
    lastMessage: messages.at(-1) ?? null,
    lastMessageAt: conv.lastMessageAt,
    messageSorted: messages,
    participants,
    updatedAt: conv.updatedAt,
  };
}
