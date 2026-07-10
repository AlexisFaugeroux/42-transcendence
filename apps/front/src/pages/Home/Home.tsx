import type { JSX } from 'react';
import { LeftNav } from '../../layout/LeftNav';
import { Greeting } from './Greeting';
import styles from './Home.module.scss';
import { RecentActivity } from './RecentActivity';
import { RightRail } from './RightRail';
import { SavedSessions } from './SavedSessions';
import { TopBar } from './TopBar';

export function Home(): JSX.Element {
  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <TopBar />
      </div>

      <div className={styles.leftnav}>
        <LeftNav />
      </div>

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
