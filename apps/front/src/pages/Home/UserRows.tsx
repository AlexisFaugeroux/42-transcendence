import type { JSX } from 'react';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import type { UserOnlineStatus } from '../../types/user';
import type { LiveProducer } from './home.data';
import styles from './UserRows.module.scss';

export function LiveUserRow({ user }: { user: LiveProducer }): JSX.Element {
  return (
    <div className={styles.row}>
      <StatusAvatar name={user.artistName} size={24} status="live" />
      <div className={styles.body}>
        <div className={styles.name}>{user.artistName}</div>
        <div className={styles.live}>{user.activity}</div>
      </div>
      <div className={styles.listeners}>{user.listeners} ◉</div>
    </div>
  );
}

export function OnlineUserRow({ user }: { user: UserOnlineStatus }): JSX.Element {
  return (
    <div className={styles.row}>
      <StatusAvatar name={user.artistName} size={24} status={user.status} />
      <div className={styles.body}>
        <div className={styles.name}>{user.artistName}</div>
        <div className={styles.activity}>{user.handle}</div>
      </div>
    </div>
  );
}
