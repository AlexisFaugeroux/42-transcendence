import { useTranslation } from '@transcendence/i18n';
import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './DirtyBanner.module.scss';

interface DirtyBannerProps {
  hasErrors: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export function DirtyBanner({ hasErrors, onDiscard, onSave }: DirtyBannerProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`${styles.banner} ${hasErrors ? styles.error : ''}`}>
      <div className={styles.message}>
        <span className={styles.badge}>{hasErrors ? '!' : '•'}</span>
        {hasErrors ? t('settings.dirty.fixFields') : t('settings.dirty.unsaved')}
      </div>
      <div className={styles.actions}>
        <Button onClick={onDiscard}>{t('settings.dirty.discard')}</Button>
        <Button type="primary" danger={hasErrors} onClick={onSave}>
          {t('settings.saveChanges')}
        </Button>
      </div>
    </div>
  );
}
