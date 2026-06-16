**Goal:** Build the left navigation sidebar — grouped nav items (Workspace / Social) with badges, a storage widget, and a Preferences button.

**Design source:** `design/home-variant-a.jsx` (the `LEFT NAV` section + `NavItem`/`SectionLabel`) · **Parent:** #14 · **Depends on:** Task 1

---

- [ ] **Step 1: The `NavItem` component**

  `apps/front/src/pages/Home/NavItem.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';
  import styles from './NavItem.module.scss';

  interface NavItemProps {
    icon: MsnIconLabel;
    label: string;
    active?: boolean;
    badge?: string;
    badgeColor?: string;
  }

  export function NavItem({ icon, label, active, badge, badgeColor }: NavItemProps): JSX.Element {
    return (
      <a href="#" className={`${styles.item} ${active ? styles.active : ''}`}>
        <MsnIcon name={icon} size="14px" />
        <span className={styles.label}>{label}</span>
        {badge && (
          <span className={styles.badge} style={badgeColor ? { color: badgeColor } : undefined}>
            {badge}
          </span>
        )}
      </a>
    );
  }
  ```

  `apps/front/src/pages/Home/NavItem.module.scss`:

  ```scss
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 8px;
    border-radius: 3px;
    color: hsl(0, 0%, 56%);
    font-size: 12px;
    cursor: pointer;
    border-left: 2px solid transparent;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .active {
    color: hsl(25, 90%, 55%);
    background: color-mix(in srgb, hsl(25, 90%, 55%) 8%, transparent);
    border-left-color: hsl(25, 90%, 55%);
    padding-left: 6px;
  }

  .label {
    flex: 1;
  }

  .badge {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 8px;
    color: hsl(0, 0%, 38%);
    background: hsl(197, 14%, 3%);
  }
  ```

- [ ] **Step 2: The sidebar**

  `apps/front/src/pages/Home/LeftNav.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { NavItem } from './NavItem';
  import styles from './LeftNav.module.scss';

  export function LeftNav(): JSX.Element {
    return (
      <nav className={styles.nav}>
        <div className={styles.sectionLabel}>Workspace</div>
        <NavItem icon="home" label="Home" active />
        <NavItem icon="folder" label="My Sessions" badge="14" />
        <NavItem icon="music" label="Tracks" badge="32" />
        <NavItem icon="waveform" label="Samples" />
        <NavItem icon="download" label="Exports" />

        <div className={styles.gap} />
        <div className={styles.sectionLabel}>Social</div>
        <NavItem icon="users" label="Following" badge="58" />
        <NavItem icon="chat" label="Messages" badge="2" badgeColor="hsl(8, 85%, 55%)" />
        <NavItem icon="heart" label="Liked" />
        <NavItem icon="list" label="Playlists" />

        <div className={styles.spacer} />

        <div className={styles.storage}>
          <div className={styles.storageHead}>
            <span>STORAGE</span>
            <span>4.2 / 10 GB</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: '42%' }} />
          </div>
        </div>

        <button className={styles.prefs}>
          <MsnIcon name="settings" size="13px" /> Preferences
        </button>
      </nav>
    );
  }
  ```

- [ ] **Step 3: Styles**

  `apps/front/src/pages/Home/LeftNav.module.scss`:

  ```scss
  .nav {
    background: hsl(197, 14%, 6%);
    border-right: 1px solid rgba(255, 255, 255, 0.04);
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    height: 100%;
  }

  .sectionLabel {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    padding: 6px 6px 4px;
  }

  .gap {
    height: 14px;
  }

  .spacer {
    flex: 1;
  }

  .storage {
    background: hsl(197, 14%, 12%);
    border-radius: 3px;
    padding: 10px;
    margin-top: 12px;
  }

  .storageHead {
    display: flex;
    justify-content: space-between;
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    margin-bottom: 6px;
  }

  .track {
    height: 3px;
    background: hsl(197, 14%, 3%);
    border-radius: 1px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    background: hsl(140, 65%, 45%);
  }

  .prefs {
    margin-top: 8px;
    background: transparent;
    color: hsl(0, 0%, 56%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    cursor: pointer;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }
  ```

- [ ] **Step 4: Add to the page** — in `Home.tsx`, render `<LeftNav />` with the
  `className={styles.leftnav}` grid cell (wrap it in a `<div className={styles.leftnav}>` like the top bar).

- [ ] **Step 5: Verify** — two labelled groups with icons + badges; "Home" is highlighted (orange, left
  border); storage bar ~42% green; Preferences pinned to the bottom. The whole nav scrolls if short on
  height, and disappears below 720px (per Task 1).

**Done when:** sidebar matches the design, active state + badges render, `pnpm run check` passes.
