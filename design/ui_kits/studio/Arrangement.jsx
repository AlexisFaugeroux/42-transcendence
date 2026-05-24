/* global React, Icon */
const { useState } = React;

// Track data — bars 1..16, each region: { start, len, label, color, type: "audio" | "midi" }
const TRACKS = [
  { name: "Drums",     instr: "Playfield",   color: "var(--color-blue)",   muted: false, regions: [{ s: 0, l: 4, label: "Drums A", type: "midi" }, { s: 4, l: 4, label: "Drums A", type: "midi" }, { s: 8, l: 8, label: "Drums B", type: "midi" }] },
  { name: "Bass",      instr: "Vaporisateur", color: "var(--color-purple)", muted: false, regions: [{ s: 2, l: 6, label: "Bass Lo", type: "midi" }, { s: 10, l: 6, label: "Bass Hi", type: "midi" }] },
  { name: "Lead",      instr: "Vaporisateur", color: "var(--color-yellow)", muted: false, regions: [{ s: 4, l: 4, label: "Lead", type: "midi" }, { s: 12, l: 4, label: "Lead", type: "midi" }] },
  { name: "Pad",       instr: "Modular",     color: "var(--color-cyan)",   muted: true,  regions: [{ s: 0, l: 16, label: "Pad sustained", type: "midi" }] },
  { name: "Vocal",     instr: "Audio",       color: "var(--color-orange)", muted: false, regions: [{ s: 6, l: 5, label: "vox-take-03.wav", type: "audio" }] },
  { name: "Texture",   instr: "Tape",        color: "var(--color-red)",    muted: false, regions: [{ s: 8, l: 8, label: "tape-loop.wav", type: "audio" }] },
];

const BARS = 16;

window.Arrangement = function Arrangement() {
  const [zoom] = useState(34); // px per bar
  const totalWidth = BARS * zoom;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--color-void)" }}>
      {/* Ruler */}
      <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--line-faint)", flexShrink: 0 }}>
        <div style={{ width: 160, flexShrink: 0, background: "var(--bg-panel)", borderRight: "1px solid var(--line-faint)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 10, color: "var(--fg3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.06, height: 24 }}>
          Tracks
        </div>
        <div style={{ flex: 1, position: "relative", height: 24, overflow: "hidden", background: "var(--bg-panel)" }}>
          <svg width={totalWidth} height={24} style={{ display: "block" }}>
            {Array.from({ length: BARS + 1 }).map((_, i) => {
              const x = i * zoom;
              return (
                <g key={i}>
                  <line x1={x} y1={i % 4 === 0 ? 4 : 14} x2={x} y2={24} stroke={i % 4 === 0 ? "var(--fg2)" : "var(--line-soft)"} strokeWidth={1}/>
                  {i % 4 === 0 && i < BARS && <text x={x + 3} y={11} fill="var(--fg2)" fontSize={9} fontFamily="var(--font-mono)">{i + 1}</text>}
                </g>
              );
            })}
            {/* Playhead */}
            <line x1={2.5 * zoom} y1={0} x2={2.5 * zoom} y2={24} stroke="var(--color-orange)" strokeWidth={1}/>
            <polygon points={`${2.5 * zoom - 4},0 ${2.5 * zoom + 4},0 ${2.5 * zoom},6`} fill="var(--color-orange)"/>
          </svg>
        </div>
      </div>

      {/* Tracks */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {TRACKS.map((t, i) => (
          <div key={i} style={{ display: "flex", height: 44, borderBottom: "1px solid var(--line-faint)" }}>
            {/* Track header */}
            <div style={{
              width: 160, flexShrink: 0, background: "var(--bg-panel)",
              borderRight: "1px solid var(--line-faint)",
              padding: "4px 8px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2,
              opacity: t.muted ? 0.5 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 1, background: t.color, boxShadow: `0 0 4px -1px ${t.color}` }}/>
                <span style={{ fontSize: 11, color: "var(--fg1)", flex: 1 }}>{t.name}</span>
                <span style={{ fontSize: 9, color: t.muted ? "var(--color-red)" : "var(--fg3)", fontFamily: "var(--font-display)", fontWeight: 400, padding: "1px 4px", border: `0.5px solid ${t.muted ? "var(--color-red)" : "var(--color-dark)"}`, borderRadius: 2 }}>M</span>
                <span style={{ fontSize: 9, color: "var(--fg3)", fontFamily: "var(--font-display)", fontWeight: 400, padding: "1px 4px", border: "0.5px solid var(--color-dark)", borderRadius: 2 }}>S</span>
                <span style={{ fontSize: 9, color: "var(--color-red)", padding: "1px 4px", border: "0.5px solid var(--color-red)", borderRadius: 2, opacity: 0.4 }}>R</span>
              </div>
              <div style={{ fontSize: 9, color: "var(--fg3)", fontFamily: "var(--font-mono)", letterSpacing: 0.04 }}>{t.instr}</div>
            </div>

            {/* Region area */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden", background: i % 2 ? "var(--color-void)" : "rgba(255,255,255,0.008)" }}>
              {/* Bar grid */}
              <svg width={totalWidth} height={44} style={{ position: "absolute", inset: 0 }}>
                {Array.from({ length: BARS + 1 }).map((_, b) => (
                  <line key={b} x1={b * zoom} y1={0} x2={b * zoom} y2={44} stroke={b % 4 === 0 ? "var(--line-soft)" : "var(--line-faint)"} strokeWidth={1}/>
                ))}
              </svg>
              {/* Regions */}
              {t.regions.map((r, ri) => (
                <div key={ri} style={{
                  position: "absolute",
                  left: r.s * zoom + 1, top: 4,
                  width: r.l * zoom - 2, height: 36,
                  background: r.type === "audio" ? `color-mix(in srgb, ${t.color} 14%, var(--color-void))` : `color-mix(in srgb, ${t.color} 22%, var(--color-void))`,
                  border: `0.5px solid ${t.color}`,
                  borderRadius: 2, padding: "2px 5px",
                  fontSize: 9, color: t.color,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  fontFamily: r.type === "audio" ? "var(--font-mono)" : "var(--font-display)",
                  opacity: t.muted ? 0.4 : 1,
                  overflow: "hidden",
                }}>
                  <div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{r.label}</div>
                  {r.type === "audio" ? (
                    <svg viewBox="0 0 100 12" preserveAspectRatio="none" style={{ width: "100%", height: 12 }}>
                      <path d="M0 6 L4 4 L8 7 L12 3 L16 9 L20 5 L24 8 L28 2 L32 7 L36 4 L40 6 L44 9 L48 3 L52 7 L56 5 L60 8 L64 4 L68 6 L72 7 L76 5 L80 8 L84 4 L88 6 L92 7 L96 4 L100 6" stroke="currentColor" strokeWidth="0.6" fill="none"/>
                    </svg>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, height: 12 }}>
                      {[0.4, 0.7, 0.55, 0.6].map((v, k) => (
                        <div key={k} style={{ height: 1.5, background: "currentColor", width: `${v * 100}%`, opacity: 0.7, borderRadius: 0.5 }}/>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Playhead */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 2.5 * zoom, width: 1, background: "var(--color-orange)", pointerEvents: "none" }}/>
            </div>
          </div>
        ))}
        {/* Add track */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 12px", color: "var(--fg3)", fontSize: 11, cursor: "pointer",
        }}>
          <Icon name="add" size="12px"/> Add Track
        </div>
      </div>
    </div>
  );
};
