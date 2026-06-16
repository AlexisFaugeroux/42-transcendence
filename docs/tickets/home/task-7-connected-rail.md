**Goal:** Build the right "Connected" rail — online count, a "Live now" list, the rest of the online users, and an "Invite to session" button. This completes the Home page.

**Design source:** `design/home-variant-a.jsx` (the `RIGHT — ONLINE FRIENDS` aside + `LiveUserRow`/`OnlineUserRow`) · **Parent:** #14 · **Depends on:** Task 1

---

- [ ] **Step 1: The two row components**

  `apps/front/src/pages/Home/UserRows.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { StatusAvatar } from './StatusAvatar';
  import type { OnlineUser } from './home.data';
  import styles from './UserRows.module.scss';

  export function LiveUserRow({ user }: { user: OnlineUser }): JSX.Element {
    return (
      <div className={styles.row}>
        <StatusAvatar name={user.name} size={32} status="live" />
        <div className={styles.body}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.live}>{user.activity}</div>
        </div>
        <div className={styles.listeners}>{user.listeners} ◉</div>
      </div>
    );
  }

  export function OnlineUserRow({ user }: { user: OnlineUser }): JSX.Element {
    return (
      <div className={styles.row}>
        <StatusAvatar name={user.name} size={26} status={user.status} />
        <div className={styles.body}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.activity}>{user.activity}</div>
        </div>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Home/UserRows.module.scss`:

  ```scss
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 4px;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background: hsl(197, 14%, 12%);
    }
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  .name {
    color: hsl(0, 0%, 92%);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .activity {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .live {
    color: hsl(8, 85%, 55%);
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .listeners {
    color: hsl(8, 85%, 55%);
    font-size: 10px;
    font-family: ui-monospace, monospace;
    border: 0.5px solid hsl(8, 85%, 55%);
    border-radius: 2px;
    padding: 1px 5px;
  }
  ```

- [ ] **Step 2: The rail**

  `apps/front/src/pages/Home/RightRail.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { LiveUserRow, OnlineUserRow } from './UserRows';
  import { ONLINE } from './home.data';
  import styles from './RightRail.module.scss';

  export function RightRail(): JSX.Element {
    const live = ONLINE.filter((u) => u.status === 'live');
    const online = ONLINE.filter((u) => u.status !== 'live');
    const onlineCount = ONLINE.filter((u) => u.status !== 'offline').length;

    return (
      <aside className={styles.rail}>
        <div className={styles.head}>
          <h3 className={styles.title}>Connected</h3>
          <span className={styles.count}>
            <span className={styles.dot}>●</span> {onlineCount} online
          </span>
        </div>

        <div className={styles.group}>
          <div className={styles.liveLabel}>
            <span className={styles.liveDot} /> Live now
          </div>
          {live.map((user) => (
            <LiveUserRow key={user.handle} user={user} />
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          <div className={styles.label}>Online</div>
          {online.map((user) => (
            <OnlineUserRow key={user.handle} user={user} />
          ))}
        </div>

        <div className={styles.invite}>
          <Button block>
            <MsnIcon name="plus" size="12px" /> Invite to session
          </Button>
        </div>
      </aside>
    );
  }
  ```

- [ ] **Step 3: Styles**

  `apps/front/src/pages/Home/RightRail.module.scss`:

  ```scss
  .rail {
    background: hsl(197, 14%, 6%);
    border-left: 1px solid rgba(255, 255, 255, 0.04);
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    height: 100%;
  }

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .title {
    margin: 0;
    color: hsl(25, 90%, 55%);
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .count {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    white-space: nowrap;
  }

  .dot {
    color: hsl(140, 65%, 45%);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .label {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .liveLabel {
    display: flex;
    align-items: center;
    gap: 6px;
    color: hsl(8, 85%, 55%);
    font-size: 10px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .liveDot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: hsl(8, 85%, 55%);
    box-shadow: 0 0 4px hsl(8, 85%, 55%);
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.04);
  }

  .invite {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }
  ```

- [ ] **Step 4: Add to the page** — in `Home.tsx`, render `<RightRail />` in the `styles.rightrail` grid
  cell (wrap in `<div className={styles.rightrail}>` like the other panels). It's the last panel.

- [ ] **Step 5: Verify the whole page** — full Home page at `/home`: top bar, left nav, main
  (greeting + cards + saved row + activity), and the right rail with "Live now" (Maya, Idris, Cleo with
  listener counts) above the rest of the online users, and an Invite button pinned to the bottom. Resize:
  the rail disappears under 1100px and the nav under 720px (per Task 1), with no horizontal page scroll.

**Done when:** the rail matches the design, live/online split is correct, the full page renders
end-to-end and is responsive, `pnpm run check` passes. This closes out #14.
