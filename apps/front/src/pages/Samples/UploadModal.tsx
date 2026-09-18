import { useMutation } from '@tanstack/react-query';
import { keyOptions, useTranslation } from '@transcendence/i18n';
import {
  Button,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  InputNumber,
  Modal,
  MsnIcon,
  notification,
  Progress,
  Select,
  theme,
  Upload,
} from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { uploadSample } from '../../api/samples/samples';
import type { UploadSampleFields } from '../../api/samples/types';
import { VISIBILITIES } from '../../types/sample';
import { UPLOAD_STATUS_LABEL, VISIBILITY_LABEL } from './constants';
import { FAMILY_OPTIONS, formatBytes, KIND_OPTIONS } from './helpers';
import styles from './UploadModal.module.scss';

type ItemStatus = 'queued' | 'uploading' | 'error';

interface QueueItem {
  uuid: string;
  status: ItemStatus;
  file: File;
  fields: UploadSampleFields;
  error?: string;
  progress?: number;
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploaded: () => Promise<void>;
  usedBytes: number;
  quotaBytes: number;
  maxUploadBytes: number;
}

export function UploadModal({
  maxUploadBytes,
  onClose,
  onUploaded,
  open,
  quotaBytes,
  usedBytes,
}: UploadModalProps): JSX.Element {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [batch, setBatch] = useState<{ current: number; total: number } | null>(null);
  const { i18n, t } = useTranslation();
  const locale = i18n.language;
  const [notificationApi, notificationContext] = notification.useNotification();

  const addToQueue = (file: File): void => {
    if (file.size > maxUploadBytes) {
      setQueue((q) => [
        ...q,
        {
          error: t('samples.upload.fileTooLarge', {
            max: formatBytes(maxUploadBytes, locale),
          }),
          fields: { visibility: 'PRIVATE' },
          file,
          status: 'error',
          uuid: crypto.randomUUID(),
        },
      ]);
      return;
    }

    setQueue((q) => [
      ...q,
      { fields: { visibility: 'PRIVATE' }, file, status: 'queued', uuid: crypto.randomUUID() },
    ]);
  };

  const patch = (uuid: string, next: Partial<QueueItem>): void => {
    setQueue((q) => q.map((it) => (it.uuid === uuid ? { ...it, ...next } : it)));
  };

  const patchFields = (uuid: string, next: Partial<UploadSampleFields>): void => {
    setQueue((q) =>
      q.map((it) => (it.uuid === uuid ? { ...it, fields: { ...it.fields, ...next } } : it)),
    );
  };

  const deleteFromQueue = (uuid: string): void => {
    setQueue((q) => q.filter((item) => item.uuid !== uuid));
  };

  const { isPending, mutate: startUpload } = useMutation({
    mutationFn: async () => {
      const pending = queue.filter((item) => item.status === 'queued');
      let failed = 0;
      let index = 0;

      for (const item of pending) {
        index += 1;
        setBatch({ current: index, total: pending.length });
        patch(item.uuid, { error: undefined, progress: undefined, status: 'uploading' });

        try {
          await uploadSample(item.file, item.fields, (ratio) => {
            patch(item.uuid, { progress: ratio });
          });
          deleteFromQueue(item.uuid);
        } catch (error) {
          patch(item.uuid, {
            error: error instanceof Error ? error.message : t('samples.upload.errorTitle'),
            progress: undefined,
            status: 'error',
          });
          failed += 1;
        }
      }

      setBatch(null);
      await onUploaded();

      if (failed)
        throw new Error(
          t('samples.upload.partialFailure', { count: failed, total: pending.length }),
        );

      return pending.length;
    },
    onError: (error) => {
      notificationApi.open({
        description: error.message,
        duration: 5,
        icon: <CloseCircleOutlined style={{ color: theme.red }} />,
        title: t('samples.upload.errorTitle'),
      });
    },
    onSuccess: (count) => {
      notificationApi.open({
        description: t('samples.upload.successDescription', { count }),
        duration: 5,
        icon: <CheckCircleOutlined style={{ color: theme.green }} />,
        title: t('samples.upload.successTitle'),
      });
      onClose();
    },
  });

  const queueTotal = queue.reduce((acc, { file }) => acc + file.size, 0);
  const uploadableCount = queue.filter((item) => item.status === 'queued').length;

  return (
    <Modal
      open={open}
      title={t('samples.upload.title')}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t('common.cancel')}
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
          {t('samples.upload.submit', { count: uploadableCount })}
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
          <MsnIcon
            name="download"
            size="22px"
            color={theme.orange}
            style={{ transform: 'rotate(180deg)' }}
          />
        </p>
        <p className={styles.dropTitle}>{t('samples.upload.dropTitle')}</p>
        <p className={styles.dropHint}>.wav</p>
      </Upload.Dragger>

      <div className={styles.queueLabel}>
        <span>
          {t('samples.upload.queue', {
            count: queue.length,
            size: formatBytes(queueTotal, locale),
          })}
        </span>
        {batch ? (
          <span className={styles.accent}>
            {t('samples.upload.batch', { current: batch.current, total: batch.total })}
          </span>
        ) : null}
      </div>
      <div className={styles.queue}>
        {queue.map(({ error, fields, file, progress, status, uuid }) => (
          <div key={uuid} className={styles.queueRow}>
            <div className={styles.topLine}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.mono}>{formatBytes(file.size, locale)}</span>
              <span className={styles.status}>{t(UPLOAD_STATUS_LABEL[status])}</span>
              <Button
                type="text"
                size="small"
                danger
                title={t('common.remove')}
                disabled={status === 'uploading'}
                onClick={() => {
                  deleteFromQueue(uuid);
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
            {status === 'uploading' && progress !== undefined ? (
              <Progress percent={Math.round(progress * 100)} size="small" />
            ) : null}
            {error ? <div className={styles.error}>{error}</div> : null}
            <div className={styles.selects}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t('samples.fields.visibility')}</span>
                <Select
                  size="small"
                  placeholder={t('samples.fields.visibility')}
                  options={VISIBILITIES.map((visibility) => ({
                    label: t(VISIBILITY_LABEL[visibility]),
                    value: visibility,
                  }))}
                  value={fields.visibility}
                  onChange={(value) => {
                    patchFields(uuid, { visibility: value });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t('samples.fields.family')}</span>
                <Select
                  size="small"
                  placeholder={t('samples.fields.family')}
                  options={FAMILY_OPTIONS}
                  value={fields.family}
                  onChange={(value) => {
                    patchFields(uuid, { family: value });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t('samples.fields.kind')}</span>
                <Select
                  size="small"
                  placeholder={t('samples.fields.kind')}
                  options={KIND_OPTIONS}
                  value={fields.kind}
                  onChange={(value) => {
                    patchFields(uuid, { kind: value });
                  }}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t('samples.fields.bpm')}</span>
                <InputNumber
                  size="small"
                  placeholder={t('samples.fields.bpm')}
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
                <span className={styles.fieldLabel}>{t('samples.fields.key')}</span>
                <Select
                  size="small"
                  placeholder={t('samples.fields.key')}
                  options={keyOptions(t)}
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
        <span>{t('samples.upload.afterUpload')}</span>
        <span>
          <span className={styles.accent}>{formatBytes(usedBytes + queueTotal, locale)}</span> /{' '}
          {formatBytes(quotaBytes, locale)}
        </span>
      </div>
    </Modal>
  );
}
