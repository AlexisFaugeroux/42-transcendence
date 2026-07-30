import { useTranslation } from '@transcendence/i18n';
import {
  Button,
  DeleteOutlined,
  EditOutlined,
  MsnIcon,
  Table,
  type TableColumnsType,
  Tag,
  theme,
} from '@transcendence/ui';
import type { JSX, Key } from 'react';
import type { AudioFile } from '../../types/audioFile';
import { MODE_ABBR } from './constants';
import { familyColor, formatBytes, formatDuration, formatKey, formatKind } from './helpers';
import styles from './SampleTable.module.scss';
import { WaveformPlaceholder } from './WaveformPlaceholder';

interface SampleTableProps {
  rows: AudioFile[];
  ownerId: string;
  selectedKeys: Key[];
  onSelectionChange: (keys: Key[]) => void;
  playingId: string | null;
  onPlay: (id: string) => void;
  onEdit: (sample: AudioFile) => void;
  onDelete: (sample: AudioFile) => void;
}

export function SampleTable({
  onDelete,
  onEdit,
  onPlay,
  onSelectionChange,
  ownerId,
  playingId,
  rows,
  selectedKeys,
}: SampleTableProps): JSX.Element {
  const { i18n, t } = useTranslation();
  const locale = i18n.language;

  const columns: TableColumnsType<AudioFile> = [
    {
      key: 'play',
      render: (_, row) => (
        <button
          className={styles.play}
          data-active={playingId === row.id}
          onClick={() => {
            onPlay(row.id);
          }}
        >
          <MsnIcon name={playingId === row.id ? 'list' : 'play'} size="11px" />
        </button>
      ),
      title: '',
      width: 48,
    },
    {
      key: 'name',
      render: (_, row) => (
        <div>
          <div className={styles.nameLine}>
            <span className={styles.name}>{row.name}</span>
          </div>
          <div className={styles.meta}>
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
        </div>
      ),
      title: t('samples.table.name'),
    },
    {
      key: 'waveform',
      render: (_, row) => <WaveformPlaceholder seed={row.id} color={theme.fg1} />,
      title: t('samples.table.waveform'),
      width: 220,
    },
    {
      key: 'bpm',
      render: (_, row) => <span className={styles.mono}>{row.bpm ?? '—'}</span>,
      title: t('samples.table.bpm'),
      width: 70,
    },
    {
      key: 'key',
      render: (_, row) => (
        <span className={styles.mono}>
          {row.key ? formatKey(row.key) : '—'}
          {row.key && row.mode ? <span className={styles.muted}> {t(MODE_ABBR[row.mode])}</span> : null}
        </span>
      ),
      title: t('samples.table.key'),
      width: 90,
    },
    {
      key: 'duration',
      render: (_, row) => <span className={styles.mono}>{formatDuration(row.duration)}</span>,
      title: t('samples.table.length'),
      width: 80,
    },
    {
      key: 'bytes',
      render: (_, row) => <span className={styles.mono}>{formatBytes(row.bytes, locale)}</span>,
      title: t('samples.table.size'),
      width: 90,
    },
    {
      key: 'kind',
      render: (_, row) => <Tag>{row.kind ? formatKind(row.kind) : '—'}</Tag>,
      title: t('samples.table.type'),
      width: 90,
    },
    {
      align: 'right',
      key: 'actions',
      render: (_, row) => (
        <div className={styles.actions}>
          {row.ownerId === ownerId ? (
            <Button
              type="text"
              size="small"
              title={t('common.edit')}
              onClick={() => {
                onEdit(row);
              }}
            >
              <EditOutlined />
            </Button>
          ) : null}
          <Button type="text" size="small" title={t('common.download')}>
            <MsnIcon name="download" size="12px" />
          </Button>
          {row.ownerId === ownerId ? (
            <Button
              type="text"
              size="small"
              danger
              title={t('common.delete')}
              onClick={() => {
                onDelete(row);
              }}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </div>
      ),
      title: t('samples.table.actions'),
      width: 120,
    },
  ];

  return (
    <Table
      className={styles.table}
      rowKey="id"
      columns={columns}
      dataSource={rows}
      pagination={false}
      size="small"
      rowSelection={{
        getCheckboxProps: (row) => ({ disabled: row.ownerId !== ownerId }),
        onChange: onSelectionChange,
        selectedRowKeys: selectedKeys,
      }}
    />
  );
}
