import { PPQN } from '@opendaw/lib-dsp';
import type { Project } from '@opendaw/studio-core';
import { theme } from '@ui/theme/theme';
import { createClipFromBuffer, createTrack } from './arrangementFactory';
import { loadAudioFile } from './audioUtils';
import type { Clip, Track } from './types';

const { Quarter } = PPQN;

// Helper function for pattern positions
function getPatternPositions(name: string): number[] {
  const BARS = 4;

  switch (name) {
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
): Promise<{ clips: Clip[]; tracks: Track[] }> {
  // Load audio files and pair them with the corresponding audioBuffer
  const audioFiles: { name: string; url: string; color: string }[] = [
    { color: theme.fg2, name: 'Kick', url: `${import.meta.env.BASE_URL}/audio/KICK/DPV1_KICK_001.wav` },
    { color: theme.fg2, name: 'Shaker', url: `${import.meta.env.BASE_URL}/audio/SHAKER/DPV1_SHAKER_DRY_001.wav` },
  ];
  const audioPairs: { audioFile: { name: string; url: string; color: string }; audioBuffer: AudioBuffer }[] = [];
  for (const audioFile of audioFiles) {
    const audioBuffer = await loadAudioFile(audioContext, audioFile.url);
    if (!audioBuffer) continue;

    audioPairs.push({ audioBuffer, audioFile });
  }

  // Create tracks and clips
  const { api, editing } = project;
  const createdClips: Clip[] = [];
  const createdTracks: Track[] = [];

  editing.modify(() => {
    audioPairs.forEach(({ audioBuffer, audioFile }) => {
      // Create track
      const newTrack = createTrack(api, 'Tape');

      createdTracks.push(newTrack);

      const positions = getPatternPositions(audioFile.name);
      for (const position of positions) {
        const nextPos = positions.filter((p) => p > position).reduce((min, p) => Math.min(min, p), Infinity);
        const maxDuration = nextPos - position;
        const newClip = createClipFromBuffer(
          project,
          newTrack,
          audioBuffer,
          audioFile.name,
          localAudioBuffers,
          position,
          maxDuration,
        );
        createdClips.push(newClip);
      }
    });
  });

  return { clips: createdClips, tracks: createdTracks };
}
