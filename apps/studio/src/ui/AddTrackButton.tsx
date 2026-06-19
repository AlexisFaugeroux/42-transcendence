import { Dropdown, type MenuProps } from '@transcendence/ui';
import type { JSX } from 'react';
import { theme } from '@ui/theme/theme';
import { StudioIcon } from './components/StudioIcon/StudioIcon';

export type TrackKind = 'tape' | 'nano' | 'vaporisateur';

interface AddTrackButtonProps {
  onAddTrack: (value: TrackKind) => void;
}

const items: MenuProps['items'] = [
  { key: 'tape', label: 'Audio (Tape)', style: { fontSize: '10px' } },
  { key: 'nano', label: 'Sampler (Nano)', style: { fontSize: '10px' } },
  { key: 'vaporisateur', label: 'Synth (Vaporisateur)', style: { fontSize: '10px' } },
];

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => {
          onAddTrack(key as TrackKind);
        },
      }}
      trigger={['click']}
    >
      <button
        style={{ alignItems: 'center', background: 'transparent', border: 0, cursor: 'pointer', display: 'flex' }}
      >
        <StudioIcon name="add" size={14} color={theme.fg1} />
        <span style={{ fontSize: 10 }}> Add track</span>
      </button>
    </Dropdown>
  );
}
