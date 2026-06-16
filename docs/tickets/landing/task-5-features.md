**Goal:** Build the features section — a centered heading plus a grid of six feature cards. 3 columns on desktop, 2 on tablet, 1 on mobile.

**Design source:** `design/landing.jsx` (the `FEATURES` section + `FeatureCard` + `FEATURES` array) · **Parent:** #11 · **Depends on:** Task 1

> This is the same data-driven pattern as Task 4, but each item now renders a small reusable
> **`FeatureCard`** component. We also start a shared `landing.data.ts` file for content arrays.

---

- [ ] **Step 1: Content data**

  `apps/front/src/pages/Landing/landing.data.ts`:

  ```ts
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';

  export interface Feature {
    icon: MsnIconLabel;
    color: string;
    title: string;
    desc: string;
    bullets: string[];
  }

  export const FEATURES: Feature[] = [
    {
      icon: 'produce',
      color: 'hsl(25, 90%, 55%)',
      title: 'Beat maker',
      desc: 'Drum scheduler, loops, instrument tracks and a timeline. Build a song in your tab.',
      bullets: ['Step sequencer', 'Loop crates', 'MIDI editor', 'Sample library'],
    },
    {
      icon: 'record',
      color: 'hsl(8, 85%, 55%)',
      title: 'Recording',
      desc: 'Capture vocals, instruments or field audio with monitoring and overdubs.',
      bullets: ['Multitrack', 'Punch-in', 'Latency comp', 'Take comping'],
    },
    {
      icon: 'mix',
      color: 'hsl(210, 90%, 50%)',
      title: 'Mixer & export',
      desc: 'Channel strips, sends, busses, EQ. Bounce to MP3, WAV, or stream to your profile.',
      bullets: ['Channel strips', 'Sends & busses', 'EQ + comp', 'MP3 / WAV export'],
    },
    {
      icon: 'waveform',
      color: 'hsl(190, 75%, 50%)',
      title: 'Waveform streaming',
      desc: 'Push live takes and finished tracks to listeners with a synced waveform UI.',
      bullets: ['Live sessions', 'Synced cursor', 'Listener counts', 'Replay'],
    },
    {
      icon: 'users',
      color: 'hsl(140, 65%, 45%)',
      title: 'Profiles & social',
      desc: 'Followers, playlists, likes, profiles. Find collaborators and build an audience.',
      bullets: ['Profiles', 'Follows', 'Playlists', 'Re-posts'],
    },
    {
      icon: 'chat',
      color: 'hsl(280, 65%, 60%)',
      title: 'Chat & sessions',
      desc: 'DM another producer or open a shared session. Trade stems without leaving the page.',
      bullets: ['DMs', 'Group chat', 'Shared sessions', 'Stem swap'],
    },
  ];
  ```

  > **Note:** `MsnIconLabel` is the union of valid icon names — typing `icon` with it means a typo
  > like `'produces'` is a compile error, not a silent blank icon.

- [ ] **Step 2: The card component**

  `apps/front/src/pages/Landing/FeatureCard.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Tag } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import type { Feature } from './landing.data';
  import styles from './FeatureCard.module.scss';

  export function FeatureCard({ icon, color, title, desc, bullets }: Feature): JSX.Element {
    return (
      <div className={styles.card}>
        <div className={styles.iconBox} style={{ color }}>
          <MsnIcon name={icon} size="22px" />
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          <p className={styles.desc}>{desc}</p>
        </div>
        <div className={styles.bullets}>
          {bullets.map((b) => (
            <Tag key={b}>{b}</Tag>
          ))}
        </div>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Landing/FeatureCard.module.scss`:

  ```scss
  .card {
    background: hsl(197, 14%, 12%); // --bg-card
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 22px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .iconBox {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsl(197, 14%, 3%);
    box-shadow: inset 0 0 0 0.5px currentColor;
  }

  .title {
    color: #fff;
    font-size: 17px;
    margin-bottom: 6px;
  }

  .desc {
    color: hsl(0, 0%, 56%);
    font-size: 13px;
    line-height: 1.5;
    margin: 0;
  }

  .bullets {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: auto; // pin tags to the bottom
  }
  ```

- [ ] **Step 3: The section**

  `apps/front/src/pages/Landing/Features.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { FeatureCard } from './FeatureCard';
  import { FEATURES } from './landing.data';
  import styles from './Features.module.scss';

  export function Features(): JSX.Element {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <div className={styles.eyebrow}>What it does</div>
            <h2 className={styles.title}>A studio, a stage, and a community — in one tab.</h2>
            <p className={styles.sub}>
              Every tool you need to go from an idea to a release, plus a live audience that hears it
              before anyone else.
            </p>
          </div>

          <div className={styles.grid}>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  ```

  `apps/front/src/pages/Landing/Features.module.scss`:

  ```scss
  .section {
    width: 100%;
    background: hsl(197, 14%, 8%); // --bg-panel-2
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 72px 24px;
  }

  .head {
    max-width: 720px;
    margin: 0 auto 48px;
    text-align: center;
  }

  .eyebrow {
    color: hsl(25, 90%, 55%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .title {
    margin: 0;
    color: #fff;
    font-size: 36px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .sub {
    max-width: 520px;
    margin: 12px auto 0;
    color: hsl(0, 0%, 56%);
    font-size: 14px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: 960px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .inner {
      padding: 48px 16px;
    }
    .title {
      font-size: 28px;
    }
    .grid {
      grid-template-columns: 1fr;
    }
  }
  ```

- [ ] **Step 4: Add it to the page**

  In `Landing.tsx`, render `<Features />` after `<StatsStrip />`.

- [ ] **Step 5: Verify**

  Six cards, 3-up on desktop, 2-up on tablet, 1-up on mobile. Each card has its colored icon, title,
  description and tag row; tags sit at the bottom even when descriptions differ in length.

**Done when:** grid reflows 3→2→1, cards match the design, `pnpm run check` passes.
