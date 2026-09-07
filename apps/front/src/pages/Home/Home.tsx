import type { JSX } from 'react';
import { Greeting } from './Greeting';
import styles from './Home.module.scss';
import { RecentActivity } from './RecentActivity';
import { RightRail } from './RightRail';
import { SavedSessions } from './SavedSessions';

export function Home(): JSX.Element {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Greeting />
        <SavedSessions />
        <RecentActivity />
      </main>

      <div className={styles.rightrail}>
        <RightRail />
      </div>
    </div>
  );
}
