import { useAuthUser } from '@transcendence/auth';
import { toAppTime } from '@transcendence/date';
import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import styles from './Greeting.module.scss';
import { SESSION_TYPES } from './home.data';
import { SessionCard } from './SessionCard';

function greetingKey() {
  const hour = toAppTime().hour();
  if (hour < 12) return 'home.greeting.morning' as const;
  if (hour < 18) return 'home.greeting.afternoon' as const;
  return 'home.greeting.evening' as const;
}

export function Greeting(): JSX.Element {
  const { firstname } = useAuthUser();
  const { t } = useTranslation();

  return (
    <>
      <header>
        <h1 className={styles.title}>{t(greetingKey(), { name: firstname })}</h1>
        <h2 className={styles.subtitle}>{t('home.greeting.subtitle')}</h2>
      </header>

      <section>
        <div className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>{t('home.greeting.startNew')}</h3>
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
