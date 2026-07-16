const PI_HALF = Math.PI / 2.0;
const TAU = Math.PI * 2.0;
const DEFAULT_DESIGN = { radius: 20, trackWidth: 1.5, angleOffset: Math.PI / 5.0, indicator: [0.3, 0.6], indicatorWidth: 2.5 };

function circleSegment(cx, cy, radius, a0, a1) {
  const x0 = cx + Math.cos(a0) * radius, y0 = cy + Math.sin(a0) * radius;
  const x1 = cx + Math.cos(a1) * radius, y1 = cy + Math.sin(a1) * radius;
  let range = a1 - a0;
  while (range < 0.0) range += TAU;
  const largeArc = range > Math.PI ? 1 : 0;
  return `M ${x0} ${y0} A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1}`;
}

export function Knob({ value = 0.5, anchor = 0, color, design = DEFAULT_DESIGN, onChange, onChangeEnd }) {
  const id = React.useId();
  const rimId = `knob-rim-${id}`;
  const { radius, trackWidth, angleOffset, indicator, indicatorWidth } = design;
  const [min, max] = indicator;
  const trackRadius = Math.floor(radius - trackWidth * 0.5);
  const angleMin = PI_HALF + angleOffset;
  const angleMax = PI_HALF - angleOffset;
  const angleRange = TAU - angleOffset * 2.0;
  const width = radius * 2.0;
  const height = radius + Math.ceil(Math.cos(angleOffset) * radius);
  const trackPath = circleSegment(0, 0, trackRadius, angleMin, angleMax);
  const angleAnc = angleMin + anchor * angleRange;
  const angleVal = angleMin + value * angleRange;
  const aMin = Math.min(angleVal, angleAnc), aMax = Math.max(angleVal, angleAnc);
  const valuePath = circleSegment(0, 0, trackRadius, aMin - 1.0 / trackRadius, aMax + 1.0 / trackRadius);
  const cos = Math.cos(angleVal) * trackRadius, sin = Math.sin(angleVal) * trackRadius;
  const indicatorPath = `M ${cos * min} ${sin * min} L ${cos * max} ${sin * max}`;
  const dragRef = React.useRef(null);

  const onPointerDown = (e) => {
    if (!onChange) return;
    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    dragRef.current = { startY: e.clientY, startValue: value };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current || !onChange) return;
    const delta = (dragRef.current.startY - e.clientY) / 150;
    onChange(Math.max(0, Math.min(1, dragRef.current.startValue + delta)));
  };
  const onPointerUp = () => { dragRef.current = null; onChangeEnd && onChangeEnd(); };
  const onDoubleClick = () => onChange && onChange(anchor);

  return (
    <svg viewBox={`0 0 ${width} ${height}`}
      style={{ minWidth: "1.75em", maxWidth: "1.75em", minHeight: "1.75em", maxHeight: "1.75em", placeSelf: "center", cursor: "pointer", touchAction: "none", color }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onDoubleClick={onDoubleClick}>
      <defs>
        <linearGradient id={rimId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white"/><stop offset="100%" stopColor="black"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke="currentColor" strokeLinecap="butt" strokeWidth={trackWidth} transform={`translate(${radius}, ${radius})`}>
        <circle r={radius * max * 1.1} stroke="none" fill="black" cy={radius * 0.1} style={{ opacity: 0.5, filter: "blur(1px)", mixBlendMode: "luminosity" }}/>
        <circle r={radius * max} stroke="none" fill="currentColor"/>
        <circle r={radius * max} stroke={`url(#${rimId})`} strokeOpacity={0.5} fill="none"/>
        <path stroke="currentColor" strokeOpacity={1 / 3} d={trackPath}/>
        <path d={valuePath}/>
        <path d={indicatorPath} strokeLinecap="round" strokeWidth={indicatorWidth} stroke="rgba(0,0,0,0.5)"/>
      </g>
    </svg>
  );
}
