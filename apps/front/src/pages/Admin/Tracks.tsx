import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@transcendence/date';
import { useTranslation } from '@transcendence/i18n';
import {
  Button,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  Input,
  MsnIcon,
  notification,
  Popconfirm,
  Table,
  type TableColumnType,
  Tag,
  theme,
  Tooltip,
} from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { getAdminTracks } from '../../api/admin/admin';
import { useDeleteTrack } from '../../hooks/useTracks';
import type { Visibility } from '../../types/sample';
import type { Track } from '../../types/track';
import { PAGE_SIZE } from '../constants';
import { VISIBILITY_LABEL } from '../Samples/constants';
import styles from './Tracks.module.scss';

export function Tracks(): JSX.Element {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();
  const deleteTrack = useDeleteTrack();

  const notifySuccess = (title: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CheckCircleOutlined style={{ color: theme.green }} />,
      title,
    });
  };

  const notifyError = (title: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CloseCircleOutlined style={{ color: theme.red }} />,
      title,
    });
  };

  const { data, isLoading } = useQuery({
    queryFn: () => getAdminTracks(page, PAGE_SIZE, debouncedQ),
    queryKey: ['admin', 'tracks', page, PAGE_SIZE, debouncedQ],
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const list = data?.items ?? [];
  const total = data?.total ?? 0;

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(query.trim());
      setPage(1);
    }, 300);

    return () => {
      window.clearTimeout(id);
    };
  }, [query]);

  const confirmDeletion = (track: Track): void => {
    deleteTrack.mutate(track.id, {
      onError: (error) => {
        notifyError(t('admin.tracks.delete.failedTitle'), error.message);
      },
      onSuccess: () => {
        notifySuccess(
          t('admin.tracks.delete.deletedTitle'),
          t('admin.tracks.delete.deletedDescription', { title: track.title }),
        );
        void queryClient.invalidateQueries({ queryKey: ['admin', 'tracks'] });
      },
    });
  };

  const columns: TableColumnType<Track>[] = [
    {
      dataIndex: 'title',
      title: t('admin.tracks.table.title'),
    },
    {
      dataIndex: 'owner',
      title: t('admin.tracks.table.owner'),
      render: (owner: Track['owner']) =>
        owner ? (
          <div className={styles.owner}>
            <span>{owner.artistName}</span>
            <span className={styles.handle}>@{owner.handle}</span>
          </div>
        ) : (
          <span className={styles.handle}>{t('admin.tracks.table.unknownOwner')}</span>
        ),
    },
    {
      dataIndex: 'visibility',
      title: t('admin.tracks.table.visibility'),
      width: 120,
      render: (visibility: Visibility) => <Tag>{t(VISIBILITY_LABEL[visibility])}</Tag>,
    },
    {
      dataIndex: 'createdAt',
      title: t('admin.tracks.table.createdAt'),
      width: 160,
      render: (value: string) => formatDate(value),
    },
    {
      align: 'center',
      key: 'actions',
      title: t('admin.tracks.table.actions'),
      width: 90,
      render: (_, row) => (
        <Popconfirm
          title={t('admin.tracks.delete.title')}
          description={t('admin.tracks.delete.body', { title: row.title })}
          okText={t('common.delete')}
          okButtonProps={{ danger: true }}
          cancelText={t('common.cancel')}
          onConfirm={() => {
            confirmDeletion(row);
          }}
        >
          <Tooltip title={t('common.delete')}>
            <Button type="text" size="small" danger aria-label={t('common.delete')}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      {notificationContext}
      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          allowClear
          prefix={<MsnIcon name="search" size="13px" />}
          placeholder={t('admin.tracks.searchPlaceholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
          onChange: setPage,
        }}
        rowKey="id"
        loading={isLoading || deleteTrack.isPending}
      />
    </>
  );
}
