import { toLanguage, useTranslation } from '@transcendence/i18n';
import type { Language } from '@transcendence/i18n';
import type { FC, JSX } from 'react';
import { SiteFooter } from '../Landing/SiteFooter';
import { TopNav } from '../Landing/TopNav';
import { PrivacyEn } from './Privacy.en';
import { PrivacyEs } from './Privacy.es';
import { PrivacyFr } from './Privacy.fr';
import styles from './Privacy.module.scss';

const CONTENT: Record<Language, FC> = {
  en: PrivacyEn,
  es: PrivacyEs,
  fr: PrivacyFr,
};

// Static privacy policy page. Placeholder content adapted to MakeSomeNoise —
// the "to be completed" fields are for the team to fill in (see issue #142).
export function Privacy(): JSX.Element {
  const { i18n } = useTranslation();
  const Content = CONTENT[toLanguage(i18n.resolvedLanguage)];

  return (
    <div className={styles.page}>
      <TopNav />
      <main className={styles.content}>
        <Content />
      </main>
      <SiteFooter />
    </div>
  );
}

export default Privacy;
