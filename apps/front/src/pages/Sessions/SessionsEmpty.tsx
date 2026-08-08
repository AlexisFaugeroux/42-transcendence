import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './SessionsEmpty.module.scss';

// Shown when a bucket has no sessions at all.
export function SessionsEmpty({
  bucket,
  onNew,
}: {
  bucket: 'owned' | 'archived';
  onNew: () => void;
}): JSX.Element {
  const { t } = useTranslation();

  if (bucket === 'archived') {
    return (
      <div className={styles.box}>
        <MsnIcon name="folder" size="28px" color={theme.blue} />
        <h3 className={styles.title}>{t('sessions.emptyArchived.title')}</h3>
        <p className={styles.text}>{t('sessions.emptyArchived.text')}</p>
      </div>
    );
  }
  return (
    <div className={`${styles.box} ${styles.glow}`}>
      <div className={styles.logos}>
        <span style={{ color: theme.orange }}>
          <MsnIcon name="produce" size="22px" />
        </span>
        <span style={{ color: theme.red }}>
          <MsnIcon name="record" size="22px" />
        </span>
        <span style={{ color: theme.blue }}>
          <MsnIcon name="mix" size="22px" />
        </span>
      </div>
      <h3 className={styles.title}>{t('sessions.emptyOwned.title')}</h3>
      <p className={styles.text}>{t('sessions.emptyOwned.text')}</p>
      <Button type="primary" size="large" onClick={onNew}>
        <MsnIcon name="plus" size="13px" /> {t('sessions.emptyOwned.action')}
      </Button>
    </div>
  );
}

// Shown when filters hide everything in a non-empty bucket.
export function SessionsNoMatches({ onClear }: { onClear: () => void }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.box}>
      <MsnIcon name="search" size="22px" color={theme.orange} />
      <h3 className={styles.title}>{t('sessions.noMatches.title')}</h3>
      <p className={styles.text}>{t('sessions.noMatches.text')}</p>
      <Button onClick={onClear}>{t('sessions.noMatches.clearFilters')}</Button>
    </div>
  );
}
