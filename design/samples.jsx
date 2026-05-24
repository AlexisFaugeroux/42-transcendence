/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnWaveform */
const { useState: useStateSamples, useMemo: useMemoSamples, useRef: useRefSamples } = React;

// =====================================================================
// Sample dataset — deterministic, varied
// =====================================================================
const SAMPLE_KINDS = ["one-shot", "loop", "field", "vocal", "stem"];
const SAMPLE_FAMILIES = ["drums", "bass", "synth", "vocal", "fx", "perc", "texture"];
const SAMPLE_PACKS = ["Garage Tape Vol.2", "Field Lyon 04", "Cassette Drums", "Modular Cells", "Vocal Chops 03", "Personal", "Granular Pads"];

const SAMPLES = [
  { id:  1, name: "kick_garage_07.wav",       family: "drums",   kind: "one-shot", bpm: null, key: null,    dur: "0:01", size: 2.3,   pack: "Cassette Drums",      added: "2h ago",   tags: ["punchy","808"],     fav: true,  seed: "kick07" },
  { id:  2, name: "loop_house_124_C.wav",     family: "drums",   kind: "loop",     bpm: 124,  key: "C min", dur: "0:08", size: 4.1,   pack: "Garage Tape Vol.2",   added: "yesterday", tags: ["house","groove"],  fav: false, seed: "loop124" },
  { id:  3, name: "subbass_140_F.wav",        family: "bass",    kind: "one-shot", bpm: 140,  key: "F min", dur: "0:02", size: 1.8,   pack: "Modular Cells",       added: "3d ago",   tags: ["sub","clean"],     fav: true,  seed: "sub140" },
  { id:  4, name: "vox_breath_long.wav",      family: "vocal",   kind: "vocal",    bpm: null, key: "A maj", dur: "0:14", size: 7.2,   pack: "Vocal Chops 03",      added: "3d ago",   tags: ["airy","texture"],  fav: false, seed: "voxlong" },
  { id:  5, name: "field_cafe_lyon_03.flac",  family: "texture", kind: "field",    bpm: null, key: null,    dur: "1:42", size: 38.4,  pack: "Field Lyon 04",       added: "5d ago",   tags: ["ambience","city"], fav: false, seed: "fieldcafe" },
  { id:  6, name: "snare_room_dust.wav",      family: "drums",   kind: "one-shot", bpm: null, key: null,    dur: "0:01", size: 1.6,   pack: "Cassette Drums",      added: "1w ago",   tags: ["dusty","mid"],     fav: false, seed: "snareroom" },
  { id:  7, name: "pad_granular_Cmin.wav",    family: "synth",   kind: "loop",     bpm: 88,   key: "C min", dur: "0:32", size: 12.7,  pack: "Granular Pads",       added: "1w ago",   tags: ["pad","airy"],      fav: true,  seed: "padgran" },
  { id:  8, name: "perc_shaker_off.wav",      family: "perc",    kind: "loop",     bpm: 120,  key: null,    dur: "0:04", size: 2.0,   pack: "Garage Tape Vol.2",   added: "1w ago",   tags: ["off-grid"],        fav: false, seed: "shakeroff" },
  { id:  9, name: "fx_riser_long.wav",        family: "fx",      kind: "one-shot", bpm: null, key: null,    dur: "0:06", size: 3.4,   pack: "Personal",            added: "2w ago",   tags: ["riser","build"],   fav: false, seed: "fxriser" },
  { id: 10, name: "vox_chop_amaj_03.wav",     family: "vocal",   kind: "vocal",    bpm: 92,   key: "A maj", dur: "0:03", size: 2.2,   pack: "Vocal Chops 03",      added: "2w ago",   tags: ["chop","wet"],      fav: true,  seed: "voxchop" },
  { id: 11, name: "hat_open_brushed.wav",     family: "drums",   kind: "one-shot", bpm: null, key: null,    dur: "0:01", size: 1.1,   pack: "Cassette Drums",      added: "2w ago",   tags: ["brush","bright"],  fav: false, seed: "hatopen" },
  { id: 12, name: "stem_rhodes_take2.wav",    family: "synth",   kind: "stem",     bpm: 96,   key: "G min", dur: "2:14", size: 48.6,  pack: "Personal",            added: "3w ago",   tags: ["rhodes","warm"],   fav: false, seed: "rhodes2" },
  { id: 13, name: "field_train_st.flac",      family: "texture", kind: "field",    bpm: null, key: null,    dur: "0:48", size: 22.1,  pack: "Field Lyon 04",       added: "3w ago",   tags: ["transport"],       fav: false, seed: "fieldtrain" },
  { id: 14, name: "bass_slap_one.wav",        family: "bass",    kind: "one-shot", bpm: null, key: "E min", dur: "0:01", size: 0.8,   pack: "Modular Cells",       added: "4w ago",   tags: ["slap","short"],    fav: false, seed: "bassslap" },
  { id: 15, name: "loop_breakbeat_172.wav",   family: "drums",   kind: "loop",     bpm: 172,  key: null,    dur: "0:05", size: 2.7,   pack: "Cassette Drums",      added: "5w ago",   tags: ["jungle","break"],  fav: true,  seed: "break172" },
  { id: 16, name: "fx_swell_dark.wav",        family: "fx",      kind: "one-shot", bpm: null, key: null,    dur: "0:09", size: 4.6,   pack: "Personal",            added: "6w ago",   tags: ["swell","dark"],    fav: false, seed: "fxswell" },
  { id: 17, name: "perc_woodblock_a.wav",     family: "perc",    kind: "one-shot", bpm: null, key: null,    dur: "0:01", size: 0.4,   pack: "Garage Tape Vol.2",   added: "8w ago",   tags: ["wood","tight"],    fav: false, seed: "wood_a" },
  { id: 18, name: "synth_arp_140_Dmin.wav",   family: "synth",   kind: "loop",     bpm: 140,  key: "D min", dur: "0:11", size: 5.3,   pack: "Modular Cells",       added: "9w ago",   tags: ["arp","driving"],   fav: false, seed: "arp140" },
];

