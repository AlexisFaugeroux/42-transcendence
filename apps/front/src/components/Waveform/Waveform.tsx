import { useEffect, useRef, type JSX } from 'react';
import type { DecodedPeaks } from '../../lib/peaks';
import { theme } from '@transcendence/ui';

interface WaveformProps {
  peaks: DecodedPeaks | null;
  color?: string;
  progress?: number;
  height?: number;
}

export function Waveform({ peaks, color, progress, height }: WaveformProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !peaks) return;
    const dpr = window.devicePixelRatio;
    const cssW = canvas.clientWidth;
    const cssH = height ?? 0;

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const bars = Math.max(1, Math.min(peaks.buckets, Math.floor(cssW / 2)));
    const mid = cssH / 2;
    const per = peaks.buckets / bars;
    const played = getComputedStyle(canvas).getPropertyValue('--fg3').trim() || '#666';

    for (let i = 0; i < bars; i++) {
      let mn = 0;
      let mx = 0;
      for (let j = Math.floor(i * per); j < Math.floor((i + 1) * per); j++) {
        if (peaks.min[j] < mn) mn = peaks.min[j];
        if (peaks.max[j] > mx) mx = peaks.max[j];
      }
      const x = (i / bars) * cssW;
      const yTop = mid - mx * mid;
      const barPlayed = i / bars <= (progress ?? 0);

      ctx.fillStyle = barPlayed ? (color ?? theme.orange) : played;
      ctx.fillRect(x, yTop, Math.max(1, cssW / bars - 1), Math.max(1, (mx - mn) * mid));
    }
  }, [peaks, color, progress, height]);

  return <canvas ref={canvasRef} style={{ width: '100%', height, display: 'block' }} aria-hidden />;
}
