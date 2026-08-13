import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { getConversations } from '../../api/chat/chat';
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

      {/* The thread, its header and the composer belong to T8 (#182). Until it
          lands, opening a conversation only highlights its row. */}
      {conversationId === undefined ? <ThreadEmpty /> : <section className={styles.thread} />}
    </div>
  );
}
