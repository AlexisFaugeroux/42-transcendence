import { useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { useEffect } from 'react';
import type { Message } from '../types/chat';
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
      queryClient.setQueryData<Message[]>(
        ['messages', newMessage.conversationId, user.id],
        (current) => [...(current ?? []), newMessage],
      );
    };
    return subscribe(handler);
  }, [subscribe, queryClient, user.id]);

  return null;
}
