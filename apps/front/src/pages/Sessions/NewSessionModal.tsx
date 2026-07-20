import { Input, Modal, MsnIcon } from '@transcendence/ui';
import { type CSSProperties, type JSX, useState } from 'react';
import styles from './NewSessionModal.module.scss';
import { SESS_TYPES, type SessionType, TYPE_COLOR, TYPE_ICON } from './sessions.data';

const DESCRIPTIONS: Record<SessionType, string> = {
  mixing: 'Stems in, mix out. Faders, busses, FX chains.',
  production: 'Full DAW: tracks, MIDI, effects, automation.',
  recording: 'Get a take down. Multi-mic, punch-in, comp.',
};

interface NewSessionModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewSessionModal({ onClose, open }: NewSessionModalProps): JSX.Element {
  const [picked, setPicked] = useState<SessionType>('production');

  return (
    <Modal open={open} title="Start a new session" width={560} okText="Create & open" onOk={onClose} onCancel={onClose}>
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
              <MsnIcon name={TYPE_ICON[type]} size="18px" /> {type}
            </span>
            <span className={styles.typeDesc}>{DESCRIPTIONS[type]}</span>
          </button>
        ))}
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Title</span>
          <Input placeholder="Untitled session" />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>BPM</span>
          <Input placeholder="120" />
        </label>
      </div>
    </Modal>
  );
}
