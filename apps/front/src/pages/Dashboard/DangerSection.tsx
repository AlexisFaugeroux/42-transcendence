import { Button, Input, message, Modal } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import styles from './DangerSection.module.scss';
import { SectionHeader } from './primitives';

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
              Permanently remove your profile, sessions you own, uploads, and history. Collaborators on shared sessions
              will keep their copies. <strong>This cannot be undone.</strong>
            </p>
          </div>
          <Button
            danger
            onClick={() => {
              setOpen(true);
            }}
          >
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
          This will <strong>permanently delete</strong> your profile, owned sessions, sounds and history. There is no
          undo.
        </p>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Why are you leaving? (optional)</span>
          <Input.TextArea
            value={reason}
            rows={2}
            placeholder="So we can do better next time"
            onChange={(event) => {
              setReason(event.target.value);
            }}
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
            onChange={(event) => {
              setTyped(event.target.value);
            }}
          />
        </label>
      </Modal>
    </div>
  );
}
