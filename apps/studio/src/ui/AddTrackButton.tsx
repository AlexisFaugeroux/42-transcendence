import { useTranslation } from '@transcendence/i18n';
import { Dropdown, type MenuProps, theme, Tooltip } from '@transcendence/ui';
import type { JSX } from 'react';
import type { InstrumentType } from '../lib/arrangementFactory';
import { StudioIcon } from './components/StudioIcon/StudioIcon';

function UnavailableLabel({ label }: { label: string }): JSX.Element {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('common.availableSoon')} placement="right">
      <span style={{ alignItems: 'center', display: 'flex', gap: '6px' }}>
        {label}
        <StudioIcon name="forbidden" size={10} />
      </span>
    </Tooltip>
  );
}

interface AddTrackButtonProps {
  onAddTrack: (value: InstrumentType) => void;
}

export function AddTrackButton({ onAddTrack }: AddTrackButtonProps): JSX.Element {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    { key: 'Tape', label: t('studio.addTrack.tape'), style: { fontSize: '10px' } },
    {
      key: 'Nano',
      label: <UnavailableLabel label={t('studio.addTrack.nano')} />,
      disabled: true,
      style: { fontSize: '10px' },
    },
    {
      key: 'Vaporisateur',
      label: <UnavailableLabel label={t('studio.addTrack.vaporisateur')} />,
      disabled: true,
      style: { fontSize: '10px' },
    },
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
