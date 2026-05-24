/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnPeakMeter, StudioIcon */
const { useState: useStateStudio, useMemo: useMemoStudio } = React;

// =====================================================================
// Demo project data
// =====================================================================
const PROJECT = {
  title: "Liquid Drum 808",
  bpm: 128,
  bar: "003",
  beat: "1",
  meter: "4/4",
  online: true,
  sampleRate: 48000,
  latency: 192,
  collabs: 3,
};

const TRACKS = [
  { id: 1, name: "Playfield",   instr: "Drums",  type: "midi",  color: "var(--color-orange)", regions: [{s:1,l:5,label:"Drums A"},{s:6,l:7,label:"Drums B"}] },
  { id: 2, name: "Playfield",   instr: "Notes",  type: "midi",  color: "var(--color-yellow)", regions: [{s:1,l:1,label:"Notes",pattern:true},{s:2,l:1,label:"Notes",pattern:true},{s:3,l:1,label:"Notes",pattern:true},{s:4,l:1,label:"Notes",pattern:true}] },
  { id: 3, name: "Tape",        instr: "Audio",  type: "audio", color: "var(--color-cyan)",   regions: [{s:0.5,l:6.5,label:"vox-take.wav"},{s:8,l:5,label:"texture-pad.wav"}] },
  { id: 4, name: "Vaporisateur",instr: "Bass",   type: "midi",  color: "var(--color-purple)", regions: [{s:2,l:4,label:"Bass Lo"},{s:8,l:4,label:"Bass Hi"}] },
  { id: 5, name: "Modular",     instr: "Pad",    type: "midi",  color: "var(--color-blue)",   regions: [{s:0,l:13,label:"Pad sustained"}], muted: true },
];
const BARS = 13;

// =====================================================================
// Page
// =====================================================================
window.StudioPage = function StudioPage() {
  const [transport, setTransport] = useStateStudio("stop"); // stop | play | rec
  const [activeTrack, setActiveTrack] = useStateStudio(2);
  const [view, setView] = useStateStudio("arrange"); // arrange | mixer | piano | meter
  const [metro, setMetro] = useStateStudio(false);

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      background: "var(--bg-app)", color: "var(--fg1)",
      fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 12,
      overflow: "hidden",
    }}>
      <StudioHeader transport={transport} setTransport={setTransport} view={view} setView={setView} metro={metro} setMetro={setMetro}/>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        <Browser/>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, background: "var(--color-void)" }}>
          <Timeline activeTrack={activeTrack} setActiveTrack={setActiveTrack}/>
          <PianoRollEditor/>
          <DevicePanel/>
        </div>

        <Mixer/>
      </div>

      <StudioFooter/>
    </div>
  );
};

