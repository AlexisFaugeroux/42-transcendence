import { AnimationFrame } from '@opendaw/lib-dom';
import { AudioData } from '@opendaw/lib-dsp';
import { Promises } from '@opendaw/lib-runtime';
import type { Progress } from '@opendaw/lib-std';
import { assert, requireProperty, UUID } from '@opendaw/lib-std';
import type { SampleMetaData, SoundfontMetaData } from '@opendaw/studio-adapters';
import type { SoundfontService } from '@opendaw/studio-core';
import {
  AudioWorklets,
  GlobalSampleLoaderManager,
  GlobalSoundfontLoaderManager,
  OfflineEngineRenderer,
  OpenSoundfontAPI,
  Project,
  type SampleProvider,
  SampleService,
  SampleStorage,
  type SoundfontProvider,
  Workers,
} from '@opendaw/studio-core';
import OfflineEngineUrl from '@opendaw/studio-core/offline-engine.js?worker&url';
import WorkletsUrl from '@opendaw/studio-core/processors.js?url';
import WorkersUrl from '@opendaw/studio-core/workers-main.js?worker&url';

function testFeatures() {
  requireProperty(Promise, 'withResolvers');
  requireProperty(window, 'indexedDB');
  requireProperty(window, 'AudioWorkletNode');
  requireProperty(navigator, 'storage');
  requireProperty(navigator.storage, 'getDirectory');
  requireProperty(crypto, 'randomUUID');
  requireProperty(crypto, 'subtle');
  requireProperty(crypto.subtle, 'digest');
}

/**
 * Convert a browser AudioBuffer to OpenDAW's AudioData format.
 * AudioData uses SharedArrayBuffer for efficient cross-thread communication.
 */
function audioBufferToAudioData(audioBuffer: AudioBuffer): AudioData {
  const { length: numberOfFrames, numberOfChannels, sampleRate } = audioBuffer;

  // Use AudioData.create which properly allocates SharedArrayBuffer
  const audioData = AudioData.create(sampleRate, numberOfFrames, numberOfChannels);

  // Copy channel data from browser AudioBuffer to AudioData frames
  for (let channel = 0; channel < numberOfChannels; channel++) {
    audioData.frames[channel].set(audioBuffer.getChannelData(channel));
  }

  return audioData;
}

export interface ProjectSetupOptions {
  /**
   * Map of local audio buffers for sample loading.
   * Key: UUID string, Value: AudioBuffer
   */
  localAudioBuffers?: Map<string, AudioBuffer>;
  /**
   * Optional custom BPM for the project (default: 120)
   */
  bpm?: number;
  /**
   * Optional status update callback for progress messages
   */
  onStatusUpdate?: (status: string) => void;
}

export interface ProjectSetupResult {
  project: Project;
  audioContext: AudioContext;
}

let _initPromise: Promise<ProjectSetupResult> | null = null;

export function initializeOpenDaw(options: ProjectSetupOptions = {}): Promise<ProjectSetupResult> {
  _initPromise ??= _doInitializeOpenDaw(options);
  return _initPromise;
}

/**
 * Initialize OpenDAW with all required setup steps.
 * This includes:
 * - AnimationFrame initialization (required for observables)
 * - Workers and Worklets installation
 * - Feature testing
 * - AudioContext creation
 * - Sample and soundfont manager setup
 * - Project creation and engine initialization
 *
 * @param options - Optional configuration for custom sample loading and BPM
 * @returns Promise resolving to initialized Project and AudioContext
 * @throws Error if initialization fails or features are not supported
 */
