import { Badge, Input } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import { USER } from './home.data';
import { StatusAvatar } from './StatusAvatar';
import styles from './TopBar.module.scss';

export function TopBar(): JSX.Element {
  return (
    <header className={styles.bar}>
      <Link to="/" className={styles.brand}>
        <MsnIcon name="msn" size="18px" color="hsl(25, 90%, 55%)" />
        <MsnWordmark size={14} accent="hsl(25, 90%, 55%)" />
      </Link>

      <Input
        className={styles.search}
        variant="filled"
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder="Search sessions, samples, friends…"
      />

      <div className={styles.spacer} />

      <Badge count={3} size="small" color="hsl(25, 90%, 55%)">
        <button className={styles.iconButton} aria-label="Notifications">
          <MsnIcon name="bell" size="16px" />
        </button>
      </Badge>

      <button className={styles.user}>
        <StatusAvatar name={USER.name} size={26} status="online" />
        <span className={styles.userText}>
          <span className={styles.userName}>{USER.name}</span>
          <span className={styles.userHandle}>{USER.handle}</span>
        </span>
        <MsnIcon name="triangle" size="10px" color="hsl(0, 0%, 38%)" />
      </button>
    </header>
  );
}
