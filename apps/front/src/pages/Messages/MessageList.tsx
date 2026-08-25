import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { JSX } from 'react';
import { listMessages } from '../../api/chat/chat';
import type { Conversation } from '../../types/chat';
import type { Message } from '../../types/chat';
import style from './MessageList.module.scss';

interface MessageListProp {
  conversation: Conversation;
}

export function MessageList({ conversation }: MessageListProp): JSX.Element {
  const me = useAuthUser();
  const { data } = useQuery({
    queryFn: () => listMessages(conversation.id),
    queryKey: ['messages', conversation.id, me.id],
  });
  const messages: Message[] = data ?? [];
  const meParticipant =
    conversation.participants[0].id === me.id
      ? conversation.participants[0]
      : conversation.participants[1];
  const toParticipant =
    conversation.participants[0].id !== me.id
      ? conversation.participants[0]
      : conversation.participants[1];

  return (
    <div className={style.messageWrapper}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.authorId === me.id ? style.messageRight : style.messageLeft}
        >
          <p style={{ paddingBottom: 3 }}>
            {' '}
            {message.authorId === me.id ? meParticipant.artistName : toParticipant.artistName}
          </p>
          <div className={me.id === message.authorId ? style.meMessage : style.otherMessage}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
