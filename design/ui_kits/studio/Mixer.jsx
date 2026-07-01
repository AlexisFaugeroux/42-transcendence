/* global React, Knob, Fader, VertPeakMeter, FramedButton */

const CHANNELS = [
  {
    name: "Drums",
    color: "var(--color-blue)",
    level: 0.72,
    peak: [0.7, 0.65],
    mute: false,
    solo: false,
    pan: 0.5,
  },
  {
    name: "Bass",
    color: "var(--color-purple)",
    level: 0.78,
    peak: [0.62, 0.6],
    mute: false,
    solo: false,
    pan: 0.5,
  },
  {
    name: "Lead",
    color: "var(--color-yellow)",
    level: 0.55,
    peak: [0.4, 0.45],
    mute: false,
    solo: false,
    pan: 0.62,
  },
  {
    name: "Pad",
    color: "var(--color-cyan)",
    level: 0.5,
    peak: [0, 0],
    mute: true,
    solo: false,
    pan: 0.5,
  },
  {
    name: "Vocal",
    color: "var(--color-orange)",
    level: 0.68,
    peak: [0.55, 0.5],
    mute: false,
    solo: true,
    pan: 0.4,
  },
  {
    name: "Texture",
    color: "var(--color-red)",
    level: 0.42,
    peak: [0.3, 0.32],
    mute: false,
    solo: false,
    pan: 0.55,
  },
  {
    name: "Reverb",
    color: "var(--color-green)",
    level: 0.6,
    peak: [0.5, 0.5],
    mute: false,
    solo: false,
    pan: 0.5,
    isAux: true,
  },
  {
    name: "Master",
    color: "var(--fg1)",
    level: 0.85,
    peak: [0.66, 0.6],
    mute: false,
    solo: false,
    pan: 0.5,
    isMaster: true,
  },
];

const Strip = ({ ch }) => (
  <div
    style={{
      width: 56,
      flexShrink: 0,
      background: ch.isMaster ? "var(--bg-card)" : "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "8px 0",
      gap: 6,
      position: "relative",
    }}
  >
    {ch.isAux && (
      <div
        style={{
          fontSize: 8,
          color: "var(--color-orange)",
          textTransform: "uppercase",
          letterSpacing: 0.06,
        }}
      >
        AUX
      </div>
    )}
    {ch.isMaster && (
      <div
        style={{
          fontSize: 8,
          color: "var(--fg1)",
          textTransform: "uppercase",
          letterSpacing: 0.08,
          fontWeight: 400,
        }}
      >
        MASTER
      </div>
    )}

    {/* Pan */}
    <Knob value={ch.pan} bipolar color="var(--color-green)" size={22} />

    {/* Sends row (non-aux/master only) */}
    {!ch.isAux && !ch.isMaster && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          padding: "0 8px",
        }}
      >
        {[0.3, 0.0].map((v, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 8,
              color: "var(--fg3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 3,
                background: "var(--color-void)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${v * 100}%`,
                  height: "100%",
                  background: "var(--color-orange)",
                }}
              />
            </div>
            <span>{i === 0 ? "RV" : "DL"}</span>
          </div>
        ))}
      </div>
    )}

    {/* Mute / Solo */}
    <div style={{ display: "flex", gap: 3 }}>
      <button
        style={{
          background: ch.mute
            ? "color-mix(in srgb, var(--color-red) 14%, transparent)"
            : "transparent",
          color: ch.mute ? "var(--color-red)" : "var(--fg3)",
          border: "0.5px solid currentColor",
          borderRadius: 2,
          padding: "1px 5px",
          fontSize: 9,
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          boxShadow: ch.mute ? "0 0 3px -1px currentColor" : "none",
        }}
      >
        M
      </button>
      <button
        style={{
          background: ch.solo
            ? "color-mix(in srgb, var(--color-yellow) 14%, transparent)"
            : "transparent",
          color: ch.solo ? "var(--color-yellow)" : "var(--fg3)",
          border: "0.5px solid currentColor",
          borderRadius: 2,
          padding: "1px 5px",
          fontSize: 9,
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          boxShadow: ch.solo ? "0 0 3px -1px currentColor" : "none",
        }}
      >
        S
      </button>
    </div>

    {/* Fader + meter */}
    <div style={{ display: "flex", gap: 4, alignItems: "center", height: 130 }}>
      <Fader value={ch.level} height={130} color={ch.color} />
      <VertPeakMeter l={ch.peak[0]} r={ch.peak[1]} height={130} />
    </div>

    <div
      style={{
        fontSize: 9,
        color: "var(--fg2)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {ch.level === 0.85
        ? "0.0"
        : (Math.log10(ch.level + 0.01) * 20 + 6).toFixed(1)}
    </div>

    {/* Color stripe + name */}
    <div
      style={{
        marginTop: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          height: 3,
          background: ch.color,
          borderRadius: 1,
          marginBottom: 4,
        }}
      />
      <div
        style={{
          fontSize: 10,
          color: "var(--fg1)",
          textAlign: "center",
          padding: "0 4px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        {ch.name}
      </div>
    </div>
  </div>
);

window.Mixer = function Mixer() {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        height: "100%",
        background: "var(--color-void)",
      }}
    >
      {CHANNELS.map((c, i) => (
        <Strip key={i} ch={c} />
      ))}
    </div>
  );
};
