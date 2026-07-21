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
  const [name, setName] = useState<string>('Untitled');
  const [bpm, setBpm] = useState<number>(120);

  const openNewSession = () => {
    onClose;
    window.location.href = `${import.meta.env.VITE_STUDIO_URL}/studio?name=${name}&bpm=${bpm}`;
  }

  return (
    <Modal open={open} title="Start a new session" width={560} okText="Create & open" onOk={openNewSession} onCancel={onClose}>
      <p className={styles.lead}>Pick the kind of session, then we&apos;ll set up the right workspace.</p>

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
          <span className={styles.fieldLabel}>Title</span>
          <Input placeholder="Untitled session" onChange={ e => { setName(e.target.value) }} />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>BPM</span>
          <Input placeholder="120" onChange={ e => { setBpm(e.target.valueAsNumber) }} />
        </label>
      </div>
    </Modal>
  );
}
