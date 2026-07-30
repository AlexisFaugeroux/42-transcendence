import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { FeatureCard } from './FeatureCard';
import styles from './Features.module.scss';
import { FEATURES } from './landing.data';

export function Features(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>{t('landing.features.eyebrow')}</div>
          <h2 className={styles.title}>{t('landing.features.title')}</h2>
          <p className={styles.sub}>{t('landing.features.sub')}</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
