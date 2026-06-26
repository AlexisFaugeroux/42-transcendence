import { PPQN } from '@opendaw/lib-dsp';
import type { Project } from '@opendaw/studio-core';
import type { BarInfo } from './types';

export async function loadAudioFile(audioContext: AudioContext, url: string): Promise<AudioBuffer | undefined> {
  try {
    const fullPath = `${import.meta.env.BASE_URL}/${url}`;
    const response = await fetch(fullPath);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    // In case of browser incompatibilities, use WavFile.decodeFloats for .wav files and FFmpegWorker for other conversions
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
  } catch (error) {
    console.error(`Failed to fetch ${url}: ${error}`);
  }
}

// Read bar layout from SDK
export function computeBarsFromSDK(project: Project): BarInfo[] {
  const signatureTrack = project.timelineBoxAdapter.signatureTrack;
  const totalPpqn = project.timelineBox.durationInPulses.getValue();
  const sections = Array.from(signatureTrack.iterateAll());
  const bars: BarInfo[] = [];
  let barNumber = 1;

  for (let s = 0; s < sections.length; s++) {
    const { accumulatedPpqn: sectionStart, denominator, nominator } = sections[s];
    const sectionEnd = s + 1 < sections.length ? sections[s + 1].accumulatedPpqn : totalPpqn;
    const barDuration = PPQN.fromSignature(nominator, denominator);

    for (let pos = sectionStart; pos < sectionEnd; pos += barDuration) {
      bars.push({
        barNumber: barNumber++,
        denominator,
        durationPpqn: barDuration,
        nominator,
        startPpqn: pos,
      });
    }
  }

  return bars;
}
