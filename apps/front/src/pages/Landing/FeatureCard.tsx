import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './FeatureCard.module.scss';
import type { Feature } from './landing.data';

export function FeatureCard({
  available,
  bulletKeys,
  color,
  descKey,
  icon,
  titleKey,
}: Feature): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.slot}>
      <div className={`${styles.card} ${available ? '' : styles.muted}`}>
        <div className={styles.iconBox} style={{ color }}>
          <MsnIcon name={icon} size="22px" />
        </div>
        <div>
          <div className={styles.title}>{t(titleKey)}</div>
          <p className={styles.desc}>{t(descKey)}</p>
        </div>
        <div className={styles.bullets}>
          {bulletKeys.map((bulletKey) => (
            <Tag key={bulletKey}>{t(bulletKey)}</Tag>
          ))}
        </div>
      </div>
      {available ? null : <span className={styles.mask}>{t('common.availableSoon')}</span>}
    </div>
  );
}
