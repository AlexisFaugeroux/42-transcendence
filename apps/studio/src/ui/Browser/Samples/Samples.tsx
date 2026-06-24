import { type JSX, useState } from 'react';
import { ConfigProvider, Table, type TableColumnsType } from '@ui/index';
import { theme } from '@ui/theme/theme';
import { useTableScrollY } from '../../../hooks/useTableScrollY';
import { SamplesSearch } from './SamplesSearch';
import { SamplesTable } from './SamplesTable';

export interface SampleLibrary {
  user: boolean;
  shared: boolean;
}

export function Samples(): JSX.Element {
  const [activeLibraries, setActiveLibraries] = useState<SampleLibrary>({
    shared: false,
    user: true,
  });

  const { ref, y } = useTableScrollY();

  const columns: TableColumnsType<{ name: string; bpm: number; key: string }> = [
    { dataIndex: 'name', ellipsis: true, title: 'Name', width: 170 },
    { align: 'right', dataIndex: 'bpm', title: 'Bpm' },
    { align: 'right', dataIndex: 'key', title: 'Key' },
  ];

  const dataSource = [
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
  ];

  return (
    <>
      <SamplesSearch activeLibraries={activeLibraries} setActiveLibraries={setActiveLibraries} />
      {/* <SamplesTable /> */}
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
              lineHeight: 0.6,
              rowHoverBg: theme.orange,
            },
          },
        }}
      >
        <div ref={ref} style={{ flex: 1, minHeight: 0 }}>
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
