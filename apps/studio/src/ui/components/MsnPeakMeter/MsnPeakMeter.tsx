import { AnimationFrame } from '@opendaw/lib-dom';
import { CanvasPainter } from '@opendaw/studio-core';
import { type JSX, useEffect, useRef } from 'react';
import type { PeaksRef } from '../../../hooks/useMasterPeaks';

interface MsnPeakMeterProps {
  peaksRef: PeaksRef;
  width?: number;
  height?: number;
}

export function MsnPeakMeter({ height = 11, peaksRef, width = 120 }: MsnPeakMeterProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const barH = Math.floor((height - 1) / 2);

    const painter = new CanvasPainter(canvas, ({ actualHeight, actualWidth, context }) => {
      context.clearRect(0, 0, actualHeight, actualHeight);

      // Background
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-void');
      context.fillRect(0, 0, actualWidth, barH);
      context.fillRect(0, barH + 1, actualWidth, barH);

      // Gradient bars
      const grad = context.createLinearGradient(0, 0, actualWidth, 0);
      grad.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--color-green'));
      grad.addColorStop(0.65, getComputedStyle(document.documentElement).getPropertyValue('--color-green'));
      grad.addColorStop(0.65, getComputedStyle(document.documentElement).getPropertyValue('--color-yellow'));
      grad.addColorStop(0.88, getComputedStyle(document.documentElement).getPropertyValue('--color-yellow'));
      grad.addColorStop(0.88, getComputedStyle(document.documentElement).getPropertyValue('--color-red'));
      grad.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--color-red'));
      context.fillStyle = grad;

      const buffer = peaksRef.current;
      context.fillRect(0, 0, actualWidth * buffer[0], barH);
      context.fillRect(0, barH + 1, actualWidth * buffer[1], barH);
    });

    const sub = AnimationFrame.add(painter.requestUpdate);

    return () => {
      sub.terminate();
      painter.terminate();
    };
  }, [peaksRef, height]);

  return <canvas ref={canvasRef} style={{ borderRadius: 1, height, width }} />;
}
