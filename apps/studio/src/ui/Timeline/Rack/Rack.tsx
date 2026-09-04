import { AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { useTranslation } from '@transcendence/i18n';
import { Dropdown, IconBtn, Input, MsnKnob, MsnPill, theme } from '@transcendence/ui';
import { type JSX, useRef, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { useTracks } from '../../../contexts/TracksContext';
import type { Track } from '../../../lib/types';
import { StudioIcon } from '../../components/StudioIcon/StudioIcon';
import styles from './Rack.module.scss';

interface RackProps {
  track: Track;
}

export function Rack({ track }: RackProps): JSX.Element {
  const { project } = useProject();
  const { setTracks, tracks, setClips } = useTracks();
  const [isRenaming, setIsRenaming] = useState(false);
  const [draftName, setDraftName] = useState(() => track.name);
  const escapedRef = useRef(false);
  const { t } = useTranslation();

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

  function handleRenameTrack() {
    setIsRenaming(false);

    const name = draftName.trim();
    const cancelled = escapedRef.current;
    escapedRef.current = false;
    if (cancelled || !name || name === track.name) return;

    project.editing.modify(() => {
      adapter.input.label = name;
    });

    setTracks((prev) =>
      prev.map((t) => (t.audioUnitBox === track.audioUnitBox ? { ...t, name } : t)),
    );
    setClips((prev) =>
      prev.map((c) => (c.trackBox === track.trackBox ? { ...c, trackName: name } : c)),
    );
  }

  function handleDeleteTrack() {
    const remainingTracks = tracks.filter((curr) => curr.uuid !== track.uuid);
    setTracks(remainingTracks);

    project.editing.modify(() => {
      project.api.deleteAudioUnit(track.audioUnitBox);
    });
  }

  return (
    <div
      className={styles.container}
      onClick={() => {
        project.userEditingManager.audioUnit.edit(track.audioUnitBox.editing);
      }}
    >
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
          {isRenaming ? (
            <Input
              className={styles.nameInput}
              value={draftName}
              onChange={(e) => {
                setDraftName(e.target.value);
              }}
              onBlur={handleRenameTrack}
              onKeyDown={(e) => {
                if (e.key === 'Escape') escapedRef.current = true;
                if (e.key === 'Enter' || e.key === 'Escape') e.currentTarget.blur();
              }}
            />
          ) : (
            <div
              className={styles.name}
              onDoubleClick={() => {
                setDraftName(track.name);
                setIsRenaming(true);
              }}
            >
              {track.name}
            </div>
          )}
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
        <Dropdown
          menu={{
            items: [
              {
                icon: (
                  <StudioIcon
                    name="pencil"
                    color={theme.fg1}
                    size={10}
                    style={{
                      marginRight: '4px',
                    }}
                  />
                ),
                key: 'rename',
                label: t('common.rename'),
                style: {
                  fontSize: '10px',
                },
              },
              {
                icon: (
                  <StudioIcon
                    name="delete"
                    color={theme.red}
                    size={10}
                    style={{
                      marginRight: '4px',
                    }}
                  />
                ),
                key: 'delete',
                label: t('common.delete'),
                style: {
                  fontSize: '10px',
                },
              },
            ],
            onClick: ({ key }) => {
              if (key === 'delete') handleDeleteTrack();
              else if (key === 'rename') {
                setDraftName(track.name);
                setIsRenaming(true);
              }
            },
          }}
          trigger={['click']}
        >
          <button className={styles.dropdownButton}>
            <StudioIcon name="moreV" size={16} color={theme.orange} />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
