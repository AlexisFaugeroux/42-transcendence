import type { JSX } from 'react';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import type { User } from '../../types/user'; 
import styles from './UserRows.module.scss';

export function LiveUserRow({ user }: { user: User }): JSX.Element {
  return (
    <div className={styles.row}>
      <StatusAvatar name={user.name} size={24} status="live" />
      <div className={styles.body}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.live}>{user.activity}</div>
      </div>
      <div className={styles.listeners}>{user.listeners} ◉</div>
    </div>
  );
}

export function OnlineUserRow({ user }: { user: User }): JSX.Element {
  return (
    <div className={styles.row}>
      <StatusAvatar name={user.name} size={24} status={user.status} />
      <div className={styles.body}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.activity}>{user.activity}</div>
      </div>
    </div>
  );
}