// =====================================================================
// Header — brand · midi/help · transport · counters · view tabs · master
// =====================================================================
function StudioHeader({ transport, setTransport, view, setView, metro, setMetro }) {
  return (
    <header style={{
      height: 52, flexShrink: 0,
      background: "var(--bg-panel)", borderBottom: "1px solid var(--line-faint)",
      display: "flex", alignItems: "center", padding: "0 10px", gap: 0,
    }}>
      {/* Brand back-link */}
      <a href="MakeSomeNoise Sessions.html" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", padding: "0 8px", height: "100%" }}>
        <MsnIcon name="msn" size="18px" color="var(--color-orange)" />
        <MsnWordmark size={13}/>
      </a>
      <Sep/>

      {/* Project title pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 10px" }}>
        <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>Project</span>
        <span style={{ color: "var(--fg1)", fontSize: 13 }}>{PROJECT.title}</span>
        <span style={{ color: "var(--color-green)", fontSize: 9, padding: "1px 5px", borderRadius: 2, border: "0.5px solid var(--color-green)", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "var(--font-mono)" }}>● saved</span>
      </div>
      <Sep/>

      {/* Undo/redo */}
      <IconBtn icon="undo" title="Undo (⌘Z)"/>
      <IconBtn icon="redo" title="Redo (⌘⇧Z)"/>
      <Sep/>

      {/* MIDI + help */}
      <IconBtn icon="midi" color="var(--color-orange)" active title="MIDI Access"/>

      <Sep/>

      {/* Transport */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 4px" }}>
        <TransportBtn name="rec"  color="var(--color-red)"   active={transport==="rec"}   onClick={()=>setTransport(t=>t==="rec"?"stop":"rec")} title="Record"/>
        <TransportBtn name="play" color="var(--color-green)" active={transport==="play"}  onClick={()=>setTransport(t=>t==="play"?"stop":"play")} title="Play (Space)"/>
        <TransportBtn name="stop" color="var(--fg1)"         active={transport==="stop"}  onClick={()=>setTransport("stop")} title="Stop"/>
        <TransportBtn name="loop" color="var(--color-orange)" title="Loop"/>
      </div>
      <Sep/>

      {/* Counters */}
      <Counter value={PROJECT.bar} unit="bar" accent="var(--fg1)" big/>
      <Counter value={PROJECT.beat} unit="beat"/>
      <Counter value={PROJECT.bpm} unit="bpm" accent="var(--color-orange)" big/>
      <Counter value={PROJECT.meter} unit="meter"/>
      <Sep/>

      {/* Metronome */}
      <button onClick={() => setMetro(v => !v)} title="Metronome" style={{
        background: "transparent", border: 0, color: metro ? "var(--color-orange)" : "var(--fg2)",
        padding: 6, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <StudioIcon name="metro" size="16px"/>
      </button>

      <div style={{ flex: 1 }}/>

      {/* Master peak */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, padding: "0 10px" }}>
        <div style={{ color: "var(--fg3)", fontSize: 9, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>Master · −2.6 dB</div>
        <MsnPeakMeter l={0.62} r={0.55} width={120}/>
      </div>
      <Sep/>

      {/* View tabs */}
      <div style={{ display: "inline-flex", border: "0.5px solid var(--line-soft)", borderRadius: 3, overflow: "hidden" }}>
        {[
          { v: "arrange", icon: "arrange", title: "Arrangement" },
          { v: "mixer",   icon: "mixer",   title: "Mixer" },
          { v: "piano",   icon: "piano",   title: "Piano roll" },
          { v: "meter",   icon: "meter",   title: "Meter" },
        ].map(o => (
          <button key={o.v} title={o.title} onClick={() => setView(o.v)} style={{
            background: view===o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
            color: view===o.v ? "var(--color-orange)" : "var(--fg2)",
            border: 0, padding: "0 10px", height: 30, cursor: "pointer",
            display: "inline-flex", alignItems: "center",
            borderRight: o.v !== "meter" ? "0.5px solid var(--line-soft)" : 0,
          }}>
            <StudioIcon name={o.icon} size="14px"/>
          </button>
        ))}
      </div>
      <Sep/>

      {/* Collab avatars */}
      <div style={{ display: "flex", alignItems: "center", gap: -4, padding: "0 8px" }}>
        <MsnAvatar name="Lex Moreau" size={24} status="online"/>
        <span style={{ marginLeft: -6 }}><MsnAvatar name="Maya Okafor" size={24} status="live"/></span>
        <span style={{ marginLeft: -6 }}><MsnAvatar name="Theo Rivera" size={24} status="online"/></span>
        <span style={{ marginLeft: 6, color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-mono)" }}>+0</span>
      </div>

      <button title="Share" style={{ background: "transparent", border: "0.5px solid var(--line-soft)", color: "var(--fg1)", borderRadius: 3, height: 28, padding: "0 10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11 }}>
        <StudioIcon name="share" size="11px"/> Share
      </button>
    </header>
  );
}

function Sep() { return <div style={{ width: 1, height: 26, background: "var(--line-soft)", margin: "0 4px" }}/>; }

function IconBtn({ icon, color="var(--fg2)", active, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      background: "transparent", border: 0,
      color: active ? color : "var(--fg2)",
      padding: 6, cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}>
      <StudioIcon name={icon} size="14px"/>
    </button>
  );
}

function TransportBtn({ name, color, active, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 28, height: 28, borderRadius: 3,
      background: active ? `color-mix(in srgb, ${color} 18%, var(--color-void))` : "var(--color-void)",
      border: `0.5px solid ${active ? color : "var(--line-soft)"}`,
      color: active ? color : "var(--fg2)",
      cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxShadow: active ? `0 0 8px -3px ${color}` : "none",
    }}>
      <StudioIcon name={name} size="13px"/>
    </button>
  );
}

function Counter({ value, unit, accent="var(--fg1)", big }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", padding: "0 10px", lineHeight: 1 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: big ? 18 : 13, color: accent, fontVariantNumeric: "tabular-nums" }}>{value}</span>
      <span style={{ fontSize: 9, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2, fontFamily: "var(--font-mono)" }}>{unit}</span>
    </div>
  );
}

// =====================================================================
// Browser sidebar — Devices / Samples / Soundfonts tabs
// =====================================================================
function Browser() {
  const [tab, setTab] = useStateStudio("samples");
  const tabs = [
    { v: "devices",    label: "Devices",    icon: "device" },
    { v: "samples",    label: "Samples",    icon: "sample" },
    { v: "soundfonts", label: "Soundfonts", icon: "font" },
  ];
  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: "var(--bg-panel)", borderRight: "1px solid var(--line-faint)",
      display: "flex", flexDirection: "column", minHeight: 0,
    }}>
      <PanelHeader icon="folder" title="Browser"/>
      <div style={{ display: "flex", borderBottom: "1px solid var(--line-faint)" }}>
        {tabs.map(t => (
          <button key={t.v} onClick={() => setTab(t.v)} style={{
            flex: 1, background: "transparent", border: 0,
            color: tab === t.v ? "var(--color-orange)" : "var(--fg3)",
            padding: "8px 0", cursor: "pointer", fontSize: 10,
            fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: 0.5,
            borderBottom: tab === t.v ? "1px solid var(--color-orange)" : "1px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid var(--line-faint)" }}>
        <button title="My library" style={{ background: "color-mix(in srgb, var(--color-orange) 14%, transparent)", border: "0.5px solid var(--color-orange)", color: "var(--color-orange)", borderRadius: 3, height: 24, width: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><StudioIcon name="folder" size="12px"/></button>
        <button title="Shared" style={{ background: "transparent", border: "0.5px solid var(--line-soft)", color: "var(--fg2)", borderRadius: 3, height: 24, width: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><MsnIcon name="users" size="12px"/></button>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, background: "var(--color-void)", border: "0.5px solid var(--line-soft)", borderRadius: 3, padding: "0 8px", height: 24 }}>
          <StudioIcon name="search" size="11px" color="var(--fg3)"/>
          <input placeholder="Filter…" style={{ flex: 1, background: "transparent", border: 0, outline: "none", color: "var(--fg1)", fontSize: 11, fontFamily: "var(--font-body)", height: "100%" }}/>
        </div>
      </div>

      {tab === "samples" && <SampleList/>}
      {tab === "devices" && <DeviceList/>}
      {tab === "soundfonts" && <SoundfontList/>}
    </aside>
  );
}

const SAMPLES = [
  { name: "175_ArcLoop_SP_01",         bpm: 175.0, sec: 5.5 },
  { name: "175_SwitchLoop_SP_03",      bpm: 175.0, sec: 2.7 },
  { name: "909 Bassdrum",              bpm:   0.0, sec: 0.5 },
  { name: "909 Clap",                  bpm:   0.0, sec: 0.5 },
  { name: "909 Closed Hat",            bpm:   0.0, sec: 0.2 },
  { name: "909 Crash",                 bpm:   0.0, sec: 1.1 },
  { name: "909 High Tom",              bpm:   0.0, sec: 0.5 },
  { name: "909 Low Tom",               bpm:   0.0, sec: 0.5 },
  { name: "909 Mid Tom",               bpm:   0.0, sec: 0.4 },
  { name: "909 Open Hat",              bpm:   0.0, sec: 0.5 },
  { name: "909 Ride",                  bpm:   0.0, sec: 1.7 },
  { name: "909 Rimshot",               bpm:   0.0, sec: 0.1 },
  { name: "909 Snare",                 bpm:   0.0, sec: 0.2 },
  { name: "Bass 01 F",                 bpm: 158.9, sec: 3.0 },
  { name: "Bass 02 F",                 bpm: 142.4, sec: 3.4 },
  { name: "Bass 03 F",                 bpm: 144.9, sec: 3.3 },
  { name: "Bass 04 F",                 bpm: 134.4, sec: 3.6 },
  { name: "Bass 05 F",                 bpm: 148.8, sec: 3.2 },
  { name: "Bass 06 F",                 bpm: 156.6, sec: 3.1 },
  { name: "Bass Loop 1 - F2",          bpm: 140.0, sec: 13.7 },
  { name: "Bass Loop 2 - F2",          bpm: 140.0, sec: 13.7 },
  { name: "Bass Loop 3 - G2",          bpm: 140.0, sec: 13.7 },
  { name: "Bass Loop 4 - G2",          bpm: 140.0, sec: 13.7 },
  { name: "Bass Loop 5 - F#2",         bpm: 140.0, sec: 13.7 },
  { name: "BV_PULSE_Drums_Tops_05_1…", bpm: 100.0, sec: 4.8 },
  { name: "BV_PULSE_Drums_Tops_08_7…", bpm: 150.0, sec: 12.8, sel: true },
  { name: "BV_PULSE_Kick_Snare_02…",   bpm: 150.0, sec: 6.4 },
  { name: "BV_PULSE_Percussion_03_75…",bpm: 150.0, sec: 6.4 },
  { name: "BVKER - Analog Full Drum 01", bpm: 100.0, sec: 9.6 },
  { name: "BVKER - Analog Full Drum 02", bpm: 105.0, sec: 4.6 },
  { name: "BVKER - Analog Full Drum 03", bpm: 110.0, sec: 8.7 },
];

function SampleList() {
  return (
    <div style={{ flex: 1, overflow: "auto", fontFamily: "var(--font-mono)", fontSize: 11 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 38px", gap: 6, padding: "6px 10px", color: "var(--fg3)", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid var(--line-faint)", position: "sticky", top: 0, background: "var(--bg-panel)" }}>
        <span>Name</span><span style={{ textAlign: "right" }}>Bpm</span><span style={{ textAlign: "right" }}>Sec</span>
      </div>
      {SAMPLES.map((s, i) => (
        <div key={i} draggable style={{
          display: "grid", gridTemplateColumns: "1fr 50px 38px", gap: 6,
          padding: "4px 10px", color: s.sel ? "rgba(0,0,0,0.85)" : "var(--fg1)",
          background: s.sel ? "var(--color-orange)" : "transparent",
          cursor: "grab", borderBottom: "1px solid var(--line-faint)",
        }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
          <span style={{ textAlign: "right", color: s.sel ? "rgba(0,0,0,0.65)" : "var(--fg2)" }}>{s.bpm.toFixed(1)}</span>
          <span style={{ textAlign: "right", color: s.sel ? "rgba(0,0,0,0.65)" : "var(--fg2)" }}>{s.sec}</span>
        </div>
      ))}
    </div>
  );
}

function DeviceList() {
  const items = [
    { name: "Playfield",    type: "Instrument", color: "var(--color-orange)" },
    { name: "Vaporisateur", type: "Instrument", color: "var(--color-purple)" },
    { name: "Modular",      type: "Instrument", color: "var(--color-blue)" },
    { name: "Tape",         type: "Instrument", color: "var(--color-cyan)" },
    { name: "Compressor",   type: "Effect",     color: "var(--color-yellow)" },
    { name: "Maximizer",    type: "Effect",     color: "var(--color-red)" },
    { name: "Revamp EQ",    type: "Effect",     color: "var(--color-green)" },
    { name: "Gate",         type: "Effect",     color: "var(--color-cyan)" },
    { name: "Reverb",       type: "Effect",     color: "var(--color-purple)" },
    { name: "Delay",        type: "Effect",     color: "var(--color-orange)" },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", fontSize: 11 }}>
      {items.map((d,i)=>(
        <div key={i} draggable style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 8, cursor: "grab", color: "var(--fg1)", borderBottom: "1px solid var(--line-faint)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: d.color }}/>
          <span style={{ flex: 1 }}>{d.name}</span>
          <span style={{ fontSize: 9, color: "var(--fg3)", fontFamily: "var(--font-mono)" }}>{d.type === "Instrument" ? "INS" : "FX"}</span>
        </div>
      ))}
    </div>
  );
}

function SoundfontList() {
  return (
    <div style={{ flex: 1, padding: "16px", color: "var(--fg3)", fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
      Drop a .sf2 / .sfz file<br/>to import a soundfont.
    </div>
  );
}

// =====================================================================
// Timeline (arrangement) — track headers + region lanes
// =====================================================================
function Timeline({ activeTrack, setActiveTrack }) {
  const ZOOM = 90; // px per bar
  const headW = 280;
  const totalW = BARS * ZOOM;

  return (
    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", borderBottom: "1px solid var(--line-soft)" }}>
      <PanelHeader icon="arrange" title="Timeline" right={<TimelineHeaderRight/>}/>

      <div style={{ display: "flex", borderBottom: "1px solid var(--line-faint)", background: "var(--bg-panel)" }}>
        <div style={{ width: headW, flexShrink: 0, padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRight: "1px solid var(--line-faint)" }}>
          <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>Markers</span>
          <span style={{ color: "var(--color-orange)", fontFamily: "var(--font-mono)", fontSize: 11 }}>✓</span>
        </div>
        {/* Loop strip */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", height: 24 }}>
          <svg width={totalW} height={24} style={{ display: "block" }}>
            {Array.from({ length: BARS + 1 }).map((_, i) => (
              <g key={i}>
                <line x1={i*ZOOM} y1={i%4===0?4:14} x2={i*ZOOM} y2={24} stroke={i%4===0?"var(--fg2)":"var(--line-soft)"} strokeWidth={1}/>
                {i < BARS && <text x={i*ZOOM + 5} y={11} fill={i===0?"var(--color-orange)":"var(--fg2)"} fontSize={10} fontFamily="var(--font-mono)">{i+1}</text>}
              </g>
            ))}
            {/* Loop region */}
            <rect x={0} y={2} width={3*ZOOM} height={4} fill="var(--color-orange)" rx={2}/>
            {/* Playhead */}
            <line x1={2.4*ZOOM} y1={0} x2={2.4*ZOOM} y2={24} stroke="var(--color-orange)" strokeWidth={1}/>
            <polygon points={`${2.4*ZOOM-5},0 ${2.4*ZOOM+5},0 ${2.4*ZOOM},6`} fill="var(--color-orange)"/>
          </svg>
        </div>
      </div>

      {/* Tracks */}
      <div style={{ maxHeight: 200, overflow: "auto" }}>
        {TRACKS.map((t, i) => (
          <TrackRow key={t.id} track={t} index={i} zoom={ZOOM} headW={headW} totalW={totalW} active={activeTrack===t.id} onSelect={()=>setActiveTrack(t.id)}/>
        ))}
        {/* Add track */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", color: "var(--fg3)", fontSize: 11, cursor: "pointer", borderBottom: "1px solid var(--line-faint)" }}>
          <StudioIcon name="add" size="12px"/> Add track
        </div>
      </div>
    </div>
  );
}

function TimelineHeaderRight() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>Snap</span>
        <select style={{
          background: "var(--color-void)", border: "0.5px solid var(--line-soft)", color: "var(--fg1)",
          fontFamily: "var(--font-display)", fontSize: 11, height: 22, padding: "0 6px", borderRadius: 2,
        }}>
          <option>Smart</option><option>1/16</option><option>1/8</option><option>1/4</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <ToolBtn icon="cursor" active title="Select"/>
        <ToolBtn icon="pencil" title="Pencil"/>
        <ToolBtn icon="scissors" title="Scissors"/>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1,2,3].map(i => (
          <button key={i} title={`Scene ${i}`} style={{ background: "var(--color-void)", border: "0.5px solid var(--line-soft)", color: "var(--fg2)", height: 22, padding: "0 8px", borderRadius: 2, fontSize: 10, fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            {i} <StudioIcon name="play" size="9px" color="var(--color-green)"/>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToolBtn({ icon, active, title }) {
  return (
    <button title={title} style={{
      background: active ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      border: "0.5px solid " + (active ? "var(--color-orange)" : "var(--line-soft)"),
      color: active ? "var(--color-orange)" : "var(--fg2)",
      width: 24, height: 22, borderRadius: 2, cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}>
      <StudioIcon name={icon} size="11px"/>
    </button>
  );
}

function TrackRow({ track, index, zoom, headW, totalW, active, onSelect }) {
  return (
    <div onClick={onSelect} style={{
      display: "flex", height: 50,
      borderBottom: "1px solid var(--line-faint)",
      background: active ? "color-mix(in srgb, var(--color-orange) 6%, transparent)" : "transparent",
      cursor: "pointer",
    }}>
      {/* Header */}
      <div style={{
        width: headW, flexShrink: 0,
        background: "var(--bg-panel)",
        borderRight: "1px solid var(--line-faint)",
        padding: "6px 8px", display: "flex", alignItems: "center", gap: 8,
        opacity: track.muted ? 0.55 : 1,
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: 3,
          background: `color-mix(in srgb, ${track.color} 16%, var(--color-void))`,
          color: track.color, border: `0.5px solid color-mix(in srgb, ${track.color} 50%, transparent)`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <StudioIcon name={track.type === "audio" ? "sample" : "piano"} size="14px"/>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: "var(--fg1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.name}</div>
          <div style={{ fontSize: 9, color: "var(--fg3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>{track.instr}</div>
        </div>
        {/* Knobs */}
        <span title="Pan" style={{ width: 14, height: 14, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, color-mix(in srgb, ${track.color} 25%, var(--color-void)), var(--color-void))`, border: `1px solid ${track.color}`, boxShadow: `0 0 4px -1px ${track.color}` }}/>
        <span title="Volume" style={{ width: 14, height: 14, borderRadius: "50%", background: `radial-gradient(circle at 65% 35%, color-mix(in srgb, var(--color-green) 30%, var(--color-void)), var(--color-void))`, border: "1px solid var(--color-green)", boxShadow: "0 0 4px -1px var(--color-green)" }}/>

        <Pill label="M" active={track.muted} color="var(--color-red)"/>
        <Pill label="S" color="var(--color-yellow)"/>
        <Pill dot color="var(--color-red)" title="Arm record"/>
        <button title="Track menu" style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer", padding: 2 }}><StudioIcon name="more" size="14px"/></button>
      </div>

      {/* Lane */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: index % 2 ? "transparent" : "rgba(255,255,255,0.012)" }}>
        <svg width={totalW} height={50} style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: BARS + 1 }).map((_, b) => (
            <line key={b} x1={b*zoom} y1={0} x2={b*zoom} y2={50} stroke={b%4===0 ? "var(--line-soft)" : "var(--line-faint)"} strokeWidth={1}/>
          ))}
        </svg>
        {/* Regions */}
        {track.regions.map((r, ri) => (
          <Region key={ri} r={r} color={track.color} type={track.type} zoom={zoom}/>
        ))}
        {/* Playhead */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 2.4*zoom, width: 1, background: "var(--color-orange)", pointerEvents: "none" }}/>
      </div>
    </div>
  );
}

function Pill({ label, dot, active, color, title }) {
  return (
    <span title={title} style={{
      width: 16, height: 16, borderRadius: 2,
      border: `0.5px solid ${active ? color : "var(--line-hover)"}`,
      background: active ? `color-mix(in srgb, ${color} 16%, transparent)` : "transparent",
      color: active ? color : "var(--fg3)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: 9, fontFamily: "var(--font-display)", fontWeight: 400,
      boxShadow: active ? `0 0 4px -1px ${color}` : "none",
    }}>{dot ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }}/> : label}</span>
  );
}

function Region({ r, color, type, zoom }) {
  return (
    <div style={{
      position: "absolute", left: r.s*zoom + 2, top: 6, width: r.l*zoom - 4, height: 38,
      background: type === "audio"
        ? `linear-gradient(180deg, color-mix(in srgb, ${color} 22%, var(--color-void)), color-mix(in srgb, ${color} 8%, var(--color-void)))`
        : `color-mix(in srgb, ${color} 22%, var(--color-void))`,
      border: `0.5px solid ${color}`,
      borderRadius: 2, padding: "3px 6px",
      fontSize: 9, color: "var(--fg1)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      fontFamily: type === "audio" ? "var(--font-mono)" : "var(--font-display)",
      overflow: "hidden",
      boxShadow: `inset 0 0 0 0.5px color-mix(in srgb, ${color} 40%, transparent)`,
    }}>
      <span style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", color }}>{r.label}</span>
      {type === "audio" ? (
        <svg viewBox="0 0 120 14" preserveAspectRatio="none" style={{ width: "100%", height: 14, color }}>
          <path d="M0 7 L4 4 L8 9 L12 3 L16 10 L20 5 L24 8 L28 2 L32 9 L36 4 L40 7 L44 10 L48 3 L52 8 L56 5 L60 9 L64 4 L68 7 L72 8 L76 5 L80 9 L84 3 L88 7 L92 8 L96 4 L100 7 L104 5 L108 8 L112 4 L116 6 L120 7" stroke="currentColor" strokeWidth="0.7" fill="none"/>
        </svg>
      ) : (r.pattern ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[0,1,2].map(k => (
            <div key={k} style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: 16 }).map((_, j) => (
                <div key={j} style={{
                  width: (r.l*zoom - 24) / 16 - 2, height: 2,
                  background: ((j + k) % 4 === 0) ? color : "transparent",
                  borderRadius: 1,
                }}/>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, height: 14, justifyContent: "flex-end" }}>
          {[0.4, 0.7, 0.55, 0.6].map((v, k) => (<div key={k} style={{ height: 1.5, background: color, width: `${v*100}%`, opacity: 0.7, borderRadius: 0.5 }}/>))}
        </div>
      ))}
    </div>
  );
}

// =====================================================================
// Piano-roll editor
// =====================================================================
function PianoRollEditor() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", borderBottom: "1px solid var(--line-soft)", minHeight: 220, background: "var(--bg-panel)" }}>
      <PanelHeader icon="piano" title="Editor — Playfield · Notes" right={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>Snap</span>
          <select style={{ background: "var(--color-void)", border: "0.5px solid var(--line-soft)", color: "var(--fg1)", fontSize: 11, height: 22, padding: "0 6px" }}><option>Smart</option></select>
          <span style={{ color: "var(--fg3)" }}>|</span>
          <span style={{ color: "var(--color-orange)", fontSize: 11, cursor: "pointer" }}>View</span>
          <span style={{ color: "var(--fg3)", fontSize: 11, cursor: "pointer" }}>Edit</span>
        </div>
      }/>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Note inspector */}
        <div style={{ width: 240, flexShrink: 0, borderRight: "1px solid var(--line-faint)", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg2)" }}>
          <NoteField icon="C" label="Key" value="F#3"/>
          <NoteField icon="L" label="Length" value="000.0.1.000"/>
          <NoteField icon="V" label="Velocity" value="79 %"/>
          <NoteField icon="P" label="Cents" value="0 cents"/>
          <NoteField icon="C" label="Chance" value="100 %"/>
          <NoteField icon="#" label="Repeat" value="1"/>
          <NoteField icon="∼" label="Curve" value="0 %"/>
        </div>

        {/* Piano keys + grid */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", minWidth: 0 }}>
          <PianoKeys/>
          <div style={{ flex: 1, position: "relative", overflow: "auto", background: "var(--color-void)" }}>
            <PianoGrid/>
          </div>
        </div>
      </div>

      {/* Velocity strip */}
      <VelocityStrip/>
    </div>
  );
}

function NoteField({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 18, height: 18, borderRadius: 2, background: "var(--color-void)", border: "0.5px solid var(--line-soft)", color: "var(--color-orange)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{icon}</span>
      <span style={{ color: "var(--fg3)", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5, width: 50 }}>{label}</span>
      <span style={{ flex: 1, background: "var(--color-void)", border: "0.5px solid var(--line-soft)", borderRadius: 2, padding: "3px 8px", color: "var(--fg1)", fontSize: 11 }}>{value}</span>
    </div>
  );
}

function PianoKeys() {
  // 24 keys, C4–C6, with C5 highlighted
  const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const keys = [];
  for (let oct = 6; oct >= 4; oct--) for (let n = 11; n >= 0; n--) keys.push({ note: NOTES[n], oct });
  return (
    <div style={{ width: 36, flexShrink: 0, background: "var(--bg-panel)", borderRight: "1px solid var(--line-faint)", overflow: "hidden" }}>
      {keys.map((k,i) => {
        const isBlack = k.note.includes("#");
        const isC = k.note === "C";
        const isC5 = isC && k.oct === 5;
        return (
          <div key={i} style={{
            height: 12, display: "flex", alignItems: "center", justifyContent: "flex-end",
            paddingRight: 4,
            background: isC5 ? "var(--color-orange)" : isBlack ? "var(--color-shadow)" : "var(--bg-panel)",
            color: isC5 ? "rgba(0,0,0,0.85)" : isC ? "var(--fg2)" : "transparent",
            fontFamily: "var(--font-mono)", fontSize: 8,
            borderBottom: "0.5px solid var(--line-faint)",
          }}>{isC ? `C${k.oct}` : ""}</div>
        );
      })}
    </div>
  );
}

function PianoGrid() {
  const COLS = 32; // 16th-note cells across ~4 bars
  const ROWS = 36; // 3 octaves visible
  // notes scattered in a melodic pattern
  const notes = [
    { c: 2,  r: 18, len: 2, v: 0.7 },
    { c: 5,  r: 16, len: 2, v: 0.85 },
    { c: 8,  r: 14, len: 2, v: 0.6 },
    { c: 11, r: 16, len: 2, v: 0.78 },
    { c: 14, r: 18, len: 2, v: 0.7 },
    { c: 17, r: 20, len: 2, v: 0.65 },
    { c: 20, r: 18, len: 2, v: 0.7 },
    { c: 23, r: 14, len: 4, v: 0.9 },
  ];
  const cellW = 24, cellH = 12;
  const W = COLS * cellW, H = ROWS * cellH;
  return (
    <div style={{ width: W, height: H, position: "relative" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {/* Row backgrounds (alt for black keys) */}
        {Array.from({ length: ROWS }).map((_, r) => {
          const noteIdx = (12 - (r % 12) - 1 + 12) % 12;
          const isBlack = [1,3,6,8,10].includes(noteIdx);
          return <rect key={r} x={0} y={r*cellH} width={W} height={cellH} fill={isBlack ? "rgba(255,255,255,0.018)" : "transparent"}/>;
        })}
        {/* Vertical grid */}
        {Array.from({ length: COLS+1 }).map((_, c) => (
          <line key={c} x1={c*cellW} y1={0} x2={c*cellW} y2={H} stroke={c%4===0?"var(--line-soft)":"var(--line-faint)"} strokeWidth={1}/>
        ))}
        {/* Bar numbers */}
        {Array.from({ length: 5 }).map((_, b) => (
          <text key={b} x={b*cellW*8 + 5} y={10} fill="var(--fg2)" fontSize={9} fontFamily="var(--font-mono)">{b+1}{b>0 && `\u00B7${(b%4)+1}`}</text>
        ))}
        {/* Notes */}
        {notes.map((n, i) => (
          <rect key={i} x={n.c*cellW + 1} y={n.r*cellH + 1} width={n.len*cellW - 2} height={cellH - 2}
            fill="var(--color-orange)" rx={1}
            opacity={0.55 + n.v * 0.4}
            style={{ filter: "drop-shadow(0 0 3px var(--color-orange))" }}/>
        ))}
        {/* Playhead */}
        <line x1={6*cellW} y1={0} x2={6*cellW} y2={H} stroke="var(--color-orange)" strokeWidth={1} opacity={0.7}/>
      </svg>
    </div>
  );
}

function VelocityStrip() {
  const vels = [0.7, 0.85, 0.6, 0.78, 0.7, 0.65, 0.7, 0.9];
  return (
    <div style={{ height: 70, borderTop: "1px solid var(--line-faint)", display: "flex", background: "var(--bg-panel)" }}>
      <div style={{ width: 240, flexShrink: 0, padding: "8px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid var(--line-faint)" }}>
        <select style={{ background: "var(--color-void)", border: "0.5px solid var(--line-soft)", color: "var(--fg1)", fontSize: 11, height: 22, padding: "0 6px", width: 100 }}>
          <option>Velocity</option><option>Pitch</option><option>Mod</option>
        </select>
        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fg3)", fontSize: 9, fontFamily: "var(--font-mono)" }}>
          <span>0%</span><span>100%</span>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", padding: "8px 12px", overflow: "hidden" }}>
        <svg width="100%" height="54" preserveAspectRatio="none" viewBox={`0 0 ${vels.length*60} 54`} style={{ display: "block" }}>
          <line x1={0} y1={54} x2={vels.length*60} y2={54} stroke="var(--line-faint)" strokeWidth={0.5}/>
          {vels.map((v, i) => (
            <g key={i}>
              <line x1={i*60+30} y1={54} x2={i*60+30} y2={54 - v*48} stroke="var(--color-orange)" strokeWidth={2}/>
              <circle cx={i*60+30} cy={54 - v*48} r={3} fill="var(--color-orange)"/>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// =====================================================================
// Devices panel — Tape device with reels
// =====================================================================
function DevicePanel() {
  return (
    <div style={{ height: 200, flexShrink: 0, display: "flex", flexDirection: "column", background: "var(--bg-panel)", borderTop: "1px solid var(--line-soft)" }}>
      <PanelHeader icon="device" title="Devices" right={
        <span style={{ color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-body)" }}>Drag an effect from the <span style={{ color: "var(--color-orange)", padding: "1px 6px", border: "0.5px solid var(--color-orange)", borderRadius: 2, marginLeft: 2 }}>Device Browser</span></span>
      }/>
      <div style={{ flex: 1, display: "flex", overflow: "hidden", padding: 12, gap: 12 }}>
        <DeviceCard active title="Tape" color="var(--color-cyan)">
          <TapeReels/>
        </DeviceCard>
        <DeviceCard title="Compressor" color="var(--color-yellow)" placeholder/>
        <DeviceCard title="Reverb" color="var(--color-purple)" placeholder/>
        <button title="Add device" style={{
          width: 40, alignSelf: "stretch", background: "transparent", border: "0.5px dashed var(--line-soft)",
          borderRadius: 4, color: "var(--fg3)", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}><StudioIcon name="add" size="14px"/></button>
      </div>
    </div>
  );
}

function DeviceCard({ title, color, active, placeholder, children }) {
  return (
    <div style={{
      width: 280, flexShrink: 0, background: "var(--color-void)",
      border: `0.5px solid ${active ? color : "var(--line-soft)"}`,
      borderRadius: 4, display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: active ? `0 0 14px -8px ${color}` : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderBottom: `0.5px solid ${active ? color : "var(--line-faint)"}`, background: `color-mix(in srgb, ${color} 8%, transparent)` }}>
        <span style={{ width: 18, height: 18, borderRadius: 3, background: `color-mix(in srgb, ${color} 18%, var(--color-void))`, color, border: `0.5px solid ${color}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <StudioIcon name="device" size="11px"/>
        </span>
        <button title="Power" style={{ background: "transparent", border: 0, color: active ? color : "var(--fg3)", cursor: "pointer", padding: 0 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M11 3h2v9h-2zM6 6.6L4.6 8a8 8 0 1 0 14.8 0L18 6.6a6 6 0 1 1-12 0z"/></svg>
        </button>
        <span style={{ flex: 1, color: "var(--fg1)", fontSize: 12 }}>{title}</span>
        <button style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer" }}><StudioIcon name="more" size="14px"/></button>
      </div>
      <div style={{ flex: 1, padding: 12, display: "flex", alignItems: "center", justifyContent: "center", color: placeholder ? "var(--fg3)" : "inherit", fontSize: 11 }}>
        {placeholder ? "—" : children}
      </div>
    </div>
  );
}

function TapeReels() {
  return (
    <svg viewBox="0 0 220 130" width="100%" height="100%" style={{ color: "var(--color-cyan)" }}>
      <defs>
        <radialGradient id="reel" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="color-mix(in srgb, currentColor 40%, var(--color-void))"/>
          <stop offset="100%" stopColor="var(--color-void)"/>
        </radialGradient>
      </defs>
      {[55, 165].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={55} r={42} fill="url(#reel)" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1}/>
          <circle cx={cx} cy={55} r={11} fill="none" stroke="currentColor" strokeWidth={1}/>
          <circle cx={cx} cy={55} r={4} fill="currentColor"/>
          <circle cx={cx-3} cy={55-2} r={2.5} fill="var(--color-void)" stroke="currentColor" strokeWidth={0.6}/>
          {/* spokes */}
          {[0,60,120,180,240,300].map(a => (
            <line key={a} x1={cx} y1={55} x2={cx + 38*Math.cos((a+i*12)*Math.PI/180)} y2={55 + 38*Math.sin((a+i*12)*Math.PI/180)} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5}/>
          ))}
        </g>
      ))}
      {/* Tape path */}
      <path d="M55 97 Q 110 130 165 97" stroke="currentColor" strokeWidth={1} fill="none" opacity={0.5}/>
      <path d="M13 100 L 207 100" stroke="currentColor" strokeWidth={0.5} fill="none" opacity={0.3}/>
      <line x1={97} y1={100} x2={123} y2={100} stroke="currentColor" strokeWidth={3}/>
    </svg>
  );
}

// =====================================================================
// Mixer (right edge, vertical strip)
// =====================================================================
function Mixer() {
  return (
    <aside style={{ width: 100, flexShrink: 0, background: "var(--bg-panel)", borderLeft: "1px solid var(--line-soft)", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <PanelHeader icon="mixer" title="Mixer"/>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: 10, gap: 8 }}>
        {/* Master strip */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--fg3)" }}>
          <span style={{ color: "var(--fg1)", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5 }}>0.00</span>
          <span style={{ color: "var(--color-orange)", fontSize: 9 }}>−2.6</span>
          <div style={{ position: "relative", height: 280, width: 40, display: "flex", justifyContent: "center", alignItems: "stretch", background: "var(--color-void)", borderRadius: 2, border: "0.5px solid var(--line-faint)" }}>
            {/* tick scale */}
            <svg width={40} height={280} style={{ position: "absolute", inset: 0 }}>
              {[0,-6,-12,-18,-24,-30,-36,-42,-48,-54].map((db, i) => {
                const y = 18 + i * 26;
                return (<g key={i}>
                  <line x1={6} y1={y} x2={10} y2={y} stroke="var(--line-soft)" strokeWidth={0.5}/>
                  <text x={34} y={y+3} fill="var(--fg3)" fontSize={7} textAnchor="end" fontFamily="var(--font-mono)">{db}</text>
                </g>);
              })}
            </svg>
            {/* meter pair */}
            <div style={{ display: "flex", gap: 1, marginTop: 4, marginBottom: 4 }}>
              {[0.62, 0.55].map((v, i) => (
                <div key={i} style={{ width: 7, height: "100%", background: "rgba(255,255,255,0.04)", display: "flex", flexDirection: "column-reverse" }}>
                  <div style={{ height: `${v*100}%`, background: "linear-gradient(0deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%)" }}/>
                </div>
              ))}
            </div>
            {/* fader cap */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 38, width: 28, height: 6, background: "var(--color-orange)", borderRadius: 1, boxShadow: "0 0 6px -1px var(--color-orange)" }}/>
          </div>
          <div style={{ fontSize: 9, color: "var(--fg3)" }}>db</div>
          <div style={{ display: "flex", gap: 3 }}>
            <Pill label="M" color="var(--color-red)"/>
            <Pill label="S" color="var(--color-yellow)"/>
          </div>
          <div style={{ color: "var(--fg1)", fontSize: 10, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: 0.5 }}>Master</div>
        </div>
      </div>
    </aside>
  );
}

// =====================================================================
// Footer status bar
// =====================================================================
function StudioFooter() {
  const Item = ({ label, value, accent }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 12px", height: "100%", borderRight: "1px solid var(--line-faint)", color: "var(--fg2)", fontFamily: "var(--font-mono)", fontSize: 10 }}>
      <span style={{ color: "var(--fg3)", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      <span style={{ color: accent || "var(--fg1)" }}>{value}</span>
    </span>
  );
  return (
    <footer style={{ height: 26, flexShrink: 0, background: "var(--bg-panel)", borderTop: "1px solid var(--line-faint)", display: "flex", alignItems: "stretch" }}>
      <Item label="Online" value={<span style={{ color: "var(--color-green)" }}>● Yes</span>}/>
      <Item label="Project" value={PROJECT.title}/>
      <Item label="Sample rate" value="48 000 Hz"/>
      <Item label="Latency" value="192.0 ms" accent="var(--color-yellow)"/>
      <Item label="Users" value={`${PROJECT.collabs} live`}/>
      <div style={{ flex: 1 }}/>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "0 12px", color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)" }}>
        <a style={{ color: "var(--fg3)" }}>Privacy</a>
        <a style={{ color: "var(--fg3)" }}>Imprint</a>
      </span>
    </footer>
  );
}

// =====================================================================
// Helpers
// =====================================================================
function PanelHeader({ icon, title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 30, padding: "0 12px", background: "var(--bg-panel)", borderBottom: "1px solid var(--line-faint)" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--fg2)", fontSize: 11 }}>
        <StudioIcon name={icon} size="12px" color="var(--color-orange)"/>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>{title}</span>
      </span>
      {right}
    </div>
  );
}
