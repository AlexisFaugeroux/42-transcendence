import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import {
  Button,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MsnIcon,
  notification,
  Result,
  Spin,
  theme,
} from '@transcendence/ui';
import { type JSX, type Key, useMemo, useState } from 'react';
import { deleteSample, getSamples, getStorageUsage } from '../../api/audioFile/audioFile';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { SamplePlayerProvider } from '../../contexts/SamplePlayerProvider';
import type { AudioFile, Family, Kind } from '../../types/audioFile';
import { SAMPLE_COMPARATORS } from './constants';
import { DeleteSampleModal, type DeleteTarget } from './DeleteSampleModal';
import { EditSampleModal } from './EditSampleModal';
import { EmptyState } from './EmptyState';
import { formatBytes } from './helpers';
import { SampleGrid } from './SampleGrid';
import styles from './Samples.module.scss';
import { SampleTable } from './SampleTable';
import { SelectionBar } from './SelectionBar';
import { StorageBar } from './StorageBar';
import { Toolbar, type ViewMode } from './Toolbar';
import type { SortKey } from './types';
import { UploadModal } from './UploadModal';

export function Samples(): JSX.Element {
  const user = useAuthUser();
  const queryClient = useQueryClient();
  const { i18n, t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [query, setQuery] = useState('');
  const [families, setFamilies] = useState<Family[]>([]);
  const [kinds, setKinds] = useState<Kind[]>([]);
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('recent');
  const [view, setView] = useState<ViewMode>('list');
  const [confirmDelete, setConfirmDelete] = useState<DeleteTarget>(null);
  const [editTarget, setEditTarget] = useState<AudioFile | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const notifySuccess = (message: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CheckCircleOutlined style={{ color: theme.green }} />,
      message,
    });
  };

  const notifyError = (message: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CloseCircleOutlined style={{ color: theme.red }} />,
      message,
    });
  };

  const samplesQuery = useQuery({
    queryFn: () => getSamples({ visibilities: ['PUBLIC', 'PRIVATE', 'SHARED'] }),
    queryKey: ['samples', user.id],
  });

  const storageQuery = useQuery({
    queryFn: getStorageUsage,
    queryKey: ['audio-storage', user.id],
  });

  const samples = useMemo(
    () => (samplesQuery.data ?? []).filter((sample) => sample.kind !== 'TRACK'),
    [samplesQuery.data],
  );
  const storage = storageQuery.data;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return samples
      .filter((sample) => !families.length || (sample.family !== null && families.includes(sample.family)))
      .filter((sample) => !kinds.length || (sample.kind !== null && kinds.includes(sample.kind)))
      .filter((sample) => !needle || sample.name.toLowerCase().includes(needle))
      .sort(SAMPLE_COMPARATORS[sort]);
  }, [samples, families, kinds, query, sort]);

  const invalidateLibrary = async (): Promise<void> => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['samples', user.id] }),
      queryClient.invalidateQueries({ queryKey: ['audio-storage', user.id] }),
    ]);
  };

  const { isPending: isDeleting, mutate: deleteSamples } = useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(ids.map((id) => deleteSample(id)));

      return ids.filter((_, index) => results[index].status === 'rejected');
    },
    onError: (error) => {
      notifyError(t('samples.delete.failedTitle'), error.message);
    },
    onSettled: invalidateLibrary,
    onSuccess: (failedIds, ids) => {
      if (failedIds.length) {
        setSelectedKeys(failedIds);
        notifyError(
          t('samples.delete.failedTitle'),
          t('samples.delete.partialFailure', { kept: failedIds.length, total: ids.length }),
        );
        return;
      }

      setSelectedKeys([]);
      notifySuccess(t('samples.delete.successTitle'), t('samples.delete.successDescription', { count: ids.length }));
    },
  });

  const clearFilters = (): void => {
    setQuery('');
    setFamilies([]);
    setKinds([]);
    setFavOnly(false);
  };

  const confirmDeletion = (): void => {
    if (confirmDelete === null) return;

    const ids = confirmDelete === 'selection' ? selectedKeys.map((key) => String(key)) : [confirmDelete.id];

    setConfirmDelete(null);
    if (ids.length) deleteSamples(ids);
  };

  const retry = (): void => {
    void samplesQuery.refetch();
    void storageQuery.refetch();
  };

  const isLoading = samplesQuery.isLoading || storageQuery.isLoading;
  const error = samplesQuery.error ?? storageQuery.error;

  return (
    <SamplePlayerProvider>
      <div className={styles.page}>
        {notificationContext}
        <AppHeader active="library" />
        <div className={styles.container}>
          <div className={styles.titleRow}>
            <div>
              <div className={styles.eyebrow}>{t('samples.eyebrow')}</div>
              <h1 className={styles.title}>{t('samples.title')}</h1>
              <p className={styles.subtitle}>
                {t('samples.soundCount', { count: samples.length })}
                {storage
                  ? ` · ${t('samples.storageSummary', {
                      quota: formatBytes(storage.quotaBytes, i18n.language),
                      used: formatBytes(storage.usedBytes, i18n.language),
                    })}`
                  : null}
              </p>
            </div>
            <div className={styles.actions}>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setUploadOpen(true);
                }}
                style={{
                  backgroundColor: theme.orange,
                }}
              >
                <MsnIcon name="plus" size="13px" /> {t('samples.addSample')}
              </Button>
            </div>
          </div>

          {isLoading ? (
            <Spin size="large" />
          ) : error ? (
            <Result
              status="error"
              title={t('samples.loadError')}
              subTitle={error.message}
              extra={
                <Button type="primary" onClick={retry}>
                  {t('common.retry')}
                </Button>
              }
            />
          ) : (
            <>
              {storage ? <StorageBar usage={storage} /> : null}

              <Toolbar
                query={query}
                setQuery={setQuery}
                families={families}
                setFamilies={setFamilies}
                kinds={kinds}
                setKinds={setKinds}
                favOnly={favOnly}
                setFavOnly={setFavOnly}
                sort={sort}
                setSort={setSort}
                view={view}
                setView={setView}
                shownCount={filtered.length}
                totalCount={samples.length}
              />

              {selectedKeys.length > 0 && (
                <SelectionBar
                  count={selectedKeys.length}
                  onClear={() => {
                    setSelectedKeys([]);
                  }}
                  onDelete={() => {
                    setConfirmDelete('selection');
                  }}
                />
              )}

              {filtered.length === 0 ? (
                <EmptyState onClear={clearFilters} />
              ) : view === 'list' ? (
                <SampleTable
                  rows={filtered}
                  ownerId={user.ownerId}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  onEdit={setEditTarget}
                  onDelete={(sample) => {
                    setConfirmDelete(sample);
                  }}
                />
              ) : (
                <SampleGrid
                  rows={filtered}
                  ownerId={user.ownerId}
                  onEdit={setEditTarget}
                  onDelete={(sample) => {
                    setConfirmDelete(sample);
                  }}
                />
              )}
            </>
          )}
        </div>

        <DeleteSampleModal
          target={confirmDelete}
          selectedCount={selectedKeys.length}
          confirmLoading={isDeleting}
          onCancel={() => {
            setConfirmDelete(null);
          }}
          onConfirm={confirmDeletion}
        />
        <EditSampleModal
          target={editTarget}
          onCancel={() => {
            setEditTarget(null);
          }}
          onSaved={invalidateLibrary}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
        <UploadModal
          open={uploadOpen}
          onClose={() => {
            setUploadOpen(false);
          }}
          onUploaded={invalidateLibrary}
          usedBytes={storage?.usedBytes ?? 0}
          quotaBytes={storage?.quotaBytes ?? 0}
        />
      </div>
    </SamplePlayerProvider>
  );
}
