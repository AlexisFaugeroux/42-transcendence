import { toLanguage, useTranslation } from '@transcendence/i18n';
import type { Language } from '@transcendence/i18n';
import type { FC, JSX } from 'react';
import { SiteFooter } from '../Landing/SiteFooter';
import { TopNav } from '../Landing/TopNav';
import { LegalEn } from './Legal.en';
import { LegalEs } from './Legal.es';
import { LegalFr } from './Legal.fr';
import styles from './Legal.module.scss';

const CONTENT: Record<Language, FC> = {
  en: LegalEn,
  es: LegalEs,
  fr: LegalFr,
};

export function Legal(): JSX.Element {
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

export default Legal;
