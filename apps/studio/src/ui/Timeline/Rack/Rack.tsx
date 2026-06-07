import { AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { type JSX, useState } from 'react';
import { DropdownButton } from '@ui/components/DropdownButton/DropdownButton';
import { IconBtn } from '@ui/components/IconBtn/IconBtn';
import { MsnKnob } from '@ui/components/MsnKnob/MsnKnob';
import { MsnPill } from '@ui/components/MsnPill/MsnPill';
import { theme } from '@ui/theme/theme';
import type { Track } from '../../../App';
import { useProject } from '../../../contexts/ProjectContext';
import { useTracks } from '../../../contexts/TracksContext';
import { StudioIcon } from '../../StudioIcon/StudioIcon';
import styles from './Rack.module.scss';

interface RackProps {
  track: Track;
}

export function Rack({ track }: RackProps): JSX.Element {
  const { project } = useProject();
  const { setTracks, tracks } = useTracks();

  const adapter = project.boxAdapters.adapterFor(track.audioUnitBox, AudioUnitBoxAdapter);
  const volumeParam = adapter.namedParameter.volume;
  const panningParam = adapter.namedParameter.panning;
  const muteParam = adapter.namedParameter.mute;
  const soloParam = adapter.namedParameter.solo;

  const [volume, setVolume] = useState(() => volumeParam.getUnitValue());
  const [panning, setPanning] = useState(() => panningParam.getUnitValue());
  const [isMute, setIsMute] = useState(() => muteParam.getValue());
  const [isSolo, setIsSolo] = useState(() => muteParam.getValue());

  function handleVolumeChange(value: number) {
    project.editing.modify(() => {
      volumeParam.setUnitValue(value);
    }, false);

    setVolume(value);
  }

  function handleVolumeChangeEnd() {
    project.editing.mark();
  }

  function handlePanningChange(value: number) {
    project.editing.modify(() => {
      panningParam.setUnitValue(value);
    }, false);

    setPanning(value);
  }

  function handlePanningChangeEnd() {
    project.editing.mark();
  }

  function handleMuteClick() {
    project.editing.modify(() => {
      muteParam.setValue(!muteParam.getUnitValue());
    });

    setIsMute(!isMute);
  }

  function handleSoloClick() {
    project.editing.modify(() => {
      soloParam.setValue(!soloParam.getUnitValue());
    });

    setIsSolo(!isSolo);
  }

  function handleDeleteTrack() {
    const remainingTracks = tracks.filter((curr) => curr.uuid !== track.uuid);
    setTracks(remainingTracks);

    project.editing.modify(() => {
      project.api.deleteAudioUnit(track.audioUnitBox);
    });
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <IconBtn
          color={track.color}
          height={28}
          width={28}
          background={`color-mix(in srgb, ${track.color} 16%, ${theme.void}`}
          borderColor={`color-mix(in srgb, ${track.color} 50%)`}
          borderRadius={3}
          borderStyle="solid"
          borderWidth={0.5}
        >
          <StudioIcon name="piano" size={14} color={track.color} />
        </IconBtn>
        <div className={styles.labels}>
          <div className={styles.name}>{track.name}</div>
          <div className={styles.instrument}>{track.instrumentName}</div>
        </div>
      </div>
      {/* Knobs */}
      <div className={styles.knobs}>
        <MsnKnob
          anchor={0}
          value={volume}
          onChange={handleVolumeChange}
          onChangeEnd={handleVolumeChangeEnd}
          color={track.color}
        />
        <MsnKnob
          anchor={0.5}
          value={panning}
          onChange={handlePanningChange}
          onChangeEnd={handlePanningChangeEnd}
          color={track.color}
        />

        <MsnPill label="M" active={isMute} onClick={handleMuteClick} color={theme.yellow} />
        <MsnPill label="S" active={isSolo} onClick={handleSoloClick} color={theme.red} />
        {/* <MsnPill dot active={false} color={theme.orange} /> */}
        <DropdownButton
          className={styles.dropdownButton}
          label="menu"
          icon={<StudioIcon name="moreV" size={16} color={theme.orange} />}
          options={[
            {
              label: (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 6,
                  }}
                >
                  <StudioIcon name="delete" color={theme.red} size={12} />
                  <span>Delete</span>
                </div>
              ),
              value: 'delete',
            },
          ]}
          onSelect={handleDeleteTrack}
        ></DropdownButton>
      </div>
    </div>
  );
}
