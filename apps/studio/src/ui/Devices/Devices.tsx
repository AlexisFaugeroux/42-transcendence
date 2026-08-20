import type { JSX } from 'react';
import styles from './Devices.module.scss';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import { useTranslation } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import { useEditedAudioUnit } from '../../hooks/useEditedAudioUnit';
import { useTracks } from '../../contexts/TracksContext';
import { useEffectChain } from '../../hooks/useEffectChain';
import type { Track } from '../../lib/types';
import { AddEffectButton } from './AddEffectButton';
import type { AudioUnitBoxAdapter } from '@opendaw/studio-adapters';

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

function EffectChain({ audioUnit }: { audioUnit: AudioUnitBoxAdapter }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.effectChain}>
      <div className={styles.effectTile}>
        <span className={styles.effectTileLabel}></span>
        <span className={styles.effectTileName}></span>
      </div>
      <AddEffectButton audioUnit={audioUnit} title={t('studio.devices.addEffect')} />
    </div>
  );
}

function EmptyEffectChain({ audioUnit }: { audioUnit: AudioUnitBoxAdapter }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.effectChain}>
      <AddEffectButton audioUnit={audioUnit} title={t('studio.devices.addEffect')} />
      <div className={styles.empty}>{t('studio.devices.noEffect')}</div>
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
          <InstrumentTile editingTrack={editingTrack} />{' '}
          <EffectChain audioUnit={editingAudioUnit} />
        </>
      ) : editingAudioUnit && editingTrack ? (
        <>
          <InstrumentTile editingTrack={editingTrack} />{' '}
          <EmptyEffectChain audioUnit={editingAudioUnit} />
        </>
      ) : (
        <NoSelectedTrack />
      )}
    </div>
  );
}
