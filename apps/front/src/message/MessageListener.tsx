import { useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import type { Conversation, Message } from '../types/chat';
import type { WebSocketEvent } from '../types/event';
import { useSocket } from '../websocket/WebSocketProvider';

export function MessageListener(): null {
  const { subscribe } = useSocket();
  const queryClient = useQueryClient();
  const user = useAuthUser();
  const url = useMatch('/messages/:id');

  useEffect(() => {
    const handler = (event: WebSocketEvent) => {
      if (event.event !== 'message') return;
      const newMessage = event.data;
      const conversations: Conversation[] | undefined = queryClient.getQueryData([
        'conversations',
        user.id,
      ]);
      const conversationIsAlreadyListed = conversations?.find(
        (conversation) => conversation.id === newMessage.conversationId,
      );
      queryClient.setQueryData<Message[]>(
        ['messages', newMessage.conversationId, user.id],
        (current) => [...(current ?? []), newMessage],
      );
      if (conversationIsAlreadyListed === undefined) {
        void queryClient.refetchQueries({
          queryKey: ['conversations', user.id],
          exact: true,
          type: 'active',
        });
      } else {
        const isReceiver = newMessage.toId === user.id;
        queryClient.setQueryData<Conversation[]>(
          ['conversations', user.id],
          (currentConversations) => {
            if (!currentConversations) return currentConversations;

            return currentConversations.map((conversation) => {
              if (conversation.id !== newMessage.conversationId) {
                return conversation;
              }
              return {
                ...conversation,
                lastMessage: newMessage,
                lastMessageAt: newMessage.createdAt,
                participants: conversation.participants.map((participant) => {
                  const isCurrentUser = participant.id === user.id;
                  if (!isCurrentUser || !isReceiver || url?.params.id === conversation.id) {
                    return participant;
                  }
                  return {
                    ...participant,
                    unreadCount: participant.unreadCount + 1,
                  };
                }),
              };
            });
          },
        );
      }
    };
    return subscribe(handler);
  }, [subscribe, queryClient, user.id, url?.params.id]);

  return null;
}
