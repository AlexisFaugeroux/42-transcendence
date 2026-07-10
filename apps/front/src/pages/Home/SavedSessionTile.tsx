import type { JSX } from 'react';
import { CoverArt } from './CoverArt';
import { KIND_COLOR, KIND_ICON, type SavedSession } from './home.data';
import styles from './SavedSessionTile.module.scss';

export function SavedSessionTile({ session }: { session: SavedSession }): JSX.Element {
  const color = KIND_COLOR[session.kind];

  return (
    <div className={styles.tile}>
      <div className={styles.top}>
        <CoverArt size={36} accent={color} icon={KIND_ICON[session.kind]} />
        <span className={styles.kind} style={{ color }}>
          {session.kind}
        </span>
      </div>
      <div className={styles.title}>{session.title}</div>
      <div className={styles.meta}>
        <span>
          {session.bpm ? `${session.bpm} BPM` : '—'} · {session.key ?? 'no key'}
        </span>
        <span>{session.duration}</span>
      </div>
      <div className={styles.updated}>{session.updated}</div>
    </div>
  );
}
