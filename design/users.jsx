/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed */
const { useState: useStateUsers, useMemo: useMemoUsers } = React;

// Platform users — alias + handle only (public directory)
const USERS = [
  { alias: "lex moreau",     handle: "lex.moreau" },
  { alias: "maya okafor",    handle: "maya.o" },
  { alias: "theo rivera",    handle: "theo" },
  { alias: "anouk lemaire",  handle: "anouk" },
  { alias: "idris khan",     handle: "idris" },
  { alias: "rosa petrov",    handle: "rosa" },
  { alias: "jun park",       handle: "junpark" },
  { alias: "cleo banner",    handle: "cleo.b" },
  { alias: "sam west",       handle: "samwest" },
  { alias: "nadia haddad",   handle: "nadia.h" },
  { alias: "bruno costa",    handle: "brunoc" },
  { alias: "elin sató",      handle: "elin" },
  { alias: "marco vidal",    handle: "marco.v" },
  { alias: "priya nair",     handle: "priya" },
  { alias: "otis bl" + "ake", handle: "otis" },
  { alias: "yuki tanaka",    handle: "yuki.t" },
  { alias: "hana mbeki",     handle: "hana" },
  { alias: "leo fontaine",   handle: "leo.f" },
  { alias: "zara ahmed",     handle: "zara" },
  { alias: "dev kapoor",     handle: "devk" },
  { alias: "iris volkov",    handle: "iris.v" },
  { alias: "noah brandt",    handle: "noah" },
];

function profileHref(handle) {
  return "MakeSomeNoise Profile.html?u=" + encodeURIComponent(handle);
}

window.UsersPage = function UsersPage() {
  const [query, setQuery] = useStateUsers("");

  const filtered = useMemoUsers(() => {
    const q = query.trim().toLowerCase();
    if (!q) return USERS;
    return USERS.filter(u => u.alias.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
  }, [query]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-app)", color: "var(--fg1)", fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 300 }}>
      <UsersHeader />

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 32px 80px" }}>
        {/* Title */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 22 }}>
          <div>
            <div style={{ color: "var(--color-orange)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "var(--font-mono)" }}>Community</div>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400, letterSpacing: -0.01 }}>Producers</h1>
            <p style={{ margin: "6px 0 0", color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 13 }}>
              {USERS.length} producers on MakeSomeNoise
            </p>
          </div>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--color-void)", border: "0.5px solid var(--line-soft)", borderRadius: 3, padding: "0 10px", height: 34, width: 300 }}>
            <MsnIcon name="search" size="13px" color="var(--fg3)" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search alias or @handle…"
              style={{ flex: 1, background: "transparent", border: 0, outline: "none", color: "var(--fg1)", fontFamily: "var(--font-body)", fontSize: 13, height: "100%" }} />
            {query && <button onClick={() => setQuery("")} style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer" }}>×</button>}
          </div>
        </div>

        {/* Grid of user cards */}
        {filtered.length === 0 ? (
          <div style={{ padding: "50px 24px", textAlign: "center", background: "var(--bg-panel-2)", border: "0.5px dashed var(--line-soft)", borderRadius: 4 }}>
            <div style={{ color: "var(--color-orange)", marginBottom: 8 }}><MsnIcon name="search" size="22px" /></div>
            <h3 style={{ margin: 0, fontWeight: 400, fontSize: 15, color: "var(--fg1)" }}>No producers match “{query}”</h3>
            <p style={{ margin: "6px 0 14px", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg2)" }}>Try a different name or handle.</p>
            <MsnFramed color="var(--color-orange)" onClick={() => setQuery("")}>Clear search</MsnFramed>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
            {filtered.map(u => <UserCard key={u.handle} user={u} />)}
          </div>
        )}
      </div>
    </div>
  );
};

function UserCard({ user }) {
  return (
    <div style={{
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4, padding: 14,
      display: "flex", alignItems: "center", gap: 12,
      transition: "border-color 140ms, transform 140ms",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--line-hover)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line-soft)"; }}>
      <MsnAvatar name={user.alias} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "var(--fg1)", fontSize: 15, fontWeight: 400, textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.alias}</div>
        <div style={{ color: "var(--fg3)", fontSize: 12, fontFamily: "var(--font-mono)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>@{user.handle}</div>
      </div>
      <a href={profileHref(user.handle)} style={{ textDecoration: "none", flexShrink: 0 }}>
        <MsnFramed color="var(--color-orange)" size="sm">View profile <MsnIcon name="arrowR" size="11px" /></MsnFramed>
      </a>
    </div>
  );
}

function UsersHeader() {
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
        <a href="MakeSomeNoise Sessions.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Sessions</a>
        <a href="MakeSomeNoise Samples.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Library</a>
        <span style={{ color: "var(--color-orange)" }}>Producers</span>
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
