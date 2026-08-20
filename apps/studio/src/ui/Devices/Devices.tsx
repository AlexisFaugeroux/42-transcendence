import type { JSX } from 'react';
import styles from './Devices.module.scss';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import { useTranslation } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import { useEditedAudioUnit } from '../../hooks/useEditedAudioUnit';
import { useTracks } from '../../contexts/TracksContext';
import { useEffectChain } from '../../hooks/useEffectChain';
import type { Track } from '../../lib/types';

function InstrumentTile({ editingInstrument }: { editingInstrument: Track }): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.instrumentTile}>
      <span className={styles.trackName}>{editingInstrument.name}</span>
      <span className={styles.instrumentTileLabel}>{t('studio.devices.instrument')}</span>
      <StudioIcon
        name="piano"
        size={24}
        style={{ border: `1px solid ${theme.fg3}`, borderRadius: '4px' }}
      />
      <span className={styles.instrumentTileName}>{editingInstrument.instrumentName}</span>
    </div>
  );
}

function EffectChain(): JSX.Element {
  return (
    <div className={styles.effectChain}>
      <div className={styles.effectTile}>
        <span className={styles.effectTileLabel}></span>
        <span className={styles.effectTileName}></span>
      </div>
    </div>
  );
}

function EmptyEffectChain(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.effectChain}>
      <button type="button" className={styles.add} title={t('studio.devices.addEffect')}>
        +
      </button>
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

  const editingInstrument = tracks.find((t) => t.audioUnitBox === editingAudioUnit?.box);

  return (
    <div className={styles.devicesRail}>
      {editingInstrument && effects.length ? (
        <>
          <InstrumentTile editingInstrument={editingInstrument} /> <EffectChain />
        </>
      ) : editingInstrument ? (
        <>
          <InstrumentTile editingInstrument={editingInstrument} /> <EmptyEffectChain />
        </>
      ) : (
        <NoSelectedTrack />
      )}
    </div>
  );
}
