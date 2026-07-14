import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import styles from './SelectionBar.module.scss';

interface SelectionBarProps {
  count: number;
  onClear: () => void;
  onDelete: () => void;
}

export function SelectionBar({ count, onClear, onDelete }: SelectionBarProps): JSX.Element {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.count}>{count} selected</span>
        <button className={styles.clear} onClick={onClear}>
          clear
        </button>
      </div>
      <div className={styles.actions}>
        <Button size="small">
          <MsnIcon name="folder" size="11px" /> Move to…
        </Button>
        <Button size="small">
          <MsnIcon name="download" size="11px" /> Download
        </Button>
        <Button size="small" danger onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
