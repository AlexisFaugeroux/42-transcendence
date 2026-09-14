import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import styles from './Editor.module.scss';

export function Editor(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.editor}>
      <span className={styles.mask}>
        <StudioIcon name="forbidden" size={16} />
        <span>{t('common.availableSoon')}</span>
      </span>
    </div>
  );
}
