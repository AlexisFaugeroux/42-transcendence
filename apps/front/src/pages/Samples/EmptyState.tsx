import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { theme } from '@ui/theme/theme';
import styles from './EmptyState.module.scss';

export function EmptyState({ onClear }: { onClear: () => void }): JSX.Element {
  return (
    <div className={styles.empty}>
      <MsnIcon name="search" size="28px" color={theme.orange} />
      <h3 className={styles.title}>No samples match these filters</h3>
      <p className={styles.text}>Try clearing the filters or searching for a different term.</p>
      <Button onClick={onClear}>Clear filters</Button>
    </div>
  );
}
