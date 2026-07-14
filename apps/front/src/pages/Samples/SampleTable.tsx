import { Button, DeleteOutlined, Table, type TableColumnsType, Tag } from '@transcendence/ui';
import type { JSX, Key } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { theme } from '@ui/theme/theme';
import { FAMILY_COLOR, formatMB, type Sample } from './samples.data';
import styles from './SampleTable.module.scss';
import { WaveformPlaceholder } from './WaveformPlaceholder';

interface SampleTableProps {
  rows: Sample[];
  selectedKeys: Key[];
  onSelectionChange: (keys: Key[]) => void;
  playingId: number | null;
  onPlay: (id: number) => void;
  onDelete: (sample: Sample) => void;
}

export function SampleTable({
  onDelete,
  onPlay,
  onSelectionChange,
  playingId,
  rows,
  selectedKeys,
}: SampleTableProps): JSX.Element {
  const columns: TableColumnsType<Sample> = [
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
            {row.fav ? <MsnIcon name="heart" size="11px" color={theme.orange} /> : null}
            <span className={styles.name}>{row.name}</span>
          </div>
          <div className={styles.meta}>
            <Tag color={FAMILY_COLOR[row.family]}>{row.family}</Tag>
            <span>{row.pack}</span>
            <span>· added {row.added}</span>
          </div>
        </div>
      ),
      title: 'Name',
    },
    {
      key: 'waveform',
      render: (_, row) => <WaveformPlaceholder seed={row.seed} color={FAMILY_COLOR[row.family]} />,
      title: 'Waveform',
      width: 220,
    },
    {
      key: 'bpmKey',
      render: (_, row) => (
        <span className={styles.mono}>
          {row.bpm ?? '—'}
          {row.key ? <span className={styles.muted}> · {row.key}</span> : null}
        </span>
      ),
      title: 'BPM / Key',
      width: 110,
    },
    { dataIndex: 'dur', render: (v: string) => <span className={styles.mono}>{v}</span>, title: 'Length', width: 80 },
    {
      key: 'size',
      render: (_, row) => <span className={styles.mono}>{formatMB(row.size)}</span>,
      title: 'Size',
      width: 90,
    },
    { dataIndex: 'kind', render: (v: string) => <Tag>{v}</Tag>, title: 'Type', width: 90 },
    {
      align: 'right',
      key: 'actions',
      render: (_, row) => (
        <div className={styles.actions}>
          <Button type="text" size="small" title="Add to session">
            <MsnIcon name="plus" size="12px" />
          </Button>
          <Button type="text" size="small" title="Download">
            <MsnIcon name="download" size="12px" />
          </Button>
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
        </div>
      ),
      title: 'Actions',
      width: 120,
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={rows}
      pagination={false}
      size="small"
      rowSelection={{ onChange: onSelectionChange, selectedRowKeys: selectedKeys }}
    />
  );
}
