import type { Dispatch, JSX, SetStateAction } from 'react';
import { Button, ConfigProvider, FolderOutlined, Input, SearchOutlined, TeamOutlined } from '@ui/index';
import { theme } from '@ui/theme/theme';
import type { SampleLibrary } from './Samples';

interface SamplesSearchProps {
  activeLib: SampleLibrary;
  setActiveLib: Dispatch<SetStateAction<SampleLibrary>>;
}

export function SamplesSearch({ activeLib, setActiveLib }: SamplesSearchProps): JSX.Element {
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
          size="small"
          style={{ borderColor: activeLib === 'user' ? theme.orange : undefined }}
          onClick={() => {
            if (activeLib !== 'user') setActiveLib('user');
          }}
        >
          <FolderOutlined style={{ color: theme.orange }} />
        </Button>

        <Button
          size="small"
          style={{ borderColor: activeLib === 'shared' ? theme.orange : undefined }}
          onClick={() => {
            if (activeLib !== 'shared') setActiveLib('shared');
          }}
        >
          <TeamOutlined style={{ color: theme.orange }} />
        </Button>
        <Input size="small" prefix={<SearchOutlined style={{ color: theme.fg3 }} />} placeholder="Chercher un sample" />
      </ConfigProvider>
    </div>
  );
}
