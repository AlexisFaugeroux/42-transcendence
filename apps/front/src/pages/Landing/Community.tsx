import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { MsnIconLabel } from '@transcendence/ui';
import type { JSX } from 'react';
import frontProducer from '../../assets/landing/front-producers.png';
import styles from './Community.module.scss';

interface Bullet {
  icon: MsnIconLabel;
  color: string;
  textKey: TranslationKey;
}

const BULLETS: Bullet[] = [
  { color: 'hsl(210, 90%, 50%)', icon: 'chat', textKey: 'landing.community.bullets.messaging' },
  { color: 'hsl(140, 65%, 45%)', icon: 'users', textKey: 'landing.community.bullets.presence' },
  { color: 'hsl(280, 65%, 60%)', icon: 'list', textKey: 'landing.community.bullets.playlists' },
  { color: 'hsl(8, 85%, 55%)', icon: 'heart', textKey: 'landing.community.bullets.likes' },
];

export function Community(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <div className={styles.eyebrow}>{t('landing.community.eyebrow')}</div>
          <h2 className={styles.title}>
            {t('landing.community.title')}{' '}
            <span className={styles.accent}>{t('landing.community.titleAccent')}</span>
          </h2>
          <p className={styles.body}>{t('landing.community.body')}</p>
          <ul className={styles.bullets}>
            {BULLETS.map((bullet) => (
              <li key={bullet.textKey} className={styles.bullet}>
                <span style={{ color: bullet.color, display: 'inline-flex' }}>
                  <MsnIcon name={bullet.icon} size="16px" />
                </span>
                {t(bullet.textKey)}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={frontProducer}
          alt={t('landing.hero.screenshotAlt')}
          className={styles.shot}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