const STORAGE_LIMIT_GB = 4;
const STORAGE_LIMIT_MB = STORAGE_LIMIT_GB * 1024;

// =====================================================================
// Page
// =====================================================================
window.SamplesPage = function SamplesPage() {
  // Filters & sort
  const [query, setQuery]     = useStateSamples("");
  const [family, setFamily]   = useStateSamples("all");
  const [kind, setKind]       = useStateSamples("all");
  const [favOnly, setFavOnly] = useStateSamples(false);
  const [sort, setSort]       = useStateSamples("recent"); // recent | name | duration | size | bpm
  const [view, setView]       = useStateSamples("list");   // list | grid
  const [selected, setSelected] = useStateSamples(new Set());
  const [playingId, setPlayingId] = useStateSamples(null);
  const [confirmDelete, setConfirmDelete] = useStateSamples(null); // sample obj or "selection"
  const [uploadOpen, setUploadOpen] = useStateSamples(false);

  // Derived
  const filtered = useMemoSamples(() => {
    let rows = SAMPLES.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.pack.toLowerCase().includes(q) || r.tags.some(t => t.includes(q)));
    }
    if (family !== "all") rows = rows.filter(r => r.family === family);
    if (kind !== "all")   rows = rows.filter(r => r.kind === kind);
    if (favOnly)          rows = rows.filter(r => r.fav);
    rows.sort((a,b) => {
      switch (sort) {
        case "name":     return a.name.localeCompare(b.name);
        case "duration": return parseDur(a.dur) - parseDur(b.dur);
        case "size":     return b.size - a.size;
        case "bpm":      return (a.bpm ?? 999) - (b.bpm ?? 999);
        case "recent":
        default:         return SAMPLES.indexOf(a) - SAMPLES.indexOf(b);
      }
    });
    return rows;
  }, [query, family, kind, favOnly, sort]);

  const usedMB = SAMPLES.reduce((acc, s) => acc + s.size, 0);
  const usedPct = Math.min(1, usedMB / STORAGE_LIMIT_MB);

  // Selection helpers
  const toggleSel = (id) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(r => r.id)));
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-app)", color: "var(--fg1)",
      fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 300,
    }}>
      <SamplesHeader />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 80px" }}>
        {/* Title row + storage */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 22 }}>
          <div>
            <div style={{ color: "var(--color-orange)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "var(--font-mono)" }}>Library</div>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400, letterSpacing: -0.01 }}>Samples</h1>
            <p style={{ margin: "6px 0 0", color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 13 }}>
              {SAMPLES.length} sounds · {Math.round(usedMB)} MB used of {STORAGE_LIMIT_GB} GB
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <MsnFramed color="var(--fg1)" size="lg"><MsnIcon name="folder" size="13px" /> New folder</MsnFramed>
            <MsnSolid color="var(--color-orange)" size="lg" onClick={() => setUploadOpen(true)}>
              <MsnIcon name="plus" size="13px" /> Add sample
            </MsnSolid>
          </div>
        </div>

        {/* Storage bar */}
        <StorageBar usedMB={usedMB} limitMB={STORAGE_LIMIT_MB} />

        {/* Toolbar */}
        <Toolbar
          query={query} setQuery={setQuery}
          family={family} setFamily={setFamily}
          kind={kind} setKind={setKind}
          favOnly={favOnly} setFavOnly={setFavOnly}
          sort={sort} setSort={setSort}
          view={view} setView={setView}
          totalCount={SAMPLES.length}
          shownCount={filtered.length}
        />

        {/* Selection bar — appears when any selected */}
        {selected.size > 0 && (
          <SelectionBar
            count={selected.size}
            onClear={() => setSelected(new Set())}
            onDelete={() => setConfirmDelete("selection")}
          />
        )}

        {/* List or grid */}
        {filtered.length === 0 ? (
          <EmptyState onClear={() => { setQuery(""); setFamily("all"); setKind("all"); setFavOnly(false); }} />
        ) : view === "list" ? (
          <SampleTable
            rows={filtered}
            selected={selected}
            allSelected={selected.size === filtered.length && filtered.length > 0}
            onToggle={toggleSel}
            onToggleAll={toggleAll}
            playingId={playingId}
            onPlay={(id) => setPlayingId(p => p === id ? null : id)}
            onDelete={(s) => setConfirmDelete(s)}
          />
        ) : (
          <SampleGrid
            rows={filtered}
            playingId={playingId}
            onPlay={(id) => setPlayingId(p => p === id ? null : id)}
            onDelete={(s) => setConfirmDelete(s)}
          />
        )}
      </div>

      {/* Modals */}
      {confirmDelete && (
        <DeleteSampleModal
          target={confirmDelete}
          selectedCount={selected.size}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => { setConfirmDelete(null); setSelected(new Set()); }}
        />
      )}
      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} usedMB={usedMB} limitMB={STORAGE_LIMIT_MB} />}
    </div>
  );
};

