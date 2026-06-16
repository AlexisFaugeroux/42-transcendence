**Goal:** Add the toolbar (search, type filter, genre, sort), the filtering/sorting logic, and the empty states (no sessions / nothing archived / no matches).

**Design source:** `design/sessions.jsx` (`SessToolbar`, `SessEmpty`, `SessNoMatches`, the `filtered` `useMemo`) · **Parent:** #17 · **Depends on:** Task 2

---

- [ ] **Step 1: Toolbar**

  `apps/front/src/pages/Sessions/SessToolbar.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Input, Segmented, Select } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { SESS_GENRES, SESS_TYPES, TYPE_ICON } from './sessions.data';
  import styles from './SessToolbar.module.scss';

  export type SessSort = 'edited' | 'name' | 'bpm';

  interface SessToolbarProps {
    query: string;
    setQuery: (v: string) => void;
    type: string;
    setType: (v: string) => void;
    genre: string;
    setGenre: (v: string) => void;
    sort: SessSort;
    setSort: (v: SessSort) => void;
    shown: number;
    total: number;
  }

  export function SessToolbar(props: SessToolbarProps): JSX.Element {
    const { query, setQuery, type, setType, genre, setGenre, sort, setSort, shown, total } = props;

    return (
      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          allowClear
          prefix={<MsnIcon name="search" size="13px" />}
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Segmented
          value={type}
          onChange={(v) => setType(v as string)}
          options={[
            { value: 'all', label: 'All' },
            ...SESS_TYPES.map((t) => ({ value: t, label: t, icon: <MsnIcon name={TYPE_ICON[t]} size="11px" /> })),
          ]}
        />

        <Select
          value={genre}
          onChange={setGenre}
          options={[{ value: 'all', label: 'All genres' }, ...SESS_GENRES.map((g) => ({ value: g, label: g }))]}
          style={{ width: 150 }}
        />

        <span className={styles.count}>
          {shown}/{total}
        </span>

        <Select
          value={sort}
          onChange={setSort}
          options={[
            { value: 'edited', label: 'Last edited' },
            { value: 'name', label: 'Name (A→Z)' },
            { value: 'bpm', label: 'BPM' },
          ]}
          style={{ width: 150 }}
        />
      </div>
    );
  }
  ```

  `apps/front/src/pages/Sessions/SessToolbar.module.scss`:

  ```scss
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 4px;
    background: hsl(197, 14%, 8%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    margin-bottom: 18px;
  }

  .search {
    width: 280px;
  }

  .count {
    margin-left: auto;
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    font-family: ui-monospace, monospace;
  }
  ```

