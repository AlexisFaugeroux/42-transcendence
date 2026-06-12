import { type JSX, useEffect, useState } from 'react';
import { IconBtn } from '@ui/components/IconBtn/IconBtn';
import { theme } from '@ui/theme/theme';
import { useProject } from '../../../contexts/ProjectContext';
import { StudioIcon } from '../../components/StudioIcon/StudioIcon';
import styles from './Transport.module.scss';

export function Transport(): JSX.Element {
  const { audioContext, project } = useProject();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const sub = project.engine.isPlaying.catchupAndSubscribe((obs) => {
      setIsPlaying(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.engine.isPlaying]);

  /* TODO: link rec and loop buttons to audio engine */
  return (
    <div className={styles.transportContainer}>
      <IconBtn
        color={theme.red}
        background={isPlaying ? `color-mix(in srgb, ${theme.red} 18%, ${theme.void}` : theme.void}
        borderColor={isPlaying ? theme.red : theme.lineSoft}
        boxShadow={isPlaying ? `0 0 8px -3px ${theme.red}` : 'none'}
        onClick={() => {
          console.log('rec-prout');
        }}
      >
        <StudioIcon name="rec" size={18} />
      </IconBtn>
      <IconBtn
        color={theme.green}
        background={isPlaying ? `color-mix(in srgb, ${theme.green} 18%, ${theme.void}` : theme.void}
        borderColor={isPlaying ? theme.green : theme.lineSoft}
        boxShadow={isPlaying ? `0 0 8px -3px ${theme.green}` : 'none'}
        onClick={() => {
          if (audioContext.state === 'suspended') {
            void audioContext.resume();
          }

          project.engine.play();
        }}
      >
        <StudioIcon name="play" size={18} />
      </IconBtn>
      <IconBtn
        color={theme.fg1}
        background={isPlaying ? `color-mix(in srgb, ${theme.fg1} 18%, ${theme.void}` : theme.void}
        borderColor={isPlaying ? theme.fg1 : theme.lineSoft}
        boxShadow={isPlaying ? `0 0 8px -3px ${theme.fg1}` : 'none'}
        onClick={() => {
          project.engine.stop(true);
        }}
      >
        <StudioIcon name="stop" size={18} />
      </IconBtn>
      <IconBtn
        color={theme.orange}
        background={isPlaying ? `color-mix(in srgb, ${theme.orange} 18%, ${theme.void}` : theme.void}
        borderColor={isPlaying ? theme.orange : theme.lineSoft}
        boxShadow={isPlaying ? `0 0 8px -3px ${theme.orange}` : 'none'}
        onClick={() => {
          console.log('rec-prout');
        }}
      >
        <StudioIcon name="loop" size={18} />
      </IconBtn>
    </div>
  );
}
