import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { getConversations } from '../api/chat/chat';
import type { Conversation } from '../types/chat';

/** Sum unreadCount for the current user across all conversations. */
export function sumUnreadCount(conversations: Conversation[], meId: string): number {
  return conversations.reduce((acc, conversation) => {
    for (const participant of conversation.participants) {
      if (participant.id === meId) acc += participant.unreadCount;
    }
    return acc;
  }, 0);
}

/** Shared with Messages — MessageListener keeps this cache fresh over the socket. */
export function useUnreadMessagesCount(): number {
  const user = useAuthUser();
  const { data } = useQuery({
    queryFn: getConversations,
    queryKey: ['conversations', user.id],
  });

  return sumUnreadCount(data ?? [], user.id);
}
