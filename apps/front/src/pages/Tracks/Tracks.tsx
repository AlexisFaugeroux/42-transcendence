import { useTranslation } from '@transcendence/i18n';
import { CheckCircleOutlined, CloseCircleOutlined, notification, Spin } from '@transcendence/ui';
import { type JSX, useMemo, useState } from 'react';
import { SamplePlayerProvider } from '../../contexts/SamplePlayerProvider';
import { useDeleteTrack, useTracks, useUpdateTrack } from '../../hooks/useTracks';
import type { Visibility } from '../../types/sample';
import type { Track } from '../../types/track';
import { TRACK_COMPARATORS, type TrackSortKey, type VisibilityFilter } from './constants';
import { DeleteTrackModal } from './DeleteTrackModal';
import { EditTrackModal } from './EditTrackModal';
import { NoResults } from './NoResults';
import { Toolbar } from './Toolbar';
import { TrackList } from './TrackList';
import styles from './Tracks.module.scss';

export function Tracks(): JSX.Element {
  const { t } = useTranslation();
  const { data, error, isLoading } = useTracks();
  const tracks = data ?? [];
  const [query, setQuery] = useState('');
  const [visibility, setVisibility] = useState<VisibilityFilter>('all');
  const [sort, setSort] = useState<TrackSortKey>('recent');
  const [editTarget, setEditTarget] = useState<Track | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Track | null>(null);
  const [notificationApi, notificationContext] = notification.useNotification();
  const updateTrack = useUpdateTrack();
  const deleteTrack = useDeleteTrack();

  const filtered = useMemo(() => {
    const list = data ?? [];
    const needle = query.trim().toLowerCase();

    return list
      .filter((track) => visibility === 'all' || track.visibility === visibility)
      .filter((track) => {
        if (!needle) return true;
        const description = (track.description ?? '').toLowerCase();
        return track.title.toLowerCase().includes(needle) || description.includes(needle);
      })
      .sort(TRACK_COMPARATORS[sort]);
  }, [data, query, visibility, sort]);

  const clearFilters = (): void => {
    setQuery('');
    setVisibility('all');
    setSort('recent');
  };

  const notifySuccess = (message: string, description: string): void => {
    notificationApi.success({ description, icon: <CheckCircleOutlined />, message });
  };

  const notifyError = (message: string, description: string): void => {
    notificationApi.error({ description, icon: <CloseCircleOutlined />, message });
  };

  const onVisibilityChange = (track: Track, nextVisibility: Visibility): void => {
    updateTrack.mutate(
      { fields: { visibility: nextVisibility }, id: track.id },
      {
        onError: (err) => {
          notifyError(t('tracks.updateError'), err.message);
        },
      },
    );
  };

  const confirmDeletion = (): void => {
    if (!deleteTarget) return;

    const title = deleteTarget.title;
    deleteTrack.mutate(deleteTarget.id, {
      onError: (err) => {
        notifyError(t('tracks.delete.errorTitle'), err.message);
      },
      onSuccess: () => {
        notifySuccess(
          t('tracks.delete.successTitle'),
          t('tracks.delete.successDescription', { title }),
        );
        setDeleteTarget(null);
      },
    });
  };

  return (
    <SamplePlayerProvider>
      {notificationContext}
      <div className={styles.page}>
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
            <>
              <Toolbar
                query={query}
                setQuery={setQuery}
                visibility={visibility}
                setVisibility={setVisibility}
                sort={sort}
                setSort={setSort}
                shownCount={filtered.length}
                totalCount={tracks.length}
              />
              {filtered.length === 0 ? (
                <NoResults onClear={clearFilters} />
              ) : (
                <TrackList
                  tracks={filtered}
                  onDelete={setDeleteTarget}
                  onEdit={setEditTarget}
                  onVisibilityChange={onVisibilityChange}
                />
              )}
            </>
          )}
        </div>
      </div>

      <EditTrackModal
        target={editTarget}
        onCancel={() => {
          setEditTarget(null);
        }}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />

      <DeleteTrackModal
        target={deleteTarget}
        confirmLoading={deleteTrack.isPending}
        onCancel={() => {
          setDeleteTarget(null);
        }}
        onConfirm={confirmDeletion}
      />
    </SamplePlayerProvider>
  );
}
