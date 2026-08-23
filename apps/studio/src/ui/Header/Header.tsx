import { UUID } from '@opendaw/lib-std';
import { useMutation } from '@tanstack/react-query';
import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import { Button, IconBtn, MsnIcon, MsnWordmark, Separator, theme } from '@transcendence/ui';
import { type JSX, type MouseEvent, useEffect, useState } from 'react';
import { saveProject } from '../../api/project';
import { useProject } from '../../contexts/ProjectContext';
import type { ProjectProperties } from '../../lib/types';
import { arrayBufferToBase64 } from '../../utils/base64';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import { ExportModal } from './ExportModal';
import styles from './Header.module.scss';
import { LeaveStudioModal } from './LeaveStudioModal';
import { Meter } from './Meter/Meter';
import { Metrics } from './Metrics/Metrics';
import { Transport } from './Transport/Transport';

const FRONT_URL = import.meta.env.VITE_FRONT_URL;

export function Header(): JSX.Element {
  const [saved, setSaved] = useState(true);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const { meta, project } = useProject();
  const { t } = useTranslation();

  useEffect(() => {
    const updateSavedState = (): void => {
      setSaved(!project.editing.hasUnsavedChanges());
    };
    updateSavedState();
    const subscription = project.editing.subscribe(updateSavedState);
    return () => {
      subscription.terminate();
    };
  }, [project]);

  const { isPending, mutate: save } = useMutation({
    mutationFn: saveProject,
    onSuccess: () => {
      project.editing.markSaved();
      setSaved(true);
    },
  });

  const buildPayload = (): ProjectProperties => ({
    ...meta,
    bpm: project.timelineBox.bpm.getValue(),
    samples: project.collectSampleUUIDs().map((uuid) => UUID.toString(uuid)),
    state: arrayBufferToBase64(project.toArrayBuffer()),
  });

  const goHome = (): void => {
    window.location.href = `${FRONT_URL}/home`;
  };

  const onSave = (): void => {
    save(buildPayload());
  };

  const onLogoClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    if (saved) {
      goHome();
      return;
    }
    setLeaveError(null);
    setLeaveOpen(true);
  };

  const onSaveAndLeave = (): void => {
    setLeaveError(null);
    save(buildPayload(), {
      onError: (error) => {
        setLeaveError(error instanceof Error ? error.message : String(error));
      },
      onSuccess: goHome,
    });
  };

  return (
    <header className={styles.header}>
      <a className={styles.sessionsLink} href={`${FRONT_URL}/home`} onClick={onLogoClick}>
        <MsnIcon name="msn" size="18px" color={theme.orange} />
        <MsnWordmark size={13} accent="var(--color-orange)" />
      </a>
      <Separator />

      <div className={styles.titleBloc}>
        {/* TODO: Make project name and project state dynamic */}
        <span className={styles.projectPill}>Project</span>
        <span className={styles.projectTitle}>{meta.name}</span>
        <span className={styles.projectState} data-saved={saved ? 'true' : 'false'}>
          {saved ? '● saved' : '● unsaved'}
        </span>
      </div>
      <Separator />

      {/* TODO: implement undo/redo mechanic */}
      <div>
        <IconBtn
          title={t('studio.header.undo')}
          onClick={() => {
            console.log('un-prout');
          }}
        >
          <StudioIcon name="undo" size={14} />
        </IconBtn>
        <IconBtn
          title={t('studio.header.redo')}
          onClick={() => {
            console.log('re-prout');
          }}
        >
          <StudioIcon name="redo" size={14} />
        </IconBtn>
      </div>
      <Separator />

      <Transport />
      <Separator />

      <Metrics />
      <Separator />

      <Meter />
      <Separator />

      <LanguageSelect compact />

      <Button onClick={onSave} loading={isPending}>
        {' '}
        Save{' '}
      </Button>
      <Button
        onClick={() => {
          setExportOpen(true);
        }}
      >
        {t('studio.header.export.button')}
      </Button>

      <ExportModal
        open={exportOpen}
        defaultTitle={meta.name ?? ''}
        projectId={meta.id}
        bpm={project.timelineBox.bpm.getValue()}
        onClose={() => {
          setExportOpen(false);
        }}
      />

      <LeaveStudioModal
        open={leaveOpen}
        saving={isPending}
        error={leaveError}
        onCancel={() => {
          if (!isPending) {
            setLeaveOpen(false);
            setLeaveError(null);
          }
        }}
        onLeaveWithoutSaving={goHome}
        onSaveAndLeave={onSaveAndLeave}
      />
    </header>
  );
}
