/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnCover, MsnWaveform */
const {
  useState: useStateSess,
  useMemo: useMemoSess,
  useRef: useRefSess,
  useEffect: useEffectSess,
} = React;

// =====================================================================
// Sessions data
// =====================================================================
const SESS_TYPES = ["production", "recording", "mixing"];
const SESS_GENRES = [
  "house",
  "ambient",
  "drum&bass",
  "hip-hop",
  "techno",
  "indie",
  "lo-fi",
  "experimental",
  "vocal",
];

const SESSIONS = [
  {
    id: 1,
    title: "Liquid Drum 808",
    type: "production",
    bpm: 142,
    key: "F min",
    edited: "2h ago",
    editedAt: "2026-05-06 13:14",
    size: 142.6,
    tags: ["drum&bass", "liquid"],
    seed: "liquid808",
    archived: false,
  },
  {
    id: 2,
    title: "Tape Saturator demo",
    type: "mixing",
    bpm: 96,
    key: "A min",
    edited: "yesterday",
    editedAt: "2026-05-05 22:01",
    size: 84.2,
    tags: ["lo-fi", "mix"],
    seed: "tapesat",
    archived: false,
  },
  {
    id: 3,
    title: "Vocal Take 04",
    type: "recording",
    bpm: 88,
    key: "C maj",
    edited: "3d ago",
    editedAt: "2026-05-03 10:42",
    size: 46.8,
    tags: ["vocal", "indie"],
    seed: "vocal4",
    archived: false,
  },
  {
    id: 4,
    title: "Granular Pads",
    type: "production",
    bpm: 110,
    key: "D# min",
    edited: "1w ago",
    editedAt: "2026-04-29 18:07",
    size: 226.1,
    tags: ["ambient", "texture"],
    seed: "granular",
    archived: false,
  },
  {
    id: 5,
    title: "Late Night Bounce",
    type: "mixing",
    bpm: 128,
    key: "G min",
    edited: "1w ago",
    editedAt: "2026-04-28 23:18",
    size: 118.3,
    tags: ["house", "late"],
    seed: "latenight",
    archived: false,
  },
  {
    id: 6,
    title: "First Steps",
    type: "production",
    bpm: 120,
    key: "C maj",
    edited: "2w ago",
    editedAt: "2026-04-22 16:00",
    size: 58.7,
    tags: ["lo-fi", "chill"],
    seed: "firststeps",
    archived: false,
  },
  {
    id: 7,
    title: "Field Recording 02",
    type: "recording",
    bpm: null,
    key: null,
    edited: "3w ago",
    editedAt: "2026-04-15 09:33",
    size: 312.4,
    tags: ["experimental", "field"],
    seed: "field2",
    archived: false,
  },
  {
    id: 8,
    title: "Kick Drift",
    type: "production",
    bpm: 134,
    key: "A min",
    edited: "4w ago",
    editedAt: "2026-04-08 12:10",
    size: 72.0,
    tags: ["techno", "drum"],
    seed: "kickdrift",
    archived: false,
  },
  {
    id: 9,
    title: "Sundown Loop",
    type: "production",
    bpm: 92,
    key: "E min",
    edited: "5w ago",
    editedAt: "2026-04-01 19:22",
    size: 38.6,
    tags: ["lo-fi", "hip-hop"],
    seed: "sundown",
    archived: false,
  },

  // Archived
  {
    id: 10,
    title: "Demo for Cleo",
    type: "mixing",
    bpm: 110,
    key: "D min",
    edited: "Mar 12",
    editedAt: "2026-03-12 11:11",
    size: 95.2,
    tags: ["mix"],
    seed: "demoCleo",
    archived: true,
  },
  {
    id: 11,
    title: "Old Vocals Folder",
    type: "recording",
    bpm: null,
    key: null,
    edited: "Feb 28",
    editedAt: "2026-02-28 20:00",
    size: 28.1,
    tags: ["vocal"],
    seed: "oldVox",
    archived: true,
  },
  {
    id: 12,
    title: "Birthday Beat (final)",
    type: "production",
    bpm: 128,
    key: "F# min",
    edited: "Feb 03",
    editedAt: "2026-02-03 14:14",
    size: 104.6,
    tags: ["hip-hop", "gift"],
    seed: "bday",
    archived: true,
  },
];

