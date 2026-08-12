import type { JSX } from 'react';
import { LeftNav } from '../../layout/LeftNav';
import { Greeting } from './Greeting';
import styles from './Home.module.scss';
import { RecentActivity } from './RecentActivity';
import { RightRail } from './RightRail';
import { SavedSessions } from './SavedSessions';
import { TopBar } from './TopBar';
import { useSocket } from '../../websocket/WebSocketProvider';

export function Home(): JSX.Element {

  const { followingConnected } = useSocket();

  return (
    <div className={styles.shell}>
    <div>{followingConnected.length}</div>
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
