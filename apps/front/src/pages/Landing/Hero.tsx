import { Trans, useTranslation } from '@transcendence/i18n';
import { Avatar, Button, MsnIcon, Tag, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';
import { ImagePlaceholder } from './ImagePlaceholder';

// Sample data for the avatar stack (real data comes later from the backend).
// Each producer gets a distinct accent hue from the theme.
const PRODUCERS = [
  { color: theme.orange, name: 'Maya Okafor' },
  { color: theme.blue, name: 'Leo Tanaka' },
  { color: theme.green, name: 'Rosa Petrov' },
  { color: theme.purple, name: 'Ada Cole' },
  { color: theme.red, name: 'Sami Rez' },
];

export function Hero(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <Tag color="orange">{t('landing.hero.badge')}</Tag>
            <span className={styles.muted}>{t('landing.hero.noInstall')}</span>
          </div>

          <h1 className={styles.title}>
            {t('landing.hero.titleLine1')}
            <br />
            {t('landing.hero.titleLine2')}
            <br />
            <span className={styles.accent}>{t('landing.hero.titleLine3')}</span>
          </h1>

          <p className={styles.lead}>{t('landing.hero.lead')}</p>

          <div className={styles.ctas}>
            <Link to="/register">
              <Button type="primary" size="large">
                {t('auth.register.action')} <MsnIcon name="arrowR" size="12px" />
              </Button>
            </Link>
            <Button size="large">
              <MsnIcon name="play" size="12px" /> {t('landing.hero.watchDemo')}
            </Button>
            <span className={styles.muted}>2:14</span>
          </div>

          <div className={styles.social}>
            <Avatar.Group>
              {PRODUCERS.map(({ color, name }) => (
                <Avatar key={name} size={26} shape="square" style={{ backgroundColor: color, fontSize: 11 }}>
                  {name.slice(0, 2).toUpperCase()}
                </Avatar>
              ))}
            </Avatar.Group>
            <span className={styles.muted}>
              <Trans
                i18nKey="landing.hero.producers"
                components={{ strong: <strong className={styles.strong} /> }}
                values={{ total: 4200 }}
              />
            </span>
          </div>
        </div>

        <div className={styles.art}>
          <ImagePlaceholder label="HERO_SCREENSHOT — beat maker / mixer view" height={420} />
        </div>
      </div>
    </section>
  );
}
