import { useAuthUser } from '@transcendence/auth';
import { formatKey, useTranslation } from '@transcendence/i18n';
import {
  CloseOutlined,
  ConfigProvider,
  Flex,
  Table,
  type TableColumnsType,
  theme,
} from '@transcendence/ui';
import { type DragEvent, type JSX, useState } from 'react';
import { useSamples } from '../../../hooks/useSamples';
import { useTableScrollY } from '../../../hooks/useTableScrollY';
import type { Sample } from '../../../lib/types';
import styles from './Samples.module.scss';
import { SamplesSearch } from './SamplesSearch';

export type SampleLibrary = 'user' | 'shared';

export function Samples(): JSX.Element {
  const user = useAuthUser();
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
      dataIndex: 'key',
      render: (_, sample) => (sample.key ? formatKey(sample.key, t) : '—'),
      // Sorted on the raw enum, so the order groups by note in every language.
      sorter: (a, b) => (a.key ?? '').localeCompare(b.key ?? ''),
      title: t('studio.browser.table.key'),
    },
  ];

  const { data, error, isError } = useSamples();
  if (isError) console.error(error);

  const dataSource = (data ?? [])
    .filter((sample) => {
      const inLib =
        activeLib === 'user'
          ? sample.ownerId === user.ownerId || sample.ownerType === 'PLATEFORM'
          : sample.ownerId !== user.ownerId && sample.ownerType !== 'PLATEFORM';

      return inLib && sample.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort();

  return (
    <>
      <SamplesSearch activeLib={activeLib} setActiveLib={setActiveLib} setSearch={setSearch} />

      {isError ? (
        <Flex>
          <CloseOutlined />
          <span>{t('studio.browser.loadError')}</span>
        </Flex>
      ) : (
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
      )}
    </>
  );
}
