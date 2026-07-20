/* global React, Icon, Hr, FramedButton, IconButton, PeakMeter, UnitDisplay */
const { useState } = React;

window.Header = function Header({
  screen,
  onScreenChange,
  onBrandClick,
  transport,
  onTransportChange,
}) {
  const [metro, setMetro] = useState(false);
  const [midi, setMidi] = useState(true);
  const screens = [
    { key: "dashboard", icon: "brand", title: "Dashboard" },
    { key: "default", icon: "arrange", title: "Arrangement" },
    { key: "mixer", icon: "mixer", title: "Mixer" },
    { key: "piano", icon: "piano", title: "Piano Roll" },
    { key: "shadertoy", icon: "shadertoy", title: "Shadertoy" },
    { key: "meter", icon: "meter", title: "Meter" },
  ];
  return (
    <header
      style={{
        height: "2.5em",
        minHeight: 36,
        background: "var(--bg-panel)",
        borderBottom: "1px solid var(--line-faint)",
        display: "flex",
        alignItems: "center",
        padding: "0 6px",
        gap: 0,
        fontSize: 12,
        flexShrink: 0,
      }}
    >
      {/* Brand menu */}
      <button
        onClick={onBrandClick}
        style={{
          background: "transparent",
          border: 0,
          color: "var(--fg2)",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "0 8px",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <h5
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 12,
            color: "var(--fg1)",
            margin: 0,
            letterSpacing: -0.01,
          }}
        >
          openDAW
        </h5>
        <Icon name="triangle" size="10px" />
      </button>
      <Hr />

      {/* Undo / Redo */}
      <IconButton icon="undo" title="Undo (⌘Z)" />
      <IconButton icon="redo" title="Redo (⌘⇧Z)" />
      <Hr />

      {/* Midi + Help */}
      <IconButton
        icon="midi"
        active={midi}
        color="var(--color-orange)"
        title="Midi Access"
        onClick={() => setMidi(!midi)}
      />
      <IconButton icon="help" color="var(--color-green)" title="Manuals" />
      <Hr />

      {/* Transport */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          icon="play"
          active={transport === "play"}
          color="var(--color-green)"
          title="Play (Space)"
          onClick={() => onTransportChange("play")}
          size="14px"
        />
        <IconButton
          icon="stop"
          active={transport === "stop"}
          color="var(--fg1)"
          title="Stop"
          onClick={() => onTransportChange("stop")}
          size="14px"
        />
        <IconButton
          icon="record"
          active={transport === "record"}
          color="var(--color-red)"
          title="Record"
          onClick={() => onTransportChange("record")}
          size="14px"
        />
        <IconButton icon="loop" title="Loop" size="14px" />
      </div>
      <Hr />

      {/* Tempo, signature, time */}
      <UnitDisplay value="120" unit="bpm" />
      <UnitDisplay value="4/4" unit="sig" />
      <UnitDisplay
        value="01.01.000"
        unit="bars"
        accent="var(--color-blue)"
        large
      />
      <UnitDisplay value="00:00:00" unit="time" />
      <Hr />

      {/* Metronome */}
      <IconButton
        icon="metronome"
        active={metro}
        color="var(--color-orange)"
        title="Metronome"
        onClick={() => setMetro(!metro)}
      />
      <Hr />

      <div style={{ flex: 1 }} />

      {/* Master peak meter */}
      <div style={{ padding: "0 6px" }}>
        <PeakMeter l={0.62} r={0.55} width={64} />
      </div>
      <Hr />

      {/* Screen selector */}
      <div
        style={{
          display: "inline-flex",
          border: "0.5px solid var(--color-dark)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {screens.map((s) => (
          <button
            key={s.key}
            title={s.title}
            onClick={() => onScreenChange(s.key)}
            style={{
              background:
                screen === s.key
                  ? "color-mix(in srgb, var(--color-blue) 14%, transparent)"
                  : "transparent",
              border: 0,
              borderRight: "0.5px solid var(--color-dark)",
              color: screen === s.key ? "var(--color-blue)" : "var(--fg2)",
              padding: "4px 8px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Icon name={s.icon} size="13px" />
          </button>
        ))}
      </div>
      <Hr />

      {/* Performance */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.1,
          color: "var(--fg3)",
          fontSize: 9,
          fontFamily: "var(--font-mono)",
          padding: "0 6px",
        }}
      >
        <div>CPU 14%</div>
        <div>MEM 312MB</div>
      </div>
    </header>
  );
};
