import { useTranslation } from '@transcendence/i18n';
import { Input, Modal, MsnIcon } from '@transcendence/ui';
import { type CSSProperties, type JSX, useState } from 'react';
import styles from './NewSessionModal.module.scss';
import { SESS_TYPES, type SessionType, TYPE_COLOR, TYPE_DESCRIPTION, TYPE_ICON, TYPE_LABEL } from './sessions.data';

interface NewSessionModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewSessionModal({ onClose, open }: NewSessionModalProps): JSX.Element {
  const [picked, setPicked] = useState<SessionType>('production');
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      title={t('sessions.new.title')}
      width={560}
      okText={t('sessions.new.submit')}
      onOk={onClose}
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
          <Input placeholder={t('sessions.new.titlePlaceholder')} />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('sessions.new.bpmField')}</span>
          <Input placeholder="120" />
        </label>
      </div>
    </Modal>
  );
}
