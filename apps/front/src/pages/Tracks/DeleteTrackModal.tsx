import { Trans, useTranslation } from '@transcendence/i18n';
import { Modal } from '@transcendence/ui';
import type { JSX } from 'react';
import type { Track } from '../../types/track';

interface DeleteTrackModalProps {
  target: Track | null;
  confirmLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteTrackModal({
  confirmLoading,
  onCancel,
  onConfirm,
  target,
}: DeleteTrackModalProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal
      open={target !== null}
      title={t('tracks.delete.title')}
      okText={t('common.delete')}
      okButtonProps={{ danger: true }}
      confirmLoading={confirmLoading}
      cancelText={t('common.cancel')}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>
        <Trans
          i18nKey="tracks.delete.body"
          components={{ code: <code /> }}
          values={{ title: target?.title }}
        />
      </p>
    </Modal>
  );
}
