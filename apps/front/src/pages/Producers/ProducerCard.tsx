import { useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import type { PublicProducer } from '../../types/producer';
import styles from './Producers.module.scss';
import { UnfollowButton } from './UnfollowButton';

interface ProducerCardProps {
  producer: PublicProducer;
  showUnfollow?: boolean;
}

export function ProducerCard({ producer, showUnfollow = false }: ProducerCardProps): JSX.Element {
  const { t } = useTranslation();
  const profileTo = `/producers/${producer.handle}`;

  return (
    <div className={styles.card}>
      {showUnfollow ? (
        <>
          <Link to={profileTo} className={styles.cardMain}>
            <StatusAvatar name={producer.artistName} size={44} />
            <div className={styles.meta}>
              <div className={styles.alias}>{producer.artistName}</div>
              <div className={styles.handle}>@{producer.handle}</div>
            </div>
          </Link>
          <UnfollowButton handle={producer.handle} />
        </>
      ) : (
        <>
          <StatusAvatar name={producer.artistName} size={44} />
          <div className={styles.meta}>
            <div className={styles.alias}>{producer.artistName}</div>
            <div className={styles.handle}>@{producer.handle}</div>
          </div>
          <Link to={profileTo} className={styles.viewLink}>
            {t('producers.viewProfile')} <MsnIcon name="arrowR" size="11px" />
          </Link>
        </>
      )}
    </div>
  );
}
