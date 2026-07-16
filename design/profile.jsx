/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnWaveform */
const { useState: useStateProfile, useMemo: useMemoProfile } = React;

// Public profile data, keyed by handle (matches the Users directory)
const PROFILES = {
  "maya.o": {
    alias: "maya okafor", handle: "maya.o",
    bio: "vocalist + beatmaker. layering breath and tape hiss into something you can dance to. lagos ↔ berlin.",
    location: "Berlin, DE", joined: "Jan 2026",
    followers: 3120, following: 184, likes: 892,
    live: true, liveTitle: "Recording vocals — take 6", liveListeners: 12,
    links: [
      { kind: "site", label: "mayaokafor.fm", url: "#" },
      { kind: "soundcloud", label: "soundcloud.com/mayao", url: "#" },
      { kind: "bandcamp", label: "mayaokafor.bandcamp.com", url: "#" },
    ],
    tracks: [
      { id: 1, title: "Breath Control",     bpm: 96,  key: "A min", dur: "3:12", plays: "48.2k", likes: "3.1k", seed: "breath",   kind: "production" },
      { id: 2, title: "Tape Hiss Lullaby",  bpm: 72,  key: "D maj", dur: "4:02", plays: "22.9k", likes: "1.8k", seed: "lullaby",  kind: "production" },
      { id: 3, title: "Lagos Night Bus",    bpm: 124, key: "F min", dur: "2:48", plays: "61.4k", likes: "5.2k", seed: "nightbus", kind: "mixing" },
      { id: 4, title: "Overdub 04 (demo)",  bpm: 88,  key: "C maj", dur: "1:36", plays: "9.7k",  likes: "612",  seed: "overdub",  kind: "recording" },
      { id: 5, title: "Static Choir",       bpm: 110, key: "G min", dur: "3:44", plays: "34.0k", likes: "2.6k", seed: "choir",    kind: "production" },
    ],
    liked: [
      { title: "Liquid Drum 808", who: "lex moreau", seed: "liquid808", kind: "production" },
      { title: "Sundown Loop",    who: "lex moreau", seed: "sundown",   kind: "production" },
      { title: "Late Night Bounce", who: "theo rivera", seed: "latenight", kind: "mixing" },
      { title: "Field Cafe Lyon", who: "rosa petrov", seed: "fieldcafe", kind: "recording" },
    ],
    followersList: ["lex moreau","theo rivera","anouk lemaire","idris khan","rosa petrov","jun park"],
    followingList: ["cleo banner","sam west","nadia haddad","bruno costa"],
  },
};

const FALLBACK = {
  alias: "producer", handle: "unknown",
  bio: "", location: "", joined: "2026",
  followers: 0, following: 0, likes: 0, live: false,
  links: [], tracks: [], liked: [], followersList: [], followingList: [],
};

function getHandle() {
  const m = new URLSearchParams(location.search).get("u");
  return m || "maya.o";
}

const KIND_COLOR = { recording: "var(--color-red)", production: "var(--color-orange)", mixing: "var(--color-blue)" };
const KIND_ICON  = { recording: "record", production: "produce", mixing: "mix" };

