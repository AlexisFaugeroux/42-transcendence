import type { JSX } from 'react';
import { useAuthUser } from '@auth/src';
import styles from './Greeting.module.scss';
import { SESSION_TYPES } from './home.data';
import { SessionCard } from './SessionCard';

export function Greeting(): JSX.Element {
  const { firstname } = useAuthUser();

  return (
    <>
      <header>
        <h1 className={styles.title}>Good evening, {firstname}.</h1>
        <h2 className={styles.subtitle}>Pick up where you left off, or start something new.</h2>
      </header>

      <section>
        <div className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>Start a new session</h3>
        </div>
        <div className={styles.cards}>
          {SESSION_TYPES.map((session) => (
            <SessionCard {...session} key={session.key} />
          ))}
        </div>
      </section>
    </>
  );
}
