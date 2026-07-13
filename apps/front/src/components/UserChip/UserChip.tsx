import type { JSX } from 'react';
import type { PresenceStatus } from '../../pages/Home/home.data';
import { StatusAvatar } from '../../pages/Home/StatusAvatar';
import styles from './UserChip.module.scss';

interface UserChipProps {
  avatarName: string;
  name: string;
  handle: string;
  size?: number;
  status?: PresenceStatus;
}

export function UserChip({ avatarName, handle, name, size = 26, status }: UserChipProps): JSX.Element {
  return (
    <span className={styles.chip}>
      <StatusAvatar name={avatarName} size={size} status={status} />
      <span className={styles.text}>
        <span className={styles.name}>{name}</span>
        <span className={styles.handle}>@{handle}</span>
      </span>
    </span>
  );
}