// =====================================================================
// Page
// =====================================================================
window.SessionsPage = function SessionsPage() {
  // State
  const [bucket, setBucket] = useStateSess("owned"); // owned | archived
  const [query, setQuery] = useStateSess("");
  const [type, setType] = useStateSess("all");
  const [genre, setGenre] = useStateSess("all");
  const [sort, setSort] = useStateSess("edited"); // edited | name | bpm
  const [confirmDelete, setConfirmDelete] = useStateSess(null);
  const [renameTarget, setRenameTarget] = useStateSess(null);
  const [newOpen, setNewOpen] = useStateSess(false);
  const [emptyMode, setEmptyMode] = useStateSess(false); // dev toggle for empty state

  // Filter
  const filtered = useMemoSess(() => {
    if (emptyMode) return [];
    let rows = SESSIONS.filter((s) =>
      bucket === "archived" ? s.archived : !s.archived,
    );
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) => r.title.toLowerCase().includes(q));
    }
    if (type !== "all") rows = rows.filter((r) => r.type === type);
    if (genre !== "all") rows = rows.filter((r) => r.tags.includes(genre));
    rows.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.title.localeCompare(b.title);
        case "bpm":
          return (a.bpm ?? 999) - (b.bpm ?? 999);
        case "edited":
        default:
          return b.editedAt.localeCompare(a.editedAt);
      }
    });
    return rows;
  }, [bucket, query, type, genre, sort, emptyMode]);

  const counts = {
    owned: SESSIONS.filter((s) => !s.archived).length,
    archived: SESSIONS.filter((s) => s.archived).length,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-app)",
        color: "var(--fg1)",
        fontFamily: "var(--font-display)",
        fontSize: 12,
        fontWeight: 300,
      }}
    >
      <SessHeader />

      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 80px" }}
      >
        {/* Title row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 22,
          }}
        >
          <div>
            <div
              style={{
                color: "var(--color-orange)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
                fontFamily: "var(--font-mono)",
              }}
            >
              Workspace
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 400,
                letterSpacing: -0.01,
              }}
            >
              My sessions
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                color: "var(--fg2)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
              }}
            >
              {counts.owned} active · {counts.archived} archived
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {/* dev empty-state toggle */}
            <button
              onClick={() => setEmptyMode((v) => !v)}
              title="Toggle empty state preview"
              style={{
                background: "transparent",
                border: "0.5px dashed var(--line-soft)",
                color: emptyMode ? "var(--color-orange)" : "var(--fg3)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                padding: "0 10px",
                height: 30,
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              {emptyMode ? "● empty" : "○ empty"}
            </button>
            <MsnSolid
              color="var(--color-orange)"
              size="lg"
              onClick={() => setNewOpen(true)}
            >
              <MsnIcon name="plus" size="13px" /> New session
            </MsnSolid>
          </div>
        </div>

        {/* Bucket tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            borderBottom: "1px solid var(--line-soft)",
            marginBottom: 18,
          }}
        >
          {[
            { v: "owned", label: "Owned by me", count: counts.owned },
            { v: "archived", label: "Archived", count: counts.archived },
          ].map((b) => (
            <button
              key={b.v}
              onClick={() => setBucket(b.v)}
              style={{
                background: "transparent",
                border: 0,
                padding: "10px 14px",
                color: bucket === b.v ? "var(--fg1)" : "var(--fg2)",
                fontFamily: "var(--font-display)",
                fontSize: 13,
                cursor: "pointer",
                borderBottom: `2px solid ${bucket === b.v ? "var(--color-orange)" : "transparent"}`,
                marginBottom: -1,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {b.label}
              <span
                style={{
                  color: "var(--fg3)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                }}
              >
                {b.count}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <SessToolbar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
          shown={filtered.length}
          total={counts[bucket]}
        />

        {/* Grid or empty */}
        {filtered.length === 0 ? (
          emptyMode || counts[bucket] === 0 ? (
            <SessEmpty onNew={() => setNewOpen(true)} bucket={bucket} />
          ) : (
            <SessNoMatches
              onClear={() => {
                setQuery("");
                setType("all");
                setGenre("all");
              }}
            />
          )
        ) : (
          <SessGrid
            rows={filtered}
            archived={bucket === "archived"}
            onDelete={(s) => setConfirmDelete(s)}
            onRename={(s) => setRenameTarget(s)}
          />
        )}
      </div>

      {confirmDelete && (
        <DeleteSessModal
          session={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => setConfirmDelete(null)}
        />
      )}
      {renameTarget && (
        <RenameSessModal
          session={renameTarget}
          onCancel={() => setRenameTarget(null)}
          onConfirm={() => setRenameTarget(null)}
        />
      )}
      {newOpen && <NewSessionModal onClose={() => setNewOpen(false)} />}
    </div>
  );
};

