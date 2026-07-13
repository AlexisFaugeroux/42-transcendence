import { Avatar, Button, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { theme } from '@ui/theme/theme';
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
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <Tag color="orange">Beta · open access</Tag>
            <span className={styles.muted}>No install. Runs in the browser.</span>
          </div>

          <h1 className={styles.title}>
            Make beats.
            <br />
            Record takes.
            <br />
            <span className={styles.accent}>Make some noise.</span>
          </h1>

          <p className={styles.lead}>
            MakeSomeNoise is a browser-based studio for producing beats, recording sessions and mixing tracks — with a
            built-in audience. Stream live, share waveforms, and connect with other producers without leaving the page.
          </p>

          <div className={styles.ctas}>
            <Link to="/register">
              <Button type="primary" size="large">
                Sign up free <MsnIcon name="arrowR" size="12px" />
              </Button>
            </Link>
            <Button size="large">
              <MsnIcon name="play" size="12px" /> Watch a demo
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
              <strong className={styles.strong}>4,200+ producers</strong> already making noise
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
