import { type JSX, useEffect, useMemo, useRef } from 'react';
import type { DecodedPeaks } from '../../lib/peaks';

interface WaveformProps {
  peaks: DecodedPeaks | null;
  color?: string;
  progress?: number;
  height?: number;
}

export function Waveform({ color, height, peaks, progress }: WaveformProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const norm = useMemo(() => {
    if (!peaks) return 1;
    let peak = 0;
    for (let i = 0; i < peaks.buckets; i++) {
      if (-peaks.min[i] > peak) peak = -peaks.min[i];
      if (peaks.max[i] > peak) peak = peaks.max[i];
    }
    return peak > 0 ? 1 / peak : 1;
  }, [peaks]);

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

    const canvasStyles = getComputedStyle(canvas);
    const unplayed = canvasStyles.getPropertyValue('--fg3').trim() || '#666';
    const playedColor =
      (color ?? canvasStyles.getPropertyValue('--color-orange').trim()) || 'hsl(25, 90%, 55%)';

    for (let i = 0; i < bars; i++) {
      let mn = 0;
      let mx = 0;
      for (let j = Math.floor(i * per); j < Math.floor((i + 1) * per); j++) {
        if (peaks.min[j] < mn) mn = peaks.min[j];
        if (peaks.max[j] > mx) mx = peaks.max[j];
      }
      const x = (i / bars) * cssW;
      const yTop = mid - mx * mid * norm;
      const barPlayed = i / bars < (progress ?? 0);

      ctx.fillStyle = barPlayed ? playedColor : unplayed;
      ctx.fillRect(x, yTop, Math.max(1, cssW / bars - 1), Math.max(1, (mx - mn) * mid * norm));
    }
  }, [peaks, color, progress, height, norm]);

  return <canvas ref={canvasRef} style={{ display: 'block', height, width: '100%' }} aria-hidden />;
}
