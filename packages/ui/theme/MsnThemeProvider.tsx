import { ConfigProvider, theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';
import type { JSX, ReactNode } from 'react';

const msnTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  cssVar: { prefix: 'msn' },
  hashed: false,
  token: {
    colorPrimary: 'hsl(210, 90%, 50%)',
    colorSuccess: 'hsl(140, 65%, 45%)',
    colorWarning: 'hsl(45, 95%, 55%)',
    colorError: 'hsl(8, 85%, 55%)',
    colorInfo: 'hsl(190, 75%, 50%)',

    colorBgBase: 'hsl(197, 14%, 3%)',
    colorBgLayout: 'hsl(197, 14%, 6%)',
    colorBgContainer: 'hsl(197, 14%, 8%)',
    colorBgElevated: 'hsl(197, 14%, 16%)',

    colorText: 'hsl(0, 0%, 92%)',
    colorTextSecondary: 'hsl(0, 0%, 56%)',
    colorTextTertiary: 'hsl(0, 0%, 38%)',
    colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',

    colorBorder: 'rgba(255, 255, 255, 0.07)',
    colorBorderSecondary: 'rgba(255, 255, 255, 0.04)',

    fontFamily: '"Rubik", system-ui, sans-serif',
    fontSize: 12,

    borderRadius: 4,
    borderRadiusSM: 2,
    borderRadiusLG: 6,

    wireframe: false,
  },
  components: {
    Menu: {
      itemSelectedBg: 'hsl(210, 90%, 30%)',
      itemSelectedColor: 'hsl(0, 0%, 92%)',
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
};

interface MsnThemeProviderProps {
  children: ReactNode;
}

export function MsnThemeProvider({ children }: MsnThemeProviderProps): JSX.Element {
  return <ConfigProvider theme={msnTheme}>{children}</ConfigProvider>;
}
