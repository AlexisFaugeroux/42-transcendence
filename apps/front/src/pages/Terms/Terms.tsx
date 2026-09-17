import { toLanguage, useTranslation } from '@transcendence/i18n';
import type { Language } from '@transcendence/i18n';
import type { FC, JSX } from 'react';
import { SiteFooter } from '../Landing/SiteFooter';
import { TopNav } from '../Landing/TopNav';
import { TermsEn } from './Terms.en';
import { TermsEs } from './Terms.es';
import { TermsFr } from './Terms.fr';
import styles from './Terms.module.scss';

const CONTENT: Record<Language, FC> = {
  en: TermsEn,
  es: TermsEs,
  fr: TermsFr,
};

export function Terms(): JSX.Element {
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

export default Terms;
