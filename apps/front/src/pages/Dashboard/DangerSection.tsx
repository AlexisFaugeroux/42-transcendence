import { useMutation } from '@tanstack/react-query';
import { Trans, useTranslation } from '@transcendence/i18n';
import {
  Button,
  CheckOutlined,
  CloseCircleOutlined,
  Input,
  Modal,
  notification,
  theme,
} from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../api/user';
import styles from './DangerSection.module.scss';
import { SectionHeader } from './primitives';

interface DangerSectionProps {
  handle: string;
}

export function DangerSection({ handle }: DangerSectionProps): JSX.Element {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [reason, setReason] = useState('');
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const openSuccessNotification = () => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: t('settings.danger.deletedDescription'),
      duration: 5,
      icon: <CheckOutlined color={theme.green} />,
      key,
      title: t('settings.danger.deletedTitle'),
    });
  };

  const openErrorNotification = (error: Error) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title: t('settings.danger.deleteFailed'),
    });
  };

  const { mutate: deleteAccountMutation } = useMutation({
    mutationFn: deleteAccount,
    onError: (error) => {
      openErrorNotification(error);
    },
    onSuccess: () => {
      openSuccessNotification();
      void navigate('/');
    },
  });

  // The confirm button only enables when the typed text matches the handle exactly.
  const matches = typed.trim() === handle.toUpperCase();

  const close = (): void => {
    setOpen(false);
    setTyped('');
    setReason('');
  };

  const confirmDelete = (): void => {
    close();
    deleteAccountMutation();
  };

  return (
    <div>
      {notificationContext}
      <SectionHeader
        title={<span className={styles.dangerTitle}>{t('settings.danger.title')}</span>}
        subtitle={t('settings.danger.subtitle')}
      />

      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.text}>
            <h3 className={styles.heading}>{t('settings.danger.heading')}</h3>
            <p className={styles.desc}>
              <Trans i18nKey="settings.danger.desc" components={{ strong: <strong /> }} />
            </p>
          </div>
          <Button
            danger
            onClick={() => {
              setOpen(true);
            }}
          >
            {t('settings.danger.action')}
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        title={t('settings.danger.modalTitle')}
        okText={t('settings.danger.modalConfirm')}
        okButtonProps={{ danger: true, disabled: !matches }}
        cancelText={t('common.cancel')}
        onOk={confirmDelete}
        onCancel={close}
      >
        <p className={styles.modalText}>
          <Trans i18nKey="settings.danger.modalBody" components={{ strong: <strong /> }} />
        </p>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('settings.danger.reasonLabel')}</span>
          <Input.TextArea
            value={reason}
            rows={2}
            placeholder={t('settings.danger.reasonPlaceholder')}
            onChange={(event) => {
              setReason(event.target.value);
            }}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            <Trans
              i18nKey="settings.danger.confirmLabel"
              components={{ code: <code className={styles.code} /> }}
              values={{ handle }}
            />
          </span>
          <Input
            value={typed}
            placeholder={handle}
            status={typed && !matches ? 'error' : undefined}
            onChange={(event) => {
              setTyped(event.target.value);
            }}
          />
        </label>
      </Modal>
    </div>
  );
}
