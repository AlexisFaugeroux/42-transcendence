/* global React */
// Shared MakeSomeNoise UI primitives — built on the openDAW design system tokens.

// ============= Wordmark =============
window.MsnWordmark = function MsnWordmark({
  size = 14,
  color = "var(--fg1)",
  accent = "var(--color-orange)",
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize: size,
        color,
        letterSpacing: -0.01,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 0,
      }}
    >
      <span style={{ fontWeight: 300 }}>make</span>
      <span style={{ fontWeight: 400 }}>some</span>
      <span style={{ fontWeight: 400, color: accent }}>noise</span>
      <span style={{ color: accent, marginLeft: 1 }}>.</span>
    </span>
  );
};

// ============= Avatar — initials on a colored tile =============
const AVATAR_PALETTE = [
  "var(--color-orange)",
  "var(--color-blue)",
  "var(--color-green)",
  "var(--color-yellow)",
  "var(--color-red)",
  "var(--color-purple)",
  "var(--color-cyan)",
];
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

window.MsnAvatar = function MsnAvatar({ name, size = 28, status, ring }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
  const dotSize = Math.max(6, Math.round(size * 0.28));
  const statusColor = {
    live: "var(--color-red)",
    online: "var(--color-green)",
    idle: "var(--color-yellow)",
    offline: "var(--color-dark)",
  }[status];
  return (
    <span
      style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 4,
          background: `color-mix(in srgb, ${color} 18%, var(--color-shadow))`,
          color,
          border: ring ? `1px solid ${color}` : "0.5px solid var(--line-soft)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: Math.round(size * 0.42),
          letterSpacing: 0.5,
          boxShadow: ring ? `0 0 6px -2px ${color}` : "none",
        }}
      >
        {initials}
      </span>
      {status && (
        <span
          title={status}
          style={{
            position: "absolute",
            right: -2,
            bottom: -2,
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: statusColor,
            border: "1.5px solid var(--bg-panel)",
            boxShadow:
              status === "live" ? `0 0 6px -1px ${statusColor}` : "none",
          }}
        />
      )}
    </span>
  );
};

// ============= Waveform thumb (deterministic) =============
window.MsnWaveform = function MsnWaveform({
  seed = "x",
  width = 200,
  height = 36,
  color = "var(--color-orange)",
  bg = "transparent",
  progress,
}) {
  const bars = 64;
  const rand = (i) => {
    const h = hashStr(seed + ":" + i);
    return (h % 1000) / 1000;
  };
  const bw = width / bars;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", background: bg }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const t = i / bars;
        const env = Math.sin(t * Math.PI) * 0.55 + 0.45;
        const r = rand(i);
        const h = Math.max(1.5, env * r * height);
        const y = (height - h) / 2;
        const x = i * bw;
        const past = progress != null && t < progress;
        return (
          <rect
            key={i}
            x={x + bw * 0.18}
            y={y}
            width={bw * 0.6}
            height={h}
            fill={
              past ? color : "color-mix(in srgb, currentColor 38%, transparent)"
            }
            style={{ color }}
          />
        );
      })}
    </svg>
  );
};

// ============= Peak meter (horizontal pair) =============
window.MsnPeakMeter = function MsnPeakMeter({ l = 0.6, r = 0.5, width = 80 }) {
  const grad =
    "linear-gradient(90deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 1 }}>
      {[l, r].map((v, i) => (
        <div
          key={i}
          style={{
            height: 4,
            background: "var(--color-void)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{ width: `${v * 100}%`, height: "100%", background: grad }}
          />
        </div>
      ))}
    </div>
  );
};

// ============= Framed button =============
window.MsnFramed = function MsnFramed({
  children,
  color = "var(--fg1)",
  active,
  size = "md",
  onClick,
  style,
  title,
}) {
  const heights = { sm: 22, md: 28, lg: 36 };
  const fontSizes = { sm: 11, md: 12, lg: 13 };
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        background: active
          ? `color-mix(in srgb, ${color} 8%, transparent)`
          : "transparent",
        color,
        border: "0.5px solid currentColor",
        borderRadius: 3,
        padding: size === "lg" ? "0 14px" : "0 10px",
        height: heights[size],
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: fontSizes[size],
        cursor: "pointer",
        lineHeight: 1,
        whiteSpace: "nowrap",
        boxShadow: active ? "0 0 4px -1px currentColor" : "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// ============= Solid CTA =============
window.MsnSolid = function MsnSolid({
  children,
  color = "var(--color-orange)",
  onClick,
  size = "md",
  style,
  title,
}) {
  const heights = { sm: 24, md: 32, lg: 40 };
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        background: color,
        color: "rgba(0,0,0,0.85)",
        border: 0,
        borderRadius: 3,
        padding: size === "lg" ? "0 18px" : "0 12px",
        height: heights[size],
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize: size === "lg" ? 13 : 12,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        cursor: "pointer",
        lineHeight: 1,
        whiteSpace: "nowrap",
        boxShadow: `0 0 12px -4px ${color}`,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// ============= Tag / pill =============
window.MsnTag = function MsnTag({ children, color = "var(--color-gray)" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        color,
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: 10,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        padding: "2px 6px",
        borderRadius: 2,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

// ============= Hairline divider =============
window.MsnHr = function MsnHr({
  vertical,
  margin = 8,
  color = "var(--line-soft)",
}) {
  return vertical ? (
    <div
      style={{
        width: 1,
        alignSelf: "stretch",
        background: color,
        margin: `0 ${margin}px`,
      }}
    />
  ) : (
    <div
      style={{
        height: 1,
        alignSelf: "stretch",
        background: color,
        margin: `${margin}px 0`,
      }}
    />
  );
};

// ============= Cover art (deterministic gradient + grain) =============
window.MsnCover = function MsnCover({
  seed = "x",
  size = 56,
  radius = 4,
  accent,
}) {
  const h1 = hashStr(seed) % 360;
  const h2 = hashStr(seed + "b") % 360;
  const palettes = [
    [`hsl(${h1},45%,18%)`, `hsl(${h2},35%,10%)`],
    [`hsl(${h1},40%,16%)`, `hsl(${(h1 + 40) % 360},35%,12%)`],
  ];
  const [a, b] = palettes[hashStr(seed) % palettes.length];
  const accentColor = accent || `hsl(${h1}, 70%, 55%)`;
  // Pick a glyph
  const glyphs = ["▲", "●", "◆", "■", "◐", "◇", "▶"];
  const glyph = glyphs[hashStr(seed + "g") % glyphs.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${a}, ${b})`,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "inset 0 0 0 0.5px var(--line-soft)",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.42,
          color: accentColor,
          opacity: 0.85,
          fontFamily: "var(--font-display)",
        }}
      >
        {glyph}
      </span>
    </div>
  );
};
