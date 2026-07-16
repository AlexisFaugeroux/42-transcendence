/* global React */
const { useState, useRef, useEffect } = React;

// ============= Icon =============
// Inline minimal openDAW icon set — currentColor, sized via font-size: 1em
const ICONS = {
  brand: <><path d="M8,3L8,21C8,22.1 7.1,23 6,23L3,23C1.9,23 1,22.1 1,21L1,3C1,1.9 1.9,1 3,1L6,1C7.1,1 8,1.9 8,3Z"/><path d="M23,3L23,11C23,12.1 22.1,13 21,13L12,13C10.9,13 10,12.1 10,11L10,3C10,1.9 10.9,1 12,1L21,1C22.1,1 23,1.9 23,3ZM22,3C22,2.4 21.5,2 21,2L12,2C11.4,2 11,2.4 11,3L11,11C11,11.5 11.4,12 12,12L21,12C21.5,12 22,11.5 22,11L22,3Z"/><path d="M23,17L23,21C23,22.1 22.1,23 21,23L12,23C10.9,23 10,22.1 10,21L10,17C10,15.9 10.9,15 12,15L21,15C22.1,15 23,15.9 23,17Z"/></>,
  play: <path d="M5 3.5l11 6.5-11 6.5z"/>,
  stop: <rect x="4" y="4" width="16" height="16" rx="1.5"/>,
  record: <circle cx="12" cy="12" r="6"/>,
  loop: <path d="M5 8h10a4 4 0 0 1 4 4M19 16H9a4 4 0 0 1-4-4M16 5l3 3-3 3M8 19l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>,
  add: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-1 8H7v2h4v4h2v-4h4v-2h-4V7h-2z"/>,
  menu: <g fill="currentColor"><circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/></g>,
  triangle: <path d="M5 9l4 4 4-4z"/>,
  metronome: <path d="M9 3h6l3 16H6L9 3zm1 4l-2 10h8l-2-10h-4z" fill="currentColor"/>,
  midi: <g fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="7" r="1.2"/><circle cx="7" cy="13" r="1.2"/><circle cx="17" cy="13" r="1.2"/><rect x="9" y="14" width="6" height="3" rx=".5"/></g>,
  help: <g fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7c-1.7 0-3 1.2-3 2.7h2c0-.5.4-.9 1-.9s1 .4 1 .9-.5.7-1 1.1c-.7.5-1.2 1.1-1.2 2.2h2c0-.6.3-.8.9-1.3.6-.5 1.3-1 1.3-2 0-1.5-1.3-2.7-3-2.7zm-1 8h2v2h-2z"/></g>,
  arrange: <g fill="currentColor"><rect x="3" y="5" width="18" height="2"/><rect x="3" y="11" width="14" height="2"/><rect x="3" y="17" width="10" height="2"/></g>,
  mixer: <g fill="currentColor"><rect x="4" y="3" width="2" height="18"/><rect x="11" y="3" width="2" height="18"/><rect x="18" y="3" width="2" height="18"/><circle cx="5" cy="9" r="2" fill="var(--bg-app)" stroke="currentColor"/><circle cx="12" cy="14" r="2" fill="var(--bg-app)" stroke="currentColor"/><circle cx="19" cy="7" r="2" fill="var(--bg-app)" stroke="currentColor"/></g>,
  piano: <g fill="currentColor"><rect x="3" y="6" width="18" height="12" fill="white"/><rect x="6" y="6" width="2" height="7"/><rect x="11" y="6" width="2" height="7"/><rect x="16" y="6" width="2" height="7"/></g>,
  shadertoy: <g fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M7 14c2 2 8 2 10 0"/></g>,
  meter: <g fill="currentColor"><rect x="4" y="14" width="2" height="6"/><rect x="8" y="10" width="2" height="10"/><rect x="12" y="6" width="2" height="14"/><rect x="16" y="12" width="2" height="8"/></g>,
  folder: <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" fill="currentColor"/>,
  device: <g fill="currentColor"><rect x="3" y="6" width="18" height="12" rx="1.5"/><circle cx="8" cy="12" r="2" fill="var(--color-void)"/><rect x="13" y="11" width="6" height="2" fill="var(--color-void)"/></g>,
  sample: <path d="M3 12c2-4 4 4 6 0s4 4 6 0 4 4 6 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>,
  undo: <path d="M9 7L4 12l5 5v-3h6a4 4 0 0 1 0 8h-3v2h3a6 6 0 0 0 0-12H9V7z" fill="currentColor"/>,
  redo: <path d="M15 7l5 5-5 5v-3H9a4 4 0 0 0 0 8h3v2H9a6 6 0 0 1 0-12h6V7z" fill="currentColor"/>,
};

window.Icon = function Icon({ name, size = "1em", color, style }) {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ color, display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      {path}
    </svg>
  );
};

