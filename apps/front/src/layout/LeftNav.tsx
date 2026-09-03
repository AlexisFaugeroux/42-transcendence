import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { useFollowing } from '../hooks/useProducers';
import { useTracks } from '../hooks/useTracks';
import styles from './LeftNav.module.scss';
import { NavItem } from './NavItem';
import { SOCIAL_ITEMS, WORKSPACE_ITEMS } from './navItems';

export function LeftNav(): JSX.Element {
  const { t } = useTranslation();
  const me = useAuthUser();
  const { data: following } = useFollowing(me.handle);
  const { data: tracks } = useTracks();

  return (
    <nav className={styles.nav}>
      <div className={styles.sectionLabel}>{t('nav.workspace')}</div>
      {WORKSPACE_ITEMS.map((item) => (
        <NavItem
          key={item.to}
          {...item}
          badge={item.to === '/tracks' ? String(tracks?.length ?? 0) : item.badge}
        />
      ))}

      <div className={styles.gap} />
      <div className={styles.sectionLabel}>{t('nav.social')}</div>
      {SOCIAL_ITEMS.map((item) => (
        <NavItem
          key={item.to}
          {...item}
          badge={item.to === '/following' ? String(following?.total ?? 0) : item.badge}
        />
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
