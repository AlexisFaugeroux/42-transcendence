import { useTranslation } from '@transcendence/i18n';
import { ConfigProvider, Table, type TableColumnsType, theme } from '@transcendence/ui';
import { type DragEvent, type JSX, useState } from 'react';
import { useSamples } from '../../../hooks/useSamples';
import { useTableScrollY } from '../../../hooks/useTableScrollY';
import type { Sample } from '../../../lib/types';
import styles from './Samples.module.scss';
import { SamplesSearch } from './SamplesSearch';
export type SampleLibrary = 'user' | 'shared';

export function Samples(): JSX.Element {
  const [activeLib, setActiveLib] = useState<SampleLibrary>('user');
  const [search, setSearch] = useState('');
  const { ref, y } = useTableScrollY();
  const { t } = useTranslation();

  const columns: TableColumnsType<Sample> = [
    {
      dataIndex: 'name',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      title: t('studio.browser.table.name'),
      width: 170,
    },
    {
      align: 'right',
      dataIndex: 'bpm',
      sorter: (a, b) => (a.bpm ?? 0) - (b.bpm ?? 0),
      title: t('studio.browser.table.bpm'),
    },
    {
      align: 'right',
      dataIndex: 'sampleKey',
      sorter: (a, b) => a.name.localeCompare(b.name),
      title: t('studio.browser.table.key'),
    },
  ];

  const { data, error, isError } = useSamples();
  if (isError) console.error(error);

  const dataSource = (data ?? []).filter(
    (sample) => sample.name.startsWith(search) || sample.name.includes(search),
  );

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
            rowKey="id"
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
