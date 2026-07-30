import { useTranslation } from '@transcendence/i18n';
import { Input, Modal, theme } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import type { Session } from './sessions.data';

interface RenameSessionModalProps {
  session: Session | null;
  onCancel: () => void;
  onConfirm: (title: string) => void;
}

function RenameForm({
  onCancel,
  onConfirm,
  session,
}: {
  session: Session;
  onCancel: () => void;
  onConfirm: (t: string) => void;
}): JSX.Element {
  const [title, setTitle] = useState(session.title);
  const { t } = useTranslation();

  return (
    <Modal
      open
      title={t('sessions.rename.title')}
      okText={t('common.save')}
      onOk={() => {
        onConfirm(title);
      }}
      onCancel={onCancel}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ color: theme.fg2, fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}>
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

export function RenameSessionModal({ onCancel, onConfirm, session }: RenameSessionModalProps): JSX.Element | null {
  if (!session) return null;
  // Remount per-session so the input starts from the right title each time.
  return <RenameForm key={session.id} session={session} onCancel={onCancel} onConfirm={onConfirm} />;
}