// =====================================================================
// Header
// =====================================================================
function SessHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line-faint)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="MakeSomeNoise Landing.html"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} />
      </a>
      <nav
        style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 12 }}
      >
        <a
          href="MakeSomeNoise Home.html"
          style={{ color: "var(--fg2)", textDecoration: "none" }}
        >
          Home
        </a>
        <span style={{ color: "var(--color-orange)" }}>Sessions</span>
        <a
          href="MakeSomeNoise Samples.html"
          style={{ color: "var(--fg2)", textDecoration: "none" }}
        >
          Library
        </a>
        <a
          href="MakeSomeNoise Dashboard.html"
          style={{ color: "var(--fg2)", textDecoration: "none" }}
        >
          Settings
        </a>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          title="Notifications"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--fg2)",
            cursor: "pointer",
          }}
        >
          <MsnIcon name="bell" size="16px" />
        </button>
        <a
          href="MakeSomeNoise Dashboard.html"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <MsnAvatar name="lex moreau" size={28} status="online" />
          <span style={{ color: "var(--fg1)", fontSize: 12 }}>@lex.moreau</span>
        </a>
      </div>
    </header>
  );
}

// =====================================================================
// Toolbar
// =====================================================================
function SessToolbar({
  query,
  setQuery,
  type,
  setType,
  genre,
  setGenre,
  sort,
  setSort,
  shown,
  total,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        borderRadius: 4,
        background: "var(--bg-panel-2)",
        border: "0.5px solid var(--line-soft)",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "var(--color-void)",
          border: "0.5px solid var(--line-soft)",
          borderRadius: 3,
          padding: "0 10px",
          height: 30,
          width: 280,
        }}
      >
        <MsnIcon name="search" size="13px" color="var(--fg3)" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title…"
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "var(--fg1)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            height: "100%",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--fg3)",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        )}
      </div>

      <SessDivider />

      {/* Type filter (segmented) */}
      <div
        style={{
          display: "inline-flex",
          border: "0.5px solid var(--line-soft)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {["all", ...SESS_TYPES].map((t, i) => (
          <button
            key={t}
            onClick={() => setType(t)}
            style={{
              background:
                type === t
                  ? "color-mix(in srgb, var(--color-orange) 14%, transparent)"
                  : "transparent",
              color: type === t ? "var(--color-orange)" : "var(--fg2)",
              border: 0,
              padding: "0 12px",
              height: 30,
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 0.4,
              borderRight:
                i < SESS_TYPES.length ? "0.5px solid var(--line-soft)" : 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {t !== "all" && (
              <MsnIcon
                name={
                  t === "recording"
                    ? "record"
                    : t === "mixing"
                      ? "mix"
                      : "produce"
                }
                size="11px"
              />
            )}
            {t}
          </button>
        ))}
      </div>

      {/* Genre */}
      <SessSelect
        label="Genre"
        value={genre}
        onChange={setGenre}
        options={[
          { v: "all", label: "All genres" },
          ...SESS_GENRES.map((g) => ({ v: g, label: g })),
        ]}
      />

      <div style={{ flex: 1 }} />

      <span
        style={{
          color: "var(--fg3)",
          fontSize: 11,
          fontFamily: "var(--font-mono)",
        }}
      >
        {shown}/{total}
      </span>

      <SessDivider />

      <SessSelect
        label="Sort"
        value={sort}
        onChange={setSort}
        options={[
          { v: "edited", label: "Last edited" },
          { v: "name", label: "Name (A→Z)" },
          { v: "bpm", label: "BPM" },
        ]}
      />
    </div>
  );
}

