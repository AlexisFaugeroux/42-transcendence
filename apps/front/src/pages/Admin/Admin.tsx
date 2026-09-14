import { useIsAllowed } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { ConfigProvider, Tabs, theme } from '@transcendence/ui';
import { type JSX } from 'react';
import styles from './Admin.module.scss';
import { ADMIN_TABS, type AdminTab } from './adminTabs';

export function Admin(): JSX.Element {
  const { t } = useTranslation();
  const isAllowed = useIsAllowed();

  const isVisible = (tabs: AdminTab[]) =>
    tabs
      .filter((tab) => tab.permission.some((p) => isAllowed(p)))
      .map((tab) => ({
        children: tab.children,
        key: tab.key,
        label: t(tab.labelKey),
      }));

  const visibleTabs = isVisible(ADMIN_TABS);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div className={styles.eyebrow}>{t('admin.dashboard.eyebrow')}</div>
          <h1 className={styles.title}>{t('admin.dashboard.title')}</h1>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: theme.orange,
                itemColor: theme.fg2,
                itemHoverColor: theme.fg1,
                itemSelectedColor: theme.orange,
              },
            },
          }}
        >
          <Tabs defaultActiveKey="users" items={visibleTabs} size="small" />
        </ConfigProvider>
      </div>
    </div>
  );
}
