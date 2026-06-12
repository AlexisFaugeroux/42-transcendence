import type { JSX, ReactNode } from 'react';
import { DropdownButton } from '@ui/components/DropdownButton/DropdownButton';
import { theme } from '@ui/theme/theme';
import { StudioIcon } from './components/StudioIcon/StudioIcon';

export type TrackKind = 'tape' | 'nano' | 'vaporisateur';

interface AddTrackButtonProps {
  onAddTrack: (value: TrackKind) => void;
}

const OPTIONS: { value: TrackKind; label: string | ReactNode }[] = [
  { label: 'Audio (Tape)', value: 'tape' },
  { label: 'Sampler (Nano)', value: 'nano' },
  { label: 'Synth (Vaporisateur)', value: 'vaporisateur' },
];

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  return (
    <DropdownButton
      label="Add Track"
      icon={
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <StudioIcon name="add" size={14} color={theme.fg1} />
          <span style={{ fontSize: 10 }}> Add track</span>
        </div>
      }
      options={OPTIONS}
      onSelect={onAddTrack}
    />
  );
}