function SessDivider() {
  return (
    <div style={{ width: 1, height: 18, background: "var(--line-soft)" }} />
  );
}

function SessSelect({ label, value, onChange, options }) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--fg3)",
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {label}
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            appearance: "none",
            background: "var(--color-void)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 3,
            color: "var(--fg1)",
            fontFamily: "var(--font-display)",
            fontSize: 12,
            fontWeight: 300,
            height: 30,
            padding: "0 24px 0 10px",
            cursor: "pointer",
            textTransform: "none",
            letterSpacing: 0,
          }}
        >
          {options.map((o) => (
            <option key={o.v} value={o.v}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--fg3)",
          }}
        >
          <MsnIcon name="triangle" size="9px" />
        </span>
      </div>
    </label>
  );
}

// =====================================================================
// Card grid
// =====================================================================
function SessGrid({ rows, archived, onDelete, onRename }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 14,
      }}
    >
      {rows.map((s) => (
        <SessCard
          key={s.id}
          session={s}
          archived={archived}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </div>
  );
}

function SessCard({ session, archived, onDelete, onRename }) {
  const [menuOpen, setMenuOpen] = useStateSess(false);
  const menuRef = useRefSess(null);

  useEffectSess(() => {
    if (!menuOpen) return;
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const typeColor =
    session.type === "recording"
      ? "var(--color-red)"
      : session.type === "mixing"
        ? "var(--color-blue)"
        : "var(--color-orange)";

  return (
    <div
      style={{
        background: "var(--bg-panel-2)",
        border: "0.5px solid var(--line-soft)",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: archived ? 0.85 : 1,
        transition: "transform 140ms, border-color 140ms, box-shadow 140ms",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--line-hover)";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--line-soft)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Cover area */}
      <div
        style={{
          position: "relative",
          background: `linear-gradient(135deg, color-mix(in srgb, ${typeColor} 25%, var(--color-shadow)), color-mix(in srgb, ${typeColor} 4%, var(--color-void)))`,
          padding: 14,
          height: 130,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Archived ribbon */}
        {archived && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "var(--color-void)",
              color: "var(--fg2)",
              border: "0.5px solid var(--line-soft)",
              borderRadius: 2,
              padding: "2px 6px",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            archived
          </div>
        )}

        {/* Type badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              color: typeColor,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              background:
                "color-mix(in srgb, " + typeColor + " 14%, transparent)",
              padding: "3px 6px",
              borderRadius: 2,
              border:
                "0.5px solid color-mix(in srgb, " +
                typeColor +
                " 40%, transparent)",
            }}
          >
            <MsnIcon
              name={
                session.type === "recording"
                  ? "record"
                  : session.type === "mixing"
                    ? "mix"
                    : "produce"
              }
              size="11px"
            />
            {session.type}
          </span>
        </div>

        {/* Faint type glyph background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 18,
            color: typeColor,
            opacity: 0.08,
          }}
        >
          <MsnIcon
            name={
              session.type === "recording"
                ? "record"
                : session.type === "mixing"
                  ? "mix"
                  : "produce"
            }
            size="180px"
          />
        </div>

        {/* Big type logo, centered */}
        <div
          style={{
            position: "relative",
            width: 70,
            height: 70,
            borderRadius: 8,
            background: `color-mix(in srgb, ${typeColor} 14%, var(--color-void))`,
            border: `1px solid color-mix(in srgb, ${typeColor} 50%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: typeColor,
            boxShadow: `0 0 20px -6px ${typeColor}, inset 0 0 0 1px color-mix(in srgb, ${typeColor} 18%, transparent)`,
          }}
        >
          <MsnIcon
            name={
              session.type === "recording"
                ? "record"
                : session.type === "mixing"
                  ? "mix"
                  : "produce"
            }
            size="38px"
          />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "12px 14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 15,
              color: "var(--fg1)",
              letterSpacing: -0.01,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
              flex: 1,
            }}
          >
            {session.title}
          </h3>
          <div ref={menuRef} style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((o) => !o);
              }}
              style={{
                background: "transparent",
                border: "0.5px solid var(--line-soft)",
                color: "var(--fg2)",
                borderRadius: 3,
                height: 24,
                width: 24,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ⋯
            </button>
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 28,
                  zIndex: 20,
                  background: "var(--bg-elevated)",
                  border: "0.5px solid var(--line-soft)",
                  boxShadow: "0 14px 32px rgba(0,0,0,0.55)",
                  borderRadius: 4,
                  padding: 4,
                  minWidth: 180,
                }}
              >
                <CardMenuItem icon="play" label="Open in editor" />
                <CardMenuItem
                  icon="settings"
                  label="Rename"
                  onClick={() => {
                    setMenuOpen(false);
                    onRename(session);
                  }}
                />
                <CardMenuItem icon="download" label="Export bounce" />
                <CardMenuItem
                  icon="folder"
                  label={archived ? "Unarchive" : "Archive"}
                />
                <div
                  style={{
                    height: 1,
                    background: "var(--line-faint)",
                    margin: "4px 0",
                  }}
                />
                <CardMenuItem
                  icon="bell"
                  danger
                  label="Delete"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(session);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg2)",
            flexWrap: "wrap",
          }}
        >
          {session.bpm ? (
            <span>{session.bpm} BPM</span>
          ) : (
            <span style={{ color: "var(--fg3)" }}>— BPM</span>
          )}
          <span style={{ color: "var(--fg3)" }}>·</span>
          <span>{session.key || "—"}</span>
          <span style={{ color: "var(--fg3)" }}>·</span>
          <span>{formatSize(session.size)}</span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {session.tags.map((t) => (
            <MsnTag key={t} color="var(--fg2)">
              #{t}
            </MsnTag>
          ))}
        </div>

        {/* Footer: edited + open */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <span
            style={{
              color: "var(--fg3)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
            }}
          >
            Edited {session.edited}
          </span>
          <MsnFramed
            color={archived ? "var(--fg1)" : "var(--color-orange)"}
            size="sm"
          >
            {archived ? "Restore" : "Open"}{" "}
            <MsnIcon name="arrowR" size="11px" />
          </MsnFramed>
        </div>
      </div>
    </div>
  );
}

function CardMenuItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: 0,
        padding: "7px 10px",
        borderRadius: 3,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: danger ? "var(--color-red)" : "var(--fg1)",
        fontFamily: "var(--font-display)",
        fontSize: 12,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = danger
          ? "color-mix(in srgb, var(--color-red) 14%, transparent)"
          : "color-mix(in srgb, var(--fg1) 6%, transparent)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <MsnIcon name={icon} size="12px" />
      {label}
    </button>
  );
}

// =====================================================================
// Empty states
// =====================================================================
function SessEmpty({ onNew, bucket }) {
  if (bucket === "archived") {
    return (
      <div
        style={{
          padding: "60px 24px",
          textAlign: "center",
          background: "var(--bg-panel-2)",
          border: "0.5px dashed var(--line-soft)",
          borderRadius: 4,
          color: "var(--fg2)",
        }}
      >
        <div
          style={{ fontSize: 26, color: "var(--color-blue)", marginBottom: 10 }}
        >
          <MsnIcon name="folder" size="28px" />
        </div>
        <h3
          style={{
            margin: 0,
            fontWeight: 400,
            fontSize: 16,
            color: "var(--fg1)",
          }}
        >
          Nothing archived
        </h3>
        <p
          style={{
            margin: "6px 0 0",
            fontFamily: "var(--font-body)",
            fontSize: 13,
          }}
        >
          Archived sessions will live here when you're done with them.
        </p>
      </div>
    );
  }
  return (
    <div
      style={{
        padding: "70px 24px",
        textAlign: "center",
        background: "var(--bg-panel-2)",
        border:
          "0.5px dashed color-mix(in srgb, var(--color-orange) 30%, var(--line-soft))",
        borderRadius: 4,
        color: "var(--fg2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {["produce", "record", "mix"].map((n, i) => (
            <div
              key={n}
              style={{
                width: 56,
                height: 56,
                borderRadius: 6,
                background: "var(--color-void)",
                border: "0.5px solid var(--line-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: [
                  "var(--color-orange)",
                  "var(--color-red)",
                  "var(--color-blue)",
                ][i],
                transform: `rotate(${(i - 1) * 4}deg)`,
              }}
            >
              <MsnIcon name={n} size="22px" />
            </div>
          ))}
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: 18,
              color: "var(--fg1)",
            }}
          >
            No sessions yet
          </h3>
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--fg2)",
              maxWidth: 360,
            }}
          >
            Sessions are where you record, produce and mix. Start your first one
            — it takes about three seconds.
          </p>
        </div>
        <MsnSolid color="var(--color-orange)" size="lg" onClick={onNew}>
          <MsnIcon name="plus" size="13px" /> Create your first session
        </MsnSolid>
        <a
          style={{
            color: "var(--fg3)",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
        >
          or import from a file
        </a>
      </div>
    </div>
  );
}

function SessNoMatches({ onClear }) {
  return (
    <div
      style={{
        padding: "50px 24px",
        textAlign: "center",
        background: "var(--bg-panel-2)",
        border: "0.5px dashed var(--line-soft)",
        borderRadius: 4,
      }}
    >
      <div style={{ color: "var(--color-orange)", marginBottom: 8 }}>
        <MsnIcon name="search" size="22px" />
      </div>
      <h3
        style={{
          margin: 0,
          fontWeight: 400,
          fontSize: 15,
          color: "var(--fg1)",
        }}
      >
        No sessions match these filters
      </h3>
      <p
        style={{
          margin: "6px 0 14px",
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--fg2)",
        }}
      >
        Try changing your filters or clearing them.
      </p>
      <MsnFramed color="var(--color-orange)" onClick={onClear}>
        Clear filters
      </MsnFramed>
    </div>
  );
}

// =====================================================================
// Modals
// =====================================================================
function ModalShell({
  children,
  onClose,
  accent = "var(--line-soft)",
  width = 460,
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)",
          border: `0.5px solid ${accent}`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 30px -8px ${accent}`,
          borderRadius: 6,
          width,
          maxWidth: "100%",
          padding: 24,
          fontFamily: "var(--font-display)",
          color: "var(--fg1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DeleteSessModal({ session, onCancel, onConfirm }) {
  return (
    <ModalShell
      onClose={onCancel}
      accent="color-mix(in srgb, var(--color-red) 50%, transparent)"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-red) 20%, transparent)",
            color: "var(--color-red)",
            border: "1px solid var(--color-red)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          !
        </span>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 400 }}>
          Delete this session?
        </h2>
      </div>
      <p
        style={{
          margin: 0,
          color: "var(--fg2)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.55,
        }}
      >
        <code
          style={{
            color: "var(--color-orange)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {session.title}
        </code>{" "}
        and all its tracks, automation and edits will be permanently removed.
        Sample files referenced from your library are kept.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 22,
        }}
      >
        <MsnFramed onClick={onCancel} color="var(--fg1)">
          Cancel
        </MsnFramed>
        <button
          onClick={onConfirm}
          style={{
            background: "var(--color-red)",
            color: "rgba(0,0,0,0.85)",
            border: 0,
            borderRadius: 3,
            height: 32,
            padding: "0 14px",
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 12,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 0 12px -4px var(--color-red)",
          }}
        >
          Delete session
        </button>
      </div>
    </ModalShell>
  );
}

function RenameSessModal({ session, onCancel, onConfirm }) {
  const [val, setVal] = useStateSess(session.title);
  return (
    <ModalShell onClose={onCancel}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 400 }}>
        Rename session
      </h2>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginTop: 14,
        }}
      >
        <span
          style={{
            color: "var(--fg2)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Title
        </span>
        <input
          autoFocus
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{
            background: "var(--color-void)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 3,
            padding: "0 10px",
            height: 36,
            color: "var(--fg1)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            outline: "none",
          }}
        />
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 22,
        }}
      >
        <MsnFramed onClick={onCancel} color="var(--fg1)">
          Cancel
        </MsnFramed>
        <MsnSolid color="var(--color-orange)" onClick={onConfirm}>
          Save
        </MsnSolid>
      </div>
    </ModalShell>
  );
}

