import type { JSX } from 'react';
import { IconBtn } from '@ui/components/IconBtn/IconBtn';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnPeakMeter } from '@ui/components/MsnPeakMeter/MsnPeakMeter';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import { Separator } from '@ui/components/Separator/Separator';
import { theme } from '@ui/theme/theme';
import { StudioIcon } from '../StudioIcon/StudioIcon';
import styles from './Header.module.scss';
import { Metrics } from './Metrics/Metrics';
import { Transport } from './Transport/Transport';

export function Header(): JSX.Element {
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
        <span className={styles.projectTitle}>Pipi caca prout</span>
        <span className={styles.projectState}>● saved</span>
      </div>
      <Separator />

      {/* TODO: implement undo/redo mechanic */}
      <div>
        <IconBtn
          title="Undo"
          onClick={() => {
            console.log('un-prout');
          }}
        >
          <StudioIcon name="undo" size={14} />
        </IconBtn>
        <IconBtn
          title="Redo"
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

      <div className={styles.peakMeter}>
        <div className={styles.peakMeterDisplayValue}>MASTER -2.6 db</div>
        <MsnPeakMeter layout="horizontal" l={0.62} r={0.55} width={120} />
      </div>
    </header>
  );
}
