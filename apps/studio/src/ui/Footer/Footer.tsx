import { theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import styles from './Footer.module.scss';
import { FooterItem } from './FooterItem';

export function Footer(): JSX.Element {
  const { audioContext } = useProject();

  const latency = audioContext.baseLatency + audioContext.outputLatency * 1000;

  function latencyColor(latencyMs: number, min = 0, max = 40): string {
    const t = Math.min(1, Math.max(0, (latencyMs - min) / (max - min)));
    const hue = 120 * (1 - t);
    return `hsl(${hue}, 70%, 50%)`;
  }

  return (
    <footer className={styles.footerContainer}>
      <FooterItem label="Online" value={<span style={{ color: theme.green }}>● Yes</span>} />
      <FooterItem label="Users" value={<span>3 live</span>} />
      <FooterItem label="Latency" value={`${latency.toFixed()} ms`} accent={latencyColor(latency)} />

      <div className={styles.footerDivider} />
      <span className={styles.footerLegalMentions}>
        {/* TODO: Link to privacy terms page */}
        <a className={styles.footerPrivacy}>Privacy</a>
      </span>
    </footer>
  );
}
