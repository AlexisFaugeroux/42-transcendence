import { useTranslation } from '@transcendence/i18n';
import { Alert, Button, Input, Modal, Space, theme } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';

const NAME_MAX = 128;

interface RenameProjectModalProps {
  open: boolean;
  initialName: string;
  saving: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: (name: string) => void;
}

export function RenameProjectModal({
  error,
  initialName,
  onCancel,
  onConfirm,
  open,
  saving,
}: RenameProjectModalProps): JSX.Element {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(initialName);
  const trimmed = draft.trim();
  const tooLong = trimmed.length > NAME_MAX;
  const empty = trimmed.length === 0;
  const invalid = empty || tooLong;

  useEffect(() => {
    if (open) setDraft(initialName);
  }, [open, initialName]);

  return (
    <Modal
      open={open}
      title={t('studio.header.rename.title')}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel} disabled={saving}>
            {t('common.cancel')}
          </Button>
          <Button
            type="primary"
            loading={saving}
            disabled={invalid || saving}
            onClick={() => {
              onConfirm(trimmed);
            }}
          >
            {t('studio.header.rename.submit')}
          </Button>
        </Space>
      }
    >
      <p style={{ color: theme.fg2, fontSize: 13, lineHeight: 1.55, margin: '0 0 12px' }}>
        {t('studio.header.rename.body')}
      </p>
      <Input
        value={draft}
        maxLength={NAME_MAX}
        status={tooLong || (empty && draft.length > 0) ? 'error' : undefined}
        onChange={(e) => {
          setDraft(e.target.value);
        }}
        onPressEnter={() => {
          if (!invalid && !saving) onConfirm(trimmed);
        }}
      />
      {tooLong ? (
        <p style={{ color: theme.red, fontSize: 12, margin: '8px 0 0' }}>
          {t('studio.header.rename.tooLong')}
        </p>
      ) : null}
      {error ? (
        <Alert
          type="error"
          showIcon
          style={{ marginTop: 12 }}
          title={t('studio.header.rename.failed')}
          description={error}
        />
      ) : null}
    </Modal>
  );
}