// ============= Hr divider =============
window.Hr = function Hr() {
  return <div style={{ width: 1, alignSelf: "stretch", background: "var(--line-faint)", margin: "0 6px" }} />;
};

// ============= FramedButton =============
window.FramedButton = function FramedButton({ children, active, color, onClick, title, style }) {
  const [hover, setHover] = useState(false);
  const c = active ? color || "var(--color-orange)" : "var(--fg2)";
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: active ? `color-mix(in srgb, ${color || "var(--color-orange)"} 6%, transparent)` : "transparent",
        color: c,
        border: "0.5px solid currentColor",
        borderRadius: 3,
        padding: "0 8px",
        height: 22,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: 11,
        cursor: "pointer",
        boxShadow: active || hover ? "0 0 3px -1px currentColor" : "none",
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// ============= IconButton (no frame, just hover->bright) =============
window.IconButton = function IconButton({ icon, active, color, onClick, title, size }) {
  const [hover, setHover] = useState(false);
  const c = active ? color || "var(--color-orange)" : hover ? "var(--fg1)" : "var(--fg2)";
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "transparent",
        border: 0,
        color: c,
        padding: 4,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}
    >
      <Icon name={icon} size={size || "14px"} />
    </button>
  );
};

// ============= Knob =============
window.Knob = function Knob({ value = 0.5, color = "var(--color-yellow)", size = 28, label, valueText, bipolar }) {
  const cx = 50, cy = 50, r = 36;
  const startA = bipolar ? -90 : 135; // degrees
  const sweep = bipolar ? 270 : 270;
  const valA = startA + (bipolar ? (value - 0.5) * 270 : value * sweep);
  const ang = (a) => ((a - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(ang(startA)), y1 = cy + r * Math.sin(ang(startA));
  const x2 = cx + r * Math.cos(ang(valA)), y2 = cy + r * Math.sin(ang(valA));
  const large = Math.abs(valA - startA) > 180 ? 1 : 0;
  const dir = valA > startA ? 1 : 0;
  const pointer = ang(valA);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-void)" strokeWidth={6} />
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} ${dir} ${x2} ${y2}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 2px ${color})` }}
        />
        <line x1={cx} y1={cy} x2={cx + (r - 6) * Math.cos(pointer)} y2={cy + (r - 6) * Math.sin(pointer)} stroke="var(--fg1)" strokeWidth={3} strokeLinecap="round" />
      </svg>
      {valueText && <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--fg1)" }}>{valueText}</div>}
      {label && <div style={{ fontSize: 9, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
    </div>
  );
};

// ============= PeakMeter (horizontal pair) =============
window.PeakMeter = function PeakMeter({ l = 0.6, r = 0.5, width = 60 }) {
  const grad = "linear-gradient(90deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 1 }}>
      {[l, r].map((v, i) => (
        <div key={i} style={{ height: 4, background: "var(--color-void)", borderRadius: 1, overflow: "hidden" }}>
          <div style={{ width: `${v * 100}%`, height: "100%", background: grad }} />
        </div>
      ))}
    </div>
  );
};

// ============= VerticalPeakMeter =============
window.VertPeakMeter = function VertPeakMeter({ l = 0.6, r = 0.5, height = 100 }) {
  const grad = "linear-gradient(0deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return (
    <div style={{ height, display: "flex", gap: 1 }}>
      {[l, r].map((v, i) => (
        <div key={i} style={{ width: 4, background: "var(--color-void)", borderRadius: 1, overflow: "hidden", display: "flex", flexDirection: "column-reverse" }}>
          <div style={{ height: `${v * 100}%`, width: "100%", background: grad }} />
        </div>
      ))}
    </div>
  );
};

// ============= Fader =============
window.Fader = function Fader({ value = 0.7, height = 110, color = "var(--color-yellow)" }) {
  return (
    <div style={{ width: 18, height, position: "relative", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: 2, height: "100%", background: "var(--color-void)", borderRadius: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent 0 6px, var(--line-soft) 6px 7px)",
      }}/>
      <div style={{
        position: "absolute", left: "50%", transform: "translate(-50%, 50%)",
        bottom: `${value * 100}%`,
        width: 14, height: 6, background: color, borderRadius: 1,
        boxShadow: `0 0 4px -1px ${color}, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}/>
    </div>
  );
};

// ============= UnitDisplay (e.g. BPM, signature, time) =============
window.UnitDisplay = function UnitDisplay({ value, unit, accent, large }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "flex-end",
      padding: "0 6px",
      fontFamily: "var(--font-display)",
      borderRadius: 2,
      lineHeight: 1,
    }}>
      <div style={{
        fontSize: large ? 18 : 14, fontWeight: 400, color: accent || "var(--fg1)",
        fontVariantNumeric: "tabular-nums",
      }}>{value}</div>
      <div style={{ fontSize: 8, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: 0.6, marginTop: 1 }}>{unit}</div>
    </div>
  );
};
