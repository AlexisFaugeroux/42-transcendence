**Goal:** Scaffold the Dashboard (account settings) page — the shared app header, the centered layout with a scroll-spy settings nav, the shared row/card form primitives, seed user data, and the route.

**Design source:** `design/dashboard.jsx` · tokens in `design/colors_and_type.css`

> 👋 **Task 1 of the Dashboard page** (parent #13). Heads-up: the design for this issue is the
> **account settings** page (profile / account / danger zone). It's the most interactive page in the
> app, so it's split into small tasks that add state gradually.
>
> 🔗 **Depends on #48 (react-router)** and on the shared **`AppHeader`** from **#83**.
> Common setup (`sass-embedded`, fonts, `MsnThemeProvider`) is assumed done.
>
> 🔁 **Shared header:** this page uses the same top header as Samples (#16) and Sessions (#17) — the
> shared `AppHeader` with `active="settings"`. **Do not build a page-specific `DashHeader`.**
>
> ℹ️ **Routing note:** the design highlights **Settings** in its header, so we route this page at
> **`/settings`** (not `/dashboard`). Change it if your team prefers a different path.

**Conventions (same as other page tasks):** antd via `@transcendence/ui`; icons via
`@transcendence/ui/components/MsnIcon/MsnIcon`; `import type` for types; breakpoint `860px` (stack
the settings nav above the content).

---

- [ ] **Step 1: Create the folder** `apps/front/src/pages/Dashboard/`.

- [ ] **Step 2: Seed data + types**

  `apps/front/src/pages/Dashboard/dashboard.data.ts`:

  ```ts
  export interface ProfileLink {
    kind: string;
    url: string;
  }

  export interface UserProfile {
    alias: string;
    handle: string;
    email: string;
    bio: string;
    location: string;
    pronouns: string;
    joined: string;
    links: ProfileLink[];
  }

  // The "saved" source of truth. Later tasks copy this into editable form state.
  export const SAVED_USER: UserProfile = {
    alias: 'lex moreau',
    handle: 'lex.moreau',
    email: 'lex.moreau@example.com',
    bio: 'live looper, modular dabbler. recording in a converted garage in lyon. always down to jam after 22h.',
    location: 'Lyon, FR',
    pronouns: 'they/them',
    joined: 'Apr 2026',
    links: [
      { kind: 'site', url: 'https://lexmoreau.fm' },
      { kind: 'soundcloud', url: 'soundcloud.com/lexmoreau' },
      { kind: 'bandcamp', url: 'lexmoreau.bandcamp.com' },
    ],
  };
  ```

- [ ] **Step 3: Shared form primitives**

  These small layout components are used by every section. `apps/front/src/pages/Dashboard/primitives.tsx`:

  ```tsx
  import type { JSX, ReactNode } from 'react';
  import styles from './primitives.module.scss';

  export function SectionHeader({
    title,
    subtitle,
    right,
  }: {
    title: ReactNode;
    subtitle?: string;
    right?: ReactNode;
  }): JSX.Element {
    return (
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {right}
      </div>
    );
  }

  export function Card({ children }: { children: ReactNode }): JSX.Element {
    return <div className={styles.card}>{children}</div>;
  }

  export function Row({
    label,
    hint,
    children,
  }: {
    label: string;
    hint?: string;
    children: ReactNode;
  }): JSX.Element {
    return (
      <div className={styles.row}>
        <div>
          <div className={styles.rowLabel}>{label}</div>
          {hint && <div className={styles.rowHint}>{hint}</div>}
        </div>
        <div className={styles.rowBody}>{children}</div>
      </div>
    );
  }

  export function Hr(): JSX.Element {
    return <div className={styles.hr} />;
  }
  ```

  `apps/front/src/pages/Dashboard/primitives.module.scss`:

  ```scss
  .sectionHeader {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .title {
    margin: 0;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: hsl(0, 0%, 92%);
  }

  .subtitle {
    margin: 4px 0 0;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
  }

  .card {
    background: hsl(197, 14%, 8%);
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
  }

  .row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 24px;
    padding: 16px 20px;
    align-items: flex-start;
  }

  .rowLabel {
    color: hsl(0, 0%, 56%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .rowHint {
    margin-top: 4px;
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    line-height: 1.4;
  }

  .rowBody {
    display: flex;
    min-width: 0;
  }

  .hr {
    height: 1px;
    background: rgba(255, 255, 255, 0.04);
  }

  @media (max-width: 560px) {
    .row {
      grid-template-columns: 1fr; // stack label above value on mobile
      gap: 8px;
    }
  }
  ```

- [ ] **Step 4: Use the shared app header**

  This page reuses the shared **`AppHeader`** (the Home / Sessions / Library / Settings header shared
  with Samples and Sessions) — no page-specific header to build here.

  > 🔗 **`AppHeader` lives at `apps/front/src/components/AppHeader/`** and is built in **#83**, which
  > exposes an `active` prop. If it doesn't exist yet, do #83 first, then continue. **Do not create a
  > `DashHeader`** — there's one shared header for all the in-app pages.

  It's rendered in Step 6 below as `<AppHeader active="settings" />`. Nothing else to do in this step
  beyond confirming `AppHeader` exists.

- [ ] **Step 5: The scroll-spy settings nav**

  `apps/front/src/pages/Dashboard/SettingsNav.tsx`:

  ```tsx
  import { useEffect, useState, type JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import type { MsnIconLabel } from '@transcendence/ui/components/MsnIcon/types';
  import styles from './SettingsNav.module.scss';

  interface NavSection {
    id: string;
    label: string;
    icon: MsnIconLabel;
  }

  const SECTIONS: NavSection[] = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'account', label: 'Account', icon: 'settings' },
    { id: 'danger', label: 'Danger zone', icon: 'bell' },
  ];

  export function SettingsNav(): JSX.Element {
    const [activeId, setActiveId] = useState('profile');

    // Watch the three <section> elements and highlight whichever is most in view.
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
      );

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, []);

    return (
      <>
        <div className={styles.label}>Settings</div>
        <nav className={styles.nav}>
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.item} ${activeId === section.id ? styles.active : ''}`}
            >
              <MsnIcon name={section.icon} size="13px" /> {section.label}
            </a>
          ))}
        </nav>
      </>
    );
  }
  ```

  > **What's an `IntersectionObserver`?** A browser API that tells you when an element scrolls into
  > view. We use it to highlight the nav item for whichever section is on screen ("scroll spy"). The
  > `href="#profile"` anchors handle the actual jump-to-section; the observer only drives the highlight.

  `apps/front/src/pages/Dashboard/SettingsNav.module.scss`:

  ```scss
  .label {
    color: hsl(0, 0%, 38%);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 3px;
    color: hsl(0, 0%, 56%);
    font-size: 12px;
    border-left: 2px solid transparent;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .active {
    color: hsl(25, 90%, 55%);
    background: color-mix(in srgb, hsl(25, 90%, 55%) 10%, transparent);
    border-left-color: hsl(25, 90%, 55%);
  }
  ```

- [ ] **Step 6: The page + layout (with placeholder sections)**

  `apps/front/src/pages/Dashboard/Dashboard.module.scss`:

  ```scss
  .page {
    min-height: 100vh;
    background: hsl(197, 14%, 3%);
    color: hsl(0, 0%, 92%);
  }

  .layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 36px;
    max-width: 1180px;
    margin: 0 auto;
    padding: 32px 32px 80px;
  }

  .sidebar {
    position: sticky;
    top: 88px;
    align-self: start;
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  @media (max-width: 860px) {
    .layout {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 24px 16px 64px;
    }
    .sidebar {
      position: static; // nav sits above the content on small screens
    }
  }
  ```

  `apps/front/src/pages/Dashboard/Dashboard.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { AppHeader } from '../../components/AppHeader/AppHeader';
  import { SettingsNav } from './SettingsNav';
  import styles from './Dashboard.module.scss';

  export function Dashboard(): JSX.Element {
    return (
      <div className={styles.page}>
        <AppHeader active="settings" />
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <SettingsNav />
          </aside>

          <div className={styles.sections}>
            {/* Placeholder sections — filled in by later tasks. The ids must match
                SettingsNav's SECTIONS so the scroll-spy works. */}
            <section id="profile">
              <h2>Profile</h2>
            </section>
            <section id="account">
              <h2>Account</h2>
            </section>
            <section id="danger">
              <h2>Danger zone</h2>
            </section>
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 7: Add the route** — in `apps/front/src/App.tsx`:

  ```tsx
  import { Dashboard } from './pages/Dashboard/Dashboard';

  // inside <Routes>:
  <Route path="/settings" element={<Dashboard />} />
  ```

- [ ] **Step 8: Verify** — `http://localhost:5173/settings`: sticky blurred header, a left settings nav,
  and three placeholder sections. Scrolling highlights the matching nav item; clicking a nav item jumps
  to its section. Below 860px the nav moves above the content.

**Done when:** the shell, header, scroll-spy nav, primitives and data exist; `/settings` renders;
`pnpm run check` passes.
