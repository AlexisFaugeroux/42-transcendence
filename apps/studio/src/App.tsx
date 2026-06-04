import { AnimationFrame } from '@opendaw/lib-dom';
import { PPQN } from '@opendaw/lib-dsp';
import { InstrumentFactories } from '@opendaw/studio-adapters';
import type { Project } from '@opendaw/studio-core';
import { type JSX, useEffect, useRef, useState } from 'react';
import { initializeOpenDaw } from './lib/projectSetup';
import { seedDemoData } from './lib/seedDemoData';
import type { Clip } from './lib/types';
import { AddTrackButton, type TrackKind } from './ui/AddTrackButton';
import { Timeline } from './ui/Timeline/Timeline';
import { Transport } from './ui/Transport/Transport';

export interface Track {
  name: string;
  uuid: Readonly<Uint8Array>;
  color: string;
}

function App(): JSX.Element {
  const [project, setProject] = useState<Project | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [clips, setClips] = useState<Clip[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const localAudioBuffersRef = useRef(new Map<string, AudioBuffer>());
  const didSeedRef = useRef(false);

  // Initialize OpenDaw
  useEffect(() => {
    let mounted = true;
    // Initialize OpenDaw
    void (async () => {
      const { audioContext, project } = await initializeOpenDaw({ localAudioBuffers: localAudioBuffersRef.current });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mounted) return;
      setProject(project);
      setAudioContext(audioContext);

      if (didSeedRef.current) return;
      didSeedRef.current = true;

      const { clips, tracks } = await seedDemoData(project, audioContext, localAudioBuffersRef.current, 120);

      setClips(clips);
      setTracks(tracks);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Subscribe to engine state
  useEffect(() => {
    if (!project || !audioContext) return;

    const playingSub = project.engine.isPlaying.catchupAndSubscribe((obs) => {
      setIsPlaying(obs.getValue());
    });

    const positionSub = AnimationFrame.add(() => {
      const enginePos = project.engine.position.getValue();
      const latencySeconds = audioContext.baseLatency + audioContext.outputLatency;
      const latencyPulses = PPQN.secondsToPulses(latencySeconds, bpm);
      setCurrentPosition(Math.max(0, enginePos - latencyPulses));
    });

    const bpmSub = project.timelineBox.bpm.catchupAndSubscribe((field) => {
      setBpm(field.getValue());
    });

    return () => {
      playingSub.terminate();
      positionSub.terminate();
      bpmSub.terminate();
    };
  }, [project, audioContext, bpm]);

  async function handlePlay() {
    if (!project || !audioContext) return;

    if (audioContext.state === 'suspended') await audioContext.resume();

    project.engine.play();
  }

  function handleStop() {
    if (!project) return;
    project.engine.stop(true); // also reset at position 0;
  }

  function handleBpmChange(newBpm: number) {
    if (!project) return;

    project.editing.modify(() => {
      project.timelineBox.bpm.setValue(newBpm);

      // Recalculate clip durations
      clips.forEach((clip) => {
        const newDuration = Math.min(Math.round(PPQN.secondsToPulses(clip.audioDuration, newBpm)), clip.gap);
        clip.regionBox.duration.setValue(newDuration);
        clip.regionBox.loopDuration.setValue(newDuration);
      });
    });

    const updatedClips = clips.map((clip) => ({
      ...clip,
      duration: Math.min(Math.round(PPQN.secondsToPulses(clip.audioDuration, newBpm)), clip.gap),
    }));

    setClips(updatedClips);
  }

  function handleAddTrack(kind: TrackKind) {
    if (!project) return;

    project.editing.modify(() => {
      switch (kind) {
        case 'tape':
          {
            const { audioUnitBox, instrumentBox, trackBox } = project.api.createInstrument(InstrumentFactories.Tape);
            audioUnitBox.volume.setValue(0);
            instrumentBox.label.setValue(`${kind} ${tracks.length + 1}`);

            setTracks((prev) => [
              ...prev,
              { color: '#888', name: `${kind} ${prev.length + 1}`, uuid: trackBox.target.address.uuid },
            ]);
          }
          break;
        case 'nano':
          {
            const { audioUnitBox, instrumentBox, trackBox } = project.api.createInstrument(InstrumentFactories.Nano);
            audioUnitBox.volume.setValue(0);
            instrumentBox.label.setValue(`${kind} ${tracks.length + 1}`);

            setTracks((prev) => [
              ...prev,
              { color: '#888', name: `${kind} ${prev.length + 1}`, uuid: trackBox.target.address.uuid },
            ]);
          }
          break;
        case 'vaporisateur':
          {
            const { audioUnitBox, instrumentBox, trackBox } = project.api.createInstrument(
              InstrumentFactories.Vaporisateur,
            );
            audioUnitBox.volume.setValue(0);
            instrumentBox.label.setValue(`${kind} ${tracks.length + 1}`);

            setTracks((prev) => [
              ...prev,
              { color: '#888', name: `${kind} ${prev.length + 1}`, uuid: trackBox.target.address.uuid },
            ]);
          }
          break;
      }
    });
  }

  if (!project) return <div>Loading...</div>;

  return (
    <div className="app">
      <h1>MakeSomeNoise</h1>

      <AddTrackButton onAddTrack={handleAddTrack} />

      <Timeline
        project={project}
        clips={clips}
        tracks={tracks.map((track) => track.name)}
        currentPosition={currentPosition}
        isPlaying={isPlaying}
      />

      <Transport
        isPlaying={isPlaying}
        bpm={bpm}
        onPlay={() => void handlePlay()}
        onStop={handleStop}
        onBpmChange={handleBpmChange}
      />

      {/* <TrackList tracks={tracks} project={project} /> */}
    </div>
  );
}

export default App;
