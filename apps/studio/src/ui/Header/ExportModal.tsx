import { useTranslation } from '@transcendence/i18n';
import { Alert, Button, Input, Modal, Progress, Select, Space, theme } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { type TrackVisibility, uploadTrack } from '../../api/track';
import { useOfflineRender } from '../../hooks/useOfflineRender';

interface ExportModalProps {
  open: boolean;
  defaultTitle: string;
  projectId: string | null;
  bpm: number;
  onClose: () => void;
}

type Phase = 'form' | 'rendering' | 'uploading';

const VISIBILITY_OPTIONS: TrackVisibility[] = ['PRIVATE', 'SHARED', 'PUBLIC'];

const VISIBILITY_LABEL = {
  PRIVATE: 'studio.header.export.visibilityOptions.private',
  PUBLIC: 'studio.header.export.visibilityOptions.public',
  SHARED: 'studio.header.export.visibilityOptions.shared',
} as const;

export function ExportModal({
  bpm,
  defaultTitle,
  onClose,
  open,
  projectId,
}: ExportModalProps): JSX.Element {
  const { t } = useTranslation();
  const { cancel, error: renderError, isRendering, progress, start } = useOfflineRender();

  const [title, setTitle] = useState(defaultTitle);
  const [visibility, setVisibility] = useState<TrackVisibility>('PRIVATE');
  const [phase, setPhase] = useState<Phase>('form');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = phase === 'rendering' || phase === 'uploading';

  useEffect(() => {
    if (!open) return;
    setTitle(defaultTitle.trim() || t('studio.header.export.untitled'));
    setVisibility('PRIVATE');
    setPhase('form');
    setUploadProgress(null);
    setError(null);
  }, [defaultTitle, open, t]);

  useEffect(() => {
    if (renderError) setError(renderError.message);
  }, [renderError]);

  const handleClose = (): void => {
    if (phase === 'uploading') return;
    if (isRendering) cancel();
    onClose();
  };

  const handleExport = (): void => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError(t('studio.header.export.titleRequired'));
      return;
    }
    if (!projectId) {
      setError(t('studio.header.export.missingProject'));
      return;
    }

    setError(null);
    setPhase('rendering');

    void (async () => {
      try {
        const wav = await start();
        if (wav === null) {
          onClose();
          return;
        }

        setPhase('uploading');
        setUploadProgress(null);
        await uploadTrack(
          wav,
          {
            bpm,
            projectId,
            title: trimmed,
            visibility,
          },
          setUploadProgress,
        );
        onClose();
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : String(caught);
        setError(message || t('studio.header.export.failed'));
        setUploadProgress(null);
        setPhase('form');
      }
    })();
  };

  return (
    <Modal
      open={open}
      title={t('studio.header.export.title')}
      onCancel={handleClose}
      footer={
        <Space>
          <Button onClick={handleClose} disabled={phase === 'uploading'}>
            {t('common.cancel')}
          </Button>
          <Button type="primary" onClick={handleExport} loading={busy} disabled={busy}>
            {phase === 'uploading'
              ? t('studio.header.export.uploading')
              : phase === 'rendering'
                ? t('studio.header.export.rendering')
                : t('studio.header.export.submit')}
          </Button>
        </Space>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ color: theme.fg2, fontSize: 12 }}>
          {t('studio.header.export.trackTitle')}
          <Input
            value={title}
            disabled={busy}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            style={{ marginTop: 6 }}
          />
        </label>

        <label style={{ color: theme.fg2, fontSize: 12 }}>
          {t('studio.header.export.visibility')}
          <Select
            value={visibility}
            disabled={busy}
            style={{ marginTop: 6, width: '100%' }}
            onChange={(value: TrackVisibility) => {
              setVisibility(value);
            }}
            options={VISIBILITY_OPTIONS.map((value) => ({
              label: t(VISIBILITY_LABEL[value]),
              value,
            }))}
          />
        </label>

        {phase === 'rendering' ? (
          <div>
            <p style={{ color: theme.fg2, fontSize: 12, margin: '0 0 8px' }}>
              {t('studio.header.export.rendering')}
            </p>
            <Progress percent={Math.round(progress * 100)} size="small" />
          </div>
        ) : null}

        {phase === 'uploading' ? (
          <div>
            <p style={{ color: theme.fg2, fontSize: 12, margin: '0 0 8px' }}>
              {t('studio.header.export.uploading')}
            </p>
            {uploadProgress === null ? null : (
              <Progress percent={Math.round(uploadProgress * 100)} size="small" />
            )}
          </div>
        ) : null}

        {error ? (
          <Alert
            type="error"
            showIcon
            title={t('studio.header.export.failed')}
            description={error}
          />
        ) : null}
      </div>
    </Modal>
  );
}
