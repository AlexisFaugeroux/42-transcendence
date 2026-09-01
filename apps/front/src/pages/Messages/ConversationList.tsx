import { useTranslation } from '@transcendence/i18n';
import { Button } from '@transcendence/ui';
import { type JSX, useState } from 'react';
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
  const unread = conversations.reduce((acc, curr) => {
    curr.participants.forEach((participant) => {
      if (participant.id === meId) acc += participant.unreadCount;
    });
    return acc;
  }, 0);

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
        {/* T8 (#182) mounts the inline producer search here — a field with a
            results overlay, not a modal. */}
      </div>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {' '}
        New Conversation{' '}
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
