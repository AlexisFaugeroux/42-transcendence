import { useIsAllowed } from '@transcendence/auth';
import type { JSX } from 'react';
import { Permissions } from '@transcendence/permissions';
import { Greeting } from './Greeting';
import styles from './Home.module.scss';
import { RightRail } from './RightRail';
import { SavedSessions } from './SavedSessions';

export function Home(): JSX.Element {
  const isAllowed = useIsAllowed();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Greeting />
        {isAllowed(Permissions.STUDIO_ACCESS) ? <SavedSessions /> : <></>}
      </main>

      <div className={styles.rightrail}>
        <RightRail />
      </div>
    </div>
  );
}
