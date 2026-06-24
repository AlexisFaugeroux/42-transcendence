import type { JSX } from 'react';
import { ConfigProvider, Tabs, type TabsProps } from '@ui/index';
import { theme } from '@ui/theme/theme';
import styles from './Browser.module.scss';
import { Samples } from './Samples/Samples';

const tabs: TabsProps['items'] = [
  { children: <Samples />, key: 'samples', label: 'SAMPLES' },
  { children: 'Devices', key: 'devices', label: 'DEVICES' },
];

export function Browser(): JSX.Element {
  return (
    <aside style={{ background: theme.bgPanel, display: 'flex', flex: 1, flexDirection: 'column', minHeight: 0 }}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              horizontalItemPaddingSM: '6px 0', // hauteur des onglets (déf. "8px 0")
              horizontalMargin: '0 0 0 0', // hover
              inkBarColor: theme.orange, // taille de police
              itemColor: theme.fg2, // onglet actif
              itemHoverColor: theme.fg1, // couleur du text, onglet inactif
              itemSelectedColor: theme.orange,
              titleFontSizeSM: 10, // marge sous la barre (déf. "0 0 16px 0")
            },
          },
        }}
      >
        <Tabs className={styles.fillTabs} defaultActiveKey="samples" items={tabs} centered size="small" />
      </ConfigProvider>
    </aside>
  );
}
