import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './ListStates.module.scss';

const SKELETON_ROWS = [0, 1, 2, 3, 4, 5];

export function ListSkeleton(): JSX.Element {
  return (
    <div className={styles.state}>
      {SKELETON_ROWS.map((row) => (
        <div key={row} className={styles.skeletonRow} style={{ opacity: 1 - row * 0.13 }}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonLines}>
            <div className={styles.skeletonLine} />
            <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListEmpty(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.state}>
      <div className={styles.icon}>
        <MsnIcon name="chat" size="24px" />
      </div>
      <h3 className={styles.title}>{t('chat.empty.title')}</h3>
      <p className={styles.text}>{t('chat.empty.text')}</p>
      {/* T8 (#182) points this at its search field; until then the producers
          page is where you find someone to write to. */}
      <Link to="/producers">
        <Button className={styles.ctaOrange} size="small">
          {t('chat.empty.cta')}
        </Button>
      </Link>
    </div>
  );
}

interface ListErrorProps {
  message: string;
  onRetry: () => void;
}

export function ListError({ message, onRetry }: ListErrorProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.state}>
      <div className={styles.bang}>!</div>
      <h3 className={styles.title}>{t('chat.loadError')}</h3>
      <p className={styles.text}>{message}</p>
      <Button className={styles.ctaRed} size="small" onClick={onRetry}>
        {t('common.retry')}
      </Button>
    </div>
  );
}
