import { useAuthUser, usePermission } from '@transcendence/auth';
import { Permissions } from '@transcendence/permissions';
import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { useFollowing } from '../hooks/useProducers';
import { useTracks } from '../hooks/useTracks';
import styles from './LeftNav.module.scss';
import { NavItem } from './NavItem';
import { ADMIN_ITEMS, SOCIAL_ITEMS, WORKSPACE_ITEMS, type NavItemDef } from './navItems';

function filterItems(items: NavItemDef[], access: Record<string, boolean>): NavItemDef[] {
  return items.filter((item) => !item.permission || access[item.permission]);
}

export function LeftNav(): JSX.Element {
  const { t } = useTranslation();
  const me = useAuthUser();
  const { data: following } = useFollowing(me.handle);
  const { data: tracks } = useTracks();
  const access = {
    [Permissions.CHAT_ACCESS]: usePermission(Permissions.CHAT_ACCESS),
    [Permissions.MANAGE_ACCOUNTS]: usePermission(Permissions.MANAGE_ACCOUNTS),
    [Permissions.SAMPLE_WRITE]: usePermission(Permissions.SAMPLE_WRITE),
    [Permissions.STUDIO_ACCESS]: usePermission(Permissions.STUDIO_ACCESS),
    [Permissions.TRACK_WRITE]: usePermission(Permissions.TRACK_WRITE),
  };
  const workspaceItems = filterItems(WORKSPACE_ITEMS, access);
  const socialItems = filterItems(SOCIAL_ITEMS, access);
  const adminItems = filterItems(ADMIN_ITEMS, access);

  return (
    <nav className={styles.nav}>
      <div className={styles.sectionLabel}>{t('nav.workspace')}</div>
      {workspaceItems.map((item) => (
        <NavItem
          key={item.to}
          {...item}
          badge={item.to === '/tracks' ? String(tracks?.length ?? 0) : item.badge}
        />
      ))}

      <div className={styles.gap} />
      <div className={styles.sectionLabel}>{t('nav.social')}</div>
      {socialItems.map((item) => (
        <NavItem
          key={item.to}
          {...item}
          badge={item.to === '/following' ? String(following?.total ?? 0) : item.badge}
        />
      ))}

      {adminItems.length > 0 ? (
        <>
          <div className={styles.gap} />
          <div className={styles.sectionLabel}>{t('nav.administration')}</div>
          {adminItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </>
      ) : null}

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
