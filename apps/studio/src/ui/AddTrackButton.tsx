import { useTranslation } from '@transcendence/i18n';
import { Dropdown, type MenuProps, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { InstrumentType } from '../lib/arrangementFactory';
import { StudioIcon } from './components/StudioIcon/StudioIcon';

interface AddTrackButtonProps {
  onAddTrack: (value: InstrumentType) => void;
}

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    { key: 'Tape', label: t('studio.addTrack.tape'), style: { fontSize: '10px' } },
    { key: 'Nano', label: t('studio.addTrack.nano'), style: { fontSize: '10px' } },
    { key: 'Vaporisateur', label: t('studio.addTrack.vaporisateur'), style: { fontSize: '10px' } },
  ];

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
        style={{
          alignItems: 'center',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          display: 'flex',
        }}
      >
        <StudioIcon name="add" size={14} color={theme.fg1} />
        <span style={{ fontSize: 10 }}> {t('studio.addTrack.label')}</span>
      </button>
    </Dropdown>
  );
}
