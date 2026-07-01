/* global React, Icon */
const { useState } = React;

const DEVICES = [
  { name: "Vaporisateur", type: "Instrument", color: "var(--color-purple)" },
  { name: "Tape", type: "Instrument", color: "var(--color-orange)" },
  { name: "Playfield", type: "Instrument", color: "var(--color-blue)" },
  { name: "Compressor", type: "Effect", color: "var(--color-yellow)" },
  { name: "Maximizer", type: "Effect", color: "var(--color-red)" },
  { name: "Revamp EQ", type: "Effect", color: "var(--color-green)" },
  { name: "Gate", type: "Effect", color: "var(--color-cyan)" },
  { name: "Modular", type: "Instrument", color: "var(--color-purple)" },
];

const SAMPLES = [
  "Kick_808_01.wav",
  "Snare_Vinyl.wav",
  "Hat_Open.wav",
  "Perc_Loop_120.wav",
  "Bass_Sub_F.wav",
  "Pad_Ambient.wav",
  "Vocal_Chop.wav",
  "Texture_Tape.wav",
];

const TABS = [
  { key: "devices", label: "Devices", icon: "device" },
  { key: "samples", label: "Samples", icon: "sample" },
  { key: "files", label: "Files", icon: "folder" },
];

window.Browser = function Browser() {
  const [tab, setTab] = useState("devices");
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        background: "var(--color-black)",
        borderRight: "1px solid var(--line-faint)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tabs */}
      <div
        style={{ display: "flex", borderBottom: "1px solid var(--line-faint)" }}
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              background: "transparent",
              border: 0,
              color: tab === t.key ? "var(--color-orange)" : "var(--fg3)",
              padding: "8px 0",
              cursor: "pointer",
              fontSize: 10,
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              textTransform: "uppercase",
              letterSpacing: 0.06,
              borderBottom:
                tab === t.key
                  ? "1px solid var(--color-orange)"
                  : "1px solid transparent",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Icon name={t.icon} size="11px" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: 8, borderBottom: "1px solid var(--line-faint)" }}>
        <input
          type="text"
          placeholder={`Filter ${tab}…`}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: "var(--color-void)",
            border: "0.5px solid var(--line-soft)",
            color: "var(--fg1)",
            padding: "4px 8px",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: 11,
            borderRadius: 3,
            outline: "none",
            height: 22,
          }}
        />
      </div>

      {/* List */}
      <div style={{ flex: 1, overflow: "auto", padding: "4px 0" }}>
        {tab === "devices" &&
          DEVICES.map((d, i) => (
            <div
              key={i}
              draggable
              style={{
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "grab",
                fontSize: 11,
                color: "var(--fg1)",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.background = "var(--color-active)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: d.color,
                }}
              />
              <span style={{ flex: 1 }}>{d.name}</span>
              <span
                style={{
                  fontSize: 9,
                  color: "var(--fg3)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {d.type === "Instrument" ? "INS" : "FX"}
              </span>
            </div>
          ))}
        {tab === "samples" &&
          SAMPLES.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "grab",
                fontSize: 11,
                color: "var(--fg1)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Icon
                name="sample"
                size="11px"
                style={{ color: "var(--color-cyan)" }}
              />
              <span style={{ flex: 1 }}>{s}</span>
            </div>
          ))}
        {tab === "files" && (
          <div
            style={{
              padding: 16,
              fontSize: 11,
              color: "var(--fg3)",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Drop a folder of audio
            <br />
            files here.
          </div>
        )}
      </div>
    </div>
  );
};
