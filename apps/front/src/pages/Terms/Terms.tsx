import { toLanguage, useTranslation } from '@transcendence/i18n';
import type { Language } from '@transcendence/i18n';
import type { FC, JSX } from 'react';
import { SiteFooter } from '../Landing/SiteFooter';
import { TopNav } from '../Landing/TopNav';
import { TermsEn } from './Terms.en';
import { TermsEs } from './Terms.es';
import { TermsFr } from './Terms.fr';
import styles from './Terms.module.scss';

// Long-form legal prose lives in one component per language rather than in the
// JSON locales: whole paragraphs are unreadable as translation keys and impossible
// to review in a diff.
const CONTENT: Record<Language, FC> = {
  en: TermsEn,
  es: TermsEs,
  fr: TermsFr,
};

// Static terms of use page. Placeholder content adapted to MakeSomeNoise —
// the "to be completed" fields are for the team to fill in (see issue #144).
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
