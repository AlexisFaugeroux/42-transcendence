import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trans, useTranslation } from '@transcendence/i18n';
import { Form, Input, Modal } from '@transcendence/ui';
import { type JSX } from 'react';
import { updateUser } from '../../api/admin/admin';
import type { UpdateUserBody, User } from '../../api/admin/types';
import styles from './DeleteUserModal.module.scss';

interface EditUserModalProps {
  target: User | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  notifySuccess: (message: string, description: string) => void;
  notifyError: (message: string, description: string) => void;
}

export function EditUserModal({
  confirmLoading = false,
  onCancel,
  onConfirm,
  target,
  notifySuccess,
  notifyError,
}: EditUserModalProps): JSX.Element {
  const { t } = useTranslation();
  const [form] = Form.useForm<UpdateUserBody>();
  const queryClient = useQueryClient();

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      notifyError(t('admin.users.edit.failedTitle'), error.message);
    },
    onSuccess: () => {
      notifySuccess(t('admin.users.edit.updatedTitle'), t('admin.users.edit.updatedDescription'));
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      onConfirm();
    },
  });

  const onFinish = (values: UpdateUserBody) => {
    if (!target) return;
    updateUserMutation({ ...values, id: target.id });
  };

  return (
    <Modal
      open={target !== null}
      destroyOnHidden
      title={t('admin.users.edit.title')}
      okText={t('common.save')}
      confirmLoading={confirmLoading}
      cancelText={t('common.cancel')}
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
    >
      <p className={styles.body}>
        <Trans
          i18nKey="admin.users.edit.body"
          components={{ code: <code /> }}
          values={{ handle: target?.handle }}
        />
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          artistName: target?.artistName ?? '',
          email: target?.email ?? '',
          handle: target?.handle ?? '',
        }}
      >
        <Form.Item label={t('auth.fields.artistName')} name="artistName">
          <Input placeholder={target?.artistName} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={t('auth.fields.email')}
          name="email"
          rules={[
            { message: t('auth.validation.emailRequired'), required: true },
            { message: t('auth.validation.emailInvalid'), type: 'email' },
          ]}
        >
          <Input placeholder={target?.email} autoComplete="off" />
        </Form.Item>

        <Form.Item label={t('auth.fields.handle')} name="handle">
          <Input placeholder={target?.handle} autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
