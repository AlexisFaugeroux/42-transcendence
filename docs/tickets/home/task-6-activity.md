**Goal:** Build the "Recent activity" strip — a single row of equal-width activity cells.

**Design source:** `design/home-variant-a.jsx` (the activity `section`) · **Parent:** #14 · **Depends on:** Task 1

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Home/RecentActivity.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { StatusAvatar } from './StatusAvatar';
  import { ACTIVITY } from './home.data';
  import styles from './RecentActivity.module.scss';

  export function RecentActivity(): JSX.Element {
    return (
      <section>
        <h3 className={styles.title}>Recent activity</h3>
        <div className={styles.strip}>
          {ACTIVITY.map((item) => (
            <div key={`${item.who}-${item.when}`} className={styles.cell}>
              <div className={styles.top}>
                <StatusAvatar name={item.who} size={18} />
                <span className={styles.who}>{item.who.split(' ')[0]}</span>
                <span className={styles.when}>{item.when}</span>
              </div>
              <div className={styles.text}>
                <span className={styles.did}>{item.did}</span> {item.what}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Styles**

  `apps/front/src/pages/Home/RecentActivity.module.scss`:

  ```scss
  .title {
    margin: 0 0 10px;
    color: hsl(25, 90%, 55%);
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .strip {
    display: flex;
    background: hsl(197, 14%, 12%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    overflow: hidden;
  }

  .cell {
    flex: 1;
    min-width: 0;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-right: 1px solid rgba(255, 255, 255, 0.04);

    &:last-child {
      border-right: none;
    }
  }

  .top {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .who {
    color: hsl(0, 0%, 92%);
    font-size: 11px;
  }

  .when {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    margin-left: auto;
  }

  .text {
    color: hsl(0, 0%, 56%);
    font-size: 11px;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .did {
    color: hsl(25, 90%, 55%);
  }

  // The 5-up strip gets too cramped on narrow mains — let it scroll sideways.
  @media (max-width: 900px) {
    .strip {
      overflow-x: auto;
    }
    .cell {
      flex: 0 0 200px;
    }
  }
  ```

- [ ] **Step 3: Add to the page** — render `<RecentActivity />` after `<SavedSessions />` inside `<main>`.
  This is the last section of the main column.

- [ ] **Step 4: Verify** — one bar split into equal cells, each: small avatar + first name + relative
  time, then "**liked** your track…" with the verb in orange. Each cell truncates with `…` rather than
  wrapping. On a narrow main the strip scrolls sideways instead of squishing.

**Done when:** the activity strip matches the design and truncates/scrolls cleanly, `pnpm run check` passes.
