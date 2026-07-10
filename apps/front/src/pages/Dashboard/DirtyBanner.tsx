import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './DirtyBanner.module.scss';

interface DirtyBannerProps {
  hasErrors: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export function DirtyBanner({ hasErrors, onDiscard, onSave }: DirtyBannerProps): JSX.Element {
  return (
    <div className={`${styles.banner} ${hasErrors ? styles.error : ''}`}>
      <div className={styles.message}>
        <span className={styles.badge}>{hasErrors ? '!' : '•'}</span>
        {hasErrors ? 'Fix the highlighted fields before saving.' : 'You have unsaved changes.'}
      </div>
      <div className={styles.actions}>
        <Button onClick={onDiscard}>Discard</Button>
        <Button type="primary" danger={hasErrors} onClick={onSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
