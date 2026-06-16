**Goal:** Build the list view with antd `Table` — play button, name/meta, waveform, BPM/key, length, size, type and row actions — with multi-select (checkboxes + select-all) and a selection bar.

**Design source:** `design/samples.jsx` (`SampleTable`, `SelectionBar`, `Check`, `IconBtn`) · **Parent:** #16 · **Depends on:** Task 1, Task 2

> antd's `Table` gives us sortable columns, custom cell rendering, and — via `rowSelection` —
> checkboxes + "select all" for free. That replaces the design's hand-built grid table and the manual
> selection logic. We hold the page's selection + "playing" state in `Samples.tsx`.

---

- [ ] **Step 1: The table component**

  `apps/front/src/pages/Samples/SampleTable.tsx`:

  ```tsx
  import type { JSX, Key } from 'react';
  import { Button, Table, Tag, type TableColumnsType } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { WaveformPlaceholder } from './WaveformPlaceholder';
  import { FAMILY_COLOR, formatMB, type Sample } from './samples.data';
  import styles from './SampleTable.module.scss';

  interface SampleTableProps {
    rows: Sample[];
    selectedKeys: Key[];
    onSelectionChange: (keys: Key[]) => void;
    playingId: number | null;
    onPlay: (id: number) => void;
    onDelete: (sample: Sample) => void;
  }

  export function SampleTable({
    rows,
    selectedKeys,
    onSelectionChange,
    playingId,
    onPlay,
    onDelete,
  }: SampleTableProps): JSX.Element {
    const columns: TableColumnsType<Sample> = [
      {
        title: '',
        key: 'play',
        width: 48,
        render: (_, row) => (
          <button className={styles.play} data-active={playingId === row.id} onClick={() => onPlay(row.id)}>
            <MsnIcon name={playingId === row.id ? 'list' : 'play'} size="11px" />
          </button>
        ),
      },
      {
        title: 'Name',
        key: 'name',
        render: (_, row) => (
          <div>
            <div className={styles.nameLine}>
              {row.fav && <MsnIcon name="heart" size="11px" color="hsl(25, 90%, 55%)" />}
              <span className={styles.name}>{row.name}</span>
            </div>
            <div className={styles.meta}>
              <Tag color={FAMILY_COLOR[row.family]}>{row.family}</Tag>
              <span>{row.pack}</span>
              <span>· added {row.added}</span>
            </div>
          </div>
        ),
      },
      {
        title: 'Waveform',
        key: 'waveform',
        width: 220,
        render: (_, row) => <WaveformPlaceholder seed={row.seed} color={FAMILY_COLOR[row.family]} />,
      },
      {
        title: 'BPM / Key',
        key: 'bpmKey',
        width: 110,
        render: (_, row) => (
          <span className={styles.mono}>
            {row.bpm ?? '—'}
            {row.key && <span className={styles.muted}> · {row.key}</span>}
          </span>
        ),
      },
      { title: 'Length', dataIndex: 'dur', width: 80, render: (v: string) => <span className={styles.mono}>{v}</span> },
      { title: 'Size', key: 'size', width: 90, render: (_, row) => <span className={styles.mono}>{formatMB(row.size)}</span> },
      { title: 'Type', dataIndex: 'kind', width: 90, render: (v: string) => <Tag>{v}</Tag> },
      {
        title: 'Actions',
        key: 'actions',
        width: 120,
        align: 'right',
        render: (_, row) => (
          <div className={styles.actions}>
            <Button type="text" size="small" title="Add to session">
              <MsnIcon name="plus" size="12px" />
            </Button>
            <Button type="text" size="small" title="Download">
              <MsnIcon name="download" size="12px" />
            </Button>
            <Button type="text" size="small" danger title="Delete" onClick={() => onDelete(row)}>
              ✕
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={rows}
        pagination={false}
        size="small"
        rowSelection={{ selectedRowKeys: selectedKeys, onChange: onSelectionChange }}
      />
    );
  }
  ```

  `apps/front/src/pages/Samples/SampleTable.module.scss`:

  ```scss
  .play {
    width: 32px;
    height: 32px;
    border-radius: 3px;
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    background: hsl(197, 14%, 3%);
    color: hsl(0, 0%, 92%);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &[data-active='true'] {
      background: hsl(25, 90%, 55%);
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .nameLine {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .name {
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: hsl(0, 0%, 92%);
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 3px;
    color: hsl(0, 0%, 38%);
    font-size: 11px;
  }

  .mono {
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: hsl(0, 0%, 56%);
  }

  .muted {
    color: hsl(0, 0%, 38%);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 2px;
  }
  ```

- [ ] **Step 2: Selection bar**

  `apps/front/src/pages/Samples/SelectionBar.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import styles from './SelectionBar.module.scss';

  interface SelectionBarProps {
    count: number;
    onClear: () => void;
    onDelete: () => void;
  }

  export function SelectionBar({ count, onClear, onDelete }: SelectionBarProps): JSX.Element {
    return (
      <div className={styles.bar}>
        <div className={styles.left}>
          <span className={styles.count}>{count} selected</span>
          <button className={styles.clear} onClick={onClear}>
            clear
          </button>
        </div>
        <div className={styles.actions}>
          <Button size="small">
            <MsnIcon name="folder" size="11px" /> Move to…
          </Button>
          <Button size="small">
            <MsnIcon name="download" size="11px" /> Download
          </Button>
          <Button size="small" danger onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Samples/SelectionBar.module.scss`:

  ```scss
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 4px;
    background: color-mix(in srgb, hsl(25, 90%, 55%) 10%, hsl(197, 14%, 8%));
    border: 0.5px solid color-mix(in srgb, hsl(25, 90%, 55%) 50%, transparent);
    margin-bottom: 14px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .count {
    color: hsl(25, 90%, 55%);
    font-family: ui-monospace, monospace;
    font-size: 12px;
  }

  .clear {
    background: transparent;
    border: 0;
    color: hsl(0, 0%, 38%);
    cursor: pointer;
    font-size: 11px;
    font-family: ui-monospace, monospace;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  ```

- [ ] **Step 3: Hold state in `Samples.tsx`**

  ```tsx
  import { useState, type Key } from 'react';
  import { SampleTable } from './SampleTable';
  import { SelectionBar } from './SelectionBar';
  import { SAMPLES, type Sample } from './samples.data';
  // …

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const togglePlay = (id: number): void => setPlayingId((prev) => (prev === id ? null : id));
  // onDelete opens a modal in Task 6 — for now just log:
  const handleDelete = (sample: Sample): void => console.log('delete', sample.name);

  // inside .container, after <StorageBar />:
  {selectedKeys.length > 0 && (
    <SelectionBar
      count={selectedKeys.length}
      onClear={() => setSelectedKeys([])}
      onDelete={() => console.log('delete selection')}
    />
  )}

  <SampleTable
    rows={SAMPLES}
    selectedKeys={selectedKeys}
    onSelectionChange={setSelectedKeys}
    playingId={playingId}
    onPlay={togglePlay}
    onDelete={handleDelete}
  />
  ```

- [ ] **Step 4: Verify** — a table of all 18 samples: clicking the play button toggles its active state;
  the favourite ones show a heart; family/type tags render; checking rows shows the selection bar with a
  live count; the header checkbox selects/clears all.

**Done when:** the list renders with working play toggle and multi-select + selection bar,
`pnpm run check` passes.
