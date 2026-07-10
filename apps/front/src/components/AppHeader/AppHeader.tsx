import { Avatar } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import styles from './AppHeader.module.scss';

export type AppHeaderKey = 'home' | 'sessions' | 'library' | 'settings';

interface HeaderLink {
  key: AppHeaderKey;
  label: string;
  to: string;
}

const LINKS: HeaderLink[] = [
  { key: 'home', label: 'Home', to: '/home' },
  { key: 'sessions', label: 'Sessions', to: '/sessions' },
  { key: 'library', label: 'Library', to: '/library' },
  { key: 'settings', label: 'Settings', to: '/settings' },
];

// Shared top header for the in-app pages (Home / Sessions / Library / Settings).
// The `active` prop drives which link is highlighted.
export function AppHeader({ active }: { active: AppHeaderKey }): JSX.Element {
  return (
    <header className={styles.header}>
      <Link to="/home" className={styles.brand}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} accent="var(--color-orange)" />
      </Link>

      <nav className={styles.nav}>
        {LINKS.map((link) => (
          <Link
            key={link.key}
            to={link.to}
            className={`${styles.navLink} ${active === link.key ? styles.navLinkActive : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.right}>
        <button className={styles.iconButton} aria-label="Notifications">
          <MsnIcon name="bell" size="16px" />
        </button>
        <div className={styles.user}>
          <Avatar size={28} shape="square">
            LM
          </Avatar>
          <span className={styles.handle}>@lex.moreau</span>
          <MsnIcon name="triangle" size="10px" color="var(--fg3)" />
        </div>
      </div>
    </header>
  );
}
