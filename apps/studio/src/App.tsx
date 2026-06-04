import { PPQN } from '@opendaw/lib-dsp';
import { InstrumentFactories } from '@opendaw/studio-adapters';
import type { Project } from '@opendaw/studio-core';
import { type JSX, useEffect, useRef, useState } from 'react';
import { initializeOpenDaw } from './lib/projectSetup';
import { seedDemoData } from './lib/seedDemoData';
import type { Clip } from './lib/types';
import { AddTrackButton, type TrackKind } from './ui/AddTrackButton';
import { Timeline } from './ui/Timeline/Timeline';
import { Header } from './ui/Header/Header';
import { ProjectProvider } from './contexts/ProjectContext';

export interface Track {
  name: string;
  uuid: Readonly<Uint8Array>;
  color: string;
}

function App(): JSX.Element {
  const [project, setProject] = useState<Project | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
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

  if (!project || !audioContext) return <div>Loading...</div>;

  return (
    <div className="app">
      <ProjectProvider value={{ project, audioContext }}>
        <Header handleBpmChange={handleBpmChange} />

        <AddTrackButton onAddTrack={handleAddTrack} />

        <Timeline clips={clips} tracks={tracks.map((track) => track.name)} />
      </ProjectProvider>
    </div>
  );
}

export default App;
