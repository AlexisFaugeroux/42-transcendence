import type { JSX } from 'react';
import { SessionCard } from './SessionCard';
import styles from './SessionGrid.module.scss';
import type { Session } from './sessions.data';

interface SessionGridProps {
  rows: Session[];
  archived: boolean;
  onRename: (session: Session) => void;
  onDelete: (session: Session) => void;
}

export function SessionGrid({ archived, onDelete, onRename, rows }: SessionGridProps): JSX.Element {
  return (
    <div className={styles.grid}>
      {rows.map((session) => (
        <SessionCard key={session.id} session={session} archived={archived} onRename={onRename} onDelete={onDelete} />
      ))}
    </div>
  );
}
