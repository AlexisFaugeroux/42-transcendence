import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { CoverArt } from './CoverArt';
import { KIND_COLOR, KIND_ICON, KIND_LABEL, type SavedSession } from './home.data';
import styles from './SavedSessionTile.module.scss';

export function SavedSessionTile({ session }: { session: SavedSession }): JSX.Element {
  const { t } = useTranslation();
  const color = KIND_COLOR[session.kind];

  return (
    <div className={styles.tile}>
      <div className={styles.top}>
        <CoverArt size={36} accent={color} icon={KIND_ICON[session.kind]} />
        <span className={styles.kind} style={{ color }}>
          {t(KIND_LABEL[session.kind])}
        </span>
      </div>
      <div className={styles.title}>{session.title}</div>
      <div className={styles.meta}>
        <span>
          {session.bpm ? t('home.saved.bpm', { bpm: session.bpm }) : '—'} · {session.key ?? t('home.saved.noKey')}
        </span>
        <span>{session.duration}</span>
      </div>
      <div className={styles.updated}>{session.updated}</div>
    </div>
  );
}
