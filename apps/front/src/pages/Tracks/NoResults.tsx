import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './NoResults.module.scss';

export function NoResults({ onClear }: { onClear: () => void }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.empty}>
      <MsnIcon name="search" size="28px" color={theme.orange} />
      <h3 className={styles.title}>{t('tracks.noResults.title')}</h3>
      <p className={styles.text}>{t('tracks.noResults.text')}</p>
      <Button onClick={onClear}>{t('tracks.noResults.clearFilters')}</Button>
    </div>
  );
}
