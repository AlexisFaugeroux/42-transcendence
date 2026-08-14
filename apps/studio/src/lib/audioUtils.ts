import { PPQN } from '@opendaw/lib-dsp';
import type { Project } from '@opendaw/studio-core';
import { ApiErrorReponse, apiFetch } from '@transcendence/auth';
import type { BarInfo } from './types';

export async function loadAudioFile(
  audioContext: AudioContext,
  url: string,
  uuid: string,
  userId: string,
): Promise<AudioBuffer | undefined> {
  try {
    const queryString = new URLSearchParams({
      sampleId: uuid,
      userId,
    });
    // Relative path on purpose: nginx routes /samples/ to the audio server in prod
    // (infra/nginx/reverse-proxy.conf), the Vite proxy does the same in dev. Going
    // through apiFetch keeps the cookie (nginx authorizes each file via auth_request)
    // and the global logout on 401.
    const response = await apiFetch(`/samples/${url}?${queryString.toString()}`);
    if (!response.ok) throw new ApiErrorReponse();

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
