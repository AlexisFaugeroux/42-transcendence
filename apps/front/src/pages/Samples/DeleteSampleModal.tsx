import { Trans, useTranslation } from '@transcendence/i18n';
import { Modal } from '@transcendence/ui';
import type { JSX } from 'react';
import type { AudioFile } from '../../types/audioFile';

export type DeleteTarget = AudioFile | 'selection' | null;

interface DeleteSampleModalProps {
  target: DeleteTarget;
  selectedCount: number;
  confirmLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSampleModal({
  confirmLoading,
  onCancel,
  onConfirm,
  selectedCount,
  target,
}: DeleteSampleModalProps): JSX.Element {
  const { t } = useTranslation();
  const isMulti = target === 'selection';
  const sample = target && target !== 'selection' ? target : null;

  return (
    <Modal
      open={target !== null}
      title={
        isMulti
          ? t('samples.delete.titleMulti', { count: selectedCount })
          : t('samples.delete.titleOne')
      }
      okText={t('common.delete')}
      okButtonProps={{ danger: true }}
      confirmLoading={confirmLoading}
      cancelText={t('common.cancel')}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      {isMulti ? (
        <p>{t('samples.delete.bodyMulti')}</p>
      ) : (
        <p>
          <Trans
            i18nKey="samples.delete.bodyOne"
            components={{ code: <code /> }}
            values={{ name: sample?.name }}
          />
        </p>
      )}
    </Modal>
  );
}
