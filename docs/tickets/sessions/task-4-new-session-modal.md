**Goal:** Build the "New session" modal — a session-type picker plus title/BPM fields — and wire it to the New session buttons.

**Design source:** `design/sessions.jsx` (`NewSessionModal`, `NewField`) · **Parent:** #17 · **Depends on:** Task 1 (button), Task 3 (empty-state CTA)

---

- [ ] **Step 1: Component**

  `apps/front/src/pages/Sessions/NewSessionModal.tsx`:

  ```tsx
  import { useState, type JSX } from 'react';
  import { Input, Modal } from '@transcendence/ui';
  import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon';
  import { SESS_TYPES, TYPE_COLOR, TYPE_ICON, type SessionType } from './sessions.data';
  import styles from './NewSessionModal.module.scss';

  const DESCRIPTIONS: Record<SessionType, string> = {
    production: 'Full DAW: tracks, MIDI, effects, automation.',
    recording: 'Get a take down. Multi-mic, punch-in, comp.',
    mixing: 'Stems in, mix out. Faders, busses, FX chains.',
  };

  interface NewSessionModalProps {
    open: boolean;
    onClose: () => void;
  }

  export function NewSessionModal({ open, onClose }: NewSessionModalProps): JSX.Element {
    const [picked, setPicked] = useState<SessionType>('production');

    return (
      <Modal open={open} title="Start a new session" width={560} okText="Create & open" onOk={onClose} onCancel={onClose}>
        <p className={styles.lead}>Pick the kind of session, then we&apos;ll set up the right workspace.</p>

        <div className={styles.types}>
          {SESS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={styles.typeCard}
              data-active={picked === type}
              style={{ '--c': TYPE_COLOR[type] } as React.CSSProperties}
              onClick={() => setPicked(type)}
            >
              <span className={styles.typeHead}>
                <MsnIcon name={TYPE_ICON[type]} size="18px" /> {type}
              </span>
              <span className={styles.typeDesc}>{DESCRIPTIONS[type]}</span>
            </button>
          ))}
        </div>

        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Title</span>
            <Input placeholder="Untitled session" />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>BPM</span>
            <Input placeholder="120" />
          </label>
        </div>
      </Modal>
    );
  }
  ```

  `apps/front/src/pages/Sessions/NewSessionModal.module.scss`:

  ```scss
  .lead {
    margin: 0;
    color: hsl(0, 0%, 56%);
    font-size: 13px;
  }

  .types {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 18px;
  }

  .typeCard {
    text-align: left;
    cursor: pointer;
    background: hsl(197, 14%, 3%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: hsl(0, 0%, 92%);

    &[data-active='true'] {
      border-color: var(--c);
      background: color-mix(in srgb, var(--c) 12%, transparent);
      box-shadow: 0 0 14px -6px var(--c);
    }
  }

  .typeHead {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--c);
    font-size: 14px;
    text-transform: capitalize;
  }

  .typeDesc {
    color: hsl(0, 0%, 56%);
    font-size: 12px;
    line-height: 1.5;
  }

  .fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .fieldLabel {
    color: hsl(0, 0%, 56%);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 520px) {
    .types {
      grid-template-columns: 1fr;
    }
    .fields {
      grid-template-columns: 1fr;
    }
  }
  ```

- [ ] **Step 2: Wire it up in `Sessions.tsx`**

  ```tsx
  import { NewSessionModal } from './NewSessionModal';

  const [newOpen, setNewOpen] = useState(false);

  // - Title "New session" button onClick → setNewOpen(true)
  // - replace the Task 3 `openNew` placeholder with:
  const openNew = (): void => setNewOpen(true);

  // at the end of the page JSX:
  <NewSessionModal open={newOpen} onClose={() => setNewOpen(false)} />
  ```

- [ ] **Step 3: Verify** — both the header "New session" button and the empty-state "Create your first
  session" button open the modal. The three type cards are selectable (the picked one is highlighted in
  its colour); Title/BPM inputs accept text; Cancel / Create & open close it.

**Done when:** the modal opens from both entry points and the type picker works, `pnpm run check` passes.
