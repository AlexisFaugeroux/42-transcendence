import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@transcendence/date';
import { Trans, useTranslation } from '@transcendence/i18n';
import { Modal, Spin } from '@transcendence/ui';
import type { JSX } from 'react';
import { getUserSessions, revokeAllUserSessions } from '../../api/admin/admin';
import type { User } from '../../api/admin/types';
import styles from './RevokeSessionsModal.module.scss';

interface RevokeSessionsModalProps {
  target: User | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  notifySuccess: (title: string, description: string) => void;
  notifyError: (title: string, description: string) => void;
}

export function RevokeSessionsModal({
  confirmLoading = false,
  onCancel,
  onConfirm,
  target,
  notifySuccess,
  notifyError,
}: RevokeSessionsModalProps): JSX.Element {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery({
    enabled: target !== null,
    queryFn: () => getUserSessions(target?.id ?? ''),
    queryKey: ['admin', 'users', target?.id, 'sessions'],
  });

  const newestExpiry = sessions?.items[0]?.expiresAt;

  const { mutate: revokeAllUserSessionsMutation } = useMutation({
    mutationFn: revokeAllUserSessions,
    onError: (error) => {
      notifyError(t('admin.users.revoke.failedTitle'), error.message);
    },
    onSuccess: () => {
      notifySuccess(
        t('admin.users.revoke.revokedTitle'),
        t('admin.users.revoke.revokedDescription'),
      );
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      onConfirm();
    },
  });

  return (
    <Modal
      open={target !== null}
      title={t('admin.users.revoke.title')}
      okText={t('admin.users.actions.revoke')}
      confirmLoading={confirmLoading}
      cancelText={t('common.cancel')}
      onOk={() => {
        if (target) revokeAllUserSessionsMutation(target.id);
      }}
      onCancel={onCancel}
    >
      <p className={styles.body}>
        <Trans
          i18nKey="admin.users.revoke.body"
          components={{ code: <code /> }}
          values={{ handle: target?.handle }}
        />
      </p>

      <div className={styles.expiry}>
        <span className={styles.expiryLabel}>{t('admin.users.revoke.expiresLabel')}</span>
        {isLoading ? <Spin size="small" /> : null}
        {!isLoading && newestExpiry ? (
          <span className={styles.expiryValue}>{formatDate(newestExpiry)}</span>
        ) : null}
        {!isLoading && !newestExpiry ? (
          <span className={styles.expiryUnknown}>{t('admin.users.revoke.expiresUnknown')}</span>
        ) : null}
      </div>
    </Modal>
  );
}
