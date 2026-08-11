import { useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';
import type { NavItemDef } from './navItems';

export function NavItem({ badge, badgeColor, icon, labelKey, to }: NavItemDef): JSX.Element {
  const { t } = useTranslation();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
    >
      <MsnIcon name={icon} size="14px" />
      <span className={styles.label}>{t(labelKey)}</span>
      {badge ? (
        <span className={styles.badge} style={badgeColor ? { color: badgeColor } : undefined}>
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
}
