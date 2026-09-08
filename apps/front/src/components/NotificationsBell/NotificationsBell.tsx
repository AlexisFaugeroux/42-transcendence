import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Badge, ConfigProvider, Dropdown, MsnIcon, theme } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUnreadConversations, useUnreadMessagesCount } from '../../hooks/useUnreadMessagesCount';
import { formatConversationTime } from '../../pages/Messages/helpers';
import type { Conversation } from '../../types/chat';
import { HeaderIconButton } from '../HeaderIconButton/HeaderIconButton';
import { StatusAvatar } from '../StatusAvatar/StatusAvatar';
import styles from './NotificationsBell.module.scss';

function otherParticipant(conversation: Conversation, meId: string) {
  return conversation.participants.find((participant) => participant.id !== meId);
}

function myUnreadOn(conversation: Conversation, meId: string): number {
  return conversation.participants.find((participant) => participant.id === meId)?.unreadCount ?? 0;
}

export function NotificationsBell(): JSX.Element {
  const me = useAuthUser();
  const { t } = useTranslation();
  const unreadCount = useUnreadMessagesCount();
  const unreadConversations = useUnreadConversations();
  const [open, setOpen] = useState(false);

  const panel = (
    <div className={styles.panel}>
      <div className={styles.title}>{t('header.notificationsPanel.title')}</div>

      {unreadConversations.length === 0 ? (
        <p className={styles.empty}>{t('header.notificationsPanel.empty')}</p>
      ) : (
        <ul className={styles.list}>
          {unreadConversations.map((conversation) => {
            const other = otherParticipant(conversation, me.id);
            if (!other) return null;

            const mineUnread = myUnreadOn(conversation, me.id);

            return (
              <li key={conversation.id}>
                <Link
                  to={`/messages/${conversation.id}`}
                  className={styles.item}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <StatusAvatar name={other.artistName} size={32} status="online" />
                  <span className={styles.body}>
                    <span className={styles.topLine}>
                      <span className={styles.name}>{other.artistName}</span>
                      <span className={styles.time}>
                        {formatConversationTime(
                          conversation.lastMessageAt,
                          t('chat.time.yesterday'),
                        )}
                      </span>
                    </span>
                    <span className={styles.preview}>
                      {t('header.notificationsPanel.newMessage')}
                    </span>
                  </span>
                  {mineUnread > 0 ? <span className={styles.unread}>{mineUnread}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <Link
        to="/messages"
        className={styles.footer}
        onClick={() => {
          setOpen(false);
        }}
      >
        {t('header.notificationsPanel.viewAll')}
      </Link>
    </div>
  );

  return (
    <ConfigProvider theme={{ token: { colorBgElevated: theme.bgPanel3 } }}>
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        open={open}
        onOpenChange={setOpen}
        popupRender={() => panel}
      >
        <span className={styles.trigger}>
          <Badge count={unreadCount} size="small" color="var(--color-orange)">
            <HeaderIconButton label={t('header.notifications')}>
              <MsnIcon name="bell" size="16px" />
            </HeaderIconButton>
          </Badge>
        </span>
      </Dropdown>
    </ConfigProvider>
  );
}
