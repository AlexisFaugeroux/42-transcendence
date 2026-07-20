import { Button, MsnIcon, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './SessionsEmpty.module.scss';

// Shown when a bucket has no sessions at all.
export function SessionsEmpty({ bucket, onNew }: { bucket: 'owned' | 'archived'; onNew: () => void }): JSX.Element {
  if (bucket === 'archived') {
    return (
      <div className={styles.box}>
        <MsnIcon name="folder" size="28px" color={theme.blue} />
        <h3 className={styles.title}>Nothing archived</h3>
        <p className={styles.text}>Archived sessions will live here when you&apos;re done with them.</p>
      </div>
    );
  }
  return (
    <div className={`${styles.box} ${styles.glow}`}>
      <div className={styles.logos}>
        <span style={{ color: theme.orange }}>
          <MsnIcon name="produce" size="22px" />
        </span>
        <span style={{ color: theme.red }}>
          <MsnIcon name="record" size="22px" />
        </span>
        <span style={{ color: theme.blue }}>
          <MsnIcon name="mix" size="22px" />
        </span>
      </div>
      <h3 className={styles.title}>No sessions yet</h3>
      <p className={styles.text}>
        Sessions are where you record, produce and mix. Start your first one — it takes about three seconds.
      </p>
      <Button type="primary" size="large" onClick={onNew}>
        <MsnIcon name="plus" size="13px" /> Create your first session
      </Button>
    </div>
  );
}

// Shown when filters hide everything in a non-empty bucket.
export function SessionsNoMatches({ onClear }: { onClear: () => void }): JSX.Element {
  return (
    <div className={styles.box}>
      <MsnIcon name="search" size="22px" color={theme.orange} />
      <h3 className={styles.title}>No sessions match these filters</h3>
      <p className={styles.text}>Try changing your filters or clearing them.</p>
      <Button onClick={onClear}>Clear filters</Button>
    </div>
  );
}
