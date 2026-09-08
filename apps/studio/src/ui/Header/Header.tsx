import { UUID } from '@opendaw/lib-std';
import { useMutation } from '@tanstack/react-query';
import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import { Button, IconBtn, MsnIcon, MsnWordmark, Separator, theme } from '@transcendence/ui';
import { type JSX, type MouseEvent, useEffect, useState } from 'react';
import { saveProject } from '../../api/project';
import { useProject } from '../../contexts/ProjectContext';
import { useTracks } from '../../contexts/TracksContext';
import { reloadClipsAndTracks } from '../../lib/projectSetup';
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
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const { meta, project } = useProject();
  const { setClips, setTracks } = useTracks();
  const { t } = useTranslation();

  useEffect(() => {
    const syncEditingUi = (): void => {
      setSaved(!project.editing.hasUnsavedChanges());
      setCanUndo(project.editing.canUndo());
      setCanRedo(project.editing.canRedo());
    };
    syncEditingUi();
    const subscription = project.editing.subscribe(syncEditingUi);
    return () => {
      subscription.terminate();
    };
  }, [project]);

  const syncArrangement = (): void => {
    const next = reloadClipsAndTracks(project);
    setTracks(next.tracks);
    setClips(next.clips);
  };

  const onUndo = (): void => {
    if (!project.editing.canUndo()) return;
    project.editing.undo();
    syncArrangement();
  };

  const onRedo = (): void => {
    if (!project.editing.canRedo()) return;
    project.editing.redo();
    syncArrangement();
  };

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
        <MsnIcon name="msn" size="16px" color={theme.orange} />
        <MsnWordmark size={12} accent="var(--color-orange)" />
      </a>
      <Separator />

      <div className={styles.titleBloc}>
        <span className={styles.projectTitle}>{meta.name}</span>
        <span className={styles.projectState} data-saved={saved ? 'true' : 'false'}>
          ● {saved ? t('studio.header.saved') : t('studio.header.unsaved')}
        </span>
      </div>
      <Separator />

      <div>
        <IconBtn
          title={t('studio.header.undo')}
          color={canUndo ? undefined : 'var(--fg3)'}
          background="transparent"
          borderWidth={0}
          width={24}
          height={24}
          onClick={onUndo}
        >
          <StudioIcon name="undo" size={13} />
        </IconBtn>
        <IconBtn
          title={t('studio.header.redo')}
          color={canRedo ? undefined : 'var(--fg3)'}
          background="transparent"
          borderWidth={0}
          width={24}
          height={24}
          onClick={onRedo}
        >
          <StudioIcon name="redo" size={13} />
        </IconBtn>
      </div>
      <Separator />

      <Transport />
      <Separator />

      <Metrics />

      <div className={styles.spacer} />

      <Meter />
      <Separator />

      <div className={styles.actions}>
        <LanguageSelect compact />
        <Button onClick={onSave} loading={isPending} size="small">
          {t('studio.header.save')}
        </Button>
        <Button
          size="small"
          onClick={() => {
            setExportOpen(true);
          }}
        >
          {t('studio.header.export.button')}
        </Button>
      </div>

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
