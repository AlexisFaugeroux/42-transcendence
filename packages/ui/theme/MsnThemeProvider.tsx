import { ConfigProvider, theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';
import type { JSX, ReactNode } from 'react';

const msnTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  cssVar: { prefix: 'msn' },
  hashed: false,
  token: {
    // Seed colors: antd derives whole palettes (hover/active/disabled steps) from
    // these in JS, so they MUST be literal parseable colors — a `var(--…)` string
    // would break the derivation. Keep in sync with colors_and_type.css (the source).
    colorPrimary: 'hsl(210, 90%, 50%)', // --color-blue  (primary action — see design/README.md)
    colorSuccess: 'hsl(140, 65%, 45%)', // --color-green
    colorWarning: 'hsl(45, 95%, 55%)', // --color-yellow
    colorError: 'hsl(8, 85%, 55%)', // --color-red
    colorInfo: 'hsl(190, 75%, 50%)', // --color-cyan

    // Base bg/layout seeds (derive the surface scale): also literal.
    colorBgBase: 'hsl(197, 14%, 3%)', // --color-void
    colorBgLayout: 'hsl(197, 14%, 6%)', // openDAW header bg (no exact palette var)

    // Tokens antd uses directly → reference the single source of truth.
    colorBgContainer: 'var(--bg-panel-2)',
    colorBgElevated: 'var(--bg-elevated)',

    colorText: 'var(--fg1)',
    colorTextSecondary: 'var(--fg2)',
    colorTextTertiary: 'var(--fg3)',
    colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',

    colorBorder: 'var(--line-soft)',
    colorBorderSecondary: 'var(--line-faint)',

    fontFamily: 'var(--font-display)',
    fontSize: 12,

    borderRadius: 4,
    borderRadiusSM: 2,
    borderRadiusLG: 6,

    boxShadowSecondary: 'var(--shadow-floating)',

    wireframe: false,
  },
  components: {
    Menu: {
      itemSelectedBg: 'var(--color-active)',
      itemSelectedColor: 'var(--fg1)',
    },
    Table: {
      // Header sits one surface-step darker than the rows, so it reads as the
      // plane beneath the content (dense DAW look) — not a flat black slab.
      headerBg: 'var(--bg-panel-3)',
      headerColor: 'var(--fg3)', // muted label, not full-bright
      headerSplitColor: 'transparent', // kill the vertical dividers between th
      borderColor: 'var(--line-soft)',
      rowHoverBg: 'var(--bg-panel-3)', // subtle darker hover, matches side rail
      colorBgContainer: 'transparent', // let the surrounding panel show through
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
