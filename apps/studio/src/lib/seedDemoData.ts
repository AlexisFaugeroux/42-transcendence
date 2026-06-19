import { PPQN } from '@opendaw/lib-dsp';
import { UUID } from '@opendaw/lib-std';
import { InstrumentFactories } from '@opendaw/studio-adapters';
import { AudioFileBox, AudioRegionBox, ValueEventCollectionBox } from '@opendaw/studio-boxes';
import type { Project } from '@opendaw/studio-core';
import type { Track } from '../App';
import { loadAudioFile } from './audioUtils';
import type { Clip } from './types';

const { Quarter } = PPQN;

// Helper function for pattern positions
function getPatternPositions(instrumentName: string): number[] {
  const BARS = 4;

  switch (instrumentName) {
    case 'Kick':
      // On every beat
      return Array.from({ length: BARS * 4 }, (_, i) => i * Quarter);
    case 'Shaker':
      // Beats 1 and 3 of each bar
      return Array.from({ length: BARS * 4 }, (_, i) => i * Quarter + Quarter / 2);
    default:
      return [];
  }
}

export async function seedDemoData(
  project: Project,
  audioContext: AudioContext,
  localAudioBuffers: Map<string, AudioBuffer>,
  bpm: number,
): Promise<{ clips: Clip[]; tracks: Track[] }> {
  // Load audio files and pair them with the corresponding audioBuffer
  const audioFiles: { name: string; url: string; color: string }[] = [
    { color: '#ef4444', name: 'Kick', url: `${import.meta.env.BASE_URL}/audio/KICK/DPV1_KICK_001.wav` },
    { color: '#ef4', name: 'Shaker', url: `${import.meta.env.BASE_URL}/audio/SHAKER/DPV1_SHAKER_DRY_001.wav` },
  ];
  const audioPairs: { audioFile: { name: string; url: string; color: string }; audioBuffer: AudioBuffer }[] = [];
  for (const audioFile of audioFiles) {
    const audioBuffer = await loadAudioFile(audioContext, audioFile.url);
    if (!audioBuffer) continue;

    audioPairs.push({ audioBuffer, audioFile });
  }

  // Create tracks and clips
  const { api, boxGraph, editing } = project;
  const createdClips: Clip[] = [];
  const createdTracks: Track[] = [];

  editing.modify(() => {
    audioPairs.forEach(({ audioBuffer, audioFile }) => {
      // Create track
      const { audioUnitBox, instrumentBox, trackBox } = api.createInstrument(InstrumentFactories.Tape);

      audioUnitBox.volume.setValue(0);
      instrumentBox.label.setValue(audioFile.name);

      createdTracks.push({
        audioUnitBox, // mixer channel
        color: audioFile.color,
        instrumentName: 'Tape',
        name: audioFile.name,
        trackBox, // actual engine counterpart of UI Track
        uuid: trackBox.address.uuid,
      });

      // Create AudioFileBox
      const fileUUID = UUID.generate();

      localAudioBuffers.set(UUID.toString(fileUUID), audioBuffer);

      const audioFileBox = AudioFileBox.create(boxGraph, fileUUID, (box) => {
        box.fileName.setValue(audioFile.name);
        box.endInSeconds.setValue(audioBuffer.duration);
      });

      // Create clips based on pattern
      const positions = getPatternPositions(audioFile.name);
      const gap = positions.length > 1 ? positions[1] - positions[0] : Infinity; // Prevents overlapping audio clips
      positions.forEach((position) => {
        const clipDuration = Math.min(Math.round(PPQN.secondsToPulses(audioBuffer.duration, bpm)), gap);

        // Create events collection
        const eventsCollectionBox = ValueEventCollectionBox.create(boxGraph, UUID.generate());

        const regionBox = AudioRegionBox.create(boxGraph, UUID.generate(), (box) => {
          box.regions.refer(trackBox.regions);
          box.file.refer(audioFileBox);
          box.events.refer(eventsCollectionBox.owners);
          box.position.setValue(position);
          box.duration.setValue(clipDuration);
          box.loopOffset.setValue(0);
          box.loopDuration.setValue(clipDuration);
          box.label.setValue(audioFile.name);
          box.mute.setValue(false);
        });

        createdClips.push({
          audioDuration: PPQN.pulsesToSeconds(clipDuration, bpm),
          audioFileBox,
          color: audioFile.color,
          duration: clipDuration,
          gap,
          label: audioFile.name,
          position,
          eventsCollectionBox,
          regionBox,
          trackName: audioFile.name,
          trackBox,
        });
      });
    });
  });

  return { clips: createdClips, tracks: createdTracks };
}
