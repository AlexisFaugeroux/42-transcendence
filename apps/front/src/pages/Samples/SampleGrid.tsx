import { Button, MsnIcon, Tag, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { AudioFile } from '../../types/audioFile';
import { familyColor, formatBytes, formatDuration, formatKey } from './helpers';
import styles from './SampleGrid.module.scss';
import { WaveformPlaceholder } from './WaveformPlaceholder';

interface SampleGridProps {
  rows: AudioFile[];
  ownerId: string;
  playingId: string | null;
  onPlay: (id: string) => void;
  onEdit: (sample: AudioFile) => void;
  onDelete: (sample: AudioFile) => void;
}

export function SampleGrid({ onDelete, onEdit, onPlay, ownerId, playingId, rows }: SampleGridProps): JSX.Element {
  return (
    <div className={styles.grid}>
      {rows.map((row) => (
        <div key={row.id} className={styles.card}>
          <div className={styles.top}>
            <div className={styles.nameBox}>
              <div className={styles.nameLine}>
                <span className={styles.name}>{row.name}</span>
              </div>
            </div>
            <Tag
              color={familyColor(row.family)}
              style={{
                backgroundColor: theme.void,
                borderColor: familyColor(row.family),
              }}
            >
              {row.family ?? '—'}
            </Tag>
          </div>

          <div className={styles.player}>
            <button
              className={styles.play}
              data-active={playingId === row.id}
              onClick={() => {
                onPlay(row.id);
              }}
            >
              <MsnIcon name={playingId === row.id ? 'list' : 'play'} size="11px" />
            </button>
            <WaveformPlaceholder seed={row.id} color={theme.fg1} height={36} />
          </div>

          <div className={styles.meta}>
            <span>{formatDuration(row.duration)}</span>
            <span>· {formatBytes(row.bytes)}</span>
            {row.bpm ? <span>· {row.bpm} BPM</span> : null}
            {row.key ? <span className={styles.muted}>{formatKey(row.key)}</span> : null}
          </div>

          {row.ownerId === ownerId ? (
            <div className={styles.actions}>
              <Button
                size="small"
                onClick={() => {
                  onEdit(row);
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                danger
                onClick={() => {
                  onDelete(row);
                }}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
