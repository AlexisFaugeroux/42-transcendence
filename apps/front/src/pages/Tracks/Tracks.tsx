import { useTranslation } from '@transcendence/i18n';
import { Spin } from '@transcendence/ui';
import type { JSX } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { SamplePlayerProvider } from '../../contexts/SamplePlayerProvider';
import { useTracks } from '../../hooks/useTracks';
import { TrackList } from './TrackList';
import styles from './Tracks.module.scss';

export function Tracks(): JSX.Element {
  const { t } = useTranslation();
  const { data, error, isLoading } = useTracks();
  const tracks = data ?? [];

  return (
    <SamplePlayerProvider>
      <div className={styles.page}>
        <AppHeader active="tracks" />
        <div className={styles.container}>
          <div className={styles.titleRow}>
            <div>
              <div className={styles.eyebrow}>{t('tracks.eyebrow')}</div>
              <h1 className={styles.title}>{t('tracks.title')}</h1>
              <p className={styles.subtitle}>
                {isLoading ? '...' : t('tracks.count', { count: tracks.length })}
              </p>
            </div>
          </div>

          {isLoading ? (
            <Spin />
          ) : error ? (
            <p>{t('tracks.loadError')}</p>
          ) : tracks.length === 0 ? (
            <p>{t('tracks.empty')}</p>
          ) : (
            <TrackList tracks={tracks} />
          )}
        </div>
      </div>
    </SamplePlayerProvider>
  );
}
