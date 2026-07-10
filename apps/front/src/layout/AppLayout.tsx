import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.scss';
import { LeftNav } from './LeftNav';

export function AppLayout(): JSX.Element {
  return (
    <div className={styles.shell}>
      <aside className={styles.nav}>
        <LeftNav />
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
