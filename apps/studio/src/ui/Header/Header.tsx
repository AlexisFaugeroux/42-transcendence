import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import {
  ConfigProvider,
  Dropdown,
  IconBtn,
  type MenuProps,
  MsnIcon,
  MsnWordmark,
  Separator,
  theme,
} from '@transcendence/ui';
import { type JSX, type MouseEvent, useEffect, useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { useTracks } from '../../contexts/TracksContext';
import { useRenameProject, useSaveProject } from '../../hooks/useProject';
import { reloadClipsAndTracks } from '../../lib/projectSetup';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import { ExportModal } from './ExportModal';
import styles from './Header.module.scss';
import { LeaveStudioModal } from './LeaveStudioModal';
import { Meter } from './Meter/Meter';
import { Metrics } from './Metrics/Metrics';
import { RenameProjectModal } from './RenameProjectModal';
import { Transport } from './Transport/Transport';

const FRONT_URL = import.meta.env.VITE_FRONT_URL;

export function Header(): JSX.Element {
  const [saved, setSaved] = useState(true);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameError, setRenameError] = useState<string | null>(null);
  const { meta, project } = useProject();
  const { setClips, setTracks } = useTracks();
  const { t } = useTranslation();
  const { isPending: isSaving, mutate: save } = useSaveProject();
  const { isPending: isRenaming, mutate: rename } = useRenameProject();

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

  const goHome = (): void => {
    window.location.href = `${FRONT_URL}/home`;
  };

  const onSave = (): void => {
    save(undefined, {
      onSuccess: () => {
        setSaved(true);
      },
    });
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
    save(undefined, {
      onError: (error) => {
        setLeaveError(error instanceof Error ? error.message : String(error));
      },
      onSuccess: goHome,
    });
  };

  const onRenameConfirm = (name: string): void => {
    setRenameError(null);
    rename(name, {
      onError: (error) => {
        setRenameError(error instanceof Error ? error.message : String(error));
      },
      onSuccess: () => {
        setSaved(true);
        setRenameOpen(false);
      },
    });
  };

  const menuItems: MenuProps['items'] = [
    {
      disabled: saved || isSaving,
      icon: <StudioIcon name="save" color={theme.fg1} size={10} style={{ marginRight: '4px' }} />,
      key: 'save',
      label: t('common.save'),
      style: { fontSize: '10px' },
    },
    {
      icon: <StudioIcon name="pencil" color={theme.fg1} size={10} style={{ marginRight: '4px' }} />,
      key: 'rename',
      label: t('common.rename'),
      style: { fontSize: '10px' },
    },
    {
      icon: <StudioIcon name="share" color={theme.fg1} size={10} style={{ marginRight: '4px' }} />,
      key: 'export',
      label: t('studio.header.export.button'),
      style: { fontSize: '10px' },
    },
  ];

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'save') {
      onSave();
      return;
    }
    if (key === 'rename') {
      setRenameError(null);
      setRenameOpen(true);
      return;
    }
    if (key === 'export') {
      setExportOpen(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.group}>
        <a className={styles.sessionsLink} href={`${FRONT_URL}/home`} onClick={onLogoClick}>
          <MsnIcon name="msn" size="16px" color={theme.orange} />
          <MsnWordmark size={12} accent="var(--color-orange)" />
        </a>
        <Separator />

        <ConfigProvider theme={{ token: { colorBgElevated: theme.bgPanel3 } }}>
          <div className={styles.titleBloc}>
            <Dropdown
              trigger={['click']}
              placement="bottomLeft"
              menu={{
                items: menuItems,
                onClick: onMenuClick,
                style: { border: `1px solid ${theme.lineSoft}` },
              }}
            >
              <button
                type="button"
                className={styles.titleMenu}
                title={t('studio.header.projectMenu')}
                aria-label={t('studio.header.projectMenu')}
              >
                <span className={styles.projectEyebrow}>{t('studio.header.project')}</span>
                <span className={styles.projectTitle}>{meta.name}</span>
                <span className={styles.projectCaret} aria-hidden>
                  <StudioIcon name="triangle" size={10} />
                </span>
              </button>
            </Dropdown>
            <span className={styles.projectState} data-saved={saved ? 'true' : 'false'}>
              ● {saved ? t('studio.header.saved') : t('studio.header.unsaved')}
            </span>
          </div>
        </ConfigProvider>
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
      </div>

      <div className={styles.group}>
        <Transport />
        <Separator />
        <Metrics />
      </div>

      <div className={`${styles.group} ${styles.groupEnd}`}>
        <Meter />
        <Separator />
        <div className={styles.actions}>
          <LanguageSelect compact />
        </div>
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

      <RenameProjectModal
        open={renameOpen}
        initialName={meta.name ?? ''}
        saving={isRenaming}
        error={renameError}
        onCancel={() => {
          if (!isRenaming) {
            setRenameOpen(false);
            setRenameError(null);
          }
        }}
        onConfirm={onRenameConfirm}
      />

      <LeaveStudioModal
        open={leaveOpen}
        saving={isSaving}
        error={leaveError}
        onCancel={() => {
          if (!isSaving) {
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
