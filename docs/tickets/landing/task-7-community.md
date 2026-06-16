**Goal:** Build the community section — a two-column block with copy + an icon bullet list on one side and an image slot on the other. Side-by-side on desktop, stacked on mobile.

**Design source:** `design/landing.jsx` (the `SOCIAL / COMMUNITY` section) · **Parent:** #11 · **Depends on:** Task 1

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Landing/Community.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';
  import { ImagePlaceholder } from './ImagePlaceholder';
  import styles from './Community.module.scss';

  interface Bullet {
    icon: MsnIconLabel;
    color: string;
    text: string;
  }

  const BULLETS: Bullet[] = [
    { icon: 'chat', color: 'hsl(210, 90%, 50%)', text: 'Direct messaging and group chat' },
    { icon: 'users', color: 'hsl(140, 65%, 45%)', text: 'Profiles, follows and live presence' },
    { icon: 'list', color: 'hsl(280, 65%, 60%)', text: 'Shared playlists and re-posts' },
    { icon: 'heart', color: 'hsl(8, 85%, 55%)', text: 'Timestamp-pinned likes and comments' },
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
              Stream sessions live. Drop tracks into shared playlists. DM another producer to swap
              stems. Likes, follows and comments tied to the waveform itself — feedback lands on the
              bar it was meant for.
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
  ```

- [ ] **Step 2: Styles (responsive 2-col → 1-col)**

  `apps/front/src/pages/Landing/Community.module.scss`:

  ```scss
  .section {
    width: 100%;
    background: hsl(197, 14%, 6%); // --bg-panel
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 72px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
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
    font-size: 32px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .accent {
    color: hsl(25, 90%, 55%);
  }

  .body {
    max-width: 480px;
    margin: 14px 0 0;
    color: hsl(0, 0%, 56%);
    font-size: 14px;
    line-height: 1.55;
  }

  .bullets {
    list-style: none;
    padding: 0;
    margin: 24px 0 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .bullet {
    display: flex;
    align-items: center;
    gap: 12px;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
  }

  @media (max-width: 860px) {
    .inner {
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 48px 24px;
    }
  }

  @media (max-width: 600px) {
    .inner {
      padding: 40px 16px;
    }
    .title {
      font-size: 26px;
    }
  }
  ```

- [ ] **Step 3: Add it to the page**

  In `Landing.tsx`, render `<Community />` after `<DeepDives />`.

- [ ] **Step 4: Verify**

  Text + bullet list on the left, image slot on the right; each bullet has a colored icon. Below
  ~860px the two columns stack (text first).

**Done when:** section matches the design, stacks cleanly on mobile, `pnpm run check` passes.