window.ProfilePage = function ProfilePage() {
  const handle = getHandle();
  const p = PROFILES[handle] || { ...FALLBACK, handle };

  // Preview-state switcher
  const [variant, setVariant] = useStateProfile("default"); // default | following | live | empty
  const following = variant === "following";
  const isLive = variant === "live" ? true : variant === "empty" ? false : (variant === "default" || variant === "following") ? false : p.live;
  const showLive = variant === "live";
  const tracks = variant === "empty" ? [] : p.tracks;

  const [tab, setTab] = useStateProfile("tracks"); // tracks | liked | followers | following

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-app)", color: "var(--fg1)", fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 300 }}>
      <ProfileHeader />

      {showLive && <LiveBanner p={p} />}

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 32px 80px" }}>
        {/* ===== Header block ===== */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <MsnAvatar name={p.alias} size={96} status={showLive ? "live" : undefined} ring={showLive} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, letterSpacing: -0.01, textTransform: "capitalize" }}>{p.alias}</h1>
                <div style={{ color: "var(--fg3)", fontSize: 13, fontFamily: "var(--font-mono)", marginTop: 2 }}>@{p.handle}</div>
              </div>
              {/* Social actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {following
                  ? <MsnFramed color="var(--color-orange)" active onClick={() => setVariant("default")}><MsnIcon name="users" size="12px" /> Following</MsnFramed>
                  : <MsnSolid color="var(--color-orange)" onClick={() => setVariant("following")}><MsnIcon name="plus" size="12px" /> Follow</MsnSolid>}
                <MsnFramed color="var(--fg1)"><MsnIcon name="chat" size="12px" /> Message</MsnFramed>
              </div>
            </div>

            {/* Bio */}
            {p.bio && <p style={{ margin: "12px 0 0", maxWidth: 620, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--fg2)" }}>{p.bio}</p>}

            {/* Meta row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 14, color: "var(--fg3)", fontSize: 12 }}>
              {p.location && <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MsnIcon name="home" size="12px" /> {p.location}</span>}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MsnIcon name="user" size="12px" /> Joined {p.joined}</span>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 22, marginTop: 14 }}>
              <Stat n={p.followers} label="Followers" onClick={() => setTab("followers")} />
              <Stat n={p.following} label="Following" onClick={() => setTab("following")} />
              <Stat n={p.likes} label="Likes" />
            </div>

            {/* Links */}
            {p.links.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {p.links.map((l, i) => (
                  <a key={i} href={l.url} style={{ textDecoration: "none" }}>
                    <MsnFramed color="var(--color-blue)" size="sm">
                      <MsnIcon name={l.kind === "site" ? "home" : "music"} size="11px" /> {l.label}
                    </MsnFramed>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line-soft)", marginBottom: 20 }}>
          {[
            { v: "tracks", label: "Tracks", count: tracks.length },
            { v: "liked", label: "Liked", count: p.liked.length },
            { v: "followers", label: "Followers", count: p.followers },
            { v: "following", label: "Following", count: p.following },
          ].map(t => (
            <button key={t.v} onClick={() => setTab(t.v)} style={{
              background: "transparent", border: 0, padding: "10px 14px",
              color: tab === t.v ? "var(--fg1)" : "var(--fg2)",
              fontFamily: "var(--font-display)", fontSize: 13, cursor: "pointer",
              borderBottom: `2px solid ${tab === t.v ? "var(--color-orange)" : "transparent"}`,
              marginBottom: -1, display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              {t.label}
              <span style={{ color: "var(--fg3)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{fmt(t.count)}</span>
            </button>
          ))}
        </div>

        {/* ===== Tab content ===== */}
        {tab === "tracks" && (
          tracks.length === 0
            ? <EmptyTracks alias={p.alias} />
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{tracks.map((t, i) => <TrackRow key={t.id} t={t} index={i} />)}</div>
        )}
        {tab === "liked" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {p.liked.map((t, i) => <LikedCard key={i} t={t} />)}
          </div>
        )}
        {tab === "followers" && <PeopleList people={p.followersList} />}
        {tab === "following" && <PeopleList people={p.followingList} />}
      </div>

      {/* Preview-state switcher */}
      <StateSwitcher variant={variant} setVariant={setVariant} />
    </div>
  );
};

// ===== Live banner =====
function LiveBanner({ p }) {
  return (
    <div style={{
      background: "color-mix(in srgb, var(--color-red) 14%, var(--bg-panel))",
      borderBottom: "1px solid var(--color-red)",
      padding: "10px 32px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-red)", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-red)", boxShadow: "0 0 6px var(--color-red)" }} /> Live now
        </span>
        <span style={{ color: "var(--fg1)", fontSize: 13 }}>{p.liveTitle}</span>
        <span style={{ color: "var(--fg3)", fontSize: 12, fontFamily: "var(--font-mono)" }}>{p.liveListeners} listening</span>
        <div style={{ flex: 1 }} />
        <MsnSolid color="var(--color-red)" size="sm"><MsnIcon name="play" size="11px" /> Join session</MsnSolid>
      </div>
    </div>
  );
}

// ===== Track row =====
function TrackRow({ t, index }) {
  const [playing, setPlaying] = useStateProfile(false);
  const color = KIND_COLOR[t.kind];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "40px 1.4fr 2fr 90px 70px 70px", gap: 14, alignItems: "center",
      background: "var(--bg-panel-2)", border: "0.5px solid var(--line-soft)", borderRadius: 4, padding: "10px 14px",
    }}>
      <button onClick={() => setPlaying(v => !v)} title={playing ? "Pause" : "Play"} style={{
        width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
        background: playing ? "var(--color-orange)" : "transparent",
        color: playing ? "rgba(0,0,0,0.85)" : "var(--color-orange)",
        border: "1px solid var(--color-orange)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        {playing ? <span style={{ display: "inline-flex", gap: 2 }}><span style={{ width: 3, height: 11, background: "currentColor" }} /><span style={{ width: 3, height: 11, background: "currentColor" }} /></span> : <MsnIcon name="play" size="12px" />}
      </button>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--fg1)", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
          <MsnTag color={color}>{t.kind}</MsnTag>
          <span style={{ color: "var(--fg3)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{t.bpm} BPM · {t.key}</span>
        </div>
      </div>

      <div style={{ color }}><MsnWaveform seed={t.seed} width={320} height={30} color={color} progress={playing ? 0.4 : undefined} /></div>

      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)" }}>{t.dur}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)" }}><MsnIcon name="play" size="10px" color="var(--fg3)" /> {t.plays}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)" }}><MsnIcon name="heart" size="11px" color="var(--color-red)" /> {t.likes}</span>
    </div>
  );
}

function LikedCard({ t }) {
  const color = KIND_COLOR[t.kind];
  return (
    <div style={{ background: "var(--bg-panel-2)", border: "0.5px solid var(--line-soft)", borderRadius: 4, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color, display: "inline-flex" }}><MsnIcon name={KIND_ICON[t.kind]} size="14px" /></span>
        <span style={{ color: "var(--fg1)", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</span>
      </div>
      <div style={{ color }}><MsnWaveform seed={t.seed} width={216} height={26} color={color} /></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--fg3)", fontSize: 11 }}>
        <span style={{ textTransform: "capitalize", fontFamily: "var(--font-body)" }}>{t.who}</span>
        <MsnIcon name="heart" size="12px" color="var(--color-red)" />
      </div>
    </div>
  );
}

function PeopleList({ people }) {
  if (people.length === 0) return <Empty label="No one here yet." />;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
      {people.map((name, i) => {
        const handle = name.replace(/\s+/g, ".").toLowerCase();
        return (
          <div key={i} style={{ background: "var(--bg-panel-2)", border: "0.5px solid var(--line-soft)", borderRadius: 4, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <MsnAvatar name={name} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "var(--fg1)", fontSize: 14, textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
              <div style={{ color: "var(--fg3)", fontSize: 12, fontFamily: "var(--font-mono)" }}>@{handle}</div>
            </div>
            <a href={"MakeSomeNoise Profile.html?u=" + encodeURIComponent(handle)} style={{ textDecoration: "none" }}>
              <MsnFramed color="var(--color-orange)" size="sm">View</MsnFramed>
            </a>
          </div>
        );
      })}
    </div>
  );
}

function EmptyTracks({ alias }) {
  return (
    <div style={{ padding: "60px 24px", textAlign: "center", background: "var(--bg-panel-2)", border: "0.5px dashed var(--line-soft)", borderRadius: 4 }}>
      <div style={{ color: "var(--color-orange)", marginBottom: 10 }}><MsnIcon name="waveform" size="26px" /></div>
      <h3 style={{ margin: 0, fontWeight: 400, fontSize: 16, color: "var(--fg1)", textTransform: "capitalize" }}>{alias} hasn't published any tracks yet</h3>
      <p style={{ margin: "6px 0 0", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg2)" }}>When they release something, it'll show up here.</p>
    </div>
  );
}

function Empty({ label }) {
  return <div style={{ padding: "50px 24px", textAlign: "center", background: "var(--bg-panel-2)", border: "0.5px dashed var(--line-soft)", borderRadius: 4, color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 13 }}>{label}</div>;
}

function Stat({ n, label, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "transparent", border: 0, cursor: onClick ? "pointer" : "default", padding: 0, textAlign: "left", display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ color: "var(--fg1)", fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 18, letterSpacing: -0.01 }}>{fmt(n)}</span>
      <span style={{ color: "var(--fg3)", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
    </button>
  );
}

function StateSwitcher({ variant, setVariant }) {
  const opts = [
    { v: "default", label: "Default" },
    { v: "following", label: "Following" },
    { v: "live", label: "Live now" },
    { v: "empty", label: "No tracks" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", alignItems: "center", gap: 8, background: "var(--bg-elevated)", border: "0.5px solid var(--line-soft)", borderRadius: 4, padding: "6px 10px", boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}>
      <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)" }}>// preview state</span>
      <div style={{ display: "inline-flex", border: "0.5px solid var(--line-soft)", borderRadius: 3, overflow: "hidden" }}>
        {opts.map(o => (
          <button key={o.v} onClick={() => setVariant(o.v)} style={{
            background: variant === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
            color: variant === o.v ? "var(--color-orange)" : "var(--fg2)",
            border: 0, borderRight: "0.5px solid var(--line-soft)", padding: "4px 10px",
            fontFamily: "var(--font-display)", fontSize: 11, cursor: "pointer",
          }}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

function ProfileHeader() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="MakeSomeNoise Landing.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} />
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 12 }}>
        <a href="MakeSomeNoise Home.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Home</a>
        <a href="MakeSomeNoise Sessions.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Sessions</a>
        <a href="MakeSomeNoise Samples.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Library</a>
        <a href="MakeSomeNoise Users.html" style={{ color: "var(--fg2)", textDecoration: "none" }}>Producers</a>
      </nav>
      <a href="MakeSomeNoise Dashboard.html" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <MsnAvatar name="lex moreau" size={28} status="online" />
        <span style={{ color: "var(--fg1)", fontSize: 12 }}>@lex.moreau</span>
      </a>
    </header>
  );
}

function fmt(n) {
  if (typeof n !== "number") return n;
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}
