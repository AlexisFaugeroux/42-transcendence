**Goal:** Build the top bar — logo, search field, notifications bell with a badge, and the user chip.

**Design source:** `design/home-variant-a.jsx` (the `TOP BAR` section) · **Parent:** #14 · **Depends on:** Task 1

> See Task 1 for shared conventions, `StatusAvatar`, and the `home.data.ts` (`USER`).

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Home/TopBar.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Link } from 'react-router';
  import { Badge, Input } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { MsnWordmark } from '@transcendence/ui/components/MsnWordmark/MsnWordmark';
  import { StatusAvatar } from './StatusAvatar';
  import { USER } from './home.data';
  import styles from './TopBar.module.scss';

  export function TopBar(): JSX.Element {
    return (
      <header className={styles.bar}>
        <Link to="/" className={styles.brand}>
          <MsnIcon name="msn" size="18px" color="hsl(25, 90%, 55%)" />
          <MsnWordmark size={14} accent="hsl(25, 90%, 55%)" />
        </Link>

        <Input
          className={styles.search}
          variant="filled"
          prefix={<MsnIcon name="search" size="13px" />}
          suffix={<span className={styles.kbd}>⌘K</span>}
          placeholder="Search sessions, samples, friends…"
        />

        <div className={styles.spacer} />

        <Badge count={3} size="small" color="hsl(25, 90%, 55%)">
          <button className={styles.iconButton} aria-label="Notifications">
            <MsnIcon name="bell" size="16px" />
          </button>
        </Badge>

        <button className={styles.user}>
          <StatusAvatar name={USER.name} size={26} status="online" />
          <span className={styles.userText}>
            <span className={styles.userName}>{USER.name}</span>
            <span className={styles.userHandle}>{USER.handle}</span>
          </span>
          <MsnIcon name="triangle" size="10px" color="hsl(0, 0%, 38%)" />
        </button>
      </header>
    );
  }
  ```

  > The search field is presentational for now (no search backend). `Badge` is antd's; `⌘K` is just a
  > styled hint, not a real shortcut yet.

- [ ] **Step 2: Styles**

  `apps/front/src/pages/Home/TopBar.module.scss`:

  ```scss
  .bar {
    background: hsl(197, 14%, 6%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 16px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    color: inherit;
    width: 204px; // aligns with the 220px left nav
  }

  .search {
    flex: 1;
    max-width: 480px;
  }

  .kbd {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    color: hsl(0, 0%, 38%);
  }

  .spacer {
    flex: 1;
  }

  .iconButton {
    background: transparent;
    border: 0;
    color: hsl(0, 0%, 56%);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 4px;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .user {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    max-width: 160px;
  }

  .userText {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    min-width: 0;
    text-align: left;
  }

  .userName,
  .userHandle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .userName {
    color: hsl(0, 0%, 92%);
    font-size: 12px;
  }

  .userHandle {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
  }

  // Mobile: hide the brand width-spacer alignment and the search to save room.
  @media (max-width: 720px) {
    .brand {
      width: auto;
    }
    .search {
      display: none;
    }
  }
  ```

- [ ] **Step 3: Add to the page** — in `Home.tsx`, render `<TopBar />` with `className={styles.topbar}`
  applied to the component's root… simplest: wrap it:

  ```tsx
  <div className={styles.topbar}>
    <TopBar />
  </div>
  ```

  (Or spread a `className` prop into `TopBar` if you prefer — wrapping is fine.)

- [ ] **Step 4: Verify** — logo left, search center, bell (with a "3" badge) + user chip right. Logo
  links to `/`. On a narrow window the search hides and the bar stays tidy.

**Done when:** top bar matches the design, badge shows, logo routes home, `pnpm run check` passes.
