import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './EmptyState.module.scss';

export function EmptyState({ onClear }: { onClear: () => void }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.empty}>
      <MsnIcon name="search" size="28px" color={theme.orange} />
      <h3 className={styles.title}>{t('samples.empty.title')}</h3>
      <p className={styles.text}>{t('samples.empty.text')}</p>
      <Button onClick={onClear}>{t('samples.empty.clearFilters')}</Button>
    </div>
  );
}
