import type { JSX } from 'react';
import { Community } from './Community';
import { Cta } from './Cta';
import { DeepDives } from './DeepDives';
import { Features } from './Features';
import { Hero } from './Hero';
import styles from './Landing.module.scss';
import { SiteFooter } from './SiteFooter';
import { StatsStrip } from './StatsStrip';
import { TopNav } from './TopNav';

export function Landing(): JSX.Element {
  return (
    <div className={styles.page}>
      <TopNav />
      <Hero />
      <StatsStrip />
      <Features />
      <DeepDives />
      <Community />
      <Cta />
      <SiteFooter />
    </div>
  );
}
