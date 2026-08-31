import { useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { useEffect } from 'react';
import type { Conversation, Message } from '../types/chat';
import type { SocketEvent } from '../types/event';
import { useSocket } from '../websocket/WebSocketProvider';

export function MessageListener(): null {
  const { subscribe } = useSocket();
  const queryClient = useQueryClient();
  const user = useAuthUser();

  useEffect(() => {
    const handler = (event: SocketEvent) => {
      if (event.event !== 'message') return;
      const newMessage = event.data;
      const conversations : Conversation[] | undefined = queryClient.getQueryData(['conversations', user.id]);
      const conversationIsAlreadyListed = conversations?.find((conversation) => conversation.id === newMessage.conversationId) ?? null;
      if (!conversationIsAlreadyListed){
        void queryClient.refetchQueries({
          queryKey: ['conversations', user.id],
          exact: true,
          type: 'active',
        });
      }
      queryClient.setQueryData<Message[]>(
        ['messages', newMessage.conversationId, user.id],
        (current) => [...(current ?? []), newMessage],
      );
    };
    return subscribe(handler);
  }, [subscribe, queryClient, user.id]);

  return null;
}
