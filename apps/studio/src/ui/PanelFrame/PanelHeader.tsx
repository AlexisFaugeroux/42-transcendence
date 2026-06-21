import type { JSX } from 'react';
import { theme } from '@ui/theme/theme';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import type { PanelHeaderProps } from '../PanelFrame/panels';
import styles from './PanelHeader.module.scss';

export function PanelHeader({ id, label, onToggle }: PanelHeaderProps): JSX.Element {
  return (
    <div className={styles.headerContainer}>
      <span className={styles.headerTitle}>
        <button
          onClick={() => {
            onToggle(id);
          }}
        >
          <StudioIcon name="arrange" size={12} color={theme.orange} />
          <span className={styles.label}>{label}</span>
        </button>
      </span>
    </div>
  );
}
