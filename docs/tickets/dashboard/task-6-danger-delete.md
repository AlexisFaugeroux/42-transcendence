**Goal:** Build the Danger zone section and its delete-confirmation modal (type-your-handle-to-confirm). This completes the page.

**Design source:** `design/dashboard.jsx` (`DangerSection`, `DeleteModal`) · **Parent:** #13 · **Depends on:** Task 1 (primitives), Task 4 (Dashboard passes `saved` data)

> The design hand-builds a modal. We use antd's **`Modal`** instead — far less code, and the
> confirm button's disabled state is a one-liner (`okButtonProps`).

---

- [ ] **Step 1: Component (section + modal)**

  `apps/front/src/pages/Dashboard/DangerSection.tsx`:

  ```tsx
  import { useState, type JSX } from 'react';
  import { Button, Input, Modal, message } from '@transcendence/ui';
  import { SectionHeader } from './primitives';
  import styles from './DangerSection.module.scss';

  interface DangerSectionProps {
    handle: string;
  }

  export function DangerSection({ handle }: DangerSectionProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState('');
    const [reason, setReason] = useState('');

    // The confirm button only enables when the typed text matches the handle exactly.
    const matches = typed.trim() === handle;

    const close = (): void => {
      setOpen(false);
      setTyped('');
      setReason('');
    };

    const confirmDelete = (): void => {
      // TODO (backend): call the delete-account endpoint here.
      close();
      void message.success('Account scheduled for deletion.');
    };

    return (
      <div>
        <SectionHeader
          title={<span className={styles.dangerTitle}>Danger zone</span>}
          subtitle="Irreversible actions. Read carefully."
        />

        <div className={styles.card}>
          <div className={styles.body}>
            <div className={styles.text}>
              <h3 className={styles.heading}>Delete this account</h3>
              <p className={styles.desc}>
                Permanently remove your profile, sessions you own, uploads, and history. Collaborators
                on shared sessions will keep their copies. <strong>This cannot be undone.</strong>
              </p>
              <ul className={styles.list}>
                <li>3 sessions you own will be deleted</li>
                <li>148 uploaded sounds will be removed</li>
                <li>
                  Your handle <code className={styles.code}>@{handle}</code> will be released after 30 days
                </li>
              </ul>
            </div>
            <Button danger onClick={() => setOpen(true)}>
              Delete account
            </Button>
          </div>
        </div>

        <Modal
          open={open}
          title="Delete your account?"
          okText="Yes, delete forever"
          okButtonProps={{ danger: true, disabled: !matches }}
          cancelText="Cancel"
          onOk={confirmDelete}
          onCancel={close}
        >
          <p className={styles.modalText}>
            This will <strong>permanently delete</strong> your profile, owned sessions, sounds and
            history. There is no undo.
          </p>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Why are you leaving? (optional)</span>
            <Input.TextArea
              value={reason}
              rows={2}
              placeholder="So we can do better next time"
              onChange={(event) => setReason(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>
              Type <code className={styles.code}>{handle}</code> to confirm
            </span>
            <Input
              value={typed}
              placeholder={handle}
              status={typed && !matches ? 'error' : undefined}
              onChange={(event) => setTyped(event.target.value)}
            />
          </label>
        </Modal>
      </div>
    );
  }
  ```

- [ ] **Step 2: Styles**

  `apps/front/src/pages/Dashboard/DangerSection.module.scss`:

  ```scss
  .dangerTitle {
    color: hsl(8, 85%, 55%);
  }

  .card {
    background: color-mix(in srgb, hsl(8, 85%, 55%) 6%, hsl(197, 14%, 8%));
    border: 0.5px solid color-mix(in srgb, hsl(8, 85%, 55%) 40%, transparent);
    border-radius: 4px;
    padding: 24px;
  }

  .body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .text {
    max-width: 540px;
  }

  .heading {
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    color: hsl(0, 0%, 92%);
  }

  .desc {
    margin: 8px 0 0;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
    line-height: 1.55;
  }

  .list {
    margin: 12px 0 0;
    padding-left: 18px;
    color: hsl(0, 0%, 38%);
    font-size: 12px;
    line-height: 1.7;
  }

  .code {
    color: hsl(25, 90%, 55%);
    font-family: ui-monospace, monospace;
  }

  .modalText {
    margin: 0;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
    line-height: 1.55;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 16px;
  }

  .fieldLabel {
    color: hsl(0, 0%, 56%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 560px) {
    .body {
      flex-direction: column;
    }
  }
  ```

- [ ] **Step 3: Mount it** — in `Dashboard.tsx`, replace the `#danger` placeholder:

  ```tsx
  import { DangerSection } from './DangerSection';

  // …
  <section id="danger">
    <DangerSection handle={saved.handle} />
  </section>
  ```

- [ ] **Step 4: Verify the whole page**
  - Danger card shows the red-tinted warning + bullet list + "Delete account".
  - Click **Delete account** → modal opens. "Yes, delete forever" is **disabled**.
  - Type the wrong text → the confirm input shows an error and the button stays disabled.
  - Type the exact handle (`lex.moreau`) → the button enables; clicking it closes the modal and shows a
    toast. **Cancel** / clicking the backdrop closes without deleting.
  - Whole page top-to-bottom: header → (banner when dirty) → settings nav + Profile / Account / Danger;
    scroll-spy highlights the right nav item; everything is usable down to mobile width.

**Done when:** the danger zone + delete modal work (confirm gated on the typed handle), the full page is
complete and responsive, `pnpm run check` passes. This closes out #13.
