**Goal:** Add the toolbar (search, family/type filters, favourites toggle, sort) and the filtering/sorting logic that feeds the list. Show an empty state when nothing matches.

**Design source:** `design/samples.jsx` (`Toolbar`, `Select`, `EmptyState`, the `filtered` `useMemo`) · **Parent:** #16 · **Depends on:** Task 3

> This is the data-logic task: derive the visible rows from the raw list + the filters with `useMemo`,
> so the work only re-runs when an input changes.

---

- [ ] **Step 1: Toolbar component**

  `apps/front/src/pages/Samples/Toolbar.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button, Input, Select } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { SAMPLE_FAMILIES, SAMPLE_KINDS } from './samples.data';
  import styles from './Toolbar.module.scss';

  export type SortKey = 'recent' | 'name' | 'duration' | 'size' | 'bpm';

  interface ToolbarProps {
    query: string;
    setQuery: (v: string) => void;
    family: string;
    setFamily: (v: string) => void;
    kind: string;
    setKind: (v: string) => void;
    favOnly: boolean;
    setFavOnly: (v: boolean) => void;
    sort: SortKey;
    setSort: (v: SortKey) => void;
    shownCount: number;
    totalCount: number;
  }

  export function Toolbar(props: ToolbarProps): JSX.Element {
    const { query, setQuery, family, setFamily, kind, setKind, favOnly, setFavOnly, sort, setSort, shownCount, totalCount } = props;

    return (
      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          allowClear
          prefix={<MsnIcon name="search" size="13px" />}
          placeholder="Search by name, pack, tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Select
          value={family}
          onChange={setFamily}
          options={[{ value: 'all', label: 'All families' }, ...SAMPLE_FAMILIES.map((f) => ({ value: f, label: f }))]}
          style={{ width: 150 }}
        />

        <Select
          value={kind}
          onChange={setKind}
          options={[{ value: 'all', label: 'All types' }, ...SAMPLE_KINDS.map((k) => ({ value: k, label: k }))]}
          style={{ width: 140 }}
        />

        <Button
          type={favOnly ? 'primary' : 'default'}
          onClick={() => setFavOnly(!favOnly)}
        >
          <MsnIcon name="heart" size="11px" /> Favorites
        </Button>

        <span className={styles.count}>
          {shownCount}/{totalCount}
        </span>

        <Select
          value={sort}
          onChange={setSort}
          options={[
            { value: 'recent', label: 'Recently added' },
            { value: 'name', label: 'Name (A→Z)' },
            { value: 'duration', label: 'Duration' },
            { value: 'size', label: 'Size' },
            { value: 'bpm', label: 'BPM' },
          ]}
          style={{ width: 160 }}
        />
      </div>
    );
  }
  ```

  `apps/front/src/pages/Samples/Toolbar.module.scss`:

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
    margin-bottom: 14px;
  }

  .search {
    width: 280px;
  }

  .count {
    margin-left: auto; // pushes count + sort to the right
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    font-family: ui-monospace, monospace;
  }
  ```

- [ ] **Step 2: Empty state**

  `apps/front/src/pages/Samples/EmptyState.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import styles from './EmptyState.module.scss';

  export function EmptyState({ onClear }: { onClear: () => void }): JSX.Element {
    return (
      <div className={styles.empty}>
        <MsnIcon name="search" size="28px" color="hsl(25, 90%, 55%)" />
        <h3 className={styles.title}>No samples match these filters</h3>
        <p className={styles.text}>Try clearing the filters or searching for a different term.</p>
        <Button onClick={onClear}>Clear filters</Button>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Samples/EmptyState.module.scss`:

  ```scss
  .empty {
    padding: 60px 24px;
    text-align: center;
    background: hsl(197, 14%, 8%);
    border: 0.5px dashed rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .title {
    margin: 8px 0 0;
    font-size: 16px;
    font-weight: 400;
    color: hsl(0, 0%, 92%);
  }

  .text {
    margin: 0 0 8px;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
  }
  ```

- [ ] **Step 3: Filtering logic in `Samples.tsx`**

  ```tsx
  import { useMemo, useState } from 'react';
  import { Toolbar, type SortKey } from './Toolbar';
  import { EmptyState } from './EmptyState';
  import { SAMPLES, parseDur } from './samples.data';
  // …

  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const [kind, setKind] = useState('all');
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('recent');

  const filtered = useMemo(() => {
    let rows = SAMPLES.slice();
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) => r.name.toLowerCase().includes(q) || r.pack.toLowerCase().includes(q) || r.tags.some((t) => t.includes(q)),
      );
    }
    if (family !== 'all') rows = rows.filter((r) => r.family === family);
    if (kind !== 'all') rows = rows.filter((r) => r.kind === kind);
    if (favOnly) rows = rows.filter((r) => r.fav);

    rows.sort((a, b) => {
      switch (sort) {
        case 'name': return a.name.localeCompare(b.name);
        case 'duration': return parseDur(a.dur) - parseDur(b.dur);
        case 'size': return b.size - a.size;
        case 'bpm': return (a.bpm ?? 999) - (b.bpm ?? 999);
        default: return SAMPLES.indexOf(a) - SAMPLES.indexOf(b); // 'recent'
      }
    });
    return rows;
  }, [query, family, kind, favOnly, sort]);

  const clearFilters = (): void => {
    setQuery('');
    setFamily('all');
    setKind('all');
    setFavOnly(false);
  };
  ```

- [ ] **Step 4: Wire it in** — render the `<Toolbar />` above the list, and switch the list area to use
  `filtered` (and show `EmptyState` when empty):

  ```tsx
  <Toolbar
    query={query} setQuery={setQuery}
    family={family} setFamily={setFamily}
    kind={kind} setKind={setKind}
    favOnly={favOnly} setFavOnly={setFavOnly}
    sort={sort} setSort={setSort}
    shownCount={filtered.length}
    totalCount={SAMPLES.length}
  />

  {/* selection bar … */}

  {filtered.length === 0 ? (
    <EmptyState onClear={clearFilters} />
  ) : (
    <SampleTable rows={filtered} /* …other props… */ />
  )}
  ```

- [ ] **Step 5: Verify** — typing in search filters live; family/type selects narrow the list; Favorites
  highlights and shows only hearted samples; sort reorders; the `shown/total` count updates. Filter down
  to nothing → the empty state appears, and "Clear filters" restores the list.

**Done when:** search + filters + sort drive the list via `useMemo`, empty state works,
`pnpm run check` passes.
