import type { JSX } from 'react';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import type { UserOnlineStatus } from '../../types/user';
import styles from './UserRows.module.scss';

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
