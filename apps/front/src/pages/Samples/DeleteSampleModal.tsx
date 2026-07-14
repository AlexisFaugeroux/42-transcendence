import { Modal } from '@transcendence/ui';
import type { JSX } from 'react';
import type { Sample } from './samples.data';

export type DeleteTarget = Sample | 'selection' | null;

interface DeleteSampleModalProps {
  target: DeleteTarget;
  selectedCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSampleModal({ onCancel, onConfirm, selectedCount, target }: DeleteSampleModalProps): JSX.Element {
  const isMulti = target === 'selection';
  const sample = target && target !== 'selection' ? target : null;

  return (
    <Modal
      open={target !== null}
      title={isMulti ? `Delete ${selectedCount} samples?` : 'Delete this sample?'}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
      onOk={onConfirm}
      onCancel={onCancel}
    >
      {isMulti ? (
        <p>
          These files will be removed from your library. Sessions that already use them will keep their cached copies.
        </p>
      ) : (
        <p>
          The file <code>{sample?.name}</code> will be removed from your library. Sessions that already use it will keep
          their cached copies.
        </p>
      )}
    </Modal>
  );
}
