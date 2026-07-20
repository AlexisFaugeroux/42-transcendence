import { useMutation } from '@tanstack/react-query';
import { Input, InputNumber, Modal, Select } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { updateSample } from '../../api/audioFile/audioFile';
import type { UpdateSampleFields } from '../../api/audioFile/types';
import type { AudioFile, Family, Key, Kind, Mode } from '../../types/audioFile';
import styles from './EditSampleModal.module.scss';
import { FAMILY_OPTIONS, KEY_OPTIONS, KIND_OPTIONS, MODE_OPTIONS, VISIBILITY_OPTIONS } from './samples.data';

interface EditSampleModalProps {
  target: AudioFile | null;
  onCancel: () => void;
  onSaved: () => Promise<void>;
  notifySuccess: (message: string, description: string) => void;
  notifyError: (message: string, description: string) => void;
}

type Draft = Required<UpdateSampleFields>;

function toDraft(sample: AudioFile): Draft {
  return {
    bpm: sample.bpm,
    family: sample.family,
    key: sample.key,
    kind: sample.kind,
    mode: sample.mode,
    name: sample.name,
    visibility: sample.visibility ?? 'PRIVATE',
  };
}

function diff(original: Draft, draft: Draft): UpdateSampleFields {
  return (Object.keys(draft) as (keyof Draft)[]).reduce<UpdateSampleFields>((acc, field) => {
    if (draft[field] !== original[field]) Object.assign(acc, { [field]: draft[field] });
    return acc;
  }, {});
}

export function EditSampleModal({
  notifyError,
  notifySuccess,
  onCancel,
  onSaved,
  target,
}: EditSampleModalProps): JSX.Element {
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setDraft(target ? toDraft(target) : null);
  }, [target]);

  const { isPending, mutate: save } = useMutation({
    mutationFn: async ({ fields, id }: { id: string; fields: UpdateSampleFields }) => {
      const updated = await updateSample(id, fields);
      await onSaved();

      return updated;
    },
    onError: (error) => {
      notifyError('Could not save the sample', error.message);
    },
    onSuccess: (updated) => {
      notifySuccess('Sample updated', `${updated.name} has been saved`);
      onCancel();
    },
  });

  const original = target ? toDraft(target) : null;
  const normalized = draft ? { ...draft, name: draft.name.trim() } : null;
  const changes = original && normalized ? diff(original, normalized) : {};
  const hasChanges = Object.keys(changes).length > 0;
  const nameIsEmpty = draft !== null && draft.name.trim().length === 0;

  const patch = (next: Partial<Draft>): void => {
    setDraft((prev) => (prev ? { ...prev, ...next } : prev));
  };

  return (
    <Modal
      open={target !== null}
      title="Edit sample"
      okText="Save"
      okButtonProps={{ disabled: !hasChanges || nameIsEmpty }}
      confirmLoading={isPending}
      cancelText="Cancel"
      onOk={() => {
        if (target && hasChanges) save({ fields: changes, id: target.id });
      }}
      onCancel={onCancel}
      width={520}
    >
      {draft ? (
        <div className={styles.form}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Name</span>
            <Input
              value={draft.name}
              status={nameIsEmpty ? 'error' : undefined}
              onChange={(e) => {
                patch({ name: e.target.value });
              }}
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>BPM</span>
              <InputNumber
                min={1}
                max={999}
                step={1}
                precision={0}
                placeholder="—"
                value={draft.bpm}
                onChange={(value) => {
                  patch({ bpm: value });
                }}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Key</span>
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
              <span className={styles.fieldLabel}>Mode</span>
              <Select
                allowClear
                placeholder="—"
                options={MODE_OPTIONS}
                value={draft.mode}
                onChange={(value: Mode | undefined) => {
                  patch({ mode: value ?? null });
                }}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Family</span>
              <Select
                allowClear
                placeholder="—"
                options={FAMILY_OPTIONS}
                value={draft.family}
                onChange={(value: Family | undefined) => {
                  patch({ family: value ?? null });
                }}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Kind</span>
              <Select
                allowClear
                placeholder="—"
                options={KIND_OPTIONS}
                value={draft.kind}
                onChange={(value: Kind | undefined) => {
                  patch({ kind: value ?? null });
                }}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Visibility</span>
              <Select
                options={VISIBILITY_OPTIONS}
                value={draft.visibility}
                onChange={(value) => {
                  patch({ visibility: value });
                }}
              />
            </label>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
