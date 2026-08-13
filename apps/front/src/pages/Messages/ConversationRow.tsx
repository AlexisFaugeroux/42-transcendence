import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import type { ConversationSummary } from '../../api/chat/types';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import styles from './ConversationRow.module.scss';
import { formatConversationTime } from './helpers';

interface ConversationRowProps {
  conversation: ConversationSummary;
  meId: string;
}

export function ConversationRow({ conversation, meId }: ConversationRowProps): JSX.Element {
  const { t } = useTranslation();
  const { id, lastMessage, lastMessageAt, peer, unreadCount } = conversation;
  const mine = lastMessage?.senderId === meId;
  const unread = unreadCount > 0;

  return (
    <NavLink
      to={`/messages/${id}`}
      className={({ isActive }) => `${styles.row} ${isActive ? styles.active : ''}`}
    >
      <StatusAvatar name={peer.artistName} size={36} status={peer.online ? 'online' : 'offline'} />

      <span className={styles.body}>
        <span className={styles.topLine}>
          <span className={`${styles.name} ${unread ? styles.unreadName : ''}`}>
            {peer.artistName}
          </span>
          <span className={styles.time}>
            {formatConversationTime(lastMessageAt, t('chat.time.yesterday'))}
          </span>
        </span>

        <span className={styles.bottomLine}>
          <span className={`${styles.preview} ${unread ? styles.unreadPreview : ''}`}>
            {lastMessage ? (
              <>
                {mine ? <span className={styles.you}>{t('chat.lastMessage.you')}</span> : null}
                {lastMessage.body}
              </>
            ) : (
              <em className={styles.none}>{t('chat.lastMessage.none')}</em>
            )}
          </span>
          {unread ? <span className={styles.badge}>{unreadCount}</span> : null}
        </span>
      </span>
    </NavLink>
  );
}
