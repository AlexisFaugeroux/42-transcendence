**Goal:** Scaffold the Sessions page — route, shared header, data & helpers, the title row, and the Owned/Archived bucket tabs.

**Design source:** `design/sessions.jsx` · tokens in `design/colors_and_type.css`

> 👋 **Task 1 of the Sessions page** (parent #17). Depends on **#48 (react-router)** and on the shared
> **`AppHeader`** from **#83**. If `AppHeader` doesn't exist yet, do #83 first.

**Conventions:** antd via `@transcendence/ui`; icons via `@transcendence/ui/components/MsnIcon/MsnIcon`;
`import type` for types.

---

- [ ] **Step 1: Data, types & helpers**

  `apps/front/src/pages/Sessions/sessions.data.ts`:

  ```ts
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';

  export type SessionType = 'production' | 'recording' | 'mixing';

  export interface Session {
    id: number;
    title: string;
    type: SessionType;
    bpm: number | null;
    key: string | null;
    edited: string;
    editedAt: string; // sortable "YYYY-MM-DD HH:mm"
    size: number; // MB
    tags: string[];
    seed: string;
    archived: boolean;
  }

  export const SESS_TYPES: SessionType[] = ['production', 'recording', 'mixing'];
  export const SESS_GENRES = ['house', 'ambient', 'drum&bass', 'hip-hop', 'techno', 'indie', 'lo-fi', 'experimental', 'vocal'];

  export const SESSIONS: Session[] = [
    { id: 1, title: 'Liquid Drum 808', type: 'production', bpm: 142, key: 'F min', edited: '2h ago', editedAt: '2026-05-06 13:14', size: 142.6, tags: ['drum&bass', 'liquid'], seed: 'liquid808', archived: false },
    { id: 2, title: 'Tape Saturator demo', type: 'mixing', bpm: 96, key: 'A min', edited: 'yesterday', editedAt: '2026-05-05 22:01', size: 84.2, tags: ['lo-fi', 'mix'], seed: 'tapesat', archived: false },
    { id: 3, title: 'Vocal Take 04', type: 'recording', bpm: 88, key: 'C maj', edited: '3d ago', editedAt: '2026-05-03 10:42', size: 46.8, tags: ['vocal', 'indie'], seed: 'vocal4', archived: false },
    { id: 4, title: 'Granular Pads', type: 'production', bpm: 110, key: 'D# min', edited: '1w ago', editedAt: '2026-04-29 18:07', size: 226.1, tags: ['ambient', 'texture'], seed: 'granular', archived: false },
    { id: 5, title: 'Late Night Bounce', type: 'mixing', bpm: 128, key: 'G min', edited: '1w ago', editedAt: '2026-04-28 23:18', size: 118.3, tags: ['house', 'late'], seed: 'latenight', archived: false },
    { id: 6, title: 'First Steps', type: 'production', bpm: 120, key: 'C maj', edited: '2w ago', editedAt: '2026-04-22 16:00', size: 58.7, tags: ['lo-fi', 'chill'], seed: 'firststeps', archived: false },
    { id: 7, title: 'Field Recording 02', type: 'recording', bpm: null, key: null, edited: '3w ago', editedAt: '2026-04-15 09:33', size: 312.4, tags: ['experimental', 'field'], seed: 'field2', archived: false },
    { id: 8, title: 'Kick Drift', type: 'production', bpm: 134, key: 'A min', edited: '4w ago', editedAt: '2026-04-08 12:10', size: 72.0, tags: ['techno', 'drum'], seed: 'kickdrift', archived: false },
    { id: 9, title: 'Sundown Loop', type: 'production', bpm: 92, key: 'E min', edited: '5w ago', editedAt: '2026-04-01 19:22', size: 38.6, tags: ['lo-fi', 'hip-hop'], seed: 'sundown', archived: false },
    { id: 10, title: 'Demo for Cleo', type: 'mixing', bpm: 110, key: 'D min', edited: 'Mar 12', editedAt: '2026-03-12 11:11', size: 95.2, tags: ['mix'], seed: 'demoCleo', archived: true },
    { id: 11, title: 'Old Vocals Folder', type: 'recording', bpm: null, key: null, edited: 'Feb 28', editedAt: '2026-02-28 20:00', size: 28.1, tags: ['vocal'], seed: 'oldVox', archived: true },
    { id: 12, title: 'Birthday Beat (final)', type: 'production', bpm: 128, key: 'F# min', edited: 'Feb 03', editedAt: '2026-02-03 14:14', size: 104.6, tags: ['hip-hop', 'gift'], seed: 'bday', archived: true },
  ];

  export const TYPE_COLOR: Record<SessionType, string> = {
    production: 'hsl(25, 90%, 55%)',
    recording: 'hsl(8, 85%, 55%)',
    mixing: 'hsl(210, 90%, 50%)',
  };

  export const TYPE_ICON: Record<SessionType, MsnIconLabel> = {
    production: 'produce',
    recording: 'record',
    mixing: 'mix',
  };

  export function formatSize(mb: number): string {
    if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
    return `${mb.toFixed(1)} MB`;
  }
  ```

- [ ] **Step 2: Page shell, title row, bucket tabs + route**

  `apps/front/src/pages/Sessions/Sessions.module.scss`:

  ```scss
  .page {
    min-height: 100vh;
    background: hsl(197, 14%, 3%);
    color: hsl(0, 0%, 92%);
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 28px 32px 80px;
  }

  .titleRow {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 22px;
    flex-wrap: wrap;
  }

  .eyebrow {
    color: hsl(25, 90%, 55%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
    font-family: ui-monospace, monospace;
  }

  .title {
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .subtitle {
    margin: 6px 0 0;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    margin-bottom: 18px;
  }

  .tab {
    background: transparent;
    border: 0;
    padding: 10px 14px;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .tabActive {
    color: hsl(0, 0%, 92%);
    border-bottom-color: hsl(25, 90%, 55%);
  }

  .tabCount {
    color: hsl(0, 0%, 38%);
    font-family: ui-monospace, monospace;
    font-size: 11px;
  }

  @media (max-width: 600px) {
    .container {
      padding: 20px 16px 64px;
    }
  }
  ```

  `apps/front/src/pages/Sessions/Sessions.tsx`:

  ```tsx
  import { useState, type JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { AppHeader } from '../../components/AppHeader/AppHeader';
  import { SESSIONS } from './sessions.data';
  import styles from './Sessions.module.scss';

  type Bucket = 'owned' | 'archived';

  export function Sessions(): JSX.Element {
    const [bucket, setBucket] = useState<Bucket>('owned');

    const counts = {
      owned: SESSIONS.filter((s) => !s.archived).length,
      archived: SESSIONS.filter((s) => s.archived).length,
    };

    const TABS: { value: Bucket; label: string }[] = [
      { value: 'owned', label: 'Owned by me' },
      { value: 'archived', label: 'Archived' },
    ];

    return (
      <div className={styles.page}>
        <AppHeader active="sessions" />

        <div className={styles.container}>
          <div className={styles.titleRow}>
            <div>
              <div className={styles.eyebrow}>Workspace</div>
              <h1 className={styles.title}>My sessions</h1>
              <p className={styles.subtitle}>
                {counts.owned} active · {counts.archived} archived
              </p>
            </div>
            <Button type="primary" size="large">
              <MsnIcon name="plus" size="13px" /> New session
            </Button>
          </div>

          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={`${styles.tab} ${bucket === tab.value ? styles.tabActive : ''}`}
                onClick={() => setBucket(tab.value)}
              >
                {tab.label}
                <span className={styles.tabCount}>{counts[tab.value]}</span>
              </button>
            ))}
          </div>

          {/* Results area — filled by later tasks (grid, filters, empty states). */}
        </div>
      </div>
    );
  }
  ```

  In `apps/front/src/App.tsx`:

  ```tsx
  import { Sessions } from './pages/Sessions/Sessions';
  // inside <Routes>:
  <Route path="/sessions" element={<Sessions />} />
  ```

- [ ] **Step 3: Verify** — `http://localhost:5173/sessions`: shared header with **Sessions** highlighted,
  the title block, a "New session" button, and Owned/Archived tabs with counts that switch the active
  underline when clicked.

**Done when:** route, header, data/helpers, title and bucket tabs render; `pnpm run check` passes.
