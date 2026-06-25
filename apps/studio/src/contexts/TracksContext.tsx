import {
  createContext,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { seedDemoData } from '../lib/seedDemoData';
import type { Clip, Track } from '../lib/types';
import { useProject } from './ProjectContext';

interface TracksContext {
  clips: Clip[];
  tracks: Track[];
  setClips: Dispatch<SetStateAction<Clip[]>>;
  setTracks: Dispatch<SetStateAction<Track[]>>;
}

const tracksContext = createContext<TracksContext | null>(null);

export function TracksProvider({ children }: { children: ReactNode }): JSX.Element {
  const { audioContext, localAudioBuffers, project } = useProject();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (hasSeeded.current) return;
    hasSeeded.current = true;
    void (async () => {
      const { clips, tracks } = await seedDemoData(project, audioContext, localAudioBuffers);

      setTracks(tracks);
      setClips(clips);
    })();
  }, [audioContext, project, localAudioBuffers]);

  return <tracksContext.Provider value={{ clips, setClips, setTracks, tracks }}>{children}</tracksContext.Provider>;
}

export function useTracks() {
  const ctx = useContext(tracksContext);
  if (!ctx) throw new Error('useTracks used outside of a TracksProvider');
  return ctx;
}