// =====================================================================
// Header
// =====================================================================
function SamplesHeader() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="MakeSomeNoise Landing.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} />
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 12 }}>
        <a href="MakeSomeNoise Home.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Home</a>
        <a style={{ color: "var(--fg2)" }}>Sessions</a>
        <span style={{ color: "var(--color-orange)" }}>Library</span>
        <a href="MakeSomeNoise Dashboard.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Settings</a>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button title="Notifications" style={{ background: "transparent", border: 0, color: "var(--fg2)", cursor: "pointer" }}>
          <MsnIcon name="bell" size="16px" />
        </button>
        <a href="MakeSomeNoise Dashboard.html" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <MsnAvatar name="lex moreau" size={28} status="online" />
          <span style={{ color: "var(--fg1)", fontSize: 12 }}>@lex.moreau</span>
        </a>
      </div>
    </header>
  );
}

// =====================================================================
// Storage bar
// =====================================================================
function StorageBar({ usedMB, limitMB }) {
  const pct = Math.min(1, usedMB / limitMB);
  const remaining = Math.max(0, limitMB - usedMB);
  const warn = pct > 0.8;
  // Stack by family for the bar
  const byFamily = {};
  SAMPLES.forEach(s => { byFamily[s.family] = (byFamily[s.family] || 0) + s.size; });
  const familyOrder = ["drums","bass","synth","vocal","perc","texture","fx"];
  const familyColors = {
    drums:   "var(--color-orange)",
    bass:    "var(--color-red)",
    synth:   "var(--color-blue)",
    vocal:   "var(--color-yellow)",
    perc:    "var(--color-green)",
    texture: "var(--color-cyan)",
    fx:      "var(--color-purple)",
  };

  return (
    <div style={{
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4, padding: "16px 18px",
      marginBottom: 22,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 11, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: 1 }}>Storage</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg1)" }}>
            <span style={{ color: warn ? "var(--color-yellow)" : "var(--color-orange)" }}>{formatMB(usedMB)}</span>
            <span style={{ color: "var(--fg3)" }}> / {STORAGE_LIMIT_GB} GB</span>
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg3)" }}>
            ({Math.round(pct*100)}% — {formatMB(remaining)} free)
          </span>
        </div>
        <a style={{ color: "var(--color-blue)", fontSize: 12, fontFamily: "var(--font-display)" }}>Upgrade plan →</a>
      </div>

      {/* Stacked bar */}
      <div style={{
        height: 10, borderRadius: 2, overflow: "hidden",
        background: "var(--color-void)",
        border: "0.5px solid var(--line-soft)",
        display: "flex",
      }}>
        {familyOrder.map(f => {
          const w = (byFamily[f] || 0) / limitMB;
          if (w === 0) return null;
          return <div key={f} title={`${f} — ${formatMB(byFamily[f])}`}
            style={{ width: `${w * 100}%`, background: familyColors[f], height: "100%" }} />;
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10 }}>
        {familyOrder.filter(f => byFamily[f]).map(f => (
          <div key={f} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg2)", fontFamily: "var(--font-mono)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 1, background: familyColors[f] }} />
            {f}
            <span style={{ color: "var(--fg3)" }}>{formatMB(byFamily[f])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// Toolbar (search + filters + sort + view)
// =====================================================================
function Toolbar({ query, setQuery, family, setFamily, kind, setKind, favOnly, setFavOnly, sort, setSort, view, setView, totalCount, shownCount }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10,
      padding: "12px 14px", borderRadius: 4,
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      marginBottom: 14,
    }}>
      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "var(--color-void)",
        border: "0.5px solid var(--line-soft)",
        borderRadius: 3, padding: "0 10px", height: 30, width: 280,
      }}>
        <MsnIcon name="search" size="13px" color="var(--fg3)" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, pack, tag…"
          style={{
            flex: 1, background: "transparent", border: 0, outline: "none",
            color: "var(--fg1)", fontFamily: "var(--font-body)", fontSize: 13, height: "100%",
          }}
        />
        {query && <button onClick={() => setQuery("")} style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer" }}>×</button>}
      </div>

      <Divider />

      {/* Family filter */}
      <Select label="Family" value={family} onChange={setFamily} options={[
        { v: "all", label: "All families" },
        ...SAMPLE_FAMILIES.map(f => ({ v: f, label: f }))
      ]} />

      {/* Kind filter */}
      <Select label="Type" value={kind} onChange={setKind} options={[
        { v: "all", label: "All types" },
        ...SAMPLE_KINDS.map(k => ({ v: k, label: k }))
      ]} />

      {/* Favorites toggle */}
      <button onClick={() => setFavOnly(v => !v)} style={{
        height: 30, padding: "0 10px", borderRadius: 3,
        border: `0.5px solid ${favOnly ? "var(--color-orange)" : "var(--line-soft)"}`,
        background: favOnly ? "color-mix(in srgb, var(--color-orange) 12%, transparent)" : "transparent",
        color: favOnly ? "var(--color-orange)" : "var(--fg2)",
        display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
        fontFamily: "var(--font-display)", fontSize: 12,
      }}>
        <MsnIcon name="heart" size="11px" /> Favorites
      </button>

      <div style={{ flex: 1 }} />

      {/* Count */}
      <span style={{ color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
        {shownCount}/{totalCount}
      </span>

      <Divider />

      {/* Sort */}
      <Select label="Sort" value={sort} onChange={setSort} options={[
        { v: "recent",   label: "Recently added" },
        { v: "name",     label: "Name (A→Z)" },
        { v: "duration", label: "Duration" },
        { v: "size",     label: "Size" },
        { v: "bpm",      label: "BPM" },
      ]} />

      {/* View toggle */}
      <div style={{ display: "inline-flex", border: "0.5px solid var(--line-soft)", borderRadius: 3, overflow: "hidden" }}>
        {[
          { v: "list", icon: "list" },
          { v: "grid", icon: "grid" },
        ].map(o => (
          <button key={o.v} onClick={() => setView(o.v)} style={{
            background: view === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
            color: view === o.v ? "var(--color-orange)" : "var(--fg2)",
            border: 0, padding: "0 10px", height: 30, cursor: "pointer",
            display: "inline-flex", alignItems: "center",
            borderRight: o.v === "list" ? "0.5px solid var(--line-soft)" : 0,
          }}>
            <MsnIcon name={o.icon} size="13px" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>
      {label}
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            appearance: "none",
            background: "var(--color-void)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 3,
            color: "var(--fg1)",
            fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 300,
            height: 30, padding: "0 24px 0 10px",
            cursor: "pointer",
            textTransform: "none", letterSpacing: 0,
          }}>
          {options.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
        </select>
        <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--fg3)" }}>
          <MsnIcon name="triangle" size="9px" />
        </span>
      </div>
    </label>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 18, background: "var(--line-soft)" }} />;
}

// =====================================================================
// Selection bar
// =====================================================================
function SelectionBar({ count, onClear, onDelete }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
      padding: "10px 14px", borderRadius: 4,
      background: "color-mix(in srgb, var(--color-orange) 10%, var(--bg-panel-2))",
      border: "0.5px solid color-mix(in srgb, var(--color-orange) 50%, transparent)",
      marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--fg1)", fontSize: 12 }}>
        <span style={{ color: "var(--color-orange)", fontFamily: "var(--font-mono)" }}>{count} selected</span>
        <button onClick={onClear} style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer", fontSize: 11, fontFamily: "var(--font-mono)" }}>clear</button>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <MsnFramed color="var(--fg1)" size="sm"><MsnIcon name="folder" size="11px" /> Move to…</MsnFramed>
        <MsnFramed color="var(--fg1)" size="sm"><MsnIcon name="download" size="11px" /> Download</MsnFramed>
        <MsnFramed color="var(--color-red)" size="sm" onClick={onDelete}>Delete</MsnFramed>
      </div>
    </div>
  );
}

