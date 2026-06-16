**Goal:** Build the hero — headline, lead paragraph, primary/secondary CTAs, the "4,200+ producers" avatar stack, and the hero image slot. Two columns on desktop, stacked on mobile.

**Design source:** `design/landing.jsx` (the `HERO` section) · **Parent:** #11 · **Depends on:** Task 1, #48

> See Task 1 for shared conventions and the `ImagePlaceholder` component.

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Landing/Hero.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Link } from 'react-router';
  import { Avatar, Button, Tag } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { ImagePlaceholder } from './ImagePlaceholder';
  import styles from './Hero.module.scss';

  // Sample data for the avatar stack (real data comes later from the backend).
  const PRODUCERS = ['Maya Okafor', 'Leo Tanaka', 'Rosa Petrov', 'Ada Cole', 'Sami Rez'];

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
              MakeSomeNoise is a browser-based studio for producing beats, recording sessions and
              mixing tracks — with a built-in audience. Stream live, share waveforms, and connect
              with other producers without leaving the page.
            </p>

            <div className={styles.ctas}>
              <Link to="/signup">
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
                {PRODUCERS.map((name) => (
                  <Avatar key={name} size={26}>
                    {name.charAt(0)}
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
  ```

  > **antd mapping:** the design's custom `MsnSolid`/`MsnFramed`/`MsnTag`/`MsnAvatar` become antd
  > `Button type="primary"` / `Button` / `Tag` / `Avatar`. The live waveform floating card from the
  > mockup is decorative — skip it for now (optional polish later).

- [ ] **Step 2: Styles (responsive 2-col → 1-col)**

  `apps/front/src/pages/Landing/Hero.module.scss`:

  ```scss
  .hero {
    width: 100%;
    background: hsl(197, 14%, 8%); // --bg-panel-2
    background-image: radial-gradient(
      circle at 80% 20%,
      hsla(25, 90%, 55%, 0.1),
      transparent 55%
    );
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 72px 24px 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .title {
    margin: 18px 0 0;
    color: #fff;
    font-size: 64px;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.015em;
  }

  .accent {
    color: hsl(25, 90%, 55%);
  }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lead {
    max-width: 480px;
    margin: 20px 0 0;
    color: hsl(0, 0%, 56%);
    font-size: 16px;
    line-height: 1.55;
  }

  .ctas {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
    flex-wrap: wrap;
  }

  .social {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 28px;
  }

  .muted {
    color: hsl(0, 0%, 38%);
    font-size: 12px;
  }

  .strong {
    color: hsl(0, 0%, 92%);
    font-weight: 400;
  }

  @media (max-width: 960px) {
    .inner {
      grid-template-columns: 1fr; // stack copy over art
      gap: 32px;
      padding: 48px 24px;
    }

    .title {
      font-size: 44px;
    }
  }

  @media (max-width: 600px) {
    .inner {
      padding: 36px 16px;
    }

    .title {
      font-size: 36px;
    }
  }
  ```

- [ ] **Step 3: Add it to the page**

  In `Landing.tsx`, render `<Hero />` right after `<TopNav />`.

- [ ] **Step 4: Verify**

  Headline, CTAs and avatar stack show on the left, image slot on the right. **Sign up free** →
  `/signup`. Below ~960px the two columns stack and the headline shrinks; nothing overflows
  horizontally.

**Done when:** hero matches the design at desktop width, stacks cleanly on mobile, CTA routes work,
`pnpm run check` passes.
