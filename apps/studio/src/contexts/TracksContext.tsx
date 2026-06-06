import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { Track } from '../App';
import type { Clip } from '../lib/types';
import { useProject } from './ProjectContext';
import { seedDemoData } from '../lib/seedDemoData';

interface TracksContext {
  clips: Clip[];
  tracks: Track[];
  setClips: Dispatch<SetStateAction<Clip[]>>;
  setTracks: Dispatch<SetStateAction<Track[]>>;
}

const tracksContext = createContext<TracksContext | null>(null);

export function TracksProvider({ children }: { children: ReactNode }): JSX.Element {
  const { project, audioContext, localAudioBuffers } = useProject();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);

  useEffect(() => {
    void (async () => {
      const { clips, tracks } = await seedDemoData(project, audioContext, localAudioBuffers, 120);

      setTracks(tracks);
      setClips(clips);
    })();
  }, [audioContext, project, localAudioBuffers]);

  return <tracksContext.Provider value={{ clips, tracks, setClips, setTracks }}>{children}</tracksContext.Provider>;
}

export function useTracks() {
  const ctx = useContext(tracksContext);
  if (!ctx) throw new Error('useTracks used outside of a TracksProvider');
  return ctx;
}