// =====================================================================
// Sample table (list view)
// =====================================================================
function SampleTable({ rows, selected, allSelected, onToggle, onToggleAll, playingId, onPlay, onDelete }) {
  const colWidths = "32px 48px 1.6fr 1.4fr 92px 80px 90px 76px 110px";
  return (
    <div style={{
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4, overflow: "hidden",
    }}>
      {/* Header row */}
      <div style={{
        display: "grid", gridTemplateColumns: colWidths, gap: 12,
        alignItems: "center", padding: "10px 14px",
        color: "var(--fg3)", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5,
        borderBottom: "1px solid var(--line-soft)",
        background: "var(--bg-panel)",
      }}>
        <Check checked={allSelected} onChange={onToggleAll} />
        <span></span>
        <span>Name</span>
        <span>Waveform</span>
        <span>BPM / Key</span>
        <span>Length</span>
        <span>Size</span>
        <span>Type</span>
        <span style={{ textAlign: "right" }}>Actions</span>
      </div>

      {/* Body */}
      {rows.map(row => {
        const isSel = selected.has(row.id);
        const isPlay = playingId === row.id;
        return (
          <div key={row.id} style={{
            display: "grid", gridTemplateColumns: colWidths, gap: 12,
            alignItems: "center", padding: "10px 14px",
            borderBottom: "1px solid var(--line-faint)",
            background: isSel ? "color-mix(in srgb, var(--color-orange) 8%, transparent)" : "transparent",
            transition: "background 120ms",
          }}>
            <Check checked={isSel} onChange={() => onToggle(row.id)} />
            <button onClick={() => onPlay(row.id)} title={isPlay ? "Stop" : "Play"} style={{
              width: 32, height: 32, borderRadius: 3, cursor: "pointer",
              background: isPlay ? "var(--color-orange)" : "var(--color-void)",
              color: isPlay ? "rgba(0,0,0,0.85)" : "var(--fg1)",
              border: "0.5px solid var(--line-soft)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              {isPlay ? (
                <span style={{ display: "inline-flex", gap: 2 }}>
                  <span style={{ width: 3, height: 12, background: "currentColor" }}/>
                  <span style={{ width: 3, height: 12, background: "currentColor" }}/>
                </span>
              ) : <MsnIcon name="play" size="11px" />}
            </button>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {row.fav && <MsnIcon name="heart" size="11px" color="var(--color-orange)" />}
                <span style={{ color: "var(--fg1)", fontFamily: "var(--font-mono)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-body)" }}>
                <MsnTag color={familyColor(row.family)}>{row.family}</MsnTag>
                <span>{row.pack}</span>
                <span>·</span>
                <span>added {row.added}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <MsnWaveform seed={row.seed} width={220} height={28} color={familyColor(row.family)} progress={isPlay ? 0.42 : undefined} />
            </div>

            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)" }}>
              {row.bpm ? `${row.bpm}` : <span style={{ color: "var(--fg3)" }}>—</span>}
              {row.key && <span style={{ color: "var(--fg3)" }}> · {row.key}</span>}
            </span>

            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)" }}>{row.dur}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)" }}>{formatMB(row.size)}</span>
            <MsnTag color="var(--fg2)">{row.kind}</MsnTag>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
              <IconBtn title="Add to session" name="plus" />
              <IconBtn title="Download" name="download" />
              <IconBtn title="Delete" name="bell" danger onClick={() => onDelete(row)}>×</IconBtn>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Check({ checked, onChange }) {
  return (
    <button onClick={onChange} style={{
      width: 16, height: 16, borderRadius: 2,
      border: `0.5px solid ${checked ? "var(--color-orange)" : "var(--line-hover)"}`,
      background: checked ? "color-mix(in srgb, var(--color-orange) 18%, var(--color-void))" : "var(--color-void)",
      color: "var(--color-orange)", cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: 0, fontSize: 11, lineHeight: 1,
    }}>{checked ? "✓" : ""}</button>
  );
}

function IconBtn({ name, title, danger, onClick, children }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 26, height: 26, borderRadius: 3,
      background: "transparent", border: "0.5px solid var(--line-soft)",
      color: danger ? "var(--color-red)" : "var(--fg2)", cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-display)", fontSize: 14,
    }}>
      {children || <MsnIcon name={name} size="12px" />}
    </button>
  );
}

