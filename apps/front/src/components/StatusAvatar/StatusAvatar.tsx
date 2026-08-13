import { Avatar, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { PresenceStatus } from '../../types/presence';
import styles from './StatusAvatar.module.scss';

const STATUS_COLOR: Record<PresenceStatus, string> = {
  offline: theme.fg3,
  online: theme.green,
};

interface StatusAvatarProps {
  name: string;
  size?: number;
  status?: PresenceStatus;
}

export function StatusAvatar({ name, size = 24, status }: StatusAvatarProps): JSX.Element {
  const dot = Math.max(6, Math.round(size * 0.2));

  return (
    <span className={styles.wrap}>
      <Avatar size={size} shape="square" style={{ fontSize: Math.round(size * 0.42) }}>
        {name.slice(0, 2).toUpperCase()}
      </Avatar>
      {status ? (
        <span
          className={styles.dot}
          style={{
            background: STATUS_COLOR[status],
            height: dot,
            width: dot,
          }}
        />
      ) : null}
    </span>
  );
}
