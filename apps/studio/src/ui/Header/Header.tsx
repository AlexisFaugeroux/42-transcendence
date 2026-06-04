import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import { Separator } from '@ui/components/Separator/Separator';
import { IconBtn } from '@ui/components/IconBtn/IconBtn';
import { StudioIcon } from '../StudioIcon/StudioIcon';
import { MsnPeakMeter } from '@ui/components/MsnPeakMeter/MsnPeakMeter';
import { theme } from '@ui/theme/theme';
import styles from './Header.module.scss';
import { Transport } from './Transport/Transport';
import { Metrics } from './Metrics/Metrics';

interface HeaderProps {
  handleBpmChange: (newBpm: number) => void;
}

export function Header({ handleBpmChange }: HeaderProps): JSX.Element {
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

      <Metrics handleBpmChange={handleBpmChange} />
      <Separator />

      <div className={styles.peakMeter}>
        <div className={styles.peakMeterDisplayValue}>MASTER -2.6 db</div>
        <MsnPeakMeter layout="horizontal" l={0.62} r={0.55} width={120} />
      </div>
    </header>
  );
}
