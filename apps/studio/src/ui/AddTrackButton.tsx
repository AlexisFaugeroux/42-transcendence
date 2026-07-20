import { Dropdown, type MenuProps, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { InstrumentType } from '../lib/arrangementFactory';
import { StudioIcon } from './components/StudioIcon/StudioIcon';

interface AddTrackButtonProps {
  onAddTrack: (value: InstrumentType) => void;
}

const items: MenuProps['items'] = [
  { key: 'Tape', label: 'Audio (Tape)', style: { fontSize: '10px' } },
  { key: 'Nano', label: 'Sampler (Nano)', style: { fontSize: '10px' } },
  { key: 'Vaporisateur', label: 'Synth (Vaporisateur)', style: { fontSize: '10px' } },
];

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => {
          onAddTrack(key as InstrumentType);
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
