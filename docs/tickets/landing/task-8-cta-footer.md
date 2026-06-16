**Goal:** Build the final two sections — the closing CTA banner and the multi-column site footer — to complete the page.

**Design source:** `design/landing.jsx` (the `CTA` and `FOOTER` sections) · **Parent:** #11 · **Depends on:** Task 1, #48

---

## Part A — CTA banner

- [ ] **Step 1: Component**

  `apps/front/src/pages/Landing/Cta.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Link } from 'react-router';
  import { Button } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import styles from './Cta.module.scss';

  export function Cta(): JSX.Element {
    return (
      <section className={styles.cta}>
        <div className={styles.inner}>
          <h2 className={styles.title}>
            Press record. <span className={styles.accent}>Make some noise.</span>
          </h2>
          <p className={styles.sub}>
            Free while in beta. No credit card. Your sessions stay yours.
          </p>
          <div className={styles.actions}>
            <Link to="/signup">
              <Button type="primary" size="large">
                Sign up free <MsnIcon name="arrowR" size="12px" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="large">Log in</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  ```

  `apps/front/src/pages/Landing/Cta.module.scss`:

  ```scss
  .cta {
    width: 100%;
    background: hsl(197, 14%, 8%); // --bg-panel-2
    background-image: radial-gradient(circle at 50% 0%, hsla(25, 90%, 55%, 0.1), transparent 60%);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 24px;
    text-align: center;
  }

  .title {
    margin: 0;
    color: #fff;
    font-size: 44px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .accent {
    color: hsl(25, 90%, 55%);
  }

  .sub {
    max-width: 520px;
    margin: 14px auto 0;
    color: hsl(0, 0%, 56%);
    font-size: 14px;
  }

  .actions {
    display: inline-flex;
    gap: 12px;
    margin-top: 28px;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 600px) {
    .inner {
      padding: 56px 16px;
    }
    .title {
      font-size: 32px;
    }
  }
  ```

## Part B — Footer

- [ ] **Step 2: Component**

  `apps/front/src/pages/Landing/SiteFooter.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { MsnWordmark } from '@transcendence/ui/components/MsnWordmark/MsnWordmark';
  import styles from './SiteFooter.module.scss';

  interface FooterCol {
    title: string;
    links: string[];
  }

  const COLUMNS: FooterCol[] = [
    { title: 'Product', links: ['Features', 'Beat maker', 'Recording', 'Mixer', 'Stream'] },
    { title: 'Community', links: ['Discover', 'Playlists', 'Live now', 'Discord', 'Newsletter'] },
    { title: 'Resources', links: ['Manuals', 'Tutorials', 'Changelog', 'Status', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Contact', 'Press kit'] },
  ];

  const LEGAL = ['Legal mentions', 'Privacy', 'Terms', 'Cookies'];

  export function SiteFooter(): JSX.Element {
    return (
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.cols}>
            <div className={styles.brandCol}>
              <div className={styles.brand}>
                <MsnIcon name="msn" size="20px" color="hsl(25, 90%, 55%)" />
                <MsnWordmark size={14} accent="hsl(25, 90%, 55%)" />
              </div>
              <p className={styles.tagline}>
                A browser-based studio with a built-in audience. No installs, no tracking.
              </p>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className={styles.colTitle}>{col.title}</div>
                <ul className={styles.linkList}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className={styles.link}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.legal}>
            <div>© 2026 MakeSomeNoise. Built with ♥.</div>
            <div className={styles.legalLinks}>
              {LEGAL.map((item) => (
                <a key={item} href="#" className={styles.link}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }
  ```

- [ ] **Step 3: Footer styles (responsive columns)**

  `apps/front/src/pages/Landing/SiteFooter.module.scss`:

  ```scss
  .footer {
    width: 100%;
    background: hsl(197, 14%, 3%); // --color-void
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .cols {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr;
    gap: 32px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .tagline {
    max-width: 280px;
    margin: 0;
    color: hsl(0, 0%, 38%);
    font-size: 12px;
    line-height: 1.55;
  }

  .colTitle {
    color: hsl(0, 0%, 92%);
    font-size: 12px;
    margin-bottom: 12px;
  }

  .linkList {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .link {
    color: hsl(0, 0%, 38%);
    font-size: 12px;

    &:hover {
      color: hsl(0, 0%, 92%);
    }
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.04);
  }

  .legal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: hsl(0, 0%, 38%);
    font-size: 11px;
    gap: 16px;
    flex-wrap: wrap;
  }

  .legalLinks {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
  }

  // Tablet: 2 columns. Mobile: stack everything.
  @media (max-width: 860px) {
    .cols {
      grid-template-columns: repeat(2, 1fr);
    }
    .brandCol {
      grid-column: 1 / -1; // brand spans full width
    }
  }

  @media (max-width: 520px) {
    .cols {
      grid-template-columns: 1fr;
    }
    .legal {
      justify-content: flex-start;
    }
  }
  ```

- [ ] **Step 4: Add both to the page**

  In `Landing.tsx`, render `<Cta />` then `<SiteFooter />` as the last two sections.

- [ ] **Step 5: Verify the whole page**

  Scroll top to bottom: nav → hero → stats → features → deep-dives → community → CTA → footer, with
  no horizontal scrollbar at any width. CTA and footer buttons/links: **Sign up free** → `/signup`,
  **Log in** → `/login`. Footer columns go 5 → 2 → 1 as the window narrows.

**Done when:** the full landing page renders end-to-end and is responsive, all auth CTAs route
correctly, `pnpm run check` passes. This closes out #11.
