**Goal:** Build the top of the main column — the greeting header and the "Start a new session" row of three session-type cards.

**Design source:** `design/home-variant-a.jsx` (the greeting `header` + session-type `section` + `SessionCard`) · **Parent:** #14 · **Depends on:** Task 1

> Tasks 4–6 all render **inside** the `<main className={styles.main}>` element of `Home.tsx`. Add a
> `<main>` element now if it isn't there yet, and place each task's section inside it in order.

---

- [ ] **Step 1: The `SessionCard` component**

  `apps/front/src/pages/Home/SessionCard.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Tag } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import type { SessionType } from './home.data';
  import styles from './SessionCard.module.scss';

  export function SessionCard({ title, blurb, icon, color, meta }: SessionType): JSX.Element {
    return (
      <button className={styles.card}>
        <div className={styles.top}>
          <div className={styles.iconBox} style={{ color }}>
            <MsnIcon name={icon} size="22px" />
          </div>
          <MsnIcon name="arrowR" size="18px" color="hsl(0, 0%, 38%)" />
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          <p className={styles.blurb}>{blurb}</p>
        </div>
        <div className={styles.tags}>
          {meta.map((m) => (
            <Tag key={m} color={color}>
              {m}
            </Tag>
          ))}
        </div>
      </button>
    );
  }
  ```

  `apps/front/src/pages/Home/SessionCard.module.scss`:

  ```scss
  .card {
    text-align: left;
    background: hsl(197, 14%, 12%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 18px;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    color: inherit;

    &:hover {
      border-color: rgba(255, 255, 255, 0.12);
    }
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    font-size: 16px;
    margin-bottom: 6px;
  }

  .blurb {
    color: hsl(0, 0%, 56%);
    font-size: 12px;
    line-height: 1.45;
    margin: 0;
  }

  .tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: auto;
  }
  ```

- [ ] **Step 2: Greeting + section component**

  `apps/front/src/pages/Home/Greeting.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { SessionCard } from './SessionCard';
  import { SESSION_TYPES, USER } from './home.data';
  import styles from './Greeting.module.scss';

  export function Greeting(): JSX.Element {
    const firstName = USER.name.split(' ')[0];

    return (
      <>
        <header>
          <h1 className={styles.title}>Good evening, {firstName}.</h1>
          <h2 className={styles.subtitle}>Pick up where you left off, or start something new.</h2>
        </header>

        <section>
          <div className={styles.sectionHead}>
            <h3 className={styles.sectionTitle}>Start a new session</h3>
            <a href="#" className={styles.link}>
              Templates →
            </a>
          </div>
          <div className={styles.cards}>
            {SESSION_TYPES.map((session) => (
              <SessionCard key={session.key} {...session} />
            ))}
          </div>
        </section>
      </>
    );
  }
  ```

  `apps/front/src/pages/Home/Greeting.module.scss`:

  ```scss
  .title {
    margin: 0;
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .subtitle {
    margin: 4px 0 0;
    color: hsl(25, 90%, 55%);
    font-size: 16px;
    font-weight: 400;
  }

  .sectionHead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }

  .sectionTitle {
    margin: 0;
    color: hsl(25, 90%, 55%);
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .link {
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    white-space: nowrap;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media (max-width: 1300px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 520px) {
    .cards {
      grid-template-columns: 1fr;
    }
    .title {
      font-size: 26px;
    }
  }
  ```

- [ ] **Step 3: Add to the page** — render `<Greeting />` as the first child of `<main className={styles.main}>` in `Home.tsx`.

- [ ] **Step 4: Verify** — "Good evening, Lex." + orange subtitle; below it three session cards
  (Recording / Production / Mixing) each with a colored icon, arrow, blurb and tags. Cards reflow to
  2-up / 1-up as the main column narrows.

**Done when:** greeting + cards match the design and reflow, `pnpm run check` passes.
