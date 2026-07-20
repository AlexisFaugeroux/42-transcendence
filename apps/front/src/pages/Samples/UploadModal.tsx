import { useMutation } from '@tanstack/react-query';
import {
  Button,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  InputNumber,
  Modal,
  MsnIcon,
  notification,
  Select,
  theme,
  Upload,
} from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { uploadSample } from '../../api/audioFile/audioFile';
import type { UploadSampleFields } from '../../api/audioFile/types';
import { FAMILY_OPTIONS, formatBytes, KEY_OPTIONS, KIND_OPTIONS, VISIBILITY_OPTIONS } from './helpers';
import styles from './UploadModal.module.scss';

type ItemStatus = 'queued' | 'uploading' | 'error';

interface QueueItem {
  uuid: string;
  status: ItemStatus;
  file: File;
  fields: UploadSampleFields;
  error?: string;
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploaded: () => Promise<void>;
  usedBytes: number;
  quotaBytes: number;
}

export function UploadModal({ onClose, onUploaded, open, quotaBytes, usedBytes }: UploadModalProps): JSX.Element {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [notificationApi, notificationContext] = notification.useNotification();

  const addToQueue = (file: File): void => {
    setQueue((q) => [...q, { fields: { visibility: 'PRIVATE' }, file, status: 'queued', uuid: crypto.randomUUID() }]);
  };

  const patch = (uuid: string, next: Partial<QueueItem>): void => {
    setQueue((q) => q.map((it) => (it.uuid === uuid ? { ...it, ...next } : it)));
  };

  const patchFields = (uuid: string, next: Partial<UploadSampleFields>): void => {
    setQueue((q) => q.map((it) => (it.uuid === uuid ? { ...it, fields: { ...it.fields, ...next } } : it)));
  };

  const deleteFromQueue = (uuid: string): void => {
    setQueue((q) => q.filter((item) => item.uuid !== uuid));
  };

  const { isPending, mutate: startUpload } = useMutation({
    mutationFn: async () => {
      const pending = queue.filter((item) => item.status !== 'uploading');
      let failed = 0;

      for (const item of pending) {
        patch(item.uuid, { error: undefined, status: 'uploading' });

        try {
          await uploadSample(item.file, item.fields);
          deleteFromQueue(item.uuid);
        } catch (error) {
          patch(item.uuid, { error: error instanceof Error ? error.message : 'Upload failed', status: 'error' });
          failed += 1;
        }
      }

      await onUploaded();

      if (failed) throw new Error(`${failed.toString()} of ${pending.length.toString()} files could not be uploaded`);

      return pending.length;
    },
    onError: (error) => {
      notificationApi.open({
        description: error.message,
        duration: 5,
        icon: <CloseCircleOutlined style={{ color: theme.red }} />,
        message: 'Upload failed',
      });
    },
    onSuccess: (count) => {
      notificationApi.open({
        description: `${count.toString()} sample(s) are now available in your library`,
        duration: 5,
        icon: <CheckCircleOutlined style={{ color: theme.green }} />,
        message: 'Upload complete',
      });
      onClose();
    },
  });

  const queueTotal = queue.reduce((acc, { file }) => acc + file.size, 0);
  const uploadableCount = queue.filter((item) => item.status !== 'uploading').length;

  return (
    <Modal
      open={open}
      title="Add samples"
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          style={{ backgroundColor: theme.orange }}
          disabled={uploadableCount === 0}
          loading={isPending}
          onClick={() => {
            startUpload();
          }}
        >
          Upload {uploadableCount} files
        </Button>,
      ]}
    >
      {notificationContext}
      <Upload.Dragger
        multiple
        beforeUpload={(file) => {
          addToQueue(file);
          return false;
        }}
        showUploadList={false}
        accept=".wav"
      >
        <p className={styles.dropIcon}>
          <MsnIcon name="download" size="22px" color={theme.orange} style={{ transform: 'rotate(180deg)' }} />
        </p>
        <p className={styles.dropTitle}>Drop audio files here</p>
        <p className={styles.dropHint}>.wav</p>
      </Upload.Dragger>

      <div className={styles.queueLabel}>
        Queue · {queue.length} files · {formatBytes(queueTotal)}
      </div>
      <div className={styles.queue}>
        {queue.map(({ error, fields, file, status, uuid }) => (
          <div key={uuid} className={styles.queueRow}>
            <div className={styles.topLine}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.mono}>{formatBytes(file.size)}</span>
              <span className={styles.status}>{status}</span>
              <Button
                type="text"
                size="small"
                danger
                title="Remove"
                disabled={status === 'uploading'}
                onClick={() => {
                  deleteFromQueue(uuid);
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
            {error ? <div className={styles.error}>{error}</div> : null}
            <div className={styles.selects}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Visibility</span>
                <Select
                  size="small"
                  placeholder="visibility"
                  options={VISIBILITY_OPTIONS}
                  value={fields.visibility}
                  onChange={(value) => {
                    patchFields(uuid, { visibility: value });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Family</span>
                <Select
                  size="small"
                  placeholder="family"
                  options={FAMILY_OPTIONS}
                  value={fields.family}
                  onChange={(value) => {
                    patchFields(uuid, { family: value });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Kind</span>
                <Select
                  size="small"
                  placeholder="kind"
                  options={KIND_OPTIONS}
                  value={fields.kind}
                  onChange={(value) => {
                    patchFields(uuid, { kind: value });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>BPM</span>
                <InputNumber
                  size="small"
                  placeholder="bpm"
                  min={40}
                  max={300}
                  step={1}
                  precision={0}
                  value={fields.bpm}
                  onChange={(value) => {
                    patchFields(uuid, { bpm: value ?? undefined });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Key</span>
                <Select
                  size="small"
                  placeholder="key"
                  options={KEY_OPTIONS}
                  value={fields.key}
                  onChange={(value) => {
                    patchFields(uuid, { key: value });
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.after}>
        <span>After upload</span>
        <span>
          <span className={styles.accent}>{formatBytes(usedBytes + queueTotal)}</span> / {formatBytes(quotaBytes)}
        </span>
      </div>
    </Modal>
  );
}
