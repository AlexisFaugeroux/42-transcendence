import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import styles from './TopNav.module.scss';

// No pages for these yet — placeholder anchors until those sections exist.
const NAV_LINKS = ['Features', 'Make beats', 'Stream', 'Community', 'Manuals'];

export function TopNav(): JSX.Element {
  return (
    <header className={styles.nav}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand}>
          <MsnIcon name="msn" size="22px" color="hsl(25, 90%, 55%)" />
          <MsnWordmark size={16} accent="hsl(25, 90%, 55%)" />
        </Link>

        <nav className={styles.links}>
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className={styles.link}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
          <Link to="/register">
            <Button type="primary">Sign up free</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
