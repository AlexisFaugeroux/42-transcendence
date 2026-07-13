import type { JSX } from 'react';
import { FeatureCard } from './FeatureCard';
import styles from './Features.module.scss';
import { FEATURES } from './landing.data';

export function Features(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>What it does</div>
          <h2 className={styles.title}>A studio, a stage, and a community — in one tab.</h2>
          <p className={styles.sub}>
            Every tool you need to go from an idea to a release, plus a live audience that hears it before anyone else.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
