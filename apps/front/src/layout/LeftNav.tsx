import { useAuthUser, useIsAllowed } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { useFollowing } from '../hooks/useProducers';
import { useSavedSessions } from '../hooks/useSavedSessions';
import { useTracks } from '../hooks/useTracks';
import { useLikedTracks } from '../hooks/useTracks';
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
  const { data: liked } = useLikedTracks();
  const unreadMessagesCount = useUnreadMessagesCount();
  const isAllowed = useIsAllowed();

  const isVisible = (navItems: NavItemDef[]) =>
    navItems.filter((item) => !item.permission || isAllowed(item.permission));

  const admin = isVisible(ADMIN_ITEMS);
  const workspace = isVisible(WORKSPACE_ITEMS);
  const social = isVisible(SOCIAL_ITEMS);

  const badges: Record<NavItemDef['to'], number | undefined> = {
    '/tracks': tracks?.length,
    '/sessions': sessions?.length,
    '/following': following?.total,
    '/messages': unreadMessagesCount,
    '/liked': liked?.total,
  };

  return (
    <nav className={styles.nav}>
      {admin.length > 0 && (
        <>
          <div className={styles.sectionLabel}>{t('nav.administration')}</div>
          {admin.map((item) => (
            <NavItem key={item.to} {...item} badge={badges[item.to]} />
          ))}
        </>
      )}

      {workspace.length > 0 && (
        <>
          <div className={styles.gap} />
          <div className={styles.sectionLabel}>{t('nav.workspace')}</div>
          {workspace.map((item) => (
            <NavItem key={item.to} {...item} badge={badges[item.to]} />
          ))}
        </>
      )}

      {social.length > 0 && (
        <>
          <div className={styles.gap} />
          <div className={styles.sectionLabel}>{t('nav.social')}</div>
          {social.map((item) => (
            <NavItem key={item.to} {...item} badge={badges[item.to]} />
          ))}
        </>
      )}
    </nav>
  );
}
