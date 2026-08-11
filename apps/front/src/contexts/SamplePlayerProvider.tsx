import { createContext, type JSX, type ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface SamplePlayer {
  currentId: string | null;
  isPlaying: boolean;
  progress: number;
  toggle: (id: string, url: string) => void;
  seek: (fraction: number) => void;
}

const playerContext = createContext<SamplePlayer | null>(null);

export function SamplePlayerProvider({ children }: { children: ReactNode }): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const onEnd = (): void => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentId(null);
    };
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.removeEventListener('ended', onEnd);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    let rafId: number | null = null;

    const tick = (): void => {
      if (audio.duration > 0) setProgress(audio.currentTime / audio.duration);
      rafId = requestAnimationFrame(tick);
    };
    if (isPlaying) rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isPlaying]);

  const value = useMemo<SamplePlayer>(() => {
    const audio = audioRef.current;
    return {
      currentId,
      isPlaying,
      progress,
      seek: (fraction: number) => {
        if (audio.duration > 0) audio.currentTime = fraction * audio.duration;
      },
      stop: () => {
        audio.pause();
        setIsPlaying(false);
        setCurrentId(null);
        setProgress(0);
      },
      toggle: (id, url) => {
        if (currentId === id) {
          if (audio.paused) {
            void audio.play();
            setIsPlaying(true);
          } else {
            audio.pause();
            setIsPlaying(false);
          }
          return;
        }

        audio.src = url;
        setCurrentId(id);
        setProgress(0);
        void audio.play();
        setIsPlaying(true);
      },
    };
  }, [currentId, isPlaying, progress]);

  return <playerContext.Provider value={value}>{children}</playerContext.Provider>;
}

export function useSamplePlayer() {
  const ctx = useContext(playerContext);
  if (!ctx) throw new Error('useSamplePlayer must be used within context');
  return ctx;
}
