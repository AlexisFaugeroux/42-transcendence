import { Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import type { SessionType } from './home.data';
import styles from './SessionCard.module.scss';

export function SessionCard({ blurb, color, icon, meta, title }: SessionType): JSX.Element {
  return (
    <button
      className={styles.card}
      onClick={() => {
        window.location.href = import.meta.env.VITE_STUDIO_URL;
      }}
    >
      <div className={styles.top}>
        <div className={styles.iconBox} style={{ color }}>
          <MsnIcon name={icon} size="22px" />
        </div>
        <MsnIcon name="arrowR" size="18px" color="hsl(0, 0%, 38%)" />
      </div>
      <div>
        <div className={styles.title}>{title}</div>
        <p className={styles.blurb}>{blurb}</p>
      </div>
      <div className={styles.tags}>
        {meta.map((m) => (
          <Tag key={m} color={color}>
            {m}
          </Tag>
        ))}
      </div>
    </button>
  );
}
