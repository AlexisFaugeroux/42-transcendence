import { MsnIcon, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './FeatureCard.module.scss';
import type { Feature } from './landing.data';

export function FeatureCard({ bullets, color, desc, icon, title }: Feature): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox} style={{ color }}>
        <MsnIcon name={icon} size="22px" />
      </div>
      <div>
        <div className={styles.title}>{title}</div>
        <p className={styles.desc}>{desc}</p>
      </div>
      <div className={styles.bullets}>
        {bullets.map((b) => (
          <Tag key={b}>{b}</Tag>
        ))}
      </div>
    </div>
  );
}
