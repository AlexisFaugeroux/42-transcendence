import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { ONLINE } from './home.data';
import styles from './RightRail.module.scss';
import { LiveUserRow, OnlineUserRow } from './UserRows';

export function RightRail(): JSX.Element {
  const { t } = useTranslation();
  const live = ONLINE.filter((u) => u.status === 'live');
  const online = ONLINE.filter((u) => u.status !== 'live');
  const onlineCount = ONLINE.filter((u) => u.status !== 'offline').length;

  return (
    <aside className={styles.rail}>
      <div className={styles.head}>
        <h3 className={styles.title}>{t('home.rail.connected')}</h3>
        <span className={styles.count}>
          <span className={styles.dot}>●</span> {t('home.rail.onlineCount', { count: onlineCount })}
        </span>
      </div>

      <div className={styles.group}>
        <div className={styles.liveLabel}>
          <span className={styles.liveDot} /> {t('home.rail.liveNow')}
        </div>
        {live.map((user) => (
          <LiveUserRow key={user.handle} user={user} />
        ))}
      </div>

      <div className={styles.divider} />

      <div className={`${styles.group} ${styles.onlineGroup}`}>
        <div className={styles.label}>{t('home.rail.online')}</div>
        {online.map((user) => (
          <OnlineUserRow key={user.handle} user={user} />
        ))}
      </div>

      <div className={styles.invite}>
        <Button block>
          <MsnIcon name="plus" size="12px" /> {t('home.rail.invite')}
        </Button>
      </div>
    </aside>
  );
}
