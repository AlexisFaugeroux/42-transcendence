import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { useFollowing } from '../hooks/useProducers';
import { useSavedSessions } from '../hooks/useSavedSessions';
import { useTracks } from '../hooks/useTracks';
import { useUnreadMessagesCount } from '../hooks/useUnreadMessagesCount';
import styles from './LeftNav.module.scss';
import { NavItem } from './NavItem';
import { ADMIN_ITEMS, type NavItemDef, SOCIAL_ITEMS, WORKSPACE_ITEMS } from './navItems';

export function LeftNav(): JSX.Element {
  const { t } = useTranslation();
  const me = useAuthUser();
  const { data: following } = useFollowing(me.handle);
  const { data: tracks } = useTracks();
  const { data: sessions } = useSavedSessions();
  const unreadMessagesCount = useUnreadMessagesCount();

  const badges: Record<NavItemDef['to'], number | undefined> = {
    '/tracks': tracks?.length,
    '/sessions': sessions?.length,
    '/following': following?.total,
    '/messages': unreadMessagesCount,
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.sectionLabel}>{t('nav.administration')}</div>
      {ADMIN_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} badge={badges[item.to]} />
      ))}

      <div className={styles.gap} />
      <div className={styles.sectionLabel}>{t('nav.workspace')}</div>
      {WORKSPACE_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} badge={badges[item.to]} />
      ))}

      <div className={styles.gap} />
      <div className={styles.sectionLabel}>{t('nav.social')}</div>
      {SOCIAL_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} badge={badges[item.to]} />
      ))}

      <div className={styles.spacer} />

      <div className={styles.storage}>
        <div className={styles.storageHead}>
          <span>{t('nav.storage')}</span>
          <span>{t('nav.storageUsage', { total: 10, used: 4.2 })}</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: '42%' }} />
        </div>
      </div>
    </nav>
  );
}
