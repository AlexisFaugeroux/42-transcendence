import { useTranslation } from '@transcendence/i18n';
import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './SelectionBar.module.scss';

interface SelectionBarProps {
  count: number;
  onClear: () => void;
  onDelete: () => void;
}

export function SelectionBar({ count, onClear, onDelete }: SelectionBarProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.count}>{t('samples.selection.count', { count })}</span>
        <button className={styles.clear} onClick={onClear}>
          {t('samples.selection.clear')}
        </button>
      </div>
      <div className={styles.actions}>
        <Button size="small" danger onClick={onDelete}>
          {t('common.delete')}
        </Button>
      </div>
    </div>
  );
}
