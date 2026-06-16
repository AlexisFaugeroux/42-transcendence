**Goal:** Add a card grid view and a list/grid toggle, so the same filtered samples can be shown either way.

**Design source:** `design/samples.jsx` (`SampleGrid`, the view toggle in `Toolbar`) · **Parent:** #16 · **Depends on:** Task 3, Task 4

---

- [ ] **Step 1: Add the view toggle to the toolbar**

  In `Toolbar.tsx`, add a `view`/`setView` to the props and render an antd `Segmented` at the end:

  ```tsx
  import { Segmented } from '@transcendence/ui';

  export type ViewMode = 'list' | 'grid';

  // add to ToolbarProps:
  //   view: ViewMode;
  //   setView: (v: ViewMode) => void;

  // at the end of the toolbar JSX, after the sort <Select>:
  <Segmented
    value={view}
    onChange={(value) => setView(value as ViewMode)}
    options={[
      { value: 'list', icon: <MsnIcon name="list" size="13px" /> },
      { value: 'grid', icon: <MsnIcon name="grid" size="13px" /> },
    ]}
  />
  ```

- [ ] **Step 2: The grid component**

  `apps/front/src/pages/Samples/SampleGrid.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button, Tag } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { WaveformPlaceholder } from './WaveformPlaceholder';
  import { FAMILY_COLOR, formatMB, type Sample } from './samples.data';
  import styles from './SampleGrid.module.scss';

  interface SampleGridProps {
    rows: Sample[];
    playingId: number | null;
    onPlay: (id: number) => void;
    onDelete: (sample: Sample) => void;
  }

  export function SampleGrid({ rows, playingId, onPlay, onDelete }: SampleGridProps): JSX.Element {
    return (
      <div className={styles.grid}>
        {rows.map((row) => (
          <div key={row.id} className={styles.card}>
            <div className={styles.top}>
              <div className={styles.nameBox}>
                <div className={styles.nameLine}>
                  {row.fav && <MsnIcon name="heart" size="11px" color="hsl(25, 90%, 55%)" />}
                  <span className={styles.name}>{row.name}</span>
                </div>
                <div className={styles.pack}>{row.pack}</div>
              </div>
              <Tag color={FAMILY_COLOR[row.family]}>{row.family}</Tag>
            </div>

            <div className={styles.player}>
              <button className={styles.play} data-active={playingId === row.id} onClick={() => onPlay(row.id)}>
                <MsnIcon name={playingId === row.id ? 'list' : 'play'} size="11px" />
              </button>
              <WaveformPlaceholder seed={row.seed} color={FAMILY_COLOR[row.family]} height={36} />
            </div>

            <div className={styles.meta}>
              <span>{row.dur}</span>
              <span>· {formatMB(row.size)}</span>
              {row.bpm && <span>· {row.bpm} BPM</span>}
              {row.key && <span className={styles.muted}>{row.key}</span>}
            </div>

            <div className={styles.tags}>
              {row.tags.map((t) => (
                <Tag key={t}>#{t}</Tag>
              ))}
            </div>

            <div className={styles.actions}>
              <Button size="small">
                <MsnIcon name="plus" size="11px" /> To session
              </Button>
              <Button size="small" danger onClick={() => onDelete(row)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  ```

  `apps/front/src/pages/Samples/SampleGrid.module.scss`:

  ```scss
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
  }

  .card {
    background: hsl(197, 14%, 8%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .nameBox {
    min-width: 0;
  }

  .nameLine {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .name {
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: hsl(0, 0%, 92%);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pack {
    margin-top: 4px;
    color: hsl(0, 0%, 38%);
    font-size: 11px;
  }

  .player {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: hsl(197, 14%, 3%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 3px;
  }

  .play {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid hsl(25, 90%, 55%);
    background: transparent;
    color: hsl(25, 90%, 55%);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &[data-active='true'] {
      background: hsl(25, 90%, 55%);
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    color: hsl(0, 0%, 56%);
    font-family: ui-monospace, monospace;
    font-size: 11px;
    flex-wrap: wrap;
  }

  .muted {
    color: hsl(0, 0%, 38%);
  }

  .tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 4px;
  }
  ```

- [ ] **Step 3: Switch views in `Samples.tsx`**

  ```tsx
  import { SampleGrid } from './SampleGrid';
  import type { ViewMode } from './Toolbar';

  const [view, setView] = useState<ViewMode>('list');

  // pass view/setView to <Toolbar />, then:
  {filtered.length === 0 ? (
    <EmptyState onClear={clearFilters} />
  ) : view === 'list' ? (
    <SampleTable rows={filtered} selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} playingId={playingId} onPlay={togglePlay} onDelete={handleDelete} />
  ) : (
    <SampleGrid rows={filtered} playingId={playingId} onPlay={togglePlay} onDelete={handleDelete} />
  )}
  ```

- [ ] **Step 4: Verify** — the list/grid toggle switches between the table and a responsive card grid
  (cards reflow to fill the width). Filters/sort apply to both; play toggle works in both. The selection
  bar is list-only (grid has no checkboxes, matching the design).

**Done when:** both views work and share the filtered data, `pnpm run check` passes.
