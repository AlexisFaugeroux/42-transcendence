**Goal:** Build the KPI / stats strip — four big numbers under the hero. 4 columns on desktop, 2 on tablet, 1 on mobile.

**Design source:** `design/landing.jsx` (the `TRUSTED-BY / KPI STRIP` section) · **Parent:** #11 · **Depends on:** Task 1

> This task introduces the **data-driven pattern** used a lot from here on: keep the content in an
> array and `.map()` over it, instead of copy-pasting markup four times.

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Landing/StatsStrip.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import styles from './StatsStrip.module.scss';

  interface Stat {
    value: string;
    label: string;
    color: string;
  }

  const STATS: Stat[] = [
    { value: '4.2k+', label: 'active producers', color: 'hsl(25, 90%, 55%)' },
    { value: '180k', label: 'tracks streamed', color: 'hsl(210, 90%, 50%)' },
    { value: '0', label: 'downloads required', color: 'hsl(140, 65%, 45%)' },
    { value: '100%', label: 'in-browser audio', color: 'hsl(280, 65%, 60%)' },
  ];

  export function StatsStrip(): JSX.Element {
    return (
      <section className={styles.strip}>
        <div className={styles.inner}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.cell}>
              <div className={styles.value} style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  ```

  > **Why the array?** Adding/removing a stat is a one-line data change, and the markup stays in one
  > place. The accent `color` is dynamic per item, so it goes in an inline `style` (the rest is in SCSS).

- [ ] **Step 2: Styles (responsive 4 → 2 → 1)**

  `apps/front/src/pages/Landing/StatsStrip.module.scss`:

  ```scss
  .strip {
    width: 100%;
    background: hsl(197, 14%, 6%); // --bg-panel
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .cell {
    padding: 14px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-left: 1px solid rgba(255, 255, 255, 0.04);

    &:first-child {
      border-left: none;
    }
  }

  .value {
    font-size: 28px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .label {
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 760px) {
    .inner {
      grid-template-columns: repeat(2, 1fr);
    }

    // With 2 columns, only reset the left border on the 1st item of each row.
    .cell:nth-child(odd) {
      border-left: none;
    }
  }

  @media (max-width: 440px) {
    .inner {
      grid-template-columns: 1fr;
    }

    .cell {
      border-left: none;
    }
  }
  ```

- [ ] **Step 3: Add it to the page**

  In `Landing.tsx`, render `<StatsStrip />` after `<Hero />`.

- [ ] **Step 4: Verify**

  Four colored numbers in a row on desktop; 2×2 on tablet; a single column on a phone. The divider
  lines look right at each size (no stray left border at the start of a row).

**Done when:** the strip reflows correctly at all three sizes, `pnpm run check` passes.
