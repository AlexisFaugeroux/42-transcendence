import type { JSX } from 'react';
import styles from './LeftNav.module.scss';
import { NavItem } from './NavItem';
import { SOCIAL_ITEMS, WORKSPACE_ITEMS } from './navItems';

export function LeftNav(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <div className={styles.sectionLabel}>Workspace</div>
      {WORKSPACE_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}

      <div className={styles.gap} />
      <div className={styles.sectionLabel}>Social</div>
      {SOCIAL_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}

      <div className={styles.spacer} />

      <div className={styles.storage}>
        <div className={styles.storageHead}>
          <span>STORAGE</span>
          <span>4.2 / 10 GB</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: '42%' }} />
        </div>
      </div>
    </nav>
  );
}
