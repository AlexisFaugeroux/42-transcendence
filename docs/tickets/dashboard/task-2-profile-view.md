**Goal:** Build the Profile section in **read-only view** — avatar + all profile fields shown as text, with an "Edit profile" button (wired up in Task 3).

**Design source:** `design/dashboard.jsx` (`ProfileSection` in its non-editing state) · **Parent:** #13 · **Depends on:** Task 1

> This task keeps things simple: just display the saved data. The editing behavior comes in Task 3 —
> we're deliberately separating "show data" from "edit data" so each is easy to follow.

---

- [ ] **Step 1: Component (view-only)**

  `apps/front/src/pages/Dashboard/ProfileSection.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Avatar, Button, Tag } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { Card, Hr, Row, SectionHeader } from './primitives';
  import { SAVED_USER } from './dashboard.data';
  import styles from './ProfileSection.module.scss';

  export function ProfileSection(): JSX.Element {
    const user = SAVED_USER;

    return (
      <div>
        <SectionHeader
          title="Profile"
          subtitle="Public information shown on your producer page."
          right={
            <Button>
              <MsnIcon name="settings" size="11px" /> Edit profile
            </Button>
          }
        />

        <Card>
          <Row label="Avatar">
            <Avatar size={64}>{user.alias.charAt(0)}</Avatar>
          </Row>
          <Hr />

          <Row label="Producer alias">
            <span className={styles.value}>{user.alias}</span>
          </Row>
          <Hr />

          <Row label="Handle" hint="Used in your URL: makesomenoise.fm/@…">
            <span className={styles.value}>
              <span className={styles.muted}>@</span>
              {user.handle}
            </span>
          </Row>
          <Hr />

          <Row label="Pronouns">
            <span className={styles.value}>{user.pronouns}</span>
          </Row>
          <Hr />

          <Row label="Location">
            <span className={styles.value}>{user.location}</span>
          </Row>
          <Hr />

          <Row label="Bio" hint="Up to 240 characters">
            <span className={styles.bio}>{user.bio}</span>
          </Row>
          <Hr />

          <Row label="Links" hint="Site, SoundCloud, Bandcamp, etc.">
            <div className={styles.links}>
              {user.links.map((link) => (
                <div key={link.kind} className={styles.linkRow}>
                  <Tag color="blue">{link.kind}</Tag>
                  <span className={styles.value}>{link.url}</span>
                </div>
              ))}
            </div>
          </Row>
        </Card>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Dashboard/ProfileSection.module.scss`:

  ```scss
  .value {
    color: hsl(0, 0%, 92%);
    font-size: 13px;
  }

  .muted {
    color: hsl(0, 0%, 38%);
  }

  .bio {
    color: hsl(0, 0%, 92%);
    font-size: 13px;
    line-height: 1.55;
    white-space: pre-wrap;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .linkRow {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  ```

- [ ] **Step 2: Mount it** — in `Dashboard.tsx`, replace the `#profile` placeholder content:

  ```tsx
  <section id="profile">
    <ProfileSection />
  </section>
  ```

- [ ] **Step 3: Verify** — the Profile card shows the avatar (initial) and every field as text, with an
  "Edit profile" button top-right (no behavior yet). Rows stack label-over-value on a narrow screen.

**Done when:** the read-only profile renders correctly, `pnpm run check` passes.
