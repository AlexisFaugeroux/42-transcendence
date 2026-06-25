import { UUID } from '@opendaw/lib-std';
import { type JSX, useEffect, useState } from 'react';
import { ConfigProvider, Table, type TableColumnsType } from '@ui/index';
import { theme } from '@ui/theme/theme';
import { useTableScrollY } from '../../../hooks/useTableScrollY';
import type { Sample } from '../../../lib/types';
import { SamplesSearch } from './SamplesSearch';
import styles from './Samples.module.scss';

export type SampleLibrary = 'user' | 'shared';

const columns: TableColumnsType<{ name: string; bpm?: number; key?: string }> = [
  {
    dataIndex: 'name',
    ellipsis: true,
    title: 'Name',
    width: 170,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  { align: 'right', dataIndex: 'bpm', title: 'Bpm', sorter: (a, b) => (a.bpm ?? 0) - (b.bpm ?? 0) },
  {
    align: 'right',
    dataIndex: 'sampleKey',
    title: 'Key',
    sorter: (a, b) => a.name.localeCompare(b.name),
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
      <SamplesSearch activeLib={activeLib} setActiveLib={setActiveLib} search={search} setSearch={setSearch} />

      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: 'none',
              colorBgContainer: theme.bgPanel,
              colorText: theme.fg1,
              fontSize: 11,
              headerBg: theme.bgPanel,
              headerColor: theme.fg2,
              lineHeight: 0.8,
              rowHoverBg: theme.orange,
              headerSortActiveBg: 'transparent',
              headerSortHoverBg: 'transparent',
              bodySortBg: 'transparent',
              fixedHeaderSortActiveBg: 'transparent',
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
          />
        </div>
      </ConfigProvider>
    </>
  );
}
