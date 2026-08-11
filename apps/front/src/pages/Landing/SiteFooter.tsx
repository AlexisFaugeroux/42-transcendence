import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import { MsnIcon, MsnWordmark } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './SiteFooter.module.scss';

interface FooterCol {
  titleKey: TranslationKey;
  linkKeys: TranslationKey[];
}

// `to` set → routed page exists; otherwise still a placeholder anchor.
interface LegalLink {
  labelKey: TranslationKey;
  to?: string;
}

const COLUMNS: FooterCol[] = [
  {
    linkKeys: [
      'landing.footer.product.features',
      'landing.footer.product.beatMaker',
      'landing.footer.product.recording',
      'landing.footer.product.mixer',
      'landing.footer.product.stream',
    ],
    titleKey: 'landing.footer.product.title',
  },
  {
    linkKeys: [
      'landing.footer.community.discover',
      'landing.footer.community.playlists',
      'landing.footer.community.liveNow',
      'landing.footer.community.discord',
      'landing.footer.community.newsletter',
    ],
    titleKey: 'landing.footer.community.title',
  },
  {
    linkKeys: [
      'landing.footer.resources.manuals',
      'landing.footer.resources.tutorials',
      'landing.footer.resources.changelog',
      'landing.footer.resources.status',
      'landing.footer.resources.roadmap',
    ],
    titleKey: 'landing.footer.resources.title',
  },
  {
    linkKeys: ['landing.footer.company.about', 'landing.footer.company.contact', 'landing.footer.company.press'],
    titleKey: 'landing.footer.company.title',
  },
];

const LEGAL: LegalLink[] = [
  { labelKey: 'legal.terms.navLabel', to: '/terms' },
  { labelKey: 'legal.privacy.navLabel', to: '/privacy' },
  { labelKey: 'legal.mentions.navLabel', to: '/legal' },
  { labelKey: 'legal.cookies.navLabel' },
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

          {COLUMNS.map((col) => (
            <div key={col.titleKey}>
              <div className={styles.colTitle}>{t(col.titleKey)}</div>
              <ul className={styles.linkList}>
                {col.linkKeys.map((linkKey) => (
                  <li key={linkKey}>
                    <a href="#" className={styles.link}>
                      {t(linkKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.legal}>
          <div>{t('landing.footer.copyright', { year: 2026 })}</div>
          <div className={styles.legalLinks}>
            {LEGAL.map((item) =>
              item.to ? (
                <Link key={item.labelKey} to={item.to} className={styles.link}>
                  {t(item.labelKey)}
                </Link>
              ) : (
                <a key={item.labelKey} href="#" className={styles.link}>
                  {t(item.labelKey)}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
