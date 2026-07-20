import { Modal, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { Session } from './sessions.data';

interface DeleteSessionModalProps {
  session: Session | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSessionModal({ onCancel, onConfirm, session }: DeleteSessionModalProps): JSX.Element {
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
      <p style={{ color: theme.fg2, fontSize: 13, lineHeight: 1.55, margin: 0 }}>
        <code style={{ color: theme.orange, fontFamily: 'ui-monospace, monospace' }}>{session?.title}</code> and all its
        tracks, automation and edits will be permanently removed. Sample files referenced from your library are kept.
      </p>
    </Modal>
  );
}
