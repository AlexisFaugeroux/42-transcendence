import { formatDate } from '@transcendence/date';
import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import { trackMediaUrl } from '../../api/track/tracks';
import { useSamplePlayer } from '../../contexts/SamplePlayerProvider';
import type { Track } from '../../types/track';
import { VISIBILITY_LABEL } from '../Samples/constants';
import { SampleWaveform } from '../Samples/SampleWaveform';
import styles from './TrackList.module.scss';

interface TrackListProps {
  tracks: Track[];
}

function formatTrackDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function TrackList({ tracks }: TrackListProps): JSX.Element {
  const { t } = useTranslation();
  const player = useSamplePlayer();

  return (
    <div className={styles.list}>
      {tracks.map((track) => {
        const wavUrl = trackMediaUrl(track.url);
        const peaksUrl = trackMediaUrl(track.peaksUrl);
        const isActive = player.currentId === track.id;

        return (
          <div key={track.id} className={styles.row}>
            <button
              type="button"
              className={styles.play}
              data-active={isActive}
              aria-label={isActive && player.isPlaying ? t('tracks.pause') : t('tracks.play')}
              onClick={() => {
                player.toggle(track.id, wavUrl);
              }}
            >
              <MsnIcon name={isActive && player.isPlaying ? 'list' : 'play'} size="12px" />
            </button>

            <div>
              <div className={styles.title}>{track.title}</div>
              <div className={styles.meta}>
                <Tag>{t(VISIBILITY_LABEL[track.visibility])}</Tag>
                {track.bpm != null ? <span>{track.bpm} BPM</span> : null}
              </div>
            </div>

            <SampleWaveform id={track.id} peaksUrl={peaksUrl} height={30} />

            <span className={styles.mono}>{formatTrackDuration(track.duration)}</span>
            <span className={styles.mono}>{formatDate(track.createdAt, 'L')}</span>

            <a
              className={styles.download}
              href={wavUrl}
              download={`${track.title}.wav`}
              title={t('common.download')}
            >
              <MsnIcon name="download" size="14px" />
            </a>
          </div>
        );
      })}
    </div>
  );
}
