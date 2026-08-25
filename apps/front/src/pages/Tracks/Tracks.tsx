import type { JSX } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import styles from '../Samples/Samples.module.scss';

export function Tracks(): JSX.Element {
  return (
    <div className={styles.page}>
      <AppHeader active="tracks" />
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>Workspace</div>
            <h1 className={styles.title}>Tracks</h1>
          </div>
        </div>
      </div>
    </div>
  );
}