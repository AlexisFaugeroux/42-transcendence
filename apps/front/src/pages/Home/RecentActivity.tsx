import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';
import { ACTIVITY } from './home.data';
import styles from './RecentActivity.module.scss';
import { StatusAvatar } from './StatusAvatar';

export function RecentActivity(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section>
      <h3 className={styles.title}>{t('home.activity.title')}</h3>
      <div className={styles.strip}>
        {ACTIVITY.map((item) => (
          <div key={`${item.who}-${item.when}`} className={styles.cell}>
            <div className={styles.top}>
              <StatusAvatar name={item.who} size={18} />
              <span className={styles.who}>{item.who.split(' ')[0]}</span>
              <span className={styles.when}>{item.when}</span>
            </div>
            <div className={styles.text}>
              <span className={styles.did}>{item.did}</span> {item.what}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
