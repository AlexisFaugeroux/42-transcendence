import type { JSX } from 'react';
import { DropdownButton } from '@ui/components/DropdownButton/DropdownButton';

export type TrackKind = 'tape' | 'nano' | 'vaporisateur';

interface AddTrackButtonProps {
  onAddTrack: (value: TrackKind) => void;
}

const OPTIONS: { value: TrackKind; label: string }[] = [
  { label: 'Audio (Tape)', value: 'tape' },
  { label: 'Sampler (Nano)', value: 'nano' },
  { label: 'Synth (Vaporisateur)', value: 'vaporisateur' },
];

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  return <DropdownButton label="+ Add Track" options={OPTIONS} onSelect={onAddTrack} />;
}
