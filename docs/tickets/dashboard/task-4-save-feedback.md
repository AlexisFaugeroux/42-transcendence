**Goal:** Add the save experience: a sticky "unsaved changes" banner, handle validation with inline errors, and a success toast on save. To make the page-level banner possible, we lift the profile state up into `Dashboard`.

**Design source:** `design/dashboard.jsx` (`DirtyBanner`, `Toast`, the `error`/`dirty`/`success` variants) · **Parent:** #13 · **Depends on:** Task 3

> **Why lift state up?** The dirty banner sits at the **page** level (under the header, full width),
> but the profile data lives in `ProfileSection`. A child can't render something above its parent, so
> we move the form state into `Dashboard` and pass it down. This is the classic React "lifting state
> up" pattern — worth understanding well.

---

- [ ] **Step 1: Validation helper**

  Append to `apps/front/src/pages/Dashboard/dashboard.data.ts`:

  ```ts
  export type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

  export function validateProfile(form: UserProfile): ProfileErrors {
    const errors: ProfileErrors = {};
    if (!/^[a-zA-Z0-9._]+$/.test(form.handle)) {
      errors.handle = 'Handles can only contain letters, numbers, dot, underscore.';
    }
    return errors;
  }
  ```

- [ ] **Step 2: Let `FieldText` show an error**

  In `apps/front/src/pages/Dashboard/Field.tsx`, add an optional `error` to `FieldText` and pass it to
  antd's `Input` via `status`, with the message underneath:

  ```tsx
  interface FieldTextProps {
    editing: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    prefix?: string;
    error?: string; // NEW
  }

  export function FieldText({ editing, value, onChange, placeholder, prefix, error }: FieldTextProps): JSX.Element {
    if (!editing) {
      /* …unchanged view-mode branch… */
    }
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Input
          value={value}
          prefix={prefix}
          placeholder={placeholder}
          status={error ? 'error' : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        {error && <span style={{ color: 'hsl(8, 85%, 55%)', fontSize: 11 }}>{error}</span>}
      </div>
    );
  }
  ```

- [ ] **Step 3: The dirty banner**

  `apps/front/src/pages/Dashboard/DirtyBanner.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Button } from '@transcendence/ui';
  import styles from './DirtyBanner.module.scss';

  interface DirtyBannerProps {
    hasErrors: boolean;
    onDiscard: () => void;
    onSave: () => void;
  }

  export function DirtyBanner({ hasErrors, onDiscard, onSave }: DirtyBannerProps): JSX.Element {
    return (
      <div className={`${styles.banner} ${hasErrors ? styles.error : ''}`}>
        <div className={styles.message}>
          <span className={styles.badge}>{hasErrors ? '!' : '•'}</span>
          {hasErrors ? 'Fix the highlighted fields before saving.' : 'You have unsaved changes.'}
        </div>
        <div className={styles.actions}>
          <Button onClick={onDiscard}>Discard</Button>
          <Button type="primary" danger={hasErrors} onClick={onSave}>
            Save changes
          </Button>
        </div>
      </div>
    );
  }
  ```

  `apps/front/src/pages/Dashboard/DirtyBanner.module.scss`:

  ```scss
  .banner {
    position: sticky;
    top: 57px; // sits just under the sticky header
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 10px 32px;
    background: color-mix(in srgb, hsl(25, 90%, 55%) 16%, hsl(197, 14%, 6%));
    border-bottom: 1px solid hsl(25, 90%, 55%);
  }

  .error {
    background: color-mix(in srgb, hsl(8, 85%, 55%) 16%, hsl(197, 14%, 6%));
    border-bottom-color: hsl(8, 85%, 55%);
  }

  .message {
    display: flex;
    align-items: center;
    gap: 10px;
    color: hsl(0, 0%, 92%);
    font-size: 12px;
  }

  .badge {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid currentColor;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: hsl(25, 90%, 55%);
  }

  .error .badge {
    color: hsl(8, 85%, 55%);
  }

  .actions {
    display: flex;
    gap: 8px;
  }

  @media (max-width: 640px) {
    .banner {
      padding: 10px 16px;
      flex-wrap: wrap;
    }
  }
  ```

