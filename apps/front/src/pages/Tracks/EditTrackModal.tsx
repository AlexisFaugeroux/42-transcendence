import { useTranslation } from '@transcendence/i18n';
import { Input, InputNumber, Modal, Select } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { useUpdateTrack } from '../../hooks/useTracks';
import { MODES } from '../../types/sample';
import type { Key, Mode } from '../../types/sample';
import type { Track, UpdateTrackInput } from '../../types/track';
import { MODE_LABEL } from '../Samples/constants';
import { KEY_OPTIONS } from '../Samples/helpers';
import styles from './EditTrackModal.module.scss';

interface EditTrackModalProps {
  target: Track | null;
  onCancel: () => void;
  notifySuccess: (message: string, description: string) => void;
  notifyError: (message: string, description: string) => void;
}

interface Draft {
  title: string;
  description: string;
  bpm: number | null;
  key: Key | null;
  mode: Mode | null;
}

function toDraft(track: Track): Draft {
  return {
    bpm: track.bpm ?? null,
    description: track.description ?? '',
    key: track.key,
    mode: track.mode,
    title: track.title,
  };
}

function diff(original: Draft, draft: Draft): UpdateTrackInput {
  const changes: UpdateTrackInput = {};

  if (draft.title !== original.title) changes.title = draft.title;
  if (draft.description !== original.description) {
    changes.description = draft.description === '' ? null : draft.description;
  }
  if (draft.bpm !== original.bpm) changes.bpm = draft.bpm;
  if (draft.key !== original.key) changes.key = draft.key;
  if (draft.mode !== original.mode) changes.mode = draft.mode;

  return changes;
}

export function EditTrackModal({
  notifyError,
  notifySuccess,
  onCancel,
  target,
}: EditTrackModalProps): JSX.Element {
  const [draft, setDraft] = useState<Draft | null>(null);
  const { t } = useTranslation();
  const updateTrack = useUpdateTrack();

  useEffect(() => {
    setDraft(target ? toDraft(target) : null);
  }, [target]);

  const original = target ? toDraft(target) : null;
  const normalized = draft ? { ...draft, title: draft.title.trim() } : null;
  const changes = original && normalized ? diff(original, normalized) : {};
  const hasChanges = Object.keys(changes).length > 0;
  const titleIsEmpty = draft !== null && draft.title.trim().length === 0;

  const patch = (next: Partial<Draft>): void => {
    setDraft((prev) => (prev ? { ...prev, ...next } : prev));
  };

  return (
    <Modal
      open={target !== null}
      title={t('tracks.editModal.title')}
      okText={t('common.save')}
      okButtonProps={{ disabled: !hasChanges || titleIsEmpty }}
      confirmLoading={updateTrack.isPending}
      cancelText={t('common.cancel')}
      onOk={() => {
        if (!target || !hasChanges) return;
        updateTrack.mutate(
          { fields: changes, id: target.id },
          {
            onError: (error) => {
              notifyError(t('tracks.editModal.errorTitle'), error.message);
            },
            onSuccess: (updated) => {
              notifySuccess(
                t('tracks.editModal.successTitle'),
                t('tracks.editModal.successDescription', { title: updated.title }),
              );
              onCancel();
            },
          },
        );
      }}
      onCancel={onCancel}
      width={520}
    >
      {draft ? (
        <div className={styles.form}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t('tracks.fields.title')}</span>
            <Input
              value={draft.title}
              status={titleIsEmpty ? 'error' : undefined}
              onChange={(e) => {
                patch({ title: e.target.value });
              }}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t('tracks.fields.description')}</span>
            <Input.TextArea
              rows={3}
              value={draft.description}
              onChange={(e) => {
                patch({ description: e.target.value });
              }}
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('tracks.fields.bpm')}</span>
              <InputNumber
                min={1}
                max={999}
                step={1}
                precision={0}
                placeholder="—"
                value={draft.bpm}
                onChange={(value) => {
                  patch({ bpm: typeof value === 'number' ? value : null });
                }}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('tracks.fields.key')}</span>
              <Select
                allowClear
                placeholder="—"
                options={KEY_OPTIONS}
                value={draft.key}
                onChange={(value: Key | undefined) => {
                  patch({ key: value ?? null });
                }}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('tracks.fields.mode')}</span>
              <Select
                allowClear
                placeholder="—"
                options={MODES.map((mode) => ({ label: t(MODE_LABEL[mode]), value: mode }))}
                value={draft.mode}
                onChange={(value: Mode | undefined) => {
                  patch({ mode: value ?? null });
                }}
              />
            </label>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
