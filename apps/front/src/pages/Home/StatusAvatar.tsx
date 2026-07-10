import { Avatar } from '@transcendence/ui';
import type { JSX } from 'react';
import { theme } from '@ui/theme/theme';
import type { PresenceStatus } from './home.data';

const STATUS_COLOR: Record<PresenceStatus, string> = {
  idle: 'hsl(45, 95%, 55%)',
  live: theme.purple,
  offline: 'hsl(0, 0%, 38%)',
  online: 'hsl(140, 65%, 45%)',
};

interface StatusAvatarProps {
  name: string;
  size?: number;
  status?: PresenceStatus;
}

export function StatusAvatar({ name, size = 24, status }: StatusAvatarProps): JSX.Element {
  const dot = Math.max(6, Math.round(size * 0.2));
  return (
    <span style={{ display: 'inline-flex', flexShrink: 0, position: 'relative' }}>
      <Avatar size={size} shape="square" style={{ fontSize: Math.round(size * 0.42) }}>
        {name.slice(0, 2).toUpperCase()}
      </Avatar>
      {status ? (
        <span
          style={{
            background: STATUS_COLOR[status],
            border: '2px solid hsl(197, 14%, 6%)',
            borderRadius: '50%',
            bottom: 0,
            boxShadow: status === 'live' ? `0 0 6px ${STATUS_COLOR.live}` : 'none',
            height: dot,
            position: 'absolute',
            right: 0,
            width: dot,
          }}
        />
      ) : null}
    </span>
  );
}
