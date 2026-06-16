**Goal:** Build the Account section — email, password, two-factor and member-since rows, each read-only with an action button (no real behavior yet).

**Design source:** `design/dashboard.jsx` (`AccountSection`) · **Parent:** #13 · **Depends on:** Task 1 (primitives), Task 4 (Dashboard passes `saved` data)

> This section is straightforward — no editing state, just display + buttons. It reuses the `Card` /
> `Row` / `Hr` / `SectionHeader` primitives from Task 1.

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Dashboard/AccountSection.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import { Card, Hr, Row, SectionHeader } from './primitives';
  import styles from './AccountSection.module.scss';

  interface AccountSectionProps {
    email: string;
    joined: string;
  }

  export function AccountSection({ email, joined }: AccountSectionProps): JSX.Element {
    return (
      <div>
        <SectionHeader title="Account" subtitle="Login credentials and security." />

        <Card>
          <Row label="Email">
            <div className={styles.line}>
              <span className={styles.value}>{email}</span>
              <Button size="small">Change email</Button>
            </div>
          </Row>
          <Hr />

          <Row label="Password" hint="Last changed 2 weeks ago">
            <div className={styles.line}>
              <span className={styles.dots}>••••••••••••</span>
              <Button size="small">Change password</Button>
            </div>
          </Row>
          <Hr />

          <Row label="Two-factor auth" hint="Adds a second step at login">
            <div className={styles.line}>
              <span className={styles.muted}>Not enabled</span>
              <Button size="small" style={{ color: 'hsl(25, 90%, 55%)', borderColor: 'hsl(25, 90%, 55%)' }}>
                Enable 2FA
              </Button>
            </div>
          </Row>
          <Hr />

          <Row label="Member since">
            <span className={styles.mono}>{joined}</span>
          </Row>
        </Card>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Dashboard/AccountSection.module.scss`:

  ```scss
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }

  .value {
    color: hsl(0, 0%, 92%);
    font-size: 13px;
  }

  .dots {
    color: hsl(0, 0%, 56%);
    font-family: ui-monospace, monospace;
    font-size: 13px;
    letter-spacing: 2px;
  }

  .muted {
    color: hsl(0, 0%, 38%);
    font-size: 12px;
  }

  .mono {
    color: hsl(0, 0%, 56%);
    font-family: ui-monospace, monospace;
    font-size: 12px;
  }
  ```

- [ ] **Step 2: Mount it** — in `Dashboard.tsx`, replace the `#account` placeholder:

  ```tsx
  import { AccountSection } from './AccountSection';

  // …
  <section id="account">
    <AccountSection email={saved.email} joined={saved.joined} />
  </section>
  ```

- [ ] **Step 3: Verify** — the Account card shows email + "Change email", masked password + "Change
  password", "Not enabled" + "Enable 2FA" (orange), and the join date. The scroll-spy nav highlights
  "Account" when you scroll to it.

**Done when:** the Account section renders and matches the design, `pnpm run check` passes.
