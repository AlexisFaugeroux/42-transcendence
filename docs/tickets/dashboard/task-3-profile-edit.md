**Goal:** Make the Profile section editable — toggle between view and edit, turn fields into inputs backed by local state, and add/remove links. (Save feedback & validation come in Task 4.)

**Design source:** `design/dashboard.jsx` (`ProfileSection` editing state + `FieldText`/`FieldArea`) · **Parent:** #13 · **Depends on:** Task 2

> This is the React-state core of the page. Read the notes — they explain *why* the state is shaped
> this way. We refactor Task 2's static section into one that holds editable form state.

---

- [ ] **Step 1: A reusable editable field**

  One component that shows text in view mode and an input in edit mode.
  `apps/front/src/pages/Dashboard/Field.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Input } from '@transcendence/ui';

  interface FieldTextProps {
    editing: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    prefix?: string;
  }

  export function FieldText({
    editing,
    value,
    onChange,
    placeholder,
    prefix,
  }: FieldTextProps): JSX.Element {
    if (!editing) {
      return (
        <span style={{ color: 'hsl(0, 0%, 92%)', fontSize: 13 }}>
          {prefix && <span style={{ color: 'hsl(0, 0%, 38%)' }}>{prefix}</span>}
          {value || <span style={{ color: 'hsl(0, 0%, 38%)' }}>—</span>}
        </span>
      );
    }
    return (
      <Input
        value={value}
        prefix={prefix}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  interface FieldAreaProps {
    editing: boolean;
    value: string;
    onChange: (value: string) => void;
    max?: number;
  }

  export function FieldArea({ editing, value, onChange, max }: FieldAreaProps): JSX.Element {
    if (!editing) {
      return (
        <span style={{ color: 'hsl(0, 0%, 92%)', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
          {value || <span style={{ color: 'hsl(0, 0%, 38%)' }}>—</span>}
        </span>
      );
    }
    // antd's TextArea gives us the character counter for free via showCount + maxLength.
    return (
      <Input.TextArea
        value={value}
        rows={3}
        maxLength={max}
        showCount
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
      />
    );
  }
  ```

  > **Why one component with an `editing` flag?** It keeps view and edit markup for a field in one
  > place, so they can't drift apart. `Input.TextArea`'s `showCount` replaces the design's hand-built
  > `len/max` counter.

- [ ] **Step 2: Hold the form in state**

  Rewrite `ProfileSection.tsx` to own the editable copy of the user. The key idea: **edit a *copy*
  (`form`), not the saved data** — so "Cancel" can throw the copy away and "Save" can commit it.

  ```tsx
  import { useState, type JSX } from 'react';
  import { Avatar, Button, Tag } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { Card, Hr, Row, SectionHeader } from './primitives';
  import { FieldArea, FieldText } from './Field';
  import { SAVED_USER, type UserProfile } from './dashboard.data';
  import styles from './ProfileSection.module.scss';

  export function ProfileSection(): JSX.Element {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<UserProfile>(SAVED_USER);

    // Helper to update one field immutably.
    const setField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]): void => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

    const startEditing = (): void => {
      setForm(SAVED_USER); // start from the saved values each time
      setEditing(true);
    };

    const cancel = (): void => {
      setForm(SAVED_USER); // discard the copy
      setEditing(false);
    };

    const save = (): void => {
      // TODO (Task 4 / backend): validate + persist. For now just exit edit mode.
      setEditing(false);
    };

    return (
      <div>
        <SectionHeader
          title="Profile"
          subtitle="Public information shown on your producer page."
          right={
            editing ? (
              <span className={styles.editingTag}>● Editing</span>
            ) : (
              <Button onClick={startEditing}>
                <MsnIcon name="settings" size="11px" /> Edit profile
              </Button>
            )
          }
        />

        <Card>
          <Row label="Avatar">
            <div className={styles.avatarRow}>
              <Avatar size={64}>{form.alias.charAt(0)}</Avatar>
              {editing && (
                <div className={styles.avatarActions}>
                  <Button size="small">Upload image</Button>
                  <Button size="small" danger>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </Row>
          <Hr />

          <Row label="Producer alias">
            <FieldText editing={editing} value={form.alias} onChange={(v) => setField('alias', v)} placeholder="Your artist name" />
          </Row>
          <Hr />

          <Row label="Handle" hint="Used in your URL: makesomenoise.fm/@…">
            <FieldText editing={editing} value={form.handle} onChange={(v) => setField('handle', v)} prefix="@" />
          </Row>
          <Hr />

          <Row label="Pronouns">
            <FieldText editing={editing} value={form.pronouns} onChange={(v) => setField('pronouns', v)} placeholder="they/them" />
          </Row>
          <Hr />

          <Row label="Location">
            <FieldText editing={editing} value={form.location} onChange={(v) => setField('location', v)} placeholder="City, country" />
          </Row>
          <Hr />

          <Row label="Bio" hint="Up to 240 characters">
            <FieldArea editing={editing} value={form.bio} onChange={(v) => setField('bio', v)} max={240} />
          </Row>
          <Hr />

          <Row label="Links" hint="Site, SoundCloud, Bandcamp, etc.">
            <div className={styles.links}>
              {form.links.map((link, index) => (
                <div key={index} className={styles.linkRow}>
                  <Tag color="blue">{link.kind}</Tag>
                  <FieldText
                    editing={editing}
                    value={link.url}
                    onChange={(v) => {
                      const next = [...form.links];
                      next[index] = { ...next[index], url: v };
                      setField('links', next);
                    }}
                  />
                  {editing && (
                    <Button
                      type="text"
                      size="small"
                      onClick={() => setField('links', form.links.filter((_, j) => j !== index))}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              {editing && (
                <Button size="small" className={styles.addLink} onClick={() => setField('links', [...form.links, { kind: 'site', url: '' }])}>
                  <MsnIcon name="plus" size="11px" /> Add link
                </Button>
              )}
            </div>
          </Row>
        </Card>

        {editing && (
          <div className={styles.actions}>
            <Button onClick={cancel}>Cancel</Button>
            <Button type="primary" onClick={save}>
              Save changes
            </Button>
          </div>
        )}
      </div>
    );
  }
  ```

  > **Immutability:** notice we never mutate `form` directly — `setField` builds a new object, and the
  > links updates build a new array. React only re-renders when the reference changes, so editing in
  > place would silently fail to update the screen.

- [ ] **Step 3: Add the styles** — append to `ProfileSection.module.scss`:

  ```scss
  .editingTag {
    color: hsl(25, 90%, 55%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: ui-monospace, monospace;
  }

  .avatarRow {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .avatarActions {
    display: flex;
    gap: 8px;
  }

  .linkRow {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .addLink {
    align-self: flex-start;
    margin-top: 4px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 14px;
  }
  ```

  (Keep the `.value` / `.bio` / `.links` rules from Task 2.)

- [ ] **Step 4: Verify**
  - Click **Edit profile** → fields become inputs, "● Editing" shows, Cancel/Save appear at the bottom.
  - Type in fields; the bio shows a live character counter (e.g. `123 / 240`).
  - **Add link** appends a row; **✕** removes a row.
  - **Cancel** reverts everything to the saved values and exits edit mode.
  - **Save** currently just exits edit mode (real save in Task 4).

**Done when:** view ⇄ edit toggling works, fields are editable, links add/remove, Cancel discards
changes, `pnpm run check` passes.
