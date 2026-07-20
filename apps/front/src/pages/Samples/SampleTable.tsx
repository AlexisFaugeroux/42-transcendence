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
      title: 'Name',
    },
    {
      key: 'waveform',
      render: (_, row) => <WaveformPlaceholder seed={row.id} color={theme.fg1} />,
      title: 'Waveform',
      width: 220,
    },
    {
      key: 'bpm',
      render: (_, row) => <span className={styles.mono}>{row.bpm ?? '—'}</span>,
      title: 'BPM',
      width: 70,
    },
    {
      key: 'key',
      render: (_, row) => (
        <span className={styles.mono}>
          {row.key ? formatKey(row.key) : '—'}
          {row.key && row.mode ? <span className={styles.muted}> {row.mode === 'MAJOR' ? 'maj' : 'min'}</span> : null}
        </span>
      ),
      title: 'Key',
      width: 90,
    },
    {
      key: 'duration',
      render: (_, row) => <span className={styles.mono}>{formatDuration(row.duration)}</span>,
      title: 'Length',
      width: 80,
    },
    {
      key: 'bytes',
      render: (_, row) => <span className={styles.mono}>{formatBytes(row.bytes)}</span>,
      title: 'Size',
      width: 90,
    },
    {
      key: 'kind',
      render: (_, row) => <Tag>{row.kind ? formatKind(row.kind) : '—'}</Tag>,
      title: 'Type',
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
              title="Edit"
              onClick={() => {
                onEdit(row);
              }}
            >
              <EditOutlined />
            </Button>
          ) : null}
          <Button type="text" size="small" title="Download">
            <MsnIcon name="download" size="12px" />
          </Button>
          {row.ownerId === ownerId ? (
            <Button
              type="text"
              size="small"
              danger
              title="Delete"
              onClick={() => {
                onDelete(row);
              }}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </div>
      ),
      title: 'Actions',
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
