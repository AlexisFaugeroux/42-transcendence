import { useTranslation } from '@transcendence/i18n';
import { Button } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { sumUnreadCount } from '../../hooks/useUnreadMessagesCount';
import type { Conversation } from '../../types/chat';
import styles from './ConversationList.module.scss';
import { ConversationRow } from './ConversationRow';
import { ListEmpty, ListError, ListSkeleton } from './ListStates';
import { NewConversationModal } from './NewConversationModal';

interface ConversationListProps {
  conversations: Conversation[];
  error: Error | null;
  isLoading: boolean;
  meId: string;
  onRetry: () => void;
}

export function ConversationList({
  conversations,
  error,
  isLoading,
  meId,
  onRetry,
}: ConversationListProps): JSX.Element {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const unread = sumUnreadCount(conversations, meId);

  return (
    <section className={styles.column}>
      <div className={styles.head}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{t('chat.title')}</h1>
          {unread > 0 ? (
            <span className={styles.unread}>{t('chat.unreadNew', { count: unread })}</span>
          ) : null}
          <NewConversationModal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {t('chat.newConversation')}
      </Button>

      {isLoading ? (
        <ListSkeleton />
      ) : error ? (
        <ListError message={error.message} onRetry={onRetry} />
      ) : conversations.length === 0 ? (
        <ListEmpty />
      ) : (
        <div className={styles.rows}>
          {conversations.map((conv) => (
            <ConversationRow key={conv.id} conversation={conv} meId={meId} />
          ))}
        </div>
      )}
    </section>
  );
}
