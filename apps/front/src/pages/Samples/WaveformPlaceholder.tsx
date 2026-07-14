import type { JSX } from 'react';

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

interface WaveformPlaceholderProps {
  seed: string;
  color: string;
  bars?: number;
  height?: number;
}

export function WaveformPlaceholder({ bars = 40, color, height = 28, seed }: WaveformPlaceholderProps): JSX.Element {
  const base = hashString(seed);
  // Deterministic pseudo-heights so each sample's waveform is stable across renders.
  const heights = Array.from({ length: bars }, (_, i) => Math.max(0.12, Math.abs(Math.sin(base + i * 1.7))));

  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 1, height, width: '100%' }}>
      {heights.map((h, i) => (
        <span key={i} style={{ background: color, borderRadius: 1, flex: 1, height: `${h * 100}%`, opacity: 0.8 }} />
      ))}
    </div>
  );
}
