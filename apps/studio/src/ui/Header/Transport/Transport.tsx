import { useTranslation } from '@transcendence/i18n';
import { IconBtn, theme } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { StudioIcon } from '../../components/StudioIcon/StudioIcon';
import styles from './Transport.module.scss';

export function Transport(): JSX.Element {
  const { audioContext, project } = useProject();
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(() => project.timelineBox.loopArea.enabled.getValue());

  useEffect(() => {
    const sub = project.engine.isPlaying.catchupAndSubscribe((obs) => {
      setIsPlaying(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.engine.isPlaying]);

  useEffect(() => {
    const sub = project.timelineBox.loopArea.enabled.catchupAndSubscribe((obs) => {
      setIsLooping(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.loopArea.enabled]);

  return (
    <div className={styles.transportContainer}>
      <IconBtn
        title={t('studio.transport.play')}
        color={theme.green}
        background={
          isPlaying ? `color-mix(in srgb, ${theme.green} 18%, ${theme.void})` : theme.void
        }
        borderColor={isPlaying ? theme.green : theme.lineSoft}
        borderWidth={0.5}
        borderStyle="solid"
        borderRadius={3}
        width={26}
        height={26}
        onClick={() => {
          if (audioContext.state === 'suspended') {
            void audioContext.resume();
          }
          project.engine.play();
        }}
      >
        <StudioIcon name="play" size={14} />
      </IconBtn>
      <IconBtn
        title={t('studio.transport.stop')}
        color={theme.fg1}
        background={isPlaying ? `color-mix(in srgb, ${theme.fg1} 18%, ${theme.void})` : theme.void}
        borderColor={isPlaying ? theme.fg1 : theme.lineSoft}
        borderWidth={0.5}
        borderStyle="solid"
        borderRadius={3}
        width={26}
        height={26}
        onClick={() => {
          project.engine.stop(true);
        }}
      >
        <StudioIcon name="stop" size={14} />
      </IconBtn>
      <IconBtn
        title={t('studio.transport.loop')}
        color={theme.orange}
        background={
          isLooping ? `color-mix(in srgb, ${theme.orange} 18%, ${theme.void})` : theme.void
        }
        borderColor={isLooping ? theme.orange : theme.lineSoft}
        borderWidth={0.5}
        borderStyle="solid"
        borderRadius={3}
        width={26}
        height={26}
        onClick={() => {
          project.editing.modify(() => {
            project.timelineBox.loopArea.enabled.setValue(!isLooping);
          });
        }}
      >
        <StudioIcon name="loop" size={14} />
      </IconBtn>
    </div>
  );
}