function NewSessionModal({ onClose }) {
  const [picked, setPicked] = useStateSess("production");
  const opts = [
    {
      v: "production",
      label: "Production",
      color: "var(--color-orange)",
      desc: "Full DAW: tracks, MIDI, effects, automation.",
    },
    {
      v: "recording",
      label: "Recording",
      color: "var(--color-red)",
      desc: "Get a take down. Multi-mic, punch-in, comp.",
    },
    {
      v: "mixing",
      label: "Mixing",
      color: "var(--color-blue)",
      desc: "Stems in, mix out. Faders, busses, FX chains.",
    },
  ];
  return (
    <ModalShell onClose={onClose} width={560}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400 }}>
        Start a new session
      </h2>
      <p
        style={{
          margin: "6px 0 0",
          color: "var(--fg2)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
        }}
      >
        Pick the kind of session, then we'll set up the right workspace.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginTop: 18,
        }}
      >
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => setPicked(o.v)}
            style={{
              background:
                picked === o.v
                  ? `color-mix(in srgb, ${o.color} 12%, transparent)`
                  : "var(--color-void)",
              border: `1px solid ${picked === o.v ? o.color : "var(--line-soft)"}`,
              borderRadius: 4,
              padding: 14,
              cursor: "pointer",
              textAlign: "left",
              color: "var(--fg1)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              boxShadow: picked === o.v ? `0 0 14px -6px ${o.color}` : "none",
            }}
          >
            <div
              style={{
                color: o.color,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MsnIcon
                name={
                  o.v === "recording"
                    ? "record"
                    : o.v === "mixing"
                      ? "mix"
                      : "produce"
                }
                size="18px"
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                {o.label}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                color: "var(--fg2)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {o.desc}
            </p>
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 16,
        }}
      >
        <NewField label="Title" placeholder="Untitled session" />
        <NewField label="BPM" placeholder="120" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 22,
        }}
      >
        <MsnFramed onClick={onClose} color="var(--fg1)">
          Cancel
        </MsnFramed>
        <MsnSolid color="var(--color-orange)">
          Create &amp; open <MsnIcon name="arrowR" size="11px" />
        </MsnSolid>
      </div>
    </ModalShell>
  );
}

function NewField({ label, placeholder }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          color: "var(--fg2)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </span>
      <input
        placeholder={placeholder}
        style={{
          background: "var(--color-void)",
          border: "0.5px solid var(--line-soft)",
          borderRadius: 3,
          padding: "0 10px",
          height: 34,
          color: "var(--fg1)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          outline: "none",
        }}
      />
    </label>
  );
}

// =====================================================================
// Helpers
// =====================================================================
function formatSize(mb) {
  if (mb >= 1024) return (mb / 1024).toFixed(2) + " GB";
  return mb.toFixed(1) + " MB";
}
