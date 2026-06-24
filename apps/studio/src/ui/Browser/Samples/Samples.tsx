import { type JSX, useState } from 'react';
import { ConfigProvider, Table, type TableColumnsType } from '@ui/index';
import { theme } from '@ui/theme/theme';
import { useTableScrollY } from '../../../hooks/useTableScrollY';
import { SamplesSearch } from './SamplesSearch';

export type SampleLibrary = 'user' | 'shared';

export function Samples(): JSX.Element {
  const [activeLib, setActiveLib] = useState<SampleLibrary>('user');

  const { ref, y } = useTableScrollY();

  const columns: TableColumnsType<{ name: string; bpm: number; key: string }> = [
    { dataIndex: 'name', ellipsis: true, title: 'Name', width: 170 },
    { align: 'right', dataIndex: 'bpm', title: 'Bpm' },
    { align: 'right', dataIndex: 'key', title: 'Key' },
  ];

  const userLib = [
    { bpm: 120, key: 'A', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'B', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'C', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'D', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'E', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'F', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'G', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'H', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'I', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'J', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'K', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'L', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'M', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'N', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'O', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'P', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'Q', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'R', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'S', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'T', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'U', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'V', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'W', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'X', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'Y', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'Z', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AA', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AB', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AC', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AD', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AE', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AF', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AG', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AH', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AI', name: 'Prout_plantey_techno.wav' },
  ];

  const sharedLib = [
    { bpm: 120, key: 'A1', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'B2', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'C3', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'D4', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'E5', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'F6', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'G7', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'H8', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'I9', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'J10', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'K11', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'L12', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'M13', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'N14', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'O15', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'P16', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'Q17', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'R18', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'S19', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'T20', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'U21', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'V22', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'W23', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'X24', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'Y25', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'Z26', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AA27', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AB28', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AC29', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AD30', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AE31', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AF32', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AG33', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AH34', name: 'Prout_plantey_techno.wav' },
    { bpm: 120, key: 'AI35', name: 'Prout_plantey_techno.wav' },
  ];

  const dataSource: { bpm: number; key: string; name: string }[] = activeLib === 'user' ? userLib : sharedLib;

  return (
    <>
      <SamplesSearch activeLib={activeLib} setActiveLib={setActiveLib} />

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