// =====================================================================
// Sample grid (card view)
// =====================================================================
function SampleGrid({ rows, playingId, onPlay, onDelete }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
      {rows.map(row => {
        const isPlay = playingId === row.id;
        return (
          <div key={row.id} style={{
            background: "var(--bg-panel-2)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 4, padding: 14,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {row.fav && <MsnIcon name="heart" size="11px" color="var(--color-orange)" />}
                  <span style={{ color: "var(--fg1)", fontFamily: "var(--font-mono)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{row.name}</span>
                </div>
                <div style={{ marginTop: 4, color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-body)" }}>{row.pack}</div>
              </div>
              <MsnTag color={familyColor(row.family)}>{row.family}</MsnTag>
            </div>

            <div style={{
              padding: 8, background: "var(--color-void)", borderRadius: 3,
              border: "0.5px solid var(--line-soft)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <button onClick={() => onPlay(row.id)} style={{
                width: 28, height: 28, borderRadius: 14, cursor: "pointer",
                background: isPlay ? "var(--color-orange)" : "transparent",
                color: isPlay ? "rgba(0,0,0,0.85)" : "var(--color-orange)",
                border: `1px solid var(--color-orange)`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <MsnIcon name={isPlay ? "list" : "play"} size="11px" />
              </button>
              <MsnWaveform seed={row.seed} width={180} height={36} color={familyColor(row.family)} progress={isPlay ? 0.4 : undefined} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--fg2)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
              <span>{row.dur}</span>
              <span>·</span>
              <span>{formatMB(row.size)}</span>
              {row.bpm && (<>
                <span>·</span>
                <span>{row.bpm} BPM</span>
              </>)}
              {row.key && <span style={{ color: "var(--fg3)" }}>{row.key}</span>}
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {row.tags.map(t => <MsnTag key={t} color="var(--fg2)">#{t}</MsnTag>)}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 4 }}>
              <MsnFramed color="var(--fg1)" size="sm"><MsnIcon name="plus" size="11px" /> To session</MsnFramed>
              <MsnFramed color="var(--color-red)" size="sm" onClick={() => onDelete(row)}>Delete</MsnFramed>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =====================================================================
// Empty state
// =====================================================================
function EmptyState({ onClear }) {
  return (
    <div style={{
      padding: "60px 24px", textAlign: "center",
      background: "var(--bg-panel-2)", border: "0.5px dashed var(--line-soft)", borderRadius: 4,
      color: "var(--fg2)",
    }}>
      <div style={{ fontSize: 26, color: "var(--color-orange)", marginBottom: 8 }}>
        <MsnIcon name="search" size="28px" />
      </div>
      <h3 style={{ margin: 0, fontWeight: 400, fontSize: 16, color: "var(--fg1)" }}>No samples match these filters</h3>
      <p style={{ margin: "6px 0 16px", fontFamily: "var(--font-body)", fontSize: 13 }}>Try clearing the filters or searching for a different term.</p>
      <MsnFramed color="var(--color-orange)" onClick={onClear}>Clear filters</MsnFramed>
    </div>
  );
}

// =====================================================================
// Delete modal
// =====================================================================
function DeleteSampleModal({ target, selectedCount, onCancel, onConfirm }) {
  const isMulti = target === "selection";
  const title = isMulti ? `Delete ${selectedCount} samples?` : "Delete this sample?";
  const body = isMulti
    ? "These files will be removed from your library. Sessions that already use them will keep their cached copies."
    : (<>The file <code style={{ color: "var(--color-orange)", fontFamily: "var(--font-mono)" }}>{target.name}</code> will be removed from your library. Sessions that already use it will keep their cached copies.</>);

  return (
    <div onClick={onCancel} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-elevated)",
        border: "0.5px solid color-mix(in srgb, var(--color-red) 50%, transparent)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 30px -8px var(--color-red)",
        borderRadius: 6, width: 420, maxWidth: "100%", padding: 24,
        fontFamily: "var(--font-display)", color: "var(--fg1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{
            width: 26, height: 26, borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-red) 20%, transparent)",
            color: "var(--color-red)", border: "1px solid var(--color-red)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 400,
          }}>!</span>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 400 }}>{title}</h2>
        </div>
        <p style={{ margin: 0, color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.55 }}>{body}</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 22 }}>
          <MsnFramed onClick={onCancel} color="var(--fg1)">Cancel</MsnFramed>
          <button onClick={onConfirm} style={{
            background: "var(--color-red)", color: "rgba(0,0,0,0.85)", border: 0, borderRadius: 3,
            height: 32, padding: "0 14px",
            fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 12,
            letterSpacing: 0.5, textTransform: "uppercase", cursor: "pointer",
            boxShadow: "0 0 12px -4px var(--color-red)",
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// Upload modal — simulated drag/drop, with live storage check
// =====================================================================
function UploadModal({ onClose, usedMB, limitMB }) {
  const fakeFiles = [
    { name: "shaker_swing_120.wav",   size: 1.4, status: "done"     },
    { name: "vox_breath_short.wav",   size: 0.9, status: "done"     },
    { name: "synth_lead_140_Amin.wav",size: 5.6, status: "uploading", progress: 0.62 },
    { name: "field_market.flac",      size: 22.0,status: "queued"   },
  ];
  const total = fakeFiles.reduce((a, f) => a + f.size, 0);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-elevated)", border: "0.5px solid var(--line-soft)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
        borderRadius: 6, width: 540, maxWidth: "100%", padding: 24,
        fontFamily: "var(--font-display)", color: "var(--fg1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 400 }}>Add samples</h2>
          <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--fg2)", cursor: "pointer", fontSize: 18 }}>×</button>
        </div>

        {/* Dropzone */}
        <div style={{
          padding: "32px 18px", textAlign: "center",
          background: "color-mix(in srgb, var(--color-orange) 6%, var(--color-void))",
          border: "1px dashed color-mix(in srgb, var(--color-orange) 50%, transparent)",
          borderRadius: 4, color: "var(--fg2)",
        }}>
          <MsnIcon name="download" size="22px" color="var(--color-orange)" style={{ transform: "rotate(180deg)", marginBottom: 8 }} />
          <div style={{ color: "var(--fg1)", fontSize: 14 }}>Drop audio files here</div>
          <div style={{ marginTop: 4, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg3)" }}>
            .wav .mp3 .flac .aif — up to 100 MB per file
          </div>
          <div style={{ marginTop: 14 }}>
            <MsnSolid color="var(--color-orange)">Browse files…</MsnSolid>
          </div>
        </div>

        {/* Queue */}
        <div style={{ marginTop: 16 }}>
          <div style={{ color: "var(--fg3)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            Queue · {fakeFiles.length} files · {formatMB(total)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {fakeFiles.map((f, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 60px 90px",
                alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: 3,
                background: "var(--color-void)",
                border: "0.5px solid var(--line-faint)",
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  {f.status === "uploading" && (
                    <div style={{ marginTop: 4, height: 3, background: "var(--bg-panel)", borderRadius: 1, overflow: "hidden" }}>
                      <div style={{ width: `${f.progress*100}%`, height: "100%", background: "var(--color-orange)" }} />
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg2)" }}>{formatMB(f.size)}</span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase",
                  textAlign: "right",
                  color: f.status === "done" ? "var(--color-green)" : f.status === "uploading" ? "var(--color-orange)" : "var(--fg3)",
                }}>
                  {f.status === "done" ? "✓ Added" : f.status === "uploading" ? `${Math.round(f.progress*100)}%` : "Queued"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage after */}
        <div style={{
          marginTop: 14, padding: "10px 12px", borderRadius: 3,
          background: "var(--color-void)", border: "0.5px solid var(--line-faint)",
          fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg2)",
          display: "flex", justifyContent: "space-between",
        }}>
          <span>After upload</span>
          <span><span style={{ color: "var(--color-orange)" }}>{formatMB(usedMB + total)}</span> / {STORAGE_LIMIT_GB} GB</span>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
          <MsnFramed onClick={onClose} color="var(--fg1)">Done</MsnFramed>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// Helpers
// =====================================================================
function familyColor(f) {
  return ({
    drums: "var(--color-orange)",
    bass: "var(--color-red)",
    synth: "var(--color-blue)",
    vocal: "var(--color-yellow)",
    perc: "var(--color-green)",
    texture: "var(--color-cyan)",
    fx: "var(--color-purple)",
  })[f] || "var(--fg2)";
}
function formatMB(mb) {
  if (mb >= 1024) return (mb/1024).toFixed(2) + " GB";
  if (mb < 1) return Math.round(mb*1000) + " KB";
  return mb.toFixed(1) + " MB";
}
function parseDur(d) {
  const [m,s] = d.split(":").map(Number);
  return (m||0)*60 + (s||0);
}
