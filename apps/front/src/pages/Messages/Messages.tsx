import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { getConversations } from '../../api/chat/chat';
import { Conversation } from './Conversation';
import { ConversationList } from './ConversationList';
import styles from './Messages.module.scss';
import { ThreadEmpty } from './ThreadEmpty';

export function Messages(): JSX.Element {
  const me = useAuthUser();
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversationsQuery = useQuery({
    queryFn: getConversations,
    queryKey: ['conversations', me.id],
  });

  const conversations = conversationsQuery.data ?? [];

  const openConversation = conversationId
    ? (conversations.find((conversation) => conversation.id === conversationId) ?? null)
    : null;

  const retry = (): void => {
    void conversationsQuery.refetch();
  };

  return (
    <div className={styles.page}>
      <ConversationList
        conversations={conversationsQuery.data ?? []}
        error={conversationsQuery.error}
        isLoading={conversationsQuery.isLoading}
        meId={me.id}
        onRetry={retry}
      />
      {conversationId === undefined || !openConversation || conversationsQuery.isLoading ? (
        <ThreadEmpty />
      ) : (
        <Conversation conversation={openConversation} />
      )}
    </div>
  );
}
