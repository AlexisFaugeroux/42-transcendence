import type { JSX } from 'react';
import { DropdownButton } from '@ui/components/DropdownButton/DropdownButton';

export type TrackKind = 'tape' | 'nano' | 'vaporisateur';

interface AddTrackButtonProps {
  onAddTrack: (value: TrackKind) => void;
}

const OPTIONS: { value: TrackKind; label: string }[] = [
  { value: 'tape', label: 'Audio (Tape)' },
  { value: 'nano', label: 'Sampler (Nano)' },
  { value: 'vaporisateur', label: 'Synth (Vaporisateur)' },
];

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  return <DropdownButton label="+ Add Track" options={OPTIONS} onSelect={onAddTrack} />;
}
