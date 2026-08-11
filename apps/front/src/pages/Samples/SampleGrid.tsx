import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon, Tag, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { useSamplePlayer } from '../../contexts/SamplePlayerProvider';
import type { AudioFile } from '../../types/audioFile';
import { familyColor, formatBytes, formatDuration, formatKey } from './helpers';
import styles from './SampleGrid.module.scss';
import { SampleWaveform } from './SampleWaveform';

interface SampleGridProps {
  rows: AudioFile[];
  ownerId: string;
  onEdit: (sample: AudioFile) => void;
  onDownload: (sample: AudioFile) => void;
  onDelete: (sample: AudioFile) => void;
}

export function SampleGrid({ onDelete, onDownload, onEdit, ownerId, rows }: SampleGridProps): JSX.Element {
  const { i18n, t } = useTranslation();
  const locale = i18n.language;
  const player = useSamplePlayer();

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
              data-active={player.currentId === row.id}
              onClick={() => {
                player.toggle(row.id, `/audio/${row.url}`);
              }}
            >
              <MsnIcon name={player.currentId === row.id ? 'list' : 'play'} size="11px" />
            </button>
            <SampleWaveform id={row.id} peaksUrl={row.peaksUrl} height={36} />
          </div>

          <div className={styles.meta}>
            <span>{formatDuration(row.duration)}</span>
            <span>· {formatBytes(row.bytes, locale)}</span>
            {row.bpm ? <span>· {t('samples.bpm', { bpm: row.bpm })}</span> : null}
            {row.key ? <span className={styles.muted}>{formatKey(row.key)}</span> : null}
          </div>

          <div className={styles.actions}>
            <Button
              size="small"
              title={t('common.download')}
              onClick={() => {
                void onDownload(row);
              }}
            >
              <MsnIcon name="download" size="11px" /> {t('common.download')}
            </Button>
            {row.ownerId === ownerId ? (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    onEdit(row);
                  }}
                >
                  {t('common.edit')}
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    onDelete(row);
                  }}
                >
                  {t('common.delete')}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
