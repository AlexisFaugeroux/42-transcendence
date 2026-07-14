import { Modal, Upload } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { theme } from '@ui/theme/theme';
import { formatMB, STORAGE_LIMIT_GB } from './samples.data';
import styles from './UploadModal.module.scss';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  usedMB: number;
}

// Static queue to illustrate the states (the design shows done/uploading/queued).
const QUEUE = [
  { name: 'shaker_swing_120.wav', size: 1.4, status: 'Added' },
  { name: 'vox_breath_short.wav', size: 0.9, status: 'Added' },
  { name: 'synth_lead_140_Amin.wav', size: 5.6, status: '62%' },
  { name: 'field_market.flac', size: 22.0, status: 'Queued' },
];

export function UploadModal({ onClose, open, usedMB }: UploadModalProps): JSX.Element {
  const queueTotal = QUEUE.reduce((acc, f) => acc + f.size, 0);

  return (
    <Modal open={open} title="Add samples" footer={null} onCancel={onClose} width={540}>
      <Upload.Dragger multiple beforeUpload={() => false} showUploadList={false} accept=".wav,.mp3,.flac,.aif">
        <p className={styles.dropIcon}>
          <MsnIcon name="download" size="22px" color={theme.orange} style={{ transform: 'rotate(180deg)' }} />
        </p>
        <p className={styles.dropTitle}>Drop audio files here</p>
        <p className={styles.dropHint}>.wav .mp3 .flac .aif — up to 100 MB per file</p>
      </Upload.Dragger>

      <div className={styles.queueLabel}>
        Queue · {QUEUE.length} files · {formatMB(queueTotal)}
      </div>
      <div className={styles.queue}>
        {QUEUE.map((file) => (
          <div key={file.name} className={styles.queueRow}>
            <span className={styles.fileName}>{file.name}</span>
            <span className={styles.mono}>{formatMB(file.size)}</span>
            <span className={styles.status}>{file.status}</span>
          </div>
        ))}
      </div>

      <div className={styles.after}>
        <span>After upload</span>
        <span>
          <span className={styles.accent}>{formatMB(usedMB + queueTotal)}</span> / {STORAGE_LIMIT_GB} GB
        </span>
      </div>
    </Modal>
  );
}