- [ ] **Step 2: Empty states**

  `apps/front/src/pages/Sessions/SessionsEmpty.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import styles from './SessionsEmpty.module.scss';

  // Shown when a bucket has no sessions at all.
  export function SessionsEmpty({ bucket, onNew }: { bucket: 'owned' | 'archived'; onNew: () => void }): JSX.Element {
    if (bucket === 'archived') {
      return (
        <div className={styles.box}>
          <MsnIcon name="folder" size="28px" color="hsl(210, 90%, 50%)" />
          <h3 className={styles.title}>Nothing archived</h3>
          <p className={styles.text}>Archived sessions will live here when you&apos;re done with them.</p>
        </div>
      );
    }
    return (
      <div className={`${styles.box} ${styles.glow}`}>
        <div className={styles.logos}>
          <span style={{ color: 'hsl(25, 90%, 55%)' }}><MsnIcon name="produce" size="22px" /></span>
          <span style={{ color: 'hsl(8, 85%, 55%)' }}><MsnIcon name="record" size="22px" /></span>
          <span style={{ color: 'hsl(210, 90%, 50%)' }}><MsnIcon name="mix" size="22px" /></span>
        </div>
        <h3 className={styles.title}>No sessions yet</h3>
        <p className={styles.text}>
          Sessions are where you record, produce and mix. Start your first one — it takes about three seconds.
        </p>
        <Button type="primary" size="large" onClick={onNew}>
          <MsnIcon name="plus" size="13px" /> Create your first session
        </Button>
      </div>
    );
  }

  // Shown when filters hide everything in a non-empty bucket.
  export function SessionsNoMatches({ onClear }: { onClear: () => void }): JSX.Element {
    return (
      <div className={styles.box}>
        <MsnIcon name="search" size="22px" color="hsl(25, 90%, 55%)" />
        <h3 className={styles.title}>No sessions match these filters</h3>
        <p className={styles.text}>Try changing your filters or clearing them.</p>
        <Button onClick={onClear}>Clear filters</Button>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Sessions/SessionsEmpty.module.scss`:

  ```scss
  .box {
    padding: 60px 24px;
    text-align: center;
    background: hsl(197, 14%, 8%);
    border: 0.5px dashed rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .glow {
    border-color: color-mix(in srgb, hsl(25, 90%, 55%) 30%, rgba(255, 255, 255, 0.07));
    background-image: radial-gradient(circle at 50% 0%, color-mix(in srgb, hsl(25, 90%, 55%) 10%, transparent), transparent 60%);
  }

  .logos {
    display: flex;
    gap: 10px;
  }

  .logos > span {
    width: 56px;
    height: 56px;
    border-radius: 6px;
    background: hsl(197, 14%, 3%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    margin: 4px 0 0;
    font-size: 17px;
    font-weight: 400;
    color: hsl(0, 0%, 92%);
  }

  .text {
    margin: 0 0 6px;
    max-width: 360px;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
  }
  ```

- [ ] **Step 3: Filtering logic + wiring in `Sessions.tsx`**

  ```tsx
  import { useMemo, useState } from 'react';
  import { SessToolbar, type SessSort } from './SessToolbar';
  import { SessionsEmpty, SessionsNoMatches } from './SessionsEmpty';

  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [genre, setGenre] = useState('all');
  const [sort, setSort] = useState<SessSort>('edited');

  const filtered = useMemo(() => {
    let list = SESSIONS.filter((s) => (bucket === 'archived' ? s.archived : !s.archived));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((r) => r.title.toLowerCase().includes(q));
    if (type !== 'all') list = list.filter((r) => r.type === type);
    if (genre !== 'all') list = list.filter((r) => r.tags.includes(genre));

    list.sort((a, b) => {
      switch (sort) {
        case 'name': return a.title.localeCompare(b.title);
        case 'bpm': return (a.bpm ?? 999) - (b.bpm ?? 999);
        default: return b.editedAt.localeCompare(a.editedAt); // 'edited' (newest first)
      }
    });
    return list;
  }, [bucket, query, type, genre, sort]);

  const clearFilters = (): void => {
    setQuery('');
    setType('all');
    setGenre('all');
  };

  const openNew = (): void => console.log('open new session'); // wired in Task 4

  // results area:
  <SessToolbar
    query={query} setQuery={setQuery}
    type={type} setType={setType}
    genre={genre} setGenre={setGenre}
    sort={sort} setSort={setSort}
    shown={filtered.length} total={counts[bucket]}
  />

  {filtered.length === 0 ? (
    counts[bucket] === 0 ? (
      <SessionsEmpty bucket={bucket} onNew={openNew} />
    ) : (
      <SessionsNoMatches onClear={clearFilters} />
    )
  ) : (
    <SessionGrid rows={filtered} archived={bucket === 'archived'} onRename={handleRename} onDelete={handleDelete} />
  )}
  ```

  > Note: switch the grid's `rows` from the old bucket-only list to `filtered`.

- [ ] **Step 4: Verify** — search/type/genre/sort all narrow & reorder the grid; the `shown/total` count
  updates. Filtering to nothing shows "No sessions match these filters" with Clear. (To preview the
  true-empty state, the bucket would need to be empty — the seed data has items in both, so this mainly
  shows for the no-matches case.)

**Done when:** filters + sort drive the grid via `useMemo`, both empty states exist and render correctly,
`pnpm run check` passes.