export async function _doInitializeOpenDaw(options: ProjectSetupOptions = {}): Promise<ProjectSetupResult> {
  const { bpm, localAudioBuffers, onStatusUpdate } = options;

  console.log('========================================');
  console.log('openDAW -> headless -> initializing');
  console.log('WorkersUrl', WorkersUrl);
  console.log('WorkletsUrl', WorkletsUrl);
  console.log('crossOriginIsolated:', crossOriginIsolated);
  console.log('SharedArrayBuffer available:', typeof SharedArrayBuffer !== 'undefined');
  console.log('========================================');

  // CRITICAL: Ensure cross-origin isolation is enabled
  assert(crossOriginIsolated, 'window must be crossOriginIsolated');

  // CRITICAL: Start the AnimationFrame loop for observable updates
  console.debug('Starting AnimationFrame loop...');
  AnimationFrame.start(window);
  console.debug('AnimationFrame started!');

  onStatusUpdate?.('Booting...');

  // Install workers and worklets
  await Workers.install(WorkersUrl);
  AudioWorklets.install(WorkletsUrl);
  OfflineEngineRenderer.install(OfflineEngineUrl);

  // Test browser features
  const { error, status } = await Promises.tryCatch(
    new Promise<void>((resolve) => {
      testFeatures();
      resolve();
    }),
  );
  if (status === 'rejected') {
    throw new Error(`Could not test features: ${error}`);
  }

  // Create AudioContext
  const audioContext = new AudioContext({ latencyHint: 0 });
  console.debug(`AudioContext state: ${audioContext.state}, sampleRate: ${audioContext.sampleRate}`);

  onStatusUpdate?.('Installing audio worklets...');

  // Create audio worklets
  const { error: workletError, status: workletStatus } = await Promises.tryCatch(AudioWorklets.createFor(audioContext));
  if (workletStatus === 'rejected') {
    throw new Error(`Could not install Worklets: ${workletError}`);
  }

  // Create sample manager with optional local audio buffer support
  const sampleProvider: SampleProvider = {
    fetch: async (uuid: UUID.Bytes): Promise<[AudioData, SampleMetaData]> => {
      const uuidString = UUID.toString(uuid);
      console.debug(`Sample manager fetch called for UUID: ${uuidString}`);

      // Check if we have a local audio buffer for this UUID
      if (localAudioBuffers) {
        const audioBuffer = localAudioBuffers.get(uuidString);

        if (audioBuffer) {
          console.debug(
            `Found local audio buffer for ${uuidString}, channels: ${audioBuffer.numberOfChannels}, duration: ${audioBuffer.duration}s`,
          );
          const audioData = audioBufferToAudioData(audioBuffer);
          const metaData: SampleMetaData = {
            bpm: bpm ?? 0,
            duration: audioBuffer.duration,
            name: uuidString,
            origin: 'import',
            sample_rate: audioBuffer.sampleRate,
          };

          return [audioData, metaData];
        }
      }

      // Samples imported via SampleService
      const sample = await SampleStorage.get().exists(uuid);
      if (sample) {
        const [audioData, _peaks, meta] = await SampleStorage.get().load(uuid);
        return [audioData, meta];
      }

      console.warn(`No audio buffer found for UUID: ${uuidString}. The sample will not be available.`);
      throw new Error(`Sample not found: ${uuidString}`);
    },
  };
  const sampleManager = new GlobalSampleLoaderManager(sampleProvider);

  // Create soundfont manager
  const soundfontProvider: SoundfontProvider = {
    fetch: async (uuid: UUID.Bytes, progress: Progress.Handler): Promise<[ArrayBuffer, SoundfontMetaData]> =>
      OpenSoundfontAPI.get().load(uuid, progress),
  };
  const soundfontManager = new GlobalSoundfontLoaderManager(soundfontProvider);

  onStatusUpdate?.('Creating project...');

  // Clear persisted engine preferences before project creation so demos start fresh.
  // This prevents settings from a previous session affecting the current demo.
  localStorage.removeItem('engine-preferences');

  const sampleService = new SampleService(audioContext);
  // Skip SoundfontService — its constructor fetches from api.opendaw.studio (CORS issues
  // in dev, and none of the demos use soundfont instruments). The SDK declares
  // soundfontService in ProjectEnv but never reads it internally (verified in 0.0.128).
  // Proxy guard ensures a clear error if a future SDK version starts accessing it.
  const soundfontService = new Proxy({} as SoundfontService, {
    get(_target, prop) {
      throw new Error(
        `SoundfontService.${String(prop)} was accessed, but SoundfontService is disabled. ` +
          `Its constructor fetches from api.opendaw.studio (CORS issues in dev). ` +
          `To enable, replace this proxy with: new SoundfontService()`,
      );
    },
  });

  // Create project
  const audioWorklets = AudioWorklets.get(audioContext);
  const project = Project.new({
    audioContext,
    audioWorklets,
    sampleManager,
    sampleService,
    soundfontManager,
    soundfontService,
  });

  // Set BPM if custom value provided
  if (bpm && bpm !== 120) {
    project.editing.modify(() => {
      project.timelineBox.bpm.setValue(bpm);
    });
  }

  // Start audio worklet and wait for engine to be ready
  project.startAudioWorklet();
  await project.engine.isReady();

  console.debug('Engine is ready!');

  // Resume AudioContext on first user interaction if it starts suspended
  // (browsers require a user gesture before audio can play)
  if (audioContext.state === 'suspended') {
    const resume = () => {
      void audioContext.resume();
      document.removeEventListener('click', resume);
      document.removeEventListener('keydown', resume);
    };

    document.addEventListener('click', resume);
    document.addEventListener('keydown', resume);
  }

  return { audioContext, project };
}
