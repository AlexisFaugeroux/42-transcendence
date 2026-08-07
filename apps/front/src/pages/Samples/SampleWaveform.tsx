import { type JSX, useEffect, useRef, useState } from 'react';
import { Waveform } from '../../components/Waveform/Waveform';
import { useSamplePlayer } from '../../contexts/SamplePlayerProvider';
import { useSamplePeaks } from '../../hooks/useSamplePeaks';

interface SampleWaveformProps {
  id: string;
  peaksUrl: string;
  height?: number;
}

export function SampleWaveform({ height = 28, id, peaksUrl }: SampleWaveformProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { currentId, progress } = useSamplePlayer();
  const peaks = useSamplePeaks(peaksUrl, isVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { rootMargin: '200px' },
    );
    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, [isVisible]);

  return (
    <div ref={ref}>
      <Waveform peaks={peaks} progress={currentId === id ? progress : 0} height={height} />
    </div>
  );
}
