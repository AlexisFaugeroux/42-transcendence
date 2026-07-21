<<<<<<< HEAD
import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import { IconBtn, MsnIcon, MsnWordmark, Separator, theme } from '@transcendence/ui';
import type { JSX } from 'react';
=======
import { useEffect, useState, type JSX } from 'react';
import { IconBtn } from '@ui/components/IconBtn/IconBtn';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import { Separator } from '@ui/components/Separator/Separator';
import { theme } from '@ui/theme/theme';
>>>>>>> adfd560 (feat(studio/back) : #94 simple_save_from_studio)
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import styles from './Header.module.scss';
import { Meter } from './Meter/Meter';
import { Metrics } from './Metrics/Metrics';
import { Transport } from './Transport/Transport';
import { Button } from '@ui/index';
import { useMutation } from '@tanstack/react-query';
import { saveProject } from '../../api/project';
import { useProject } from '../../contexts/ProjectContext';

export function Header(): JSX.Element {
<<<<<<< HEAD
  const { t } = useTranslation();
=======
  const [saved, setSaved] = useState( true );
  const { project, meta, localAudioBuffers } = useProject();

  const { isPending, mutate : save } = useMutation({
    mutationFn : saveProject,
    onSuccess : () => {
      setSaved( true );
    }
  })

  // useEffect(() => {
  //   setSaved( false )
  // }, [project, meta, localAudioBuffers.size]);


  const onSave = () => {
    const decoder = new TextDecoder();

    save({
        ...meta,
        bpm :  project.timelineBox.bpm.getValue() ,
        state : decoder.decode( project.boxGraph.toArrayBuffer() ),
        samples : [ ...localAudioBuffers.keys() ]
      });
  }
>>>>>>> adfd560 (feat(studio/back) : #94 simple_save_from_studio)

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
<<<<<<< HEAD
        <span className={styles.projectPill}>{t('studio.header.project')}</span>
        <span className={styles.projectTitle}>Pipi caca prout</span>
        <span className={styles.projectState}>● {t('studio.header.saved')}</span>
=======
        <span className={styles.projectPill}>Project</span>
        <span className={styles.projectTitle}>{meta.name}</span>
        <span className={styles.projectState}>{ saved ? "● saved" : "unsaved" }</span>
>>>>>>> adfd560 (feat(studio/back) : #94 simple_save_from_studio)
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
<<<<<<< HEAD
      <Separator />

      <LanguageSelect compact />
=======
      <Separator/>

      {/* disable={save} */}
      <Button onClick={onSave} loading={isPending} > Save </Button>   

>>>>>>> adfd560 (feat(studio/back) : #94 simple_save_from_studio)
    </header>
  );
}
