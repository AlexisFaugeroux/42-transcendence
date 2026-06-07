import type { JSX } from 'react';
import { theme } from '@ui/theme/theme';
import type { PanelHeaderProps } from '../panels';
import { StudioIcon } from '../StudioIcon/StudioIcon';
import styles from './TimelineHeader.module.scss';

export function TimelineHeader({ id, label, onToggle }: PanelHeaderProps): JSX.Element {
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
