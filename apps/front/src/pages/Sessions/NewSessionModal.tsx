import { useIsAllowed } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Permissions } from '@transcendence/permissions';
import { CloseCircleOutlined, Input, Modal, MsnIcon, notification, theme } from '@transcendence/ui';
import { type CSSProperties, type JSX, useState } from 'react';
import styles from './NewSessionModal.module.scss';
import {
  SESS_TYPES,
  type SessionType,
  TYPE_COLOR,
  TYPE_DESCRIPTION,
  TYPE_ICON,
  TYPE_LABEL,
} from './sessions.data';

interface NewSessionModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewSessionModal({ onClose, open }: NewSessionModalProps): JSX.Element {
  const [picked, setPicked] = useState<SessionType>('production');
  const [name, setName] = useState<string>('Untitled');
  const isAllowed = useIsAllowed();
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const notifyError = (title: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CloseCircleOutlined style={{ color: theme.red }} />,
      title,
    });
  };

  const openNewSession = () => {
    onClose();
    window.location.href = `${import.meta.env.VITE_STUDIO_URL}/?name=${name}`;
  };

  return (
    <>
      {notificationContext}
      <Modal
        open={open}
        title={t('sessions.new.title')}
        width={560}
        okText={t('sessions.new.submit')}
        cancelText={t('common.cancel')}
        onOk={() => {
          if (isAllowed(Permissions.STUDIO_ACCESS)) openNewSession();
          else notifyError(t('sessions.new.deniedTitle'), t('sessions.new.deniedDescription'));
        }}
        onCancel={onClose}
      >
        <p className={styles.lead}>{t('sessions.new.lead')}</p>

        <div className={styles.types}>
          {SESS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={styles.typeCard}
              data-active={picked === type}
              style={{ '--c': TYPE_COLOR[type] } as CSSProperties}
              onClick={() => {
                setPicked(type);
              }}
            >
              <span className={styles.typeHead}>
                <MsnIcon name={TYPE_ICON[type]} size="18px" /> {t(TYPE_LABEL[type])}
              </span>
              <span className={styles.typeDesc}>{t(TYPE_DESCRIPTION[type])}</span>
            </button>
          ))}
        </div>

        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t('sessions.new.titleField')}</span>
            <Input
              placeholder={t('sessions.new.titlePlaceholder')}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        </div>
      </Modal>
    </>
  );
}
