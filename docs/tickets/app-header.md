# Build the shared in-app header (`AppHeader`)

**App:** `apps/front` · **Type:** Frontend / shared component · **Est:** ~1–2 hours

> 👋 Small, self-contained component ticket. The Dashboard (#13), Samples (#16) and Sessions (#17)
> pages all share the **same** sticky top header (Home / Sessions / Library / Settings). Build it once
> here so each page just renders `<AppHeader active="…" />`.
>
> 🔗 **Depends on #48 (react-router)** — the header uses `<Link>`. Common setup (`sass-embedded`,
> fonts, `MsnThemeProvider`) is assumed done.

**Conventions:** antd via `@transcendence/ui`; icons via `@transcendence/ui/components/MsnIcon/MsnIcon`;
`import type` for types.

---

- [ ] **Step 1: Create the component**

  `apps/front/src/components/AppHeader/AppHeader.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Link } from 'react-router';
  import { Avatar } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { MsnWordmark } from '@transcendence/ui/components/MsnWordmark/MsnWordmark';
  import styles from './AppHeader.module.scss';

  type ActiveKey = 'home' | 'sessions' | 'library' | 'settings';

  const NAV: { key: ActiveKey; label: string; to: string }[] = [
    { key: 'home', label: 'Home', to: '/home' },
    { key: 'sessions', label: 'Sessions', to: '/sessions' },
    { key: 'library', label: 'Library', to: '/samples' },
    { key: 'settings', label: 'Settings', to: '/settings' },
  ];

  export function AppHeader({ active }: { active: ActiveKey }): JSX.Element {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <MsnIcon name="msn" size="20px" color="hsl(25, 90%, 55%)" />
          <MsnWordmark size={15} accent="hsl(25, 90%, 55%)" />
        </Link>

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className={item.key === active ? styles.active : styles.link}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <button className={styles.iconButton} aria-label="Notifications">
            <MsnIcon name="bell" size="16px" />
          </button>
          <Link to="/settings" className={styles.user}>
            <Avatar size={28}>L</Avatar>
            <span className={styles.handle}>@lex.moreau</span>
          </Link>
        </div>
      </header>
    );
  }
  ```

  > **The `active` prop** highlights the current page's nav item. Each page passes its own value:
  > `library` (Samples), `sessions` (Sessions), `settings` (Dashboard). The user chip / handle is
  > hard-coded for now — it'll come from real auth later.

- [ ] **Step 2: Styles**

  `apps/front/src/components/AppHeader/AppHeader.module.scss`:

  ```scss
  .header {
    position: sticky;
    top: 0;
    z-index: 5;
    background: color-mix(in srgb, hsl(197, 14%, 3%) 88%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 22px;
    font-size: 12px;
  }

  .link {
    color: hsl(0, 0%, 56%);
    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .active {
    color: hsl(25, 90%, 55%);
  }

  .right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .iconButton {
    background: transparent;
    border: 0;
    color: hsl(0, 0%, 56%);
    cursor: pointer;
    display: inline-flex;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 8px;
    color: inherit;
  }

  .handle {
    color: hsl(0, 0%, 92%);
    font-size: 12px;
  }

  @media (max-width: 640px) {
    .nav {
      display: none;
    }
    .header {
      padding: 12px 16px;
    }
  }
  ```

- [ ] **Step 3: Verify** — temporarily render `<AppHeader active="library" />` at the top of any page (or
  a throwaway route): the sticky blurred header shows the wordmark, the four nav links (with **Library**
  highlighted in orange), a notifications bell and the user chip. Each nav link routes to its path
  (`/home`, `/sessions`, `/samples`, `/settings`); the logo routes to `/`. Below 640px the middle nav
  hides.

**Done when:** `apps/front/src/components/AppHeader/` exports a working `AppHeader` with an `active`
prop; `pnpm run check` passes. The Dashboard (#13), Samples (#16) and Sessions (#17) page tasks consume
this component.
