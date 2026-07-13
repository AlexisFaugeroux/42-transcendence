import type { JSX } from 'react';
import { DeepDiveRow } from './DeepDiveRow';
import styles from './DeepDives.module.scss';
import { DEEP_DIVES } from './landing.data';

export function DeepDives(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {DEEP_DIVES.map((dive, index) => (
          <DeepDiveRow key={dive.title} {...dive} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
