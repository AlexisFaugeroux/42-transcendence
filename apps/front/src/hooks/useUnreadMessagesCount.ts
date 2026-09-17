import { useQuery } from '@tanstack/react-query';
import { useAuthUser, usePermissions } from '@transcendence/auth';
import { Permissions } from '@transcendence/permissions';
import { getConversations } from '../api/chat/chat';
import type { Conversation } from '../types/chat';

function myUnreadCount(conversation: Conversation, meId: string): number {
  return conversation.participants.find((participant) => participant.id === meId)?.unreadCount ?? 0;
}

/** Sum unreadCount for the current user across all conversations. */
export function sumUnreadCount(conversations: Conversation[], meId: string): number {
  return conversations.reduce((acc, conversation) => acc + myUnreadCount(conversation, meId), 0);
}

export function filterUnreadConversations(
  conversations: Conversation[],
  meId: string,
): Conversation[] {
  return conversations
    .filter((conversation) => myUnreadCount(conversation, meId) > 0)
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
}

function useConversationsQuery() {
  const user = useAuthUser();
  const canChat = usePermissions(Permissions.CHAT_ACCESS);

  return useQuery({
    enabled: canChat,
    queryFn: getConversations,
    queryKey: ['conversations', user.id],
  });
}

/** Shared with Messages — MessageListener keeps this cache fresh over the socket. */
export function useUnreadMessagesCount(): number {
  const user = useAuthUser();
  const { data } = useConversationsQuery();

  return sumUnreadCount(data ?? [], user.id);
}

/** Conversations with at least one unread message for the current user. */
export function useUnreadConversations(): Conversation[] {
  const user = useAuthUser();
  const { data } = useConversationsQuery();

  return filterUnreadConversations(data ?? [], user.id);
}
