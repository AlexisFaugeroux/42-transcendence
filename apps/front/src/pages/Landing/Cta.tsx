import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cta.module.scss';

export function Cta(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          {t('landing.cta.title')} <span className={styles.accent}>{t('landing.cta.titleAccent')}</span>
        </h2>
        <p className={styles.sub}>{t('landing.cta.sub')}</p>
        <div className={styles.actions}>
          <Link to="/register">
            <Button type="primary" size="large">
              {t('auth.register.action')} <MsnIcon name="arrowR" size="12px" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="large">{t('auth.login.action')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
