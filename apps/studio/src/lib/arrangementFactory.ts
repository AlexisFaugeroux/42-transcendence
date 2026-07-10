import { PPQN } from '@opendaw/lib-dsp';
import { UUID } from '@opendaw/lib-std';
import { InstrumentFactories, type InstrumentFactory } from '@opendaw/studio-adapters';
import { AudioFileBox, AudioRegionBox, ValueEventCollectionBox } from '@opendaw/studio-boxes';
import type { Project, ProjectApi } from '@opendaw/studio-core';
import { theme } from '@ui/theme/theme';
import { loadAudioFile } from './audioUtils';
import type { Clip, Track } from './types';

export type InstrumentType = 'Tape' | 'Nano' | 'Vaporisateur';

export function maxDurationAt(position: number, clips: Clip[], track: Track) {
  return clips
    .filter((clip) => track.trackBox === clip.trackBox && clip.position > position)
    .reduce((min, clip) => Math.min(min, clip.position - position), Infinity);
}

export function createTrack(api: ProjectApi, instrument: InstrumentType, name?: string): Track {
  let deviceBox: InstrumentFactory;
  switch (instrument) {
    case 'Tape':
      deviceBox = InstrumentFactories.Tape;
      break;
    case 'Nano':
      deviceBox = InstrumentFactories.Nano;
      break;
    case 'Vaporisateur':
      deviceBox = InstrumentFactories.Vaporisateur;
      break;
  }
  const { audioUnitBox, instrumentBox, trackBox } = api.createInstrument(deviceBox);

  audioUnitBox.volume.setValue(0);
  instrumentBox.label.setValue(instrument);

  return {
    audioUnitBox,
    color: theme.fg2,
    instrumentName: instrument,
    name: name ?? instrument,
    trackBox,
    uuid: trackBox.address.uuid,
  };
}

export function createClipFromBuffer(
  project: Project,
  track: Track,
  audioBuffer: AudioBuffer,
  name: string,
  localAudioBuffers: Map<string, AudioBuffer>,
  position: number,
  maxDuration: number,
  audioFileUUID : string,
): Clip {
  const { boxGraph } = project;

  localAudioBuffers.set(audioFileUUID, audioBuffer);
  const audioFileBox = AudioFileBox.create(boxGraph, UUID.parse(audioFileUUID), (box) => {
    box.fileName.setValue(name);
    box.endInSeconds.setValue(audioBuffer.duration);
  });

  const fullDuration = Math.round(PPQN.secondsToPulses(audioBuffer.duration, project.engine.bpm.getValue()));
  const clipDuration = Math.min(fullDuration, maxDuration);

  // Create events collection - holds events values for a regionBox such as automation values
  const eventsCollectionBox = ValueEventCollectionBox.create(boxGraph, UUID.generate());

  const regionBox = AudioRegionBox.create(boxGraph, UUID.generate(), (box) => {
    box.regions.refer(track.trackBox.regions);
    box.file.refer(audioFileBox);
    box.events.refer(eventsCollectionBox.owners);
    box.position.setValue(position);
    box.duration.setValue(clipDuration);
    box.loopOffset.setValue(0);
    box.loopDuration.setValue(clipDuration);
    box.label.setValue(name);
    box.mute.setValue(false);
  });

  return {
    audioDuration: PPQN.pulsesToSeconds(clipDuration, project.engine.bpm.getValue()),
    audioFileBox,
    color: theme.fg2,
    duration: clipDuration,
    eventsCollectionBox,
    label: track.name,
    position,
    regionBox,
    trackBox: track.trackBox,
    trackName: track.name,
  };
}

export async function createClip(
  audioContext: AudioContext,
  project: Project,
  track: Track,
  url: string,
  localAudioBuffers: Map<string, AudioBuffer>,
  position: number,
  existingClips: Clip[],
  audioFileUUID: string
): Promise<{ createdClip: Clip | null; truncatedClip: Clip | null } | null> {
  const audioBuffer = await loadAudioFile(audioContext, url, audioFileUUID);
  if (!audioBuffer) return null;

  if (existingClips.find((clip) => track.trackBox === clip.trackBox && clip.position === position)) return null;

  const SNAP = PPQN.Quarter / 4;
  const MIN_DURATION = SNAP;

  const clipToTruncate = existingClips.find(
    (clip) => clip.trackBox === track.trackBox && clip.position < position && clip.position + clip.duration > position,
  );

  let truncatedNewDuration = 0;
  if (clipToTruncate) {
    truncatedNewDuration = position - clipToTruncate.position;
    if (truncatedNewDuration < MIN_DURATION) return null;
  }

  const maxDuration = maxDurationAt(position, existingClips, track);
  if (maxDuration < MIN_DURATION) return null;

  let newClip: Clip | null = null;
  project.editing.modify(() => {
    newClip = createClipFromBuffer(project, track, audioBuffer, track.name, localAudioBuffers, position, maxDuration, audioFileUUID);

    if (clipToTruncate) {
      clipToTruncate.regionBox.duration.setValue(truncatedNewDuration);
      clipToTruncate.regionBox.loopDuration.setValue(truncatedNewDuration);
    }
  });

  return {
    createdClip: newClip,
    truncatedClip: clipToTruncate ? { ...clipToTruncate, duration: truncatedNewDuration } : null,
  };
}
