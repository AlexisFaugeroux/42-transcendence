import { useCallback, useId, useRef } from 'react';
import styles from './MsnKnob.module.scss';

const PI_HALF = Math.PI / 2.0;
const TAU = Math.PI * 2.0;

interface KnobDesign {
  readonly radius: number;
  readonly trackWidth: number;
  readonly angleOffset: number;
  readonly indicator: [number, number];
  readonly indicatorWidth: number;
}

export const DefaultDesign: Readonly<KnobDesign> = {
  radius: 20,
  trackWidth: 1.5,
  angleOffset: Math.PI / 5.0,
  indicator: [0.3, 0.6],
  indicatorWidth: 2.5,
};

export const TinyDesign: Readonly<KnobDesign> = {
  radius: 20,
  trackWidth: 1.5,
  angleOffset: Math.PI / 5.0,
  indicator: [0.2, 0.66],
  indicatorWidth: 2.5,
};

function circleSegment(cx: number, cy: number, radius: number, a0: number, a1: number): string {
  const x0 = cx + Math.cos(a0) * radius;
  const y0 = cy + Math.sin(a0) * radius;
  const x1 = cx + Math.cos(a1) * radius;
  const y1 = cy + Math.sin(a1) * radius;
  let range = a1 - a0;
  while (range < 0.0) range += TAU;
  const largeArc = range > Math.PI ? 1 : 0;
  return `M ${x0} ${y0} A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1}`;
}

interface MsnKnobProps {
  value: number; // 0–1
  anchor?: number; // 0–1, default 0
  color?: string;
  design?: KnobDesign;
  onChange?: (value: number) => void;
  onChangeEnd?: () => void;
}

export function MsnKnob({
  value,
  anchor = 0,
  color,
  design = DefaultDesign,
  onChange,
  onChangeEnd,
}: MsnKnobProps) {
  const id = useId();
  const rimId = `knob-rim-${id}`;

  const { radius, trackWidth, angleOffset, indicator, indicatorWidth } = design;
  const [min, max] = indicator;

  const trackRadius = Math.floor(radius - trackWidth * 0.5);
  const angleMin = PI_HALF + angleOffset;
  const angleMax = PI_HALF - angleOffset;
  const angleRange = TAU - angleOffset * 2.0;
  const width = radius * 2.0;
  const height = radius + Math.ceil(Math.cos(angleOffset) * radius);

  // Background track arc (full range)
  const trackPath = circleSegment(0, 0, trackRadius, angleMin, angleMax);

  // Value arc (from anchor to current value)
  const angleAnc = angleMin + anchor * angleRange;
  const angleVal = angleMin + value * angleRange;
  const aMin = Math.min(angleVal, angleAnc);
  const aMax = Math.max(angleVal, angleAnc);
  const valuePath = circleSegment(
    0,
    0,
    trackRadius,
    aMin - 1.0 / trackRadius,
    aMax + 1.0 / trackRadius,
  );

  // Indicator line
  const cos = Math.cos(angleVal) * trackRadius;
  const sin = Math.sin(angleVal) * trackRadius;
  const indicatorPath = `M ${cos * min} ${sin * min} L ${cos * max} ${sin * max}`;

  // Drag interaction
  const dragRef = useRef<{ startY: number; startValue: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onChange) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = { startY: e.clientY, startValue: value };
    },
    [onChange, value],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || !onChange) return;
      const delta = (dragRef.current.startY - e.clientY) / 150;
      const newValue = Math.max(0, Math.min(1, dragRef.current.startValue + delta));
      onChange(newValue);
    },
    [onChange],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    onChangeEnd?.();
  }, [onChangeEnd]);

  // Double-click to reset to anchor
  const onDoubleClick = useCallback(() => {
    onChange?.(anchor);
  }, [onChange, anchor]);

  return (
    <svg
      className={styles.knob}
      viewBox={`0 0 ${width} ${height}`}
      style={color ? { color } : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onDoubleClick}
    >
      <defs>
        <linearGradient id={rimId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="butt"
        strokeWidth={trackWidth}
        transform={`translate(${radius}, ${radius})`}
      >
        {/* Shadow */}
        <circle
          r={radius * max * 1.1}
          stroke="none"
          fill="black"
          className={styles.shadow}
          cy={radius * 0.1}
        />
        {/* Filled circle */}
        <circle r={radius * max} stroke="none" fill="currentColor" />
        {/* Rim */}
        <circle r={radius * max} stroke={`url(#${rimId})`} strokeOpacity={0.5} fill="none" />
        {/* Background track */}
        <path stroke="currentColor" strokeOpacity={1 / 3} d={trackPath} />
        {/* Value arc */}
        <path d={valuePath} />
        {/* Indicator line */}
        <path
          d={indicatorPath}
          strokeLinecap="round"
          strokeWidth={indicatorWidth}
          stroke="rgba(0,0,0,0.5)"
        />
      </g>
    </svg>
  );
}
