import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import styles from './StatsStrip.module.scss';

interface Stat {
  value: string;
  labelKey: TranslationKey;
  color: string;
}

const STATS: Stat[] = [
  { color: 'hsl(25, 90%, 55%)', labelKey: 'landing.stats.producers', value: '4.2k+' },
  { color: 'hsl(210, 90%, 50%)', labelKey: 'landing.stats.streamed', value: '180k' },
  { color: 'hsl(140, 65%, 45%)', labelKey: 'landing.stats.downloads', value: '0' },
  { color: 'hsl(280, 65%, 60%)', labelKey: 'landing.stats.inBrowser', value: '100%' },
];

export function StatsStrip(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.labelKey} className={styles.cell}>
            <div className={styles.value} style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className={styles.label}>{t(stat.labelKey)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
