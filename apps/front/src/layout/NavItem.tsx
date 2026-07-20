import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';
import type { NavItemDef } from './navItems';

export function NavItem({ badge, badgeColor, icon, label, to }: NavItemDef): JSX.Element {
  return (
    <NavLink to={to} className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
      <MsnIcon name={icon} size="14px" />
      <span className={styles.label}>{label}</span>
      {badge ? (
        <span className={styles.badge} style={badgeColor ? { color: badgeColor } : undefined}>
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
}
