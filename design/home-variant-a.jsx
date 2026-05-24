/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnWaveform, MsnPeakMeter, MsnFramed, MsnSolid, MsnTag, MsnHr, MsnCover, MSN_DATA */

const SESSION_TYPES = [
  {
    key: "record",
    title: "Recording Session",
    blurb: "Capture vocals, instruments or field audio. Multitrack with monitoring and overdubs.",
    icon: "record",
    color: "var(--color-red)",
    meta: ["Multitrack", "Monitor", "Overdub"],
  },
  {
    key: "produce",
    title: "Music Production",
    blurb: "Beat maker, drum scheduler, loops and instrument tracks on the timeline.",
    icon: "produce",
    color: "var(--color-orange)",
    meta: ["Beat maker", "Loops", "MIDI"],
  },
  {
    key: "mix",
    title: "Mixing Session",
    blurb: "Open the channel strip mixer. EQ, sends, busses and master export.",
    icon: "mix",
    color: "var(--color-blue)",
    meta: ["Strips", "Sends", "Export"],
  },
];

// =================================================================
// VARIATION A — Sidebar layout, orange-led, all 3 sessions equal
// =================================================================
window.HomeVariantA = function HomeVariantA({ onlineLayout = "list" }) {
  const data = MSN_DATA;

  return (
    <div style={{
      width: 1440, height: 960,
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12, fontWeight: 300,
      display: "grid",
      gridTemplateColumns: "220px 1fr 320px",
      gridTemplateRows: "44px 1fr",
      overflow: "hidden",
    }}>
      {/* ============ TOP BAR ============ */}
      <div style={{
        gridColumn: "1 / 4",
        background: "var(--bg-panel)",
        borderBottom: "1px solid var(--line-faint)",
        display: "flex", alignItems: "center",
        padding: "0 16px", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: 220 - 16 }}>
          <MsnIcon name="msn" size="18px" color="var(--color-orange)" />
          <MsnWordmark size={14} />
        </div>
        <div style={{
          flex: 1, maxWidth: 480,
          height: 26, borderRadius: 3,
          background: "var(--color-void)",
          border: "0.5px solid var(--line-soft)",
          display: "flex", alignItems: "center", gap: 8,
          padding: "0 10px", color: "var(--fg3)",
        }}>
          <MsnIcon name="search" size="13px" />
          <span style={{ fontSize: 11 }}>Search sessions, samples, friends…</span>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10 }}>⌘K</span>
        </div>
        <div style={{ flex: 1 }}/>
        <button style={{ background: "transparent", border: 0, color: "var(--fg2)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, padding: "0 4px" }}>
          <MsnIcon name="bell" size="14px" />
          <span style={{
            background: "var(--color-orange)", color: "rgba(0,0,0,0.85)",
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 9, padding: "0 4px", borderRadius: 6, lineHeight: "12px",
          }}>3</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 8, minWidth: 0 }}>
          <MsnAvatar name={data.user.name} size={26} status="online" />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15, minWidth: 0, maxWidth: 110 }}>
            <span style={{ color: "var(--fg1)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.user.name}</span>
            <span style={{ color: "var(--fg3)", fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.user.handle}</span>
          </div>
          <MsnIcon name="triangle" size="10px" color="var(--fg3)" />
        </div>
      </div>

      {/* ============ LEFT NAV ============ */}
      <nav style={{
        background: "var(--bg-panel)",
        borderRight: "1px solid var(--line-faint)",
        padding: "16px 12px",
        display: "flex", flexDirection: "column", gap: 2,
      }}>
        <SectionLabel>Workspace</SectionLabel>
        <NavItem icon="home" label="Home" active accent="var(--color-orange)" />
        <NavItem icon="folder" label="My Sessions" badge="14" />
        <NavItem icon="music" label="Tracks" badge="32" />
        <NavItem icon="waveform" label="Samples" />
        <NavItem icon="download" label="Exports" />

        <div style={{ height: 14 }}/>
        <SectionLabel>Social</SectionLabel>
        <NavItem icon="users" label="Following" badge="58" />
        <NavItem icon="chat" label="Messages" badge="2" badgeColor="var(--color-red)" />
        <NavItem icon="heart" label="Liked" />
        <NavItem icon="list" label="Playlists" />

        <div style={{ flex: 1 }}/>

        {/* Storage */}
        <div style={{
          background: "var(--bg-card)", borderRadius: 3,
          padding: 10, marginTop: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fg3)", fontSize: 10, marginBottom: 6 }}>
            <span>STORAGE</span><span>4.2 / 10 GB</span>
          </div>
          <div style={{ height: 3, background: "var(--color-void)", borderRadius: 1, overflow: "hidden" }}>
            <div style={{ width: "42%", height: "100%", background: "var(--color-green)" }}/>
          </div>
        </div>
        <button style={{
          marginTop: 8,
          background: "transparent", color: "var(--fg2)",
          border: "0.5px solid var(--line-soft)", borderRadius: 3,
          padding: "6px 10px", display: "flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 11,
          cursor: "pointer",
        }}>
          <MsnIcon name="settings" size="13px" /> Preferences
        </button>
      </nav>

      {/* ============ MAIN ============ */}
      <main style={{
        background: "var(--bg-panel-2)",
        overflow: "hidden",
        padding: "24px 28px",
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        {/* Greeting */}
        <header>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 32, color: "white", margin: 0, letterSpacing: -0.01,
          }}>Good evening, Lex.</h1>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 16, color: "var(--color-orange)", margin: "4px 0 0",
          }}>Pick up where you left off, or start something new.</h2>
        </header>

        {/* Session type cards */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12, gap: 8 }}>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: 13, color: "var(--color-orange)", margin: 0,
              textTransform: "uppercase", letterSpacing: 0.6, whiteSpace: "nowrap",
            }}>Start a new session</h3>
            <a style={{ color: "var(--fg3)", fontSize: 11, whiteSpace: "nowrap" }}>Templates →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {SESSION_TYPES.map(s => (
              <SessionCard key={s.key} {...s} />
            ))}
          </div>
        </section>

        {/* Saved sessions */}
        <section style={{ minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12, gap: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 400,
                fontSize: 13, color: "var(--color-orange)", margin: 0,
                textTransform: "uppercase", letterSpacing: 0.6, whiteSpace: "nowrap",
              }}>Continue a saved session</h3>
              <span style={{ color: "var(--fg3)", fontSize: 11, whiteSpace: "nowrap" }}>{data.savedSessions.length} sessions</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={iconBtn}><MsnIcon name="arrowL" size="14px" /></button>
              <button style={iconBtn}><MsnIcon name="arrowR" size="14px" /></button>
              <a style={{ color: "var(--fg2)", fontSize: 11, marginLeft: 8, whiteSpace: "nowrap" }}>View all</a>
            </div>
          </div>
          <div style={{
            display: "flex", gap: 12,
            overflow: "hidden",
            paddingBottom: 4,
          }}>
            {data.savedSessions.slice(0, 6).map(s => (
              <SavedSessionTile key={s.id} session={s} />
            ))}
          </div>
        </section>

        {/* Activity strip */}
        <section>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 13, color: "var(--color-orange)", margin: "0 0 10px",
            textTransform: "uppercase", letterSpacing: 0.6, whiteSpace: "nowrap",
          }}>Recent activity</h3>
          <div style={{
            display: "flex", gap: 0,
            background: "var(--bg-card)", borderRadius: 3,
            border: "0.5px solid var(--line-soft)",
            overflow: "hidden",
          }}>
            {data.activity.map((a, i) => (
              <div key={i} style={{
                flex: 1,
                padding: "10px 14px",
                borderRight: i < data.activity.length - 1 ? "1px solid var(--line-faint)" : "none",
                display: "flex", flexDirection: "column", gap: 4,
                minWidth: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MsnAvatar name={a.who} size={18} />
                  <span style={{ color: "var(--fg1)", fontSize: 11, fontWeight: 400 }}>{a.who.split(" ")[0]}</span>
                  <span style={{ color: "var(--fg3)", fontSize: 10, marginLeft: "auto" }}>{a.when}</span>
                </div>
                <div style={{ color: "var(--fg2)", fontSize: 11, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <span style={{ color: "var(--color-orange)" }}>{a.did}</span> {a.what}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ============ RIGHT — ONLINE FRIENDS ============ */}
      <aside style={{
        background: "var(--bg-panel)",
        borderLeft: "1px solid var(--line-faint)",
        padding: "20px 16px",
        display: "flex", flexDirection: "column", gap: 14,
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 13, color: "var(--color-orange)", margin: 0,
            textTransform: "uppercase", letterSpacing: 0.6, whiteSpace: "nowrap",
          }}>Connected</h3>
          <span style={{ color: "var(--fg3)", fontSize: 10, whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--color-green)" }}>●</span> {MSN_DATA.online.filter(o => o.status !== "offline").length} online
          </span>
        </div>

        {/* Live now */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ color: "var(--color-red)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-red)", boxShadow: "0 0 4px var(--color-red)" }}/>
            Live now
          </div>
          {MSN_DATA.online.filter(o => o.status === "live").map(u => (
            <LiveUserRow key={u.handle} u={u} />
          ))}
        </div>

        <div style={{ height: 1, background: "var(--line-faint)" }}/>

        {/* Online layout — list or grid */}
        {onlineLayout === "list" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "auto" }}>
            <div style={{ color: "var(--fg3)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 4 }}>Online</div>
            {MSN_DATA.online.filter(o => o.status !== "live").map(u => (
              <OnlineUserRow key={u.handle} u={u} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ color: "var(--fg3)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase" }}>Online</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {MSN_DATA.online.filter(o => o.status !== "live").map(u => (
                <div key={u.handle} title={`${u.name} — ${u.activity}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <MsnAvatar name={u.name} size={36} status={u.status} />
                  <span style={{ color: "var(--fg2)", fontSize: 10, maxWidth: 56, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite */}
        <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--line-faint)" }}>
          <MsnFramed color="var(--color-orange)" style={{ width: "100%", justifyContent: "center" }}>
            <MsnIcon name="plus" size="12px" /> Invite to session
          </MsnFramed>
        </div>
      </aside>
    </div>
  );
};

// ============ Sub-components for variant A ============
function SectionLabel({ children }) {
  return (
    <div style={{ color: "var(--fg3)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", padding: "6px 6px 4px" }}>{children}</div>
  );
}
function NavItem({ icon, label, active, badge, badgeColor, accent }) {
  const color = active ? (accent || "var(--color-orange)") : "var(--fg2)";
  return (
    <a style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "7px 8px", borderRadius: 3,
      color,
      background: active ? "color-mix(in srgb, var(--color-orange) 8%, transparent)" : "transparent",
      fontSize: 12,
      cursor: "pointer",
      borderLeft: active ? `2px solid ${color}` : "2px solid transparent",
      paddingLeft: active ? 6 : 8,
    }}>
      <MsnIcon name={icon} size="14px" />
      <span style={{ flex: 1 }}>{label}</span>
      {badge && <span style={{
        background: badgeColor ? `color-mix(in srgb, ${badgeColor} 18%, transparent)` : "var(--color-void)",
        color: badgeColor || "var(--fg3)",
        fontSize: 10, padding: "1px 6px", borderRadius: 8, fontFamily: "var(--font-mono)",
      }}>{badge}</span>}
    </a>
  );
}

function SessionCard({ title, blurb, icon, color, meta }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: 18,
      display: "flex", flexDirection: "column", gap: 12,
      cursor: "pointer", position: "relative", overflow: "hidden",
      minHeight: 180,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 100% 0%, color-mix(in srgb, ${color} 14%, transparent), transparent 60%)`,
        pointerEvents: "none",
      }}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 4,
          background: `color-mix(in srgb, ${color} 14%, var(--color-void))`,
          color,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 8px -3px ${color}, inset 0 0 0 0.5px ${color}`,
        }}>
          <MsnIcon name={icon} size="22px" />
        </div>
        <MsnIcon name="arrowR" size="18px" color="var(--fg3)" />
      </div>
      <div>
        <div style={{ color: "white", fontSize: 16, fontWeight: 400, marginBottom: 6 }}>{title}</div>
        <div style={{ color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 12, lineHeight: 1.45 }}>{blurb}</div>
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: "auto", flexWrap: "wrap" }}>
        {meta.map(m => <MsnTag key={m} color={color}>{m}</MsnTag>)}
      </div>
    </div>
  );
}

const KIND_COLOR = {
  recording: "var(--color-red)",
  production: "var(--color-orange)",
  mixing: "var(--color-blue)",
};
const KIND_ICON = {
  recording: "record",
  production: "produce",
  mixing: "mix",
};

function SavedSessionTile({ session }) {
  const color = KIND_COLOR[session.kind];
  return (
    <div style={{
      flex: "0 0 200px",
      background: "var(--bg-card)",
      borderRadius: 4,
      padding: 12,
      display: "flex", flexDirection: "column", gap: 8,
      cursor: "pointer",
      border: "0.5px solid var(--line-soft)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <MsnCover seed={session.seed} size={36} accent={color} />
        <span style={{ color, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <MsnIcon name={KIND_ICON[session.kind]} size="11px" /> {session.kind}
        </span>
      </div>
      <div style={{ color: "var(--fg1)", fontSize: 13, fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session.title}</div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)" }}>
        <span>{session.bpm ? `${session.bpm} BPM` : "—"} · {session.key || "no key"}</span>
        <span>{session.duration}</span>
      </div>
      <div style={{ color: "var(--fg3)", fontSize: 10 }}>{session.updated}</div>
    </div>
  );
}

function LiveUserRow({ u }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px", cursor: "pointer" }}>
      <MsnAvatar name={u.name} size={32} status="live" ring />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "var(--fg1)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</div>
        <div style={{ color: "var(--color-red)", fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.activity}</div>
      </div>
      <div style={{
        color: "var(--color-red)", fontSize: 10, fontFamily: "var(--font-mono)",
        border: "0.5px solid var(--color-red)", borderRadius: 2,
        padding: "1px 5px",
      }}>{u.listeners} ◉</div>
    </div>
  );
}

function OnlineUserRow({ u }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 4px", cursor: "pointer" }}>
      <MsnAvatar name={u.name} size={26} status={u.status} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "var(--fg1)", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</div>
        <div style={{ color: "var(--fg3)", fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.activity}</div>
      </div>
    </div>
  );
}

const iconBtn = {
  background: "transparent",
  color: "var(--fg2)",
  border: "0.5px solid var(--line-soft)",
  borderRadius: 3,
  width: 24, height: 22,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer",
};

// Expose helpers globally for variant B reuse
Object.assign(window, { SessionCard, SavedSessionTile, LiveUserRow, OnlineUserRow, KIND_COLOR, KIND_ICON, SESSION_TYPES, NavItem, SectionLabel, iconBtn });
