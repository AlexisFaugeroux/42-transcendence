import type { JSX } from 'react';
import type { OnlineUser } from './home.data';
import { StatusAvatar } from './StatusAvatar';
import styles from './UserRows.module.scss';

export function LiveUserRow({ user }: { user: OnlineUser }): JSX.Element {
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

export function OnlineUserRow({ user }: { user: OnlineUser }): JSX.Element {
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
