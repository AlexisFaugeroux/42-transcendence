import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import { usePresence } from '../../presence/PresenceProvider';
import type { Conversation } from '../../types/chat';
import styles from './ConversationRow.module.scss';
import { formatConversationTime } from './helpers';

interface ConversationRowProps {
  conversation: Conversation;
  meId: string;
}

export function ConversationRow({ conversation, meId }: ConversationRowProps): JSX.Element | null {
  const { t } = useTranslation();
  const { onlineUsers } = usePresence();
  const { id, lastMessage, lastMessageAt, participants } = conversation;

  if (participants.length !== 2) return null;

  const mine = lastMessage?.authorId === meId;
  const me = participants[0].id === meId ? participants[0] : participants[1];
  const to = participants[0].id !== meId ? participants[0] : participants[1];

  const isToOnline = onlineUsers?.find((user) => user.id === to.id);

  return (
    <NavLink
      to={`/messages/${id}`}
      className={({ isActive }) => `${styles.row} ${isActive ? styles.active : ''}`}
    >
      <StatusAvatar name={to.artistName} size={36} status={isToOnline ? 'online' : 'offline'} />

      <span className={styles.body}>
        <span className={styles.topLine}>
          <span className={`${styles.name} ${me.unreadCount ? styles.unreadName : ''}`}>
            {to.handle}
          </span>
          <span className={styles.time}>
            {formatConversationTime(lastMessageAt, t('chat.time.yesterday'))}
          </span>
        </span>

        <span className={styles.bottomLine}>
          <span className={`${styles.preview} ${me.unreadCount ? styles.unreadPreview : ''}`}>
            <>
              {mine ? <span className={styles.you}>{t('chat.lastMessage.you')}</span> : null}
              {lastMessage?.content}
            </>
          </span>
          {me.unreadCount ? <span className={styles.badge}>{me.unreadCount}</span> : null}
        </span>
      </span>
    </NavLink>
  );
}
