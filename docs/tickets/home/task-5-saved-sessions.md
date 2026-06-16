**Goal:** Build the "Continue a saved session" section — a horizontally scrollable row of saved-session tiles with a header (count + prev/next + View all).

**Design source:** `design/home-variant-a.jsx` (the saved-sessions `section` + `SavedSessionTile`) · **Parent:** #14 · **Depends on:** Task 1

---

- [ ] **Step 1: A small cover-art placeholder**

  The design uses a generated `MsnCover`. Use a simple colored square instead.
  `apps/front/src/pages/Home/CoverArt.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';

  interface CoverArtProps {
    size?: number;
    accent: string;
    icon: MsnIconLabel;
  }

  export function CoverArt({ size = 36, accent, icon }: CoverArtProps): JSX.Element {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
          background: `color-mix(in srgb, ${accent} 22%, hsl(197, 14%, 3%))`,
          boxShadow: `inset 0 0 0 0.5px ${accent}`,
        }}
      >
        <MsnIcon name={icon} size={`${Math.round(size * 0.5)}px`} />
      </div>
    );
  }
  ```

- [ ] **Step 2: The tile**

  `apps/front/src/pages/Home/SavedSessionTile.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { CoverArt } from './CoverArt';
  import { KIND_COLOR, KIND_ICON, type SavedSession } from './home.data';
  import styles from './SavedSessionTile.module.scss';

  export function SavedSessionTile({ session }: { session: SavedSession }): JSX.Element {
    const color = KIND_COLOR[session.kind];

    return (
      <div className={styles.tile}>
        <div className={styles.top}>
          <CoverArt size={36} accent={color} icon={KIND_ICON[session.kind]} />
          <span className={styles.kind} style={{ color }}>
            {session.kind}
          </span>
        </div>
        <div className={styles.title}>{session.title}</div>
        <div className={styles.meta}>
          <span>
            {session.bpm ? `${session.bpm} BPM` : '—'} · {session.key ?? 'no key'}
          </span>
          <span>{session.duration}</span>
        </div>
        <div className={styles.updated}>{session.updated}</div>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Home/SavedSessionTile.module.scss`:

  ```scss
  .tile {
    flex: 0 0 200px; // fixed width, never shrink → enables horizontal scroll
    background: hsl(197, 14%, 12%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .kind {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .title {
    color: hsl(0, 0%, 92%);
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    font-family: ui-monospace, monospace;
  }

  .updated {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
  }
  ```

- [ ] **Step 3: The section**

  `apps/front/src/pages/Home/SavedSessions.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { SavedSessionTile } from './SavedSessionTile';
  import { SAVED_SESSIONS } from './home.data';
  import styles from './SavedSessions.module.scss';

  export function SavedSessions(): JSX.Element {
    return (
      <section>
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <h3 className={styles.title}>Continue a saved session</h3>
            <span className={styles.count}>{SAVED_SESSIONS.length} sessions</span>
          </div>
          <div className={styles.controls}>
            <button className={styles.iconBtn} aria-label="Scroll left">
              <MsnIcon name="arrowL" size="14px" />
            </button>
            <button className={styles.iconBtn} aria-label="Scroll right">
              <MsnIcon name="arrowR" size="14px" />
            </button>
            <a href="#" className={styles.viewAll}>
              View all
            </a>
          </div>
        </div>

        <div className={styles.row}>
          {SAVED_SESSIONS.map((session) => (
            <SavedSessionTile key={session.id} session={session} />
          ))}
        </div>
      </section>
    );
  }
  ```

  `apps/front/src/pages/Home/SavedSessions.module.scss`:

  ```scss
  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }

  .headLeft {
    display: flex;
    align-items: baseline;
    gap: 12px;
    min-width: 0;
  }

  .title {
    margin: 0;
    color: hsl(25, 90%, 55%);
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    white-space: nowrap;
  }

  .count {
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    white-space: nowrap;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .iconBtn {
    background: transparent;
    color: hsl(0, 0%, 56%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    width: 24px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .viewAll {
    color: hsl(0, 0%, 56%);
    font-size: 11px;
    margin-left: 8px;
    white-space: nowrap;
  }

  .row {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
  }
  ```

  > **The horizontal scroll trick:** the row is `display: flex; overflow-x: auto`, and each tile is
  > `flex: 0 0 200px` (fixed width, no shrink). That makes the tiles overflow sideways and scroll
  > instead of squishing. (Wiring the prev/next buttons to actually scroll is an optional enhancement
  > with a `ref` + `scrollBy` — fine to leave as static buttons for this ticket.)

- [ ] **Step 4: Add to the page** — render `<SavedSessions />` after `<Greeting />` inside `<main>`.

- [ ] **Step 5: Verify** — a row of session tiles you can scroll sideways (trackpad / shift+wheel);
  each shows cover, kind, title, BPM/key, duration, "updated" time. The "Field Recording 02" tile shows
  "— · no key" (handles the null bpm/key).

**Done when:** the row scrolls horizontally, tiles match the design, `pnpm run check` passes.
