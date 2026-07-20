import { useMutation } from '@tanstack/react-query';
import { Button, CheckOutlined, CloseCircleOutlined, Input, Modal, notification, theme } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../api/user';
import styles from './DangerSection.module.scss';
import { SectionHeader } from './primitives';

interface DangerSectionProps {
  handle: string;
}

export function DangerSection({ handle }: DangerSectionProps): JSX.Element {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [reason, setReason] = useState('');
  const [notificationApi, notificationContext] = notification.useNotification();

  const openSuccessNotification = () => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description:
        " We're sorry to see you leave. All your data were deleted. That includes your projects, tracks and samples.",
      duration: 5,
      icon: <CheckOutlined color={theme.green} />,
      key,
      title: 'Your account has been delete',
    });
  };

  const openErrorNotification = (error: Error) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title: 'An error occured while deleting you account',
    });
  };

  const { mutate: deleteAccountMutation } = useMutation({
    mutationFn: deleteAccount,
    onError: (error) => {
      openErrorNotification(error);
    },
    onSuccess: () => {
      openSuccessNotification();
      void navigate('/');
    },
  });

  // The confirm button only enables when the typed text matches the handle exactly.
  const matches = typed.trim() === handle.toUpperCase();

  const close = (): void => {
    setOpen(false);
    setTyped('');
    setReason('');
  };

  const confirmDelete = (): void => {
    close();
    deleteAccountMutation();
  };

  return (
    <div>
      {notificationContext}
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
