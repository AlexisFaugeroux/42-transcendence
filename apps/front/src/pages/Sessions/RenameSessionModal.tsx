import { useTranslation } from '@transcendence/i18n';
import { Input, Modal, theme } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import type { Session } from './sessions.data';

interface RenameSessionModalProps {
  session: Session | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (title: string) => void;
}

function RenameForm({
  confirmLoading,
  onCancel,
  onConfirm,
  session,
}: {
  session: Session;
  confirmLoading: boolean;
  onCancel: () => void;
  onConfirm: (t: string) => void;
}): JSX.Element {
  const [title, setTitle] = useState(session.name);
  const { t } = useTranslation();
  const trimmed = title.trim();
  const unchanged = trimmed === session.name;
  const empty = trimmed.length === 0;

  return (
    <Modal
      open
      title={t('sessions.rename.title')}
      okText={t('common.save')}
      cancelText={t('common.cancel')}
      okButtonProps={{ disabled: empty || unchanged }}
      confirmLoading={confirmLoading}
      onOk={() => {
        onConfirm(trimmed);
      }}
      onCancel={onCancel}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span
          style={{ color: theme.fg2, fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}
        >
          {t('sessions.new.titleField')}
        </span>
        <Input
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
    </Modal>
  );
}

export function RenameSessionModal({
  confirmLoading = false,
  onCancel,
  onConfirm,
  session,
}: RenameSessionModalProps): JSX.Element | null {
  if (!session) return null;
  // Remount per-session so the input starts from the right title each time.
  return (
    <RenameForm
      key={session.id}
      session={session}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
