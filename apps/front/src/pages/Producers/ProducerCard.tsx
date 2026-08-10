import { useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import type { PublicProducer } from '../../types/producer';
import { StatusAvatar } from '../Home/StatusAvatar';
import styles from './Producers.module.scss';

interface ProducerCardProps {
  producer: PublicProducer;
}

export function ProducerCard({ producer }: ProducerCardProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <StatusAvatar name={producer.artistName} size={44} />
      <div className={styles.meta}>
        <div className={styles.alias}>{producer.artistName}</div>
        <div className={styles.handle}>@{producer.handle}</div>
      </div>
      <Link to={`/producers/${producer.handle}`} className={styles.viewLink}>
        {t('producers.viewProfile')} <MsnIcon name="arrowR" size="11px" />
      </Link>
    </div>
  );
}
