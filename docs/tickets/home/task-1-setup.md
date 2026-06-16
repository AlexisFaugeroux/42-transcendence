**Goal:** Scaffold the Home (logged-in dashboard) page in `apps/front` — the 3-column app shell, the shared mock data, a shared `StatusAvatar`, and the `/home` route. Every later task fills one panel of the shell.

**Design source:** `design/home-variant-a.jsx` · `design/MakeSomeNoise Home.html` · data in `design/data.js` · tokens in `design/colors_and_type.css`

> 👋 **Task 1 of the Home page** (parent #14). The page is a big app layout, so it's split into small
> tasks. This one builds the empty shell + shared pieces.
>
> 🔗 **Depends on #48 (react-router).** Setup shared with #12/#15 (`sass-embedded`, fonts,
> `MsnThemeProvider`) is assumed done.
>
> 🧩 **Note for later:** the **top bar** (Task 2) and **left nav** (Task 3) are app-wide chrome that
> the Dashboard / Sessions / Samples pages (#13/#16/#17) will also need. For now we keep them in
> `pages/Home/`; once a second page needs them we can promote them to a shared `layouts/` folder.
> Don't build that abstraction yet (YAGNI) — just keep these two components self-contained.

**Conventions (same as the Landing tasks):** antd via `@transcendence/ui`; icons via
`@transcendence/ui/components/MsnIcon/MsnIcon`; breakpoints `1100px` (drop right rail) and `720px`
(drop left nav); `import type` for types.

---

- [ ] **Step 1: Create the folder** `apps/front/src/pages/Home/`.

- [ ] **Step 2: Mock data + types**

  `apps/front/src/pages/Home/home.data.ts` (ported from `design/data.js`):

  ```ts
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';

  export const USER = { name: 'Lex Moreau', handle: '@lex.moreau', plan: 'Producer' };

  export type SessionKind = 'recording' | 'production' | 'mixing';

  export interface SessionType {
    key: string;
    title: string;
    blurb: string;
    icon: MsnIconLabel;
    color: string;
    meta: string[];
  }

  export const SESSION_TYPES: SessionType[] = [
    {
      key: 'record',
      title: 'Recording Session',
      blurb: 'Capture vocals, instruments or field audio. Multitrack with monitoring and overdubs.',
      icon: 'record',
      color: 'hsl(8, 85%, 55%)',
      meta: ['Multitrack', 'Monitor', 'Overdub'],
    },
    {
      key: 'produce',
      title: 'Music Production',
      blurb: 'Beat maker, drum scheduler, loops and instrument tracks on the timeline.',
      icon: 'produce',
      color: 'hsl(25, 90%, 55%)',
      meta: ['Beat maker', 'Loops', 'MIDI'],
    },
    {
      key: 'mix',
      title: 'Mixing Session',
      blurb: 'Open the channel strip mixer. EQ, sends, busses and master export.',
      icon: 'mix',
      color: 'hsl(210, 90%, 50%)',
      meta: ['Strips', 'Sends', 'Export'],
    },
  ];

  export interface SavedSession {
    id: number;
    title: string;
    kind: SessionKind;
    bpm: number | null;
    key: string | null;
    updated: string;
    duration: string;
  }

  export const SAVED_SESSIONS: SavedSession[] = [
    { id: 1, title: 'Liquid Drum 808', kind: 'production', bpm: 142, key: 'F min', updated: '2h ago', duration: '3:42' },
    { id: 2, title: 'Tape Saturator demo', kind: 'mixing', bpm: 96, key: 'A min', updated: 'yesterday', duration: '2:51' },
    { id: 3, title: 'Vocal Take 04', kind: 'recording', bpm: 88, key: 'C maj', updated: '3d ago', duration: '1:08' },
    { id: 4, title: 'Granular Pads', kind: 'production', bpm: 110, key: 'D# min', updated: '1w ago', duration: '5:20' },
    { id: 5, title: 'Late Night Bounce', kind: 'mixing', bpm: 128, key: 'G min', updated: '1w ago', duration: '4:02' },
    { id: 6, title: 'First Steps', kind: 'production', bpm: 120, key: 'C maj', updated: '2w ago', duration: '2:14' },
    { id: 7, title: 'Field Recording 02', kind: 'recording', bpm: null, key: null, updated: '3w ago', duration: '6:48' },
  ];

  export type PresenceStatus = 'live' | 'online' | 'idle' | 'offline';

  export interface OnlineUser {
    name: string;
    handle: string;
    status: PresenceStatus;
    activity: string;
    listeners: number;
  }

  export const ONLINE: OnlineUser[] = [
    { name: 'Maya Okafor', handle: '@maya.o', status: 'live', activity: 'Recording vocals', listeners: 12 },
    { name: 'Theo Rivera', handle: '@theo', status: 'online', activity: 'Mixing — Side B', listeners: 0 },
    { name: 'Anouk Lemaire', handle: '@anouk', status: 'online', activity: 'Producing — 92 BPM', listeners: 0 },
    { name: 'Idris Khan', handle: '@idris', status: 'live', activity: 'Streaming a beat set', listeners: 47 },
    { name: 'Rosa Petrov', handle: '@rosa', status: 'idle', activity: 'Browsing samples', listeners: 0 },
    { name: 'Jun Park', handle: '@junpark', status: 'online', activity: 'Mastering single', listeners: 0 },
    { name: 'Cleo Banner', handle: '@cleo.b', status: 'live', activity: 'Live drum jam', listeners: 8 },
    { name: 'Sam West', handle: '@samwest', status: 'online', activity: 'Playlist: late night', listeners: 0 },
  ];

  export interface ActivityItem {
    who: string;
    did: string;
    what: string;
    when: string;
  }

  export const ACTIVITY: ActivityItem[] = [
    { who: 'Maya Okafor', did: 'liked', what: 'your track “Liquid Drum 808”', when: '3m' },
    { who: 'Theo Rivera', did: 'commented', what: 'on “Tape Saturator demo”', when: '12m' },
    { who: 'Anouk Lemaire', did: 'added', what: 'you to “Friday Lab” playlist', when: '1h' },
    { who: 'Idris Khan', did: 'started', what: 'a live mixing session', when: '2h' },
    { who: 'Cleo Banner', did: 'followed', what: 'you back', when: '5h' },
  ];

  export const KIND_COLOR: Record<SessionKind, string> = {
    recording: 'hsl(8, 85%, 55%)',
    production: 'hsl(25, 90%, 55%)',
    mixing: 'hsl(210, 90%, 50%)',
  };

  export const KIND_ICON: Record<SessionKind, MsnIconLabel> = {
    recording: 'record',
    production: 'produce',
    mixing: 'mix',
  };
  ```

- [ ] **Step 3: Shared `StatusAvatar`**

  antd has no "avatar with a presence dot", so build a tiny wrapper. `apps/front/src/pages/Home/StatusAvatar.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Avatar } from '@transcendence/ui';
  import type { PresenceStatus } from './home.data';

  const STATUS_COLOR: Record<PresenceStatus, string> = {
    online: 'hsl(140, 65%, 45%)',
    live: 'hsl(8, 85%, 55%)',
    idle: 'hsl(45, 95%, 55%)',
    offline: 'hsl(0, 0%, 38%)',
  };

  interface StatusAvatarProps {
    name: string;
    size?: number;
    status?: PresenceStatus;
  }

  export function StatusAvatar({ name, size = 28, status }: StatusAvatarProps): JSX.Element {
    const dot = Math.max(8, Math.round(size * 0.28));
    return (
      <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
        <Avatar size={size}>{name.charAt(0)}</Avatar>
        {status && (
          <span
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: dot,
              height: dot,
              borderRadius: '50%',
              background: STATUS_COLOR[status],
              border: '2px solid hsl(197, 14%, 6%)',
              boxShadow: status === 'live' ? `0 0 6px ${STATUS_COLOR.live}` : 'none',
            }}
          />
        )}
      </span>
    );
  }
  ```

- [ ] **Step 4: The shell layout**

  `apps/front/src/pages/Home/Home.module.scss`:

  ```scss
  .shell {
    height: 100vh;
    display: grid;
    grid-template-columns: 220px 1fr 320px;
    grid-template-rows: 44px 1fr;
    background: hsl(197, 14%, 3%);
    color: hsl(0, 0%, 92%);
    overflow: hidden;
  }

  .topbar {
    grid-column: 1 / -1; // span all columns at every breakpoint
  }

  .leftnav {
    overflow-y: auto;
  }

  .main {
    background: hsl(197, 14%, 8%); // --bg-panel-2
    overflow-y: auto;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .rightrail {
    overflow-y: auto;
  }

  // Tablet: drop the right rail.
  @media (max-width: 1100px) {
    .shell {
      grid-template-columns: 220px 1fr;
    }
    .rightrail {
      display: none;
    }
  }

  // Mobile: drop the left nav too (single-column main under the top bar).
  @media (max-width: 720px) {
    .shell {
      grid-template-columns: 1fr;
    }
    .leftnav {
      display: none;
    }
    .main {
      padding: 16px;
    }
  }
  ```

  > A real app would turn the hidden nav into a hamburger/off-canvas menu — that's a future
  > enhancement, out of scope here. Hiding it keeps the layout correct and uncluttered on small screens.

- [ ] **Step 5: The page shell**

  `apps/front/src/pages/Home/Home.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import styles from './Home.module.scss';

  export function Home(): JSX.Element {
    return (
      <div className={styles.shell}>
        {/* Panels are added by the following tasks:
            <TopBar />     (Task 2) → className={styles.topbar}
            <LeftNav />    (Task 3) → className={styles.leftnav}
            <main className={styles.main}> … Tasks 4–6 … </main>
            <RightRail />  (Task 7) → className={styles.rightrail} */}
      </div>
    );
  }
  ```

- [ ] **Step 6: Add the `/home` route**

  In `apps/front/src/App.tsx`, add:

  ```tsx
  import { Home } from './pages/Home/Home';

  // inside <Routes>:
  <Route path="/home" element={<Home />} />
  ```

  > No auth guard yet — anyone can visit `/home`. Protecting routes comes once real auth exists
  > (tracked separately, see #48's note).

- [ ] **Step 7: Verify** — `http://localhost:5173/home` renders a dark empty 3-column frame, no console
  errors. Ready for Task 2.

**Done when:** `Home` folder has `Home.tsx`, `Home.module.scss`, `home.data.ts`, `StatusAvatar.tsx`;
`/home` renders `<Home />`; `pnpm run check` passes.
