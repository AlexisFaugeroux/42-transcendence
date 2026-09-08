import { useUser } from '@transcendence/auth';
import { LanguageSelect, type TranslationKey, useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon, MsnWordmark } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopNav.module.scss';

// No pages for these yet — placeholder anchors until those sections exist.
const NAV_LINKS: TranslationKey[] = [
  'landing.nav.features',
  'landing.nav.makeBeats',
  'landing.nav.stream',
  'landing.nav.community',
  'landing.nav.manuals',
];

export function TopNav(): JSX.Element {
  const { t } = useTranslation();
  const { user, loading } = useUser();

  return (
    <header className={styles.nav}>
      <div className={styles.bar}>
        <Link to={user ? '/home' : '/'} className={styles.brand}>
          <MsnIcon name="msn" size="22px" color="hsl(25, 90%, 55%)" />
          <MsnWordmark size={16} accent="hsl(25, 90%, 55%)" />
        </Link>

        <nav className={styles.links}>
          {NAV_LINKS.map((labelKey) => (
            <a key={labelKey} href="#" className={styles.link}>
              {t(labelKey)}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSelect />
          {loading ? null : user ? (
            <Link to="/home">
              <Button type="primary">{t('header.home')}</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button>{t('auth.login.action')}</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">{t('auth.register.action')}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
