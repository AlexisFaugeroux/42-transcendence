import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trans, useTranslation } from '@transcendence/i18n';
import { Input, Modal } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { deleteUser } from '../../api/admin/admin';
import type { User } from '../../api/admin/types';
import styles from './DeleteUserModal.module.scss';

interface DeleteUserModalProps {
  target: User | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  notifySuccess: (message: string, description: string) => void;
  notifyError: (message: string, description: string) => void;
}

export function DeleteUserModal({
  confirmLoading = false,
  onCancel,
  onConfirm,
  target,
  notifySuccess,
  notifyError,
}: DeleteUserModalProps): JSX.Element {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    setTyped('');
  }, [target]);

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      notifyError(t('admin.users.delete.failedTitle'), error.message);
    },
    onSuccess: () => {
      notifySuccess(
        t('admin.users.delete.deletedTitle'),
        t('admin.users.delete.deletedDescription'),
      );
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      onConfirm();
    },
  });

  return (
    <Modal
      open={target !== null}
      title={t('admin.users.delete.title')}
      okText={t('common.delete')}
      okButtonProps={{ danger: true }}
      confirmLoading={confirmLoading}
      cancelText={t('common.cancel')}
      onOk={() => {
        if (typed === target?.handle) deleteUserMutation(target.id);
        else
          notifyError(
            t('admin.users.delete.mismatchTitle'),
            t('admin.users.delete.mismatchDescription'),
          );
      }}
      onCancel={onCancel}
    >
      <p className={styles.body}>
        <Trans
          i18nKey="admin.users.delete.body"
          components={{ code: <code /> }}
          values={{ handle: target?.handle }}
        />
      </p>

      <label className={styles.field}>
        <span className={styles.label}>{t('admin.users.delete.confirmLabel')}</span>
        <Input
          value={typed}
          placeholder={target?.handle}
          autoComplete="off"
          onChange={(event) => {
            setTyped(event.target.value);
          }}
        />
      </label>
    </Modal>
  );
}
