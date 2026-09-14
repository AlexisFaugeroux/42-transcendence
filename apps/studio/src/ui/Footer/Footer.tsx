import { useTranslation } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import styles from './Footer.module.scss';
import { FooterItem } from './FooterItem';

const FRONT_URL = import.meta.env.VITE_FRONT_URL;

export function Footer(): JSX.Element {
  const { audioContext } = useProject();
  const { t } = useTranslation();

  const latency = audioContext.baseLatency + audioContext.outputLatency * 1000;

  function latencyColor(latencyMs: number, min = 0, max = 40): string {
    const t = Math.min(1, Math.max(0, (latencyMs - min) / (max - min)));
    const hue = 120 * (1 - t);
    return `hsl(${hue}, 70%, 50%)`;
  }

  return (
    <footer className={styles.footerContainer}>
      <FooterItem
        label={t('studio.footer.online')}
        value={<span style={{ color: theme.green }}>● {t('common.yes')}</span>}
      />
      <FooterItem
        label={t('studio.footer.latency')}
        value={t('studio.footer.latencyValue', { ms: latency.toFixed() })}
        accent={latencyColor(latency)}
      />

      <div className={styles.footerDivider} />
      <span className={styles.footerLegalMentions}>
        <a
          className={styles.footerPrivacy}
          href={`${FRONT_URL}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('legal.privacy.navLabel')}
        </a>
      </span>
    </footer>
  );
}
