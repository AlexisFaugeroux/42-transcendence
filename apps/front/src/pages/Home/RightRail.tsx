import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { usePresence } from '../../presence/PresenceProvider';
import styles from './RightRail.module.scss';
import { OnlineUserRow } from './UserRows';

export function RightRail(): JSX.Element {
  const { t } = useTranslation();
  const { count, onlineUsers } = usePresence();

  return (
    <aside className={styles.rail}>
      <div className={styles.head}>
        <h3 className={styles.title}>{t('home.rail.connected')}</h3>
        <span className={styles.count}>
          <span className={styles.dot}>●</span> {t('home.rail.onlineCount', { count })}
        </span>
      </div>

      <div className={`${styles.group} ${styles.onlineGroup}`}>
        <div className={styles.label}>{t('home.rail.online')}</div>
        {onlineUsers?.map((user) => (
          <OnlineUserRow key={user.handle} user={user} />
        ))}
      </div>
    </aside>
  );
}
