import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import styles from './SiteFooter.module.scss';

interface FooterCol {
  title: string;
  links: string[];
}

const COLUMNS: FooterCol[] = [
  { links: ['Features', 'Beat maker', 'Recording', 'Mixer', 'Stream'], title: 'Product' },
  { links: ['Discover', 'Playlists', 'Live now', 'Discord', 'Newsletter'], title: 'Community' },
  { links: ['Manuals', 'Tutorials', 'Changelog', 'Status', 'Roadmap'], title: 'Resources' },
  { links: ['About', 'Contact', 'Press kit'], title: 'Company' },
];

const LEGAL = ['Legal mentions', 'Privacy', 'Terms', 'Cookies'];

export function SiteFooter(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <MsnIcon name="msn" size="20px" color="hsl(25, 90%, 55%)" />
              <MsnWordmark size={14} accent="hsl(25, 90%, 55%)" />
            </div>
            <p className={styles.tagline}>A browser-based studio with a built-in audience. No installs, no tracking.</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className={styles.colTitle}>{col.title}</div>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.link}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.legal}>
          <div>© 2026 MakeSomeNoise. Built with ♥.</div>
          <div className={styles.legalLinks}>
            {LEGAL.map((item) => (
              <a key={item} href="#" className={styles.link}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
