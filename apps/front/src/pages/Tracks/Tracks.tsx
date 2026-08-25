import { useTranslation } from '@transcendence/i18n';
import { CheckCircleOutlined, CloseCircleOutlined, notification, Spin } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { SamplePlayerProvider } from '../../contexts/SamplePlayerProvider';
import { useDeleteTrack, useTracks, useUpdateTrack } from '../../hooks/useTracks';
import type { Visibility } from '../../types/sample';
import type { Track } from '../../types/track';
import { DeleteTrackModal } from './DeleteTrackModal';
import { EditTrackModal } from './EditTrackModal';
import { TrackList } from './TrackList';
import styles from './Tracks.module.scss';

export function Tracks(): JSX.Element {
  const { t } = useTranslation();
  const { data, error, isLoading } = useTracks();
  const tracks = data ?? [];
  const [editTarget, setEditTarget] = useState<Track | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Track | null>(null);
  const [notificationApi, notificationContext] = notification.useNotification();
  const updateTrack = useUpdateTrack();
  const deleteTrack = useDeleteTrack();

  const notifySuccess = (message: string, description: string): void => {
    notificationApi.success({ description, icon: <CheckCircleOutlined />, message });
  };

  const notifyError = (message: string, description: string): void => {
    notificationApi.error({ description, icon: <CloseCircleOutlined />, message });
  };

  const onVisibilityChange = (track: Track, visibility: Visibility): void => {
    updateTrack.mutate(
      { fields: { visibility }, id: track.id },
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
            <TrackList
              tracks={tracks}
              onDelete={setDeleteTarget}
              onEdit={setEditTarget}
              onVisibilityChange={onVisibilityChange}
            />
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
