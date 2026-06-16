**Goal:** Build the session card and the responsive card grid — cover with type art, type badge, archived ribbon, title with a `⋯` actions menu, meta, tags, and an Open/Restore footer.

**Design source:** `design/sessions.jsx` (`SessGrid`, `SessCard`, `CardMenuItem`) · **Parent:** #17 · **Depends on:** Task 1

> The design hand-builds the `⋯` dropdown (with manual click-outside handling). We use antd's
> **`Dropdown`** instead — it handles open/close and outside-clicks for us.

---

- [ ] **Step 1: The card**

  `apps/front/src/pages/Sessions/SessionCard.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button, Dropdown, Tag, type MenuProps } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { TYPE_COLOR, TYPE_ICON, formatSize, type Session } from './sessions.data';
  import styles from './SessionCard.module.scss';

  interface SessionCardProps {
    session: Session;
    archived: boolean;
    onRename: (session: Session) => void;
    onDelete: (session: Session) => void;
  }

  export function SessionCard({ session, archived, onRename, onDelete }: SessionCardProps): JSX.Element {
    const color = TYPE_COLOR[session.type];

    const menuItems: MenuProps['items'] = [
      { key: 'open', label: 'Open in editor', icon: <MsnIcon name="play" size="12px" /> },
      { key: 'rename', label: 'Rename', icon: <MsnIcon name="settings" size="12px" />, onClick: () => onRename(session) },
      { key: 'export', label: 'Export bounce', icon: <MsnIcon name="download" size="12px" /> },
      { key: 'archive', label: archived ? 'Unarchive' : 'Archive', icon: <MsnIcon name="folder" size="12px" /> },
      { type: 'divider' },
      { key: 'delete', label: 'Delete', danger: true, icon: <MsnIcon name="bell" size="12px" />, onClick: () => onDelete(session) },
    ];

    return (
      <div className={styles.card} data-archived={archived}>
        <div className={styles.cover} style={{ '--type-color': color } as React.CSSProperties}>
          {archived && <span className={styles.ribbon}>archived</span>}
          <span className={styles.badge}>
            <MsnIcon name={TYPE_ICON[session.type]} size="11px" /> {session.type}
          </span>
          <div className={styles.logo}>
            <MsnIcon name={TYPE_ICON[session.type]} size="38px" />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{session.title}</h3>
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
              <button className={styles.menuButton} aria-label="Session actions">
                ⋯
              </button>
            </Dropdown>
          </div>

          <div className={styles.meta}>
            <span>{session.bpm ? `${session.bpm} BPM` : '— BPM'}</span>
            <span className={styles.dot}>·</span>
            <span>{session.key ?? '—'}</span>
            <span className={styles.dot}>·</span>
            <span>{formatSize(session.size)}</span>
          </div>

          <div className={styles.tags}>
            {session.tags.map((t) => (
              <Tag key={t}>#{t}</Tag>
            ))}
          </div>

          <div className={styles.footer}>
            <span className={styles.edited}>Edited {session.edited}</span>
            <Button size="small" type={archived ? 'default' : 'primary'}>
              {archived ? 'Restore' : 'Open'} <MsnIcon name="arrowR" size="11px" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  ```

  > **`--type-color`** is a CSS custom property we set inline from the session's type, then read inside
  > the SCSS (`var(--type-color)`). It's a clean way to drive per-card colors without inlining every rule.

- [ ] **Step 2: Card styles**

  `apps/front/src/pages/Sessions/SessionCard.module.scss`:

  ```scss
  .card {
    background: hsl(197, 14%, 8%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 140ms, border-color 140ms, box-shadow 140ms;

    &:hover {
      border-color: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    }

    &[data-archived='true'] {
      opacity: 0.85;
    }
  }

  .cover {
    position: relative;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--type-color) 25%, hsl(197, 14%, 12%)),
      color-mix(in srgb, var(--type-color) 4%, hsl(197, 14%, 3%))
    );
  }

  .ribbon {
    position: absolute;
    top: 10px;
    left: 10px;
    background: hsl(197, 14%, 3%);
    color: hsl(0, 0%, 56%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 2px;
    padding: 2px 6px;
    font-family: ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--type-color);
    font-family: ui-monospace, monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: color-mix(in srgb, var(--type-color) 14%, transparent);
    border: 0.5px solid color-mix(in srgb, var(--type-color) 40%, transparent);
    border-radius: 2px;
    padding: 3px 6px;
  }

  .logo {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    color: var(--type-color);
    background: color-mix(in srgb, var(--type-color) 14%, hsl(197, 14%, 3%));
    border: 1px solid color-mix(in srgb, var(--type-color) 50%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px -6px var(--type-color);
  }

  .body {
    padding: 12px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .titleRow {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .title {
    margin: 0;
    flex: 1;
    min-width: 0;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.01em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menuButton {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    background: transparent;
    color: hsl(0, 0%, 56%);
    cursor: pointer;
    font-size: 14px;
    line-height: 1;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: hsl(0, 0%, 56%);
  }

  .dot {
    color: hsl(0, 0%, 38%);
  }

  .tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .edited {
    color: hsl(0, 0%, 38%);
    font-size: 11px;
  }
  ```

- [ ] **Step 3: The grid + render it**

  `apps/front/src/pages/Sessions/SessionGrid.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { SessionCard } from './SessionCard';
  import type { Session } from './sessions.data';
  import styles from './SessionGrid.module.scss';

  interface SessionGridProps {
    rows: Session[];
    archived: boolean;
    onRename: (session: Session) => void;
    onDelete: (session: Session) => void;
  }

  export function SessionGrid({ rows, archived, onRename, onDelete }: SessionGridProps): JSX.Element {
    return (
      <div className={styles.grid}>
        {rows.map((session) => (
          <SessionCard key={session.id} session={session} archived={archived} onRename={onRename} onDelete={onDelete} />
        ))}
      </div>
    );
  }
  ```

  `apps/front/src/pages/Sessions/SessionGrid.module.scss`:

  ```scss
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }
  ```

  In `Sessions.tsx`, compute the bucket's rows and render the grid (filters come in Task 3):

  ```tsx
  import { SessionGrid } from './SessionGrid';
  import type { Session } from './sessions.data';

  const rows = SESSIONS.filter((s) => (bucket === 'archived' ? s.archived : !s.archived));
  const handleRename = (s: Session): void => console.log('rename', s.title); // modal in Task 5
  const handleDelete = (s: Session): void => console.log('delete', s.title); // modal in Task 5

  // in the results area:
  <SessionGrid rows={rows} archived={bucket === 'archived'} onRename={handleRename} onDelete={handleDelete} />
  ```

- [ ] **Step 4: Verify** — the active bucket shows a responsive grid of cards: each has a colored cover +
  type icon, a type badge, BPM/key/size, tags, "Edited …" and an Open button. Archived cards show the
  ribbon + a "Restore" button and look slightly dimmed. The `⋯` menu opens on click and closes on
  outside-click; Rename/Delete log to the console for now.

**Done when:** cards + grid render for both buckets with a working `⋯` menu, `pnpm run check` passes.
