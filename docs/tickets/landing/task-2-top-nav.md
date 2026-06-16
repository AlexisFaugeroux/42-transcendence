**Goal:** Build the top navigation bar — logo, nav links, and the Log in / Sign up buttons (wired through the router).

**Design source:** `design/landing.jsx` (the `TOP NAV` section) · **Parent:** #11 · **Depends on:** Task 1, #48

> See Task 1 for the shared conventions (antd via `@transcendence/ui`, the `MsnIcon`/`MsnWordmark`
> imports, the `960px` / `600px` breakpoints).

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Landing/TopNav.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Link } from 'react-router';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { MsnWordmark } from '@transcendence/ui/components/MsnWordmark/MsnWordmark';
  import styles from './TopNav.module.scss';

  // No pages for these yet — placeholder anchors until those sections exist.
  const NAV_LINKS = ['Features', 'Make beats', 'Stream', 'Community', 'Manuals'];

  export function TopNav(): JSX.Element {
    return (
      <header className={styles.nav}>
        <div className={styles.bar}>
          <Link to="/" className={styles.brand}>
            <MsnIcon name="msn" size="22px" color="hsl(25, 90%, 55%)" />
            <MsnWordmark size={16} accent="hsl(25, 90%, 55%)" />
          </Link>

          <nav className={styles.links}>
            {NAV_LINKS.map((label) => (
              <a key={label} href="#" className={styles.link}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link to="/login">
              <Button>Log in</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary">Sign up free</Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }
  ```

  > **Why `<Link>` around `<Button>`?** The button is the visual; `<Link>` makes it navigate
  > client-side (no reload), consistent with #48. The middle nav items have no destination yet, so
  > they're placeholder `href="#"` anchors.

- [ ] **Step 2: Styles (with responsive behavior)**

  `apps/front/src/pages/Landing/TopNav.module.scss`:

  ```scss
  .nav {
    width: 100%;
    background: hsl(197, 14%, 6%); // --bg-panel
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .bar {
    max-width: 1200px;
    height: 64px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 22px;
    margin-left: 16px;
  }

  .link {
    color: hsl(0, 0%, 56%);
    font-size: 12px;
    white-space: nowrap;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .actions {
    margin-left: auto; // pushes the auth buttons to the right
    display: flex;
    align-items: center;
    gap: 12px;
  }

  // Tablet/mobile: hide the middle nav, keep brand + auth buttons.
  @media (max-width: 860px) {
    .links {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .bar {
      gap: 12px;
      padding: 0 16px;
    }
  }
  ```

  > **Responsive choice:** hiding the middle links on small screens is the simplest correct option.
  > A hamburger menu is a nice future enhancement, but out of scope here.

- [ ] **Step 3: Add it to the page**

  In `Landing.tsx`, import and render `<TopNav />` as the first child of `.page`.

- [ ] **Step 4: Verify**

  Header shows logo + nav + buttons. Clicking **Log in** → `/login`, **Sign up free** → `/signup`
  (no reload). Narrow the window below ~860px → the middle nav disappears, buttons stay.

**Done when:** nav renders, auth buttons route correctly, it collapses cleanly on small screens,
`pnpm run check` passes.
