import { UUID } from '@opendaw/lib-std';
import { type JSX, useEffect, useState, type DragEvent } from 'react';
import { ConfigProvider, Table, type TableColumnsType } from '@ui/index';
import { theme } from '@ui/theme/theme';
import { useTableScrollY } from '../../../hooks/useTableScrollY';
import type { Sample } from '../../../lib/types';
import styles from './Samples.module.scss';
import { SamplesSearch } from './SamplesSearch';

export type SampleLibrary = 'user' | 'shared';

const columns: TableColumnsType<{ name: string; bpm?: number; key?: string }> = [
  {
    dataIndex: 'name',
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
    title: 'Name',
    width: 170,
  },
  { align: 'right', dataIndex: 'bpm', sorter: (a, b) => (a.bpm ?? 0) - (b.bpm ?? 0), title: 'Bpm' },
  {
    align: 'right',
    dataIndex: 'sampleKey',
    sorter: (a, b) => a.name.localeCompare(b.name),
    title: 'Key',
  },
];

export function Samples(): JSX.Element {
  const [activeLib, setActiveLib] = useState<SampleLibrary>('user');
  const [samples, setSamples] = useState<Sample[]>([]);
  const [search, setSearch] = useState('');
  const { ref, y } = useTableScrollY();

  useEffect(() => {
    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}/audio/manifest.json`)
      .then((res) => res.json() as Promise<Sample[]>)
      .then((data) => {
        if (!cancelled) setSamples(data);
      })
      .catch((error: unknown) => {
        console.error('Failed to load sample manifest', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const dataSource = samples
    .map((sample) => ({ ...sample, key: UUID.generate().toString() }))
    .filter((sample) => sample.name.startsWith(search) || sample.name.includes(search));

  return (
    <>
      <SamplesSearch activeLib={activeLib} setActiveLib={setActiveLib} setSearch={setSearch} />

      <ConfigProvider
        theme={{
          components: {
            Table: {
              bodySortBg: 'transparent',
              borderColor: 'none',
              colorBgContainer: theme.bgPanel,
              colorText: theme.fg1,
              fixedHeaderSortActiveBg: 'transparent',
              fontSize: 11,
              headerBg: theme.bgPanel,
              headerColor: theme.fg2,
              headerSortActiveBg: 'transparent',
              headerSortHoverBg: 'transparent',
              lineHeight: 0.8,
              rowHoverBg: theme.orange,
            },
          },
        }}
      >
        <div ref={ref} className={styles.table} style={{ flex: 1, minHeight: 0 }}>
          <Table
            bordered={false}
            columns={columns}
            dataSource={dataSource}
            size="small"
            pagination={false}
            scroll={{ y }}
            onRow={(record) => ({
              draggable: true,
              onDragStart: (e: DragEvent<HTMLTableRowElement>) => {
                e.dataTransfer.setData('application/x-sample', JSON.stringify(record));
                e.dataTransfer.effectAllowed = 'copy';
              },
            })}
          />
        </div>
      </ConfigProvider>
    </>
  );
}
