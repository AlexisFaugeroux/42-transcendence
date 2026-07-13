import type { JSX } from 'react';
import styles from './StatsStrip.module.scss';

interface Stat {
  value: string;
  label: string;
  color: string;
}

const STATS: Stat[] = [
  { color: 'hsl(25, 90%, 55%)', label: 'active producers', value: '4.2k+' },
  { color: 'hsl(210, 90%, 50%)', label: 'tracks streamed', value: '180k' },
  { color: 'hsl(140, 65%, 45%)', label: 'downloads required', value: '0' },
  { color: 'hsl(280, 65%, 60%)', label: 'in-browser audio', value: '100%' },
];

export function StatsStrip(): JSX.Element {
  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.cell}>
            <div className={styles.value} style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
