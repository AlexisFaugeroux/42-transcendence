**Goal:** Add the delete-confirmation and rename modals, wired to the card `⋯` menu. This completes the page.

**Design source:** `design/sessions.jsx` (`DeleteSessModal`, `RenameSessModal`) · **Parent:** #17 · **Depends on:** Task 2 (card menu calls `onRename` / `onDelete`)

> Both are antd `Modal`s. We replace the Task 2 console-log placeholders with real modal state.

---

- [ ] **Step 1: Delete modal**

  `apps/front/src/pages/Sessions/DeleteSessionModal.tsx`:

  ```tsx
  import type { JSX } from 'react';
  import { Modal } from '@transcendence/ui';
  import type { Session } from './sessions.data';

  interface DeleteSessionModalProps {
    session: Session | null;
    onCancel: () => void;
    onConfirm: () => void;
  }

  export function DeleteSessionModal({ session, onCancel, onConfirm }: DeleteSessionModalProps): JSX.Element {
    return (
      <Modal
        open={session !== null}
        title="Delete this session?"
        okText="Delete session"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        onOk={onConfirm}
        onCancel={onCancel}
      >
        <p style={{ margin: 0, color: 'hsl(0, 0%, 56%)', fontSize: 13, lineHeight: 1.55 }}>
          <code style={{ color: 'hsl(25, 90%, 55%)', fontFamily: 'ui-monospace, monospace' }}>{session?.title}</code>{' '}
          and all its tracks, automation and edits will be permanently removed. Sample files referenced
          from your library are kept.
        </p>
      </Modal>
    );
  }
  ```

- [ ] **Step 2: Rename modal**

  Its input is seeded from the session's title and resets whenever a different session is targeted —
  `key={session?.id}` remounts it so its internal state re-initialises cleanly.

  `apps/front/src/pages/Sessions/RenameSessionModal.tsx`:

  ```tsx
  import { useState, type JSX } from 'react';
  import { Input, Modal } from '@transcendence/ui';
  import type { Session } from './sessions.data';

  interface RenameSessionModalProps {
    session: Session | null;
    onCancel: () => void;
    onConfirm: (title: string) => void;
  }

  function RenameForm({ session, onCancel, onConfirm }: { session: Session; onCancel: () => void; onConfirm: (t: string) => void }): JSX.Element {
    const [title, setTitle] = useState(session.title);
    return (
      <Modal open title="Rename session" okText="Save" onOk={() => onConfirm(title)} onCancel={onCancel}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: 'hsl(0, 0%, 56%)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Title</span>
          <Input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </Modal>
    );
  }

  export function RenameSessionModal({ session, onCancel, onConfirm }: RenameSessionModalProps): JSX.Element | null {
    if (!session) return null;
    // Remount per-session so the input starts from the right title each time.
    return <RenameForm key={session.id} session={session} onCancel={onCancel} onConfirm={onConfirm} />;
  }
  ```

  > **Why the inner `RenameForm`?** A controlled input needs its initial value when it mounts. Wrapping
  > it and keying by `session.id` means opening rename on a different card gives a fresh input with that
  > card's title — no stale value, no `useEffect` to sync.

- [ ] **Step 3: Wire both in `Sessions.tsx`**

  ```tsx
  import { DeleteSessionModal } from './DeleteSessionModal';
  import { RenameSessionModal } from './RenameSessionModal';

  const [confirmDelete, setConfirmDelete] = useState<Session | null>(null);
  const [renameTarget, setRenameTarget] = useState<Session | null>(null);

  // Replace the Task 2 placeholders:
  const handleDelete = (s: Session): void => setConfirmDelete(s);
  const handleRename = (s: Session): void => setRenameTarget(s);

  // at the end of the page JSX:
  <DeleteSessionModal
    session={confirmDelete}
    onCancel={() => setConfirmDelete(null)}
    onConfirm={() => setConfirmDelete(null)} // TODO (backend): actually delete
  />
  <RenameSessionModal
    session={renameTarget}
    onCancel={() => setRenameTarget(null)}
    onConfirm={() => setRenameTarget(null)} // TODO (backend): actually rename
  />
  ```

- [ ] **Step 4: Verify the whole page**
  - A card's `⋯` → **Rename** opens the rename modal pre-filled with that session's title; editing +
    Save closes it. Opening rename on a different card shows that card's title (not a stale one).
  - `⋯` → **Delete** opens the confirm modal naming the session; Delete/Cancel close it.
  - Full page: header → title + tabs → toolbar → grid (or empty state); buckets, filters, sort, the `⋯`
    menu and all three modals (new / rename / delete) work; responsive down to mobile.

**Done when:** delete + rename modals work from the card menu, the full page is complete and responsive,
`pnpm run check` passes. This closes out #17.
