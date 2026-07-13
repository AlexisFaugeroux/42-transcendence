import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import type { MsnIconLabel } from '@ui/components/MsnIcon/types';
import styles from './Community.module.scss';
import { ImagePlaceholder } from './ImagePlaceholder';

interface Bullet {
  icon: MsnIconLabel;
  color: string;
  text: string;
}

const BULLETS: Bullet[] = [
  { color: 'hsl(210, 90%, 50%)', icon: 'chat', text: 'Direct messaging and group chat' },
  { color: 'hsl(140, 65%, 45%)', icon: 'users', text: 'Profiles, follows and live presence' },
  { color: 'hsl(280, 65%, 60%)', icon: 'list', text: 'Shared playlists and re-posts' },
  { color: 'hsl(8, 85%, 55%)', icon: 'heart', text: 'Timestamp-pinned likes and comments' },
];

export function Community(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <div className={styles.eyebrow}>Community</div>
          <h2 className={styles.title}>
            Built-in audience. <span className={styles.accent}>From the first beat.</span>
          </h2>
          <p className={styles.body}>
            Stream sessions live. Drop tracks into shared playlists. DM another producer to swap stems. Likes, follows
            and comments tied to the waveform itself — feedback lands on the bar it was meant for.
          </p>
          <ul className={styles.bullets}>
            {BULLETS.map((bullet) => (
              <li key={bullet.text} className={styles.bullet}>
                <span style={{ color: bullet.color, display: 'inline-flex' }}>
                  <MsnIcon name={bullet.icon} size="16px" />
                </span>
                {bullet.text}
              </li>
            ))}
          </ul>
        </div>

        <ImagePlaceholder
          label="COMMUNITY_SCREENSHOT — chat / live listening party"
          height={360}
          accent="hsl(210, 90%, 50%)"
        />
      </div>
    </section>
  );
}
