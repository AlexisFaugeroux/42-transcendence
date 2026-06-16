**Goal:** Build the deep-dive section — three alternating rows (text on one side, image on the other, flipping each row). Side-by-side on desktop, stacked on mobile.

**Design source:** `design/landing.jsx` (the `DEEP-DIVE ALTERNATING ROWS` section + `DeepDiveRow` + `DEEP_DIVES`) · **Parent:** #11 · **Depends on:** Task 1, Task 5 (extends `landing.data.ts`)

---

- [ ] **Step 1: Add the data**

  Append to `apps/front/src/pages/Landing/landing.data.ts`:

  ```ts
  export interface DeepDive {
    eyebrow: string;
    title: string;
    body: string;
    accent: string;
    image: string;
  }

  export const DEEP_DIVES: DeepDive[] = [
    {
      eyebrow: 'PRODUCTION',
      title: 'A drum machine that thinks like a sequencer.',
      body: 'Schedule beats on a step grid, swap kits with a keystroke, automate any parameter on the fly. Loop crates and a global metronome keep the groove tight.',
      accent: 'hsl(25, 90%, 55%)',
      image: 'BEAT_MAKER_SCREENSHOT — step sequencer, sampler, drum kit',
    },
    {
      eyebrow: 'STREAMING',
      title: 'Stream a session. Watch listeners arrive.',
      body: 'Go live with one click. Listeners see the same waveform you see, comment on specific bars, and clip their favourite moments. Replays stay in your profile.',
      accent: 'hsl(8, 85%, 55%)',
      image: 'STREAM_SCREENSHOT — live session view with listener cursors',
    },
    {
      eyebrow: 'MIXING',
      title: "Channel strips that don't get in your way.",
      body: 'Pre-built busses, sends to anywhere, EQ and comp on every channel. Master out to your profile or download a clean WAV.',
      accent: 'hsl(210, 90%, 50%)',
      image: 'MIXER_SCREENSHOT — channel strip mixer with master meter',
    },
  ];
  ```

- [ ] **Step 2: The row component**

  `apps/front/src/pages/Landing/DeepDiveRow.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { ImagePlaceholder } from './ImagePlaceholder';
  import type { DeepDive } from './landing.data';
  import styles from './DeepDiveRow.module.scss';

  interface DeepDiveRowProps extends DeepDive {
    reverse: boolean;
  }

  export function DeepDiveRow({
    eyebrow,
    title,
    body,
    accent,
    image,
    reverse,
  }: DeepDiveRowProps): JSX.Element {
    return (
      <div className={`${styles.row} ${reverse ? styles.reverse : ''}`}>
        <div className={styles.text}>
          <div className={styles.eyebrow} style={{ color: accent }}>
            {eyebrow}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.body}>{body}</p>
          <a href="#" className={styles.more} style={{ color: accent }}>
            Learn more <MsnIcon name="arrowR" size="11px" />
          </a>
        </div>
        <div className={styles.art}>
          <ImagePlaceholder label={image} height={300} accent={accent} />
        </div>
      </div>
    );
  }
  ```

  > **How the alternation works:** the parent passes `reverse` for every odd row. In CSS, `.reverse`
  > swaps the column order so the image lands on the other side — the markup order never changes
  > (which keeps it accessible and keeps the stacked-mobile order text-then-image).

- [ ] **Step 3: Styles (responsive + alternation)**

  `apps/front/src/pages/Landing/DeepDiveRow.module.scss`:

  ```scss
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
    padding: 56px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  // Flip the columns on alternate rows (desktop only).
  .reverse .text {
    order: 2;
  }
  .reverse .art {
    order: 1;
  }

  .eyebrow {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .title {
    margin: 0;
    color: #fff;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .body {
    max-width: 460px;
    margin: 14px 0 22px;
    color: hsl(0, 0%, 56%);
    font-size: 14px;
    line-height: 1.55;
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }

  @media (max-width: 860px) {
    .row {
      grid-template-columns: 1fr; // stack
      gap: 24px;
      padding: 40px 0;
    }

    // When stacked, always show text first regardless of reverse.
    .reverse .text {
      order: 0;
    }
    .reverse .art {
      order: 0;
    }
  }
  ```

- [ ] **Step 4: The section**

  `apps/front/src/pages/Landing/DeepDives.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { DeepDiveRow } from './DeepDiveRow';
  import { DEEP_DIVES } from './landing.data';
  import styles from './DeepDives.module.scss';

  export function DeepDives(): JSX.Element {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          {DEEP_DIVES.map((dive, index) => (
            <DeepDiveRow key={dive.title} {...dive} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>
    );
  }
  ```

  `apps/front/src/pages/Landing/DeepDives.module.scss`:

  ```scss
  .section {
    width: 100%;
    background: hsl(197, 14%, 8%); // --bg-panel-2
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 48px;
  }

  @media (max-width: 600px) {
    .inner {
      padding: 0 16px 32px;
    }
  }
  ```

- [ ] **Step 5: Add it to the page**

  In `Landing.tsx`, render `<DeepDives />` after `<Features />`.

- [ ] **Step 6: Verify**

  Three rows: row 1 text-left/image-right, row 2 flipped, row 3 like row 1. Below ~860px every row
  stacks with the text on top.

**Done when:** rows alternate on desktop, stack text-first on mobile, `pnpm run check` passes.
