import { useTranslation } from '@transcendence/i18n';
import { ConfigProvider, Tabs, type TabsProps, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './Browser.module.scss';
import { Samples } from './Samples/Samples';
import { Devices } from './Devices/Devices';

export function Browser(): JSX.Element {
  const { t } = useTranslation();

  const tabs: TabsProps['items'] = [
    { children: <Samples />, key: 'samples', label: t('studio.browser.samples') },
    { children: <Devices />, key: 'devices', label: t('studio.browser.devices') },
  ];

  return (
    <aside
      style={{
        background: theme.bgPanel,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
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
        <Tabs
          className={styles.fillTabs}
          defaultActiveKey="samples"
          items={tabs}
          centered
          size="small"
        />
      </ConfigProvider>
    </aside>
  );
}
