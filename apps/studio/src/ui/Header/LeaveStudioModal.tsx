import { useTranslation } from '@transcendence/i18n';
import { Alert, Button, Modal, Space, theme } from '@transcendence/ui';
import type { JSX } from 'react';

interface LeaveStudioModalProps {
  open: boolean;
  saving: boolean;
  error: string | null;
  onCancel: () => void;
  onLeaveWithoutSaving: () => void;
  onSaveAndLeave: () => void;
}

export function LeaveStudioModal({
  error,
  onCancel,
  onLeaveWithoutSaving,
  onSaveAndLeave,
  open,
  saving,
}: LeaveStudioModalProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      title={t('studio.header.leave.title')}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel} disabled={saving}>
            {t('common.cancel')}
          </Button>
          <Button onClick={onLeaveWithoutSaving} disabled={saving} danger>
            {t('studio.header.leave.leaveWithoutSaving')}
          </Button>
          <Button type="primary" onClick={onSaveAndLeave} loading={saving}>
            {t('studio.header.leave.saveAndLeave')}
          </Button>
        </Space>
      }
    >
      <p style={{ color: theme.fg2, fontSize: 13, lineHeight: 1.55, margin: 0 }}>
        {t('studio.header.leave.body')}
      </p>
      {error ? (
        <Alert
          type="error"
          showIcon
          style={{ marginTop: 12 }}
          message={t('studio.header.leave.saveFailed')}
          description={error}
        />
      ) : null}
    </Modal>
  );
}
