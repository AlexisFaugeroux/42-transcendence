import { useTranslation } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import type { PanelHeaderProps } from '../PanelFrame/panels';
import styles from './PanelHeader.module.scss';

export function PanelHeader({ icon, id, isVisible, labelKey, onToggle }: PanelHeaderProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className={id === 'browser' && !isVisible(id) ? styles.headerContainerBrowserCollapsed : styles.headerContainer}
    >
      <span className={styles.headerTitle}>
        <button
          onClick={() => {
            onToggle(id);
          }}
        >
          <StudioIcon name={icon} size={12} color={theme.orange} />
          <span className={styles.label}>{t(labelKey)}</span>
        </button>
      </span>
    </div>
  );
}
