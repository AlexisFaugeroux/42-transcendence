import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import type { Conversation } from '../../api/chat/types';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import styles from './ConversationRow.module.scss';
import { formatConversationTime } from './helpers';

interface ConversationRowProps {
  conversation: Conversation;
  meId: string;
}

export function ConversationRow({ conversation, meId }: ConversationRowProps): JSX.Element | null {
  const { t } = useTranslation();
  const { id, lastMessage, lastMessageAt, participants } = conversation;
  const mine = lastMessage?.authorId === meId;

  if (participants.length !== 2) return null;

  const meParticipant = participants[0].id === meId ? participants[0] : participants[1];
  const toParticipant = participants[0].id !== meId ? participants[0] : participants[1];

  const me = {
    ...meParticipant,
    online: true,
  };

  const to = {
    ...toParticipant,
    online: true,
  };

  const unread = me.unreadCount === 0;
  return (
    <NavLink
      to={`/messages/${id}`}
      className={({ isActive }) => `${styles.row} ${isActive ? styles.active : ''}`}
    >
      <StatusAvatar name={to.artistName} size={36} status={to.online ? 'online' : 'offline'} />

      <span className={styles.body}>
        <span className={styles.topLine}>
          <span className={`${styles.name} ${unread ? styles.unreadName : ''}`}>
            {to.artistName}
          </span>
          <span className={styles.time}>
            {formatConversationTime(lastMessageAt, t('chat.time.yesterday'))}
          </span>
        </span>

        <span className={styles.bottomLine}>
          <span className={`${styles.preview} ${unread ? styles.unreadPreview : ''}`}>
            <>
              {mine ? <span className={styles.you}>{t('chat.lastMessage.you')}</span> : null}
              {lastMessage?.content}
            </>
          </span>
          {unread ? <span className={styles.badge}>{me.unreadCount}</span> : null}
        </span>
      </span>
    </NavLink>
  );
}
