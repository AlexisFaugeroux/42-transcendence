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
  const isMulti = target === 'selection';
  const sample = target && target !== 'selection' ? target : null;

  return (
    <Modal
      open={target !== null}
      title={isMulti ? `Delete ${selectedCount} samples?` : 'Delete this sample?'}
      okText="Delete"
      okButtonProps={{ danger: true }}
      confirmLoading={confirmLoading}
      cancelText="Cancel"
      onOk={onConfirm}
      onCancel={onCancel}
    >
      {isMulti ? (
        <p>These files will be removed from your library. Sessions that use these might crash.</p>
      ) : (
        <p>
          The file <code>{sample?.name}</code> will be removed from your library. Sessions that use it might crash
        </p>
      )}
    </Modal>
  );
}
