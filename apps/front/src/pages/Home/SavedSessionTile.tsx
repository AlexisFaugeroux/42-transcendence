import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { CoverArt } from './CoverArt';
import { KIND_COLOR, KIND_ICON, KIND_LABEL, type SavedSession } from './home.data';
import styles from './SavedSessionTile.module.scss';
import type { Session } from '../Sessions/sessions.data';
import { Button } from '@transcendence/ui';

interface SavedSessionParams  {
  session : Session
  onOpen : (session: Session) => void
}

export function SavedSessionTile( { session, onOpen } : SavedSessionParams ): JSX.Element {
  const { t } = useTranslation();
  const color = KIND_COLOR['production'];

  return (
    <div className={styles.tile}>
      <div className={styles.top}>
        <CoverArt size={36} accent={color} icon={KIND_ICON['production']} />
        <span className={styles.kind} style={{ color }}>
          {t(KIND_LABEL['production'])}
        </span>
      </div>
      <div className={styles.title}>{session.name}</div>
      <div className={styles.meta}>
        <span>
          {session.bpm ? t('home.saved.bpm', { bpm: session.bpm }) : '—'} · {session.key ?? t('home.saved.noKey')}
        </span>
        <span>{session.duration}</span>
      </div>
      <div className={styles.updated}>{session.updatedAt}</div>
    <Button onClick={ () => {onOpen(session)}}> Open in studio </Button>
    </div>
  );
}
