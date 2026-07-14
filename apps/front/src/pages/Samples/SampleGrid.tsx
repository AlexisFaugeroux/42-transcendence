import { Button, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { theme } from '@ui/theme/theme';
import styles from './SampleGrid.module.scss';
import { FAMILY_COLOR, formatMB, type Sample } from './samples.data';
import { WaveformPlaceholder } from './WaveformPlaceholder';

interface SampleGridProps {
  rows: Sample[];
  playingId: number | null;
  onPlay: (id: number) => void;
  onDelete: (sample: Sample) => void;
}

export function SampleGrid({ onDelete, onPlay, playingId, rows }: SampleGridProps): JSX.Element {
  return (
    <div className={styles.grid}>
      {rows.map((row) => (
        <div key={row.id} className={styles.card}>
          <div className={styles.top}>
            <div className={styles.nameBox}>
              <div className={styles.nameLine}>
                {row.fav ? <MsnIcon name="heart" size="11px" color={theme.orange} /> : null}
                <span className={styles.name}>{row.name}</span>
              </div>
              <div className={styles.pack}>{row.pack}</div>
            </div>
            <Tag color={FAMILY_COLOR[row.family]}>{row.family}</Tag>
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
            <WaveformPlaceholder seed={row.seed} color={FAMILY_COLOR[row.family]} height={36} />
          </div>

          <div className={styles.meta}>
            <span>{row.dur}</span>
            <span>· {formatMB(row.size)}</span>
            {row.bpm ? <span>· {row.bpm} BPM</span> : null}
            {row.key ? <span className={styles.muted}>{row.key}</span> : null}
          </div>

          <div className={styles.tags}>
            {row.tags.map((t) => (
              <Tag key={t}>#{t}</Tag>
            ))}
          </div>

          <div className={styles.actions}>
            <Button size="small">
              <MsnIcon name="plus" size="11px" /> To session
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
        </div>
      ))}
    </div>
  );
}
