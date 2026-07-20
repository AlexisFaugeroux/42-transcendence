import { Button, ConfigProvider, FolderOutlined, Input, SearchOutlined, TeamOutlined, theme } from '@transcendence/ui';
import type { Dispatch, JSX, SetStateAction } from 'react';
import type { SampleLibrary } from './Samples';

interface SamplesSearchProps {
  activeLib: SampleLibrary;
  setActiveLib: Dispatch<SetStateAction<SampleLibrary>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export function SamplesSearch({ activeLib, setActiveLib, setSearch }: SamplesSearchProps): JSX.Element {
  return (
    <div
      style={{
        alignItems: 'center',
        borderBottom: `1px solid ${theme.lineFaint}`,
        display: 'flex',
        gap: 6,
        padding: '10px 10px',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: theme.fg3,
            },
            Input: {
              activeBg: theme.void,
              activeBorderColor: theme.fg3,
              colorBgContainer: theme.void,
              colorBorder: theme.lineHover,
              colorText: theme.fg2,
              colorTextPlaceholder: theme.fg3,
              hoverBg: theme.black,
              hoverBorderColor: theme.fg3,
            },
          },
        }}
      >
        <Button
          style={{ borderColor: activeLib === 'user' ? theme.orange : undefined }}
          onClick={() => {
            if (activeLib !== 'user') setActiveLib('user');
          }}
          icon={<FolderOutlined style={{ color: theme.orange }} />}
        />

        <Button
          style={{ borderColor: activeLib === 'shared' ? theme.orange : undefined }}
          onClick={() => {
            if (activeLib !== 'shared') setActiveLib('shared');
          }}
          icon={<TeamOutlined style={{ color: theme.orange }} />}
        />
        <Input
          size="small"
          prefix={<SearchOutlined style={{ color: theme.fg3 }} />}
          placeholder="Chercher un sample"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </ConfigProvider>
    </div>
  );
}
