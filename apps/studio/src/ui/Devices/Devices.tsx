import { useTranslation } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import { type JSX } from 'react';
import { useTracks } from '../../contexts/TracksContext';
import { useEditedAudioUnit } from '../../hooks/useEditedAudioUnit';
import { useEffectChain } from '../../hooks/useEffectChain';
import type { Track } from '../../lib/types';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import styles from './Devices.module.scss';
import { EffectChain } from './EffectChain';

function InstrumentTile({ editingTrack }: { editingTrack: Track }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.instrumentTile}>
      <span className={styles.trackName}>{editingTrack.name}</span>
      <span className={styles.instrumentTileLabel}>{t('studio.devices.instrument')}</span>
      <StudioIcon
        name="piano"
        size={24}
        style={{ border: `1px solid ${theme.fg3}`, borderRadius: '4px' }}
      />
      <span className={styles.instrumentTileName}>{editingTrack.instrumentName}</span>
    </div>
  );
}

function NoSelectedTrack(): JSX.Element {
  const { t } = useTranslation();

  return <div className={styles.empty}>{t('studio.devices.noTrackSelected')}</div>;
}

export function Devices(): JSX.Element {
  const editingAudioUnit = useEditedAudioUnit();
  const effects = useEffectChain(editingAudioUnit);
  const { tracks } = useTracks();

  const editingTrack = tracks.find((t) => t.audioUnitBox === editingAudioUnit?.box);

  return (
    <div className={styles.devicesRail}>
      {editingAudioUnit && editingTrack && effects.length ? (
        <>
          <InstrumentTile editingTrack={editingTrack} />
          <EffectChain audioUnit={editingAudioUnit} effects={effects} />
        </>
      ) : (
        <NoSelectedTrack />
      )}
    </div>
  );
}
