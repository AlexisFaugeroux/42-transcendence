import { useMutation } from '@tanstack/react-query';
import { keyOptions, modeOptions, useTranslation } from '@transcendence/i18n';
import { Input, InputNumber, Modal, Select } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { updateSample } from '../../api/samples/samples';
import type { UpdateSampleFields } from '../../api/samples/types';
import { VISIBILITIES } from '../../types/sample';
import type { Family, Key, Kind, Mode, Sample } from '../../types/sample';
import { VISIBILITY_LABEL } from './constants';
import styles from './EditSampleModal.module.scss';
import { FAMILY_OPTIONS, KIND_OPTIONS } from './helpers';

interface EditSampleModalProps {
  target: Sample | null;
  onCancel: () => void;
  onSaved: () => Promise<void>;
  notifySuccess: (message: string, description: string) => void;
  notifyError: (message: string, description: string) => void;
}

type Draft = Required<UpdateSampleFields>;

function toDraft(sample: Sample): Draft {
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
  const { t } = useTranslation();

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
      notifyError(t('samples.edit.errorTitle'), error.message);
    },
    onSuccess: (updated) => {
      notifySuccess(
        t('samples.edit.successTitle'),
        t('samples.edit.successDescription', { name: updated.name }),
      );
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
      title={t('samples.edit.title')}
      okText={t('common.save')}
      okButtonProps={{ disabled: !hasChanges || nameIsEmpty }}
      confirmLoading={isPending}
      cancelText={t('common.cancel')}
      onOk={() => {
        if (target && hasChanges) save({ fields: changes, id: target.id });
      }}
      onCancel={onCancel}
      width={520}
    >
      {draft ? (
        <div className={styles.form}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t('samples.fields.name')}</span>
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
              <span className={styles.fieldLabel}>{t('samples.fields.bpm')}</span>
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
              <span className={styles.fieldLabel}>{t('samples.fields.key')}</span>
              <Select
                allowClear
                placeholder="—"
                options={keyOptions(t)}
                value={draft.key}
                onChange={(value: Key | undefined) => {
                  patch({ key: value ?? null });
                }}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('samples.fields.mode')}</span>
              <Select
                allowClear
                placeholder="—"
                options={modeOptions(t)}
                value={draft.mode}
                onChange={(value: Mode | undefined) => {
                  patch({ mode: value ?? null });
                }}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('samples.fields.family')}</span>
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
              <span className={styles.fieldLabel}>{t('samples.fields.kind')}</span>
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
              <span className={styles.fieldLabel}>{t('samples.fields.visibility')}</span>
              <Select
                options={VISIBILITIES.map((visibility) => ({
                  label: t(VISIBILITY_LABEL[visibility]),
                  value: visibility,
                }))}
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
