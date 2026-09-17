import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import { MsnIcon, MsnWordmark } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './SiteFooter.module.scss';

interface LegalLink {
  labelKey: TranslationKey;
  to: string;
}

const LEGAL: LegalLink[] = [
  { labelKey: 'legal.terms.navLabel', to: '/terms' },
  { labelKey: 'legal.privacy.navLabel', to: '/privacy' },
  { labelKey: 'legal.mentions.navLabel', to: '/legal' },
];

export function SiteFooter(): JSX.Element {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <MsnIcon name="msn" size="20px" color="hsl(25, 90%, 55%)" />
              <MsnWordmark size={14} accent="hsl(25, 90%, 55%)" />
            </div>
            <p className={styles.tagline}>{t('landing.footer.tagline')}</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.legal}>
          <div>{t('landing.footer.copyright', { year: 2026 })}</div>
          <div className={styles.legalLinks}>
            {LEGAL.map((item) => (
              <Link key={item.labelKey} to={item.to} className={styles.link}>
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
