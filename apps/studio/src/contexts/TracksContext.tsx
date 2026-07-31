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
/* import { seedDemoData } from '../lib/seedDemoData'; */
import type { Clip, Track } from '../lib/types';
import { useProject } from './ProjectContext';
import { reloadClipsAndTracks } from '../lib/projectSetup';

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
  const { clips, tracks } = reloadClipsAndTracks(project);

  setTracks(tracks);
  setClips(clips);
}, [project]);

  return <tracksContext.Provider value={{ clips, setClips, setTracks, tracks }}>{children}</tracksContext.Provider>;
}

export function useTracks() {
  const ctx = useContext(tracksContext);
  if (!ctx) throw new Error('useTracks used outside of a TracksProvider');
  return ctx;
}
