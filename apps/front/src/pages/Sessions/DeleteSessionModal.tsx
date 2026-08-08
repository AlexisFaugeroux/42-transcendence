import { Trans, useTranslation } from '@transcendence/i18n';
import { Modal, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { Session } from './sessions.data';

interface DeleteSessionModalProps {
  session: Session | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSessionModal({
  onCancel,
  onConfirm,
  session,
}: DeleteSessionModalProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal
      open={session !== null}
      title={t('sessions.delete.title')}
      okText={t('sessions.delete.submit')}
      okButtonProps={{ danger: true }}
      cancelText={t('common.cancel')}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p style={{ color: theme.fg2, fontSize: 13, lineHeight: 1.55, margin: 0 }}>
        <Trans
          i18nKey="sessions.delete.body"
          components={{
            code: <code style={{ color: theme.orange, fontFamily: 'ui-monospace, monospace' }} />,
          }}
          values={{ title: session?.name }}
        />
      </p>
    </Modal>
  );
}
