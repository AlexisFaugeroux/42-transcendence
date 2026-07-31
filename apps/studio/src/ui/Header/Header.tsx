import { UUID } from '@opendaw/lib-std';
import { useMutation } from '@tanstack/react-query';
import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import { Button, IconBtn, MsnIcon, MsnWordmark, Separator, theme } from '@transcendence/ui';
import { useState, type JSX } from 'react';
import { saveProject } from '../../api/project';
import { useProject } from '../../contexts/ProjectContext';
import { arrayBufferToBase64 } from '../../utils/base64';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import styles from './Header.module.scss';
import { Meter } from './Meter/Meter';
import { Metrics } from './Metrics/Metrics';
import { Transport } from './Transport/Transport';

export function Header(): JSX.Element {
  const [saved, setSaved] = useState( true );
  const { project, meta } = useProject();
  const { t } = useTranslation();

  const { isPending, mutate : save } = useMutation({
    mutationFn : saveProject,
    onSuccess : () => {
      setSaved( true );
    }
  })

  const onSave = () => {
    save({
        ...meta,
        bpm :  project.timelineBox.bpm.getValue() ,
        state : arrayBufferToBase64(project.toArrayBuffer()),
        samples : project.collectSampleUUIDs().map( ( uuid ) => { return UUID.toString(uuid) })
      });
  }

  return (
    <header className={styles.header}>
      {/* TODO: must link to sessions page from front app */}
      <a className={styles.sessionsLink} href="">
        <MsnIcon name="msn" size="18px" color={theme.orange} />
        <MsnWordmark size={13} accent="var(--color-orange)" />
      </a>
      <Separator />

      <div className={styles.titleBloc}>
        {/* TODO: Make project name and project state dynamic */}
        <span className={styles.projectPill}>Project</span>
        <span className={styles.projectTitle}>{meta.name}</span>
        <span className={styles.projectState}>{ saved ? "● saved" : "unsaved" }</span>
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

      <Button onClick={onSave} loading={isPending} > Save </Button>   

    </header>
  );
}