- [ ] **Step 4: Lift state into `Dashboard`**

  Replace `apps/front/src/pages/Dashboard/Dashboard.tsx`:

  ```tsx
  import { useState, type JSX } from 'react';
  import { message } from '@transcendence/ui';
  import { DashHeader } from './DashHeader';
  import { SettingsNav } from './SettingsNav';
  import { DirtyBanner } from './DirtyBanner';
  import { ProfileSection } from './ProfileSection';
  import { SAVED_USER, validateProfile, type UserProfile } from './dashboard.data';
  import styles from './Dashboard.module.scss';

  export function Dashboard(): JSX.Element {
    const [saved, setSaved] = useState<UserProfile>(SAVED_USER); // committed data
    const [form, setForm] = useState<UserProfile>(SAVED_USER); // editable copy
    const [editing, setEditing] = useState(false);

    const errors = validateProfile(form);
    const hasErrors = Object.keys(errors).length > 0;
    // "dirty" = editing AND the copy differs from what's saved.
    const isDirty = editing && JSON.stringify(form) !== JSON.stringify(saved);

    const setField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]): void => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

    const startEditing = (): void => {
      setForm(saved);
      setEditing(true);
    };

    const cancel = (): void => {
      setForm(saved);
      setEditing(false);
    };

    const save = (): void => {
      if (hasErrors) return; // leave the banner/inputs showing the errors
      setSaved(form); // commit
      setEditing(false);
      // TODO (backend): send `form` to the server here.
      void message.success('Profile saved.');
    };

    return (
      <div className={styles.page}>
        <DashHeader />
        {isDirty && <DirtyBanner hasErrors={hasErrors} onDiscard={cancel} onSave={save} />}

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <SettingsNav />
          </aside>

          <div className={styles.sections}>
            <section id="profile">
              <ProfileSection
                editing={editing}
                form={form}
                errors={errors}
                setField={setField}
                onEdit={startEditing}
                onCancel={cancel}
                onSave={save}
              />
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

  > `void message.success(...)` is antd's toast — it matches the design's green "Profile saved." popup
  > and auto-dismisses. (antd may log a dev note about static usage without its `<App>` provider;
  > harmless for now — a later polish task can wrap the app in antd's `<App>` if we want themed toasts.)

- [ ] **Step 5: Make `ProfileSection` controlled**

  `ProfileSection` no longer owns state — it receives everything via props. Change these parts of
  `apps/front/src/pages/Dashboard/ProfileSection.tsx`:

  1. Remove the `useState` import and the internal `editing` / `form` / `setField` / `startEditing` /
     `cancel` / `save` declarations.
  2. New props + signature:

     ```tsx
     import type { ProfileErrors, UserProfile } from './dashboard.data';

     interface ProfileSectionProps {
       editing: boolean;
       form: UserProfile;
       errors: ProfileErrors;
       setField: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
       onEdit: () => void;
       onCancel: () => void;
       onSave: () => void;
     }

     export function ProfileSection({
       editing,
       form,
       errors,
       setField,
       onEdit,
       onCancel,
       onSave,
     }: ProfileSectionProps): JSX.Element {
     ```

  3. Header button → `onClick={onEdit}`.
  4. Handle row → pass the error:

     ```tsx
     <FieldText editing={editing} value={form.handle} onChange={(v) => setField('handle', v)} prefix="@" error={errors.handle} />
     ```

  5. Bottom actions → `onClick={onCancel}` and `onClick={onSave}`.

- [ ] **Step 6: Verify**
  - Edit profile, change the alias → the orange **"You have unsaved changes."** banner appears under the
    header with Discard / Save changes.
  - Set the handle to something invalid (e.g. `lex moreau`) → the banner turns **red**, the Handle input
    shows an error, and **Save** does nothing until it's fixed.
  - Fix it and Save → banner disappears, edit mode closes, and a green **"Profile saved."** toast pops.
  - Re-open Edit → it now starts from the newly-saved values.
  - **Discard** reverts and clears the banner.

**Done when:** dirty banner, validation/inline errors, and the success toast all work via the lifted
state, `pnpm run check` passes.
