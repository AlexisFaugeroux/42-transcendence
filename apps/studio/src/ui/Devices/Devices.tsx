import type { AudioEffectDeviceAdapter, AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { useTranslation } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { useTracks } from '../../contexts/TracksContext';
import { useEditedAudioUnit } from '../../hooks/useEditedAudioUnit';
import { useEffectChain } from '../../hooks/useEffectChain';
import type { Track } from '../../lib/types';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import { AddEffectButton } from './AddEffectButton';
import { DeviceEditor } from './DeviceEditor';
import styles from './Devices.module.scss';
import { findEffectEntry } from './effectFactories';

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

function EffectChain({
  audioUnit,
  effects,
}: {
  audioUnit: AudioUnitBoxAdapter;
  effects: readonly AudioEffectDeviceAdapter[];
}): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.effectChain}>
      {effects.map((effect) => {
        const entry = findEffectEntry(effect);
        if (!entry) return null;
        return (
          <DeviceEditor
            audioUnit={audioUnit}
            key={effect.uuid.toString()}
            effect={effect}
            entry={entry}
          />
        );
      })}
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
          <InstrumentTile editingTrack={editingTrack} />
          <EffectChain audioUnit={editingAudioUnit} effects={effects} />
        </>
      ) : editingAudioUnit && editingTrack ? (
        <>
          <InstrumentTile editingTrack={editingTrack} />
          <EmptyEffectChain audioUnit={editingAudioUnit} />
        </>
      ) : (
        <NoSelectedTrack />
      )}
    </div>
  );
}
