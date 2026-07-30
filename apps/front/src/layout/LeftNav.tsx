import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import styles from './LeftNav.module.scss';
import { NavItem } from './NavItem';
import { SOCIAL_ITEMS, WORKSPACE_ITEMS } from './navItems';

export function LeftNav(): JSX.Element {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <div className={styles.sectionLabel}>{t('nav.workspace')}</div>
      {WORKSPACE_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}

      <div className={styles.gap} />
      <div className={styles.sectionLabel}>{t('nav.social')}</div>
      {SOCIAL_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} />
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
