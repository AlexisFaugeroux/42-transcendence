**Goal:** Build the page title row (eyebrow, heading, count + actions) and the storage bar (usage stacked by sample family, with a legend).

**Design source:** `design/samples.jsx` (title row + `StorageBar`) · **Parent:** #16 · **Depends on:** Task 1

---

- [ ] **Step 1: Storage bar component**

  `apps/front/src/pages/Samples/StorageBar.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { SAMPLES, STORAGE_LIMIT_GB, STORAGE_LIMIT_MB, FAMILY_COLOR, formatMB, type SampleFamily } from './samples.data';
  import styles from './StorageBar.module.scss';

  const FAMILY_ORDER: SampleFamily[] = ['drums', 'bass', 'synth', 'vocal', 'perc', 'texture', 'fx'];

  export function StorageBar(): JSX.Element {
    // Total MB per family, summed once.
    const byFamily = SAMPLES.reduce<Record<string, number>>((acc, s) => {
      acc[s.family] = (acc[s.family] ?? 0) + s.size;
      return acc;
    }, {});

    const usedMB = SAMPLES.reduce((acc, s) => acc + s.size, 0);
    const pct = Math.min(1, usedMB / STORAGE_LIMIT_MB);
    const remaining = Math.max(0, STORAGE_LIMIT_MB - usedMB);
    const warn = pct > 0.8;

    return (
      <div className={styles.box}>
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <span className={styles.label}>Storage</span>
            <span className={styles.mono}>
              <span style={{ color: warn ? 'hsl(45, 95%, 55%)' : 'hsl(25, 90%, 55%)' }}>{formatMB(usedMB)}</span>
              <span className={styles.muted}> / {STORAGE_LIMIT_GB} GB</span>
            </span>
            <span className={styles.muted}>
              ({Math.round(pct * 100)}% — {formatMB(remaining)} free)
            </span>
          </div>
          <a href="#" className={styles.upgrade}>
            Upgrade plan →
          </a>
        </div>

        <div className={styles.bar}>
          {FAMILY_ORDER.map((family) => {
            const width = (byFamily[family] ?? 0) / STORAGE_LIMIT_MB;
            if (width === 0) return null;
            return (
              <div
                key={family}
                title={`${family} — ${formatMB(byFamily[family])}`}
                style={{ width: `${width * 100}%`, background: FAMILY_COLOR[family] }}
              />
            );
          })}
        </div>

        <div className={styles.legend}>
          {FAMILY_ORDER.filter((f) => byFamily[f]).map((family) => (
            <span key={family} className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: FAMILY_COLOR[family] }} />
              {family}
              <span className={styles.muted}>{formatMB(byFamily[family])}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Samples/StorageBar.module.scss`:

  ```scss
  .box {
    background: hsl(197, 14%, 8%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 16px 18px;
    margin-bottom: 22px;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .headLeft {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }

  .label {
    font-size: 11px;
    color: hsl(0, 0%, 38%);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .mono {
    font-family: ui-monospace, monospace;
    font-size: 13px;
    color: hsl(0, 0%, 92%);
  }

  .muted {
    color: hsl(0, 0%, 38%);
    font-size: 12px;
  }

  .upgrade {
    color: hsl(210, 90%, 50%);
    font-size: 12px;
  }

  .bar {
    height: 10px;
    border-radius: 2px;
    overflow: hidden;
    background: hsl(197, 14%, 3%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    display: flex;
  }

  .bar > div {
    height: 100%;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 10px;
  }

  .legendItem {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: hsl(0, 0%, 56%);
    font-family: ui-monospace, monospace;
  }

  .swatch {
    width: 8px;
    height: 8px;
    border-radius: 1px;
  }
  ```

- [ ] **Step 2: Title row + wire both in**

  Update `Samples.tsx` to render a title row and the storage bar inside `.container`:

  ```tsx
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { StorageBar } from './StorageBar';
  import { SAMPLES, STORAGE_LIMIT_GB } from './samples.data';
  // …

  const usedMB = Math.round(SAMPLES.reduce((acc, s) => acc + s.size, 0));

  // inside .container:
  <div className={styles.titleRow}>
    <div>
      <div className={styles.eyebrow}>Library</div>
      <h1 className={styles.title}>Samples</h1>
      <p className={styles.subtitle}>
        {SAMPLES.length} sounds · {usedMB} MB used of {STORAGE_LIMIT_GB} GB
      </p>
    </div>
    <div className={styles.actions}>
      <Button size="large">
        <MsnIcon name="folder" size="13px" /> New folder
      </Button>
      <Button type="primary" size="large">
        <MsnIcon name="plus" size="13px" /> Add sample
      </Button>
    </div>
  </div>

  <StorageBar />
  ```

  Add to `Samples.module.scss`:

  ```scss
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

  .actions {
    display: flex;
    gap: 10px;
  }
  ```

  > The "Add sample" button opens the upload modal — wired in Task 6. Leave it as a plain button for now.

- [ ] **Step 3: Verify** — title block on the left, two buttons on the right; the storage bar shows a
  multi-colored usage bar + a legend of families with their sizes. Hovering a bar segment shows its
  family/size tooltip.

**Done when:** title row + storage bar match the design and reflow on small screens, `pnpm run check` passes.
