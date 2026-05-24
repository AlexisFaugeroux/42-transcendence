/* global React, MsnIcon, MsnWordmark, MsnFramed, MsnSolid, MsnTag, MsnAvatar, MsnWaveform, MSN_DATA */

// Reusable striped image placeholder — explicit "DROP HERE" mono caption.
function ImagePlaceholder({ label, width = "100%", height = 240, accent = "var(--color-orange)", style }) {
  return (
    <div style={{
      width, height,
      borderRadius: 4,
      background: `repeating-linear-gradient(135deg, var(--color-shadow) 0 14px, var(--bg-panel-2) 14px 28px)`,
      border: "0.5px solid var(--line-soft)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      ...style,
    }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 20% 20%, color-mix(in srgb, ${accent} 12%, transparent), transparent 60%)` }}/>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)",
        background: "var(--color-void)", padding: "4px 10px", borderRadius: 2,
        border: `0.5px dashed ${accent}`,
        position: "relative",
        whiteSpace: "nowrap",
      }}>
        <span style={{ color: accent }}>// </span>{label}
      </div>
    </div>
  );
}

window.LandingPage = function LandingPage() {
  return (
    <div style={{
      width: 1440,
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12, fontWeight: 300,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* ========== TOP NAV ========== */}
      <header style={{
        height: 64,
        background: "var(--bg-panel)",
        borderBottom: "1px solid var(--line-faint)",
        display: "flex", alignItems: "center",
        padding: "0 32px", gap: 28, flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <MsnIcon name="msn" size="22px" color="var(--color-orange)" />
          <MsnWordmark size={16} />
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 22, marginLeft: 16 }}>
          <a style={navLink}>Features</a>
          <a style={navLink}>Make beats</a>
          <a style={navLink}>Stream</a>
          <a style={navLink}>Community</a>
          <a style={navLink}>Manuals</a>
        </nav>
        <div style={{ flex: 1 }}/>
        <MsnFramed color="var(--fg2)">Log in</MsnFramed>
        <MsnSolid color="var(--color-orange)">Sign up free</MsnSolid>
      </header>

      {/* ========== HERO ========== */}
      <section style={{
        padding: "72px 32px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        background: "var(--bg-panel-2)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 55%)",
          pointerEvents: "none",
        }}/>
        <div style={{ position: "relative", maxWidth: 560 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <MsnTag color="var(--color-orange)">Beta · open access</MsnTag>
            <span style={{ color: "var(--fg3)", fontSize: 11 }}>No install. Runs in the browser.</span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 64, lineHeight: 1.05, color: "white",
            margin: 0, letterSpacing: -0.015,
          }}>
            Make beats.<br/>
            Record takes.<br/>
            <span style={{ color: "var(--color-orange)" }}>Make some noise.</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55,
            color: "var(--fg2)", margin: "20px 0 0", maxWidth: 480,
          }}>
            MakeSomeNoise is a browser-based studio for producing beats, recording sessions and
            mixing tracks — with a built-in audience. Stream live, share waveforms,
            and connect with other producers without leaving the page.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
            <MsnSolid color="var(--color-orange)" size="lg">
              Sign up free <MsnIcon name="arrowR" size="12px" />
            </MsnSolid>
            <MsnFramed color="var(--fg1)" size="lg">
              <MsnIcon name="play" size="12px" /> Watch a demo
            </MsnFramed>
            <span style={{ color: "var(--fg3)", fontSize: 11, marginLeft: 4 }}>2:14</span>
          </div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex" }}>
              {MSN_DATA.online.slice(0, 5).map((u, i) => (
                <div key={u.handle} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                  <MsnAvatar name={u.name} size={26} />
                </div>
              ))}
            </div>
            <div style={{ color: "var(--fg2)", fontSize: 12 }}>
              <span style={{ color: "var(--fg1)" }}>4,200+ producers</span> already making noise
            </div>
          </div>
        </div>

        {/* Hero image slot */}
        <div style={{ position: "relative" }}>
          <ImagePlaceholder
            label="HERO_SCREENSHOT — beat maker / mixer view (1.6:1)"
            height={420}
            accent="var(--color-orange)"
          />
          {/* faux floating cards over the placeholder */}
          <div style={{
            position: "absolute", left: -24, bottom: 28,
            background: "var(--bg-card)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 4, padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-red)", boxShadow: "0 0 6px var(--color-red)" }}/>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ color: "var(--fg1)", fontSize: 12 }}>Maya Okafor</div>
              <div style={{ color: "var(--color-red)", fontSize: 10 }}>LIVE · 12 listeners</div>
            </div>
          </div>
          <div style={{
            position: "absolute", right: -16, top: 28,
            background: "var(--bg-card)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 4, padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}>
            <span style={{ color: "var(--color-orange)", fontFamily: "var(--font-mono)", fontSize: 10 }}>142 BPM</span>
            <div style={{ color: "var(--color-orange)" }}>
              <MsnWaveform seed="herofloat" width={120} height={20} color="var(--color-orange)" progress={0.62} />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUSTED-BY / KPI STRIP ========== */}
      <section style={{
        padding: "20px 32px",
        borderTop: "1px solid var(--line-faint)",
        borderBottom: "1px solid var(--line-faint)",
        background: "var(--bg-panel)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
      }}>
        {[
          { k: "4.2k+", v: "active producers", c: "var(--color-orange)" },
          { k: "180k", v: "tracks streamed", c: "var(--color-blue)" },
          { k: "0", v: "downloads required", c: "var(--color-green)" },
          { k: "100%", v: "in-browser audio", c: "var(--color-purple)" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "14px 20px",
            background: "var(--bg-panel)",
            display: "flex", flexDirection: "column", gap: 4,
            borderLeft: i === 0 ? "none" : "1px solid var(--line-faint)",
          }}>
            <div style={{ color: s.c, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: -0.01 }}>{s.k}</div>
            <div style={{ color: "var(--fg3)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.v}</div>
          </div>
        ))}
      </section>

      {/* ========== FEATURES ========== */}
      <section style={{ padding: "72px 32px", background: "var(--bg-panel-2)" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
          <div style={{ color: "var(--color-orange)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>What it does</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 36, color: "white", margin: 0, letterSpacing: -0.01 }}>
            A studio, a stage, and a community — in one tab.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg2)", margin: "12px auto 0", maxWidth: 520 }}>
            Every tool you need to go from an idea to a release, plus a live audience that hears it before anyone else.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map(f => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ========== DEEP-DIVE ALTERNATING ROWS ========== */}
      <section style={{ padding: "0 32px 48px", background: "var(--bg-panel-2)" }}>
        {DEEP_DIVES.map((d, i) => (
          <DeepDiveRow key={d.title} {...d} reverse={i % 2 === 1} accent={d.accent} />
        ))}
      </section>

      {/* ========== SOCIAL / COMMUNITY ========== */}
      <section style={{
        padding: "72px 32px",
        background: "var(--bg-panel)",
        borderTop: "1px solid var(--line-faint)",
        borderBottom: "1px solid var(--line-faint)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "center",
      }}>
        <div>
          <div style={{ color: "var(--color-orange)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Community</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 32, color: "white", margin: 0, letterSpacing: -0.01 }}>
            Built-in audience. <span style={{ color: "var(--color-orange)" }}>From the first beat.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg2)", margin: "14px 0 0", maxWidth: 480, lineHeight: 1.55 }}>
            Stream sessions live. Drop tracks into shared playlists. DM another producer to swap stems.
            Likes, follows and comments tied to the waveform itself — feedback lands on the bar it was meant for.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { i: "chat",  c: "var(--color-blue)",   t: "Direct messaging and group chat" },
              { i: "users", c: "var(--color-green)",  t: "Profiles, follows and live presence" },
              { i: "list",  c: "var(--color-purple)", t: "Shared playlists and re-posts" },
              { i: "heart", c: "var(--color-red)",    t: "Timestamp-pinned likes and comments" },
            ].map(b => (
              <li key={b.t} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--fg2)", fontSize: 13, fontFamily: "var(--font-body)" }}>
                <span style={{ color: b.c, display: "inline-flex" }}><MsnIcon name={b.i} size="16px" /></span> {b.t}
              </li>
            ))}
          </ul>
        </div>
        <ImagePlaceholder
          label="COMMUNITY_SCREENSHOT — chat / live listening party"
          height={360}
          accent="var(--color-blue)"
        />
      </section>

      {/* ========== CTA ========== */}
      <section style={{
        padding: "80px 32px",
        background: "var(--bg-panel-2)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 60%)",
          pointerEvents: "none",
        }}/>
        <h2 style={{ position: "relative", fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 44, color: "white", margin: 0, letterSpacing: -0.01 }}>
          Press record. <span style={{ color: "var(--color-orange)" }}>Make some noise.</span>
        </h2>
        <p style={{ position: "relative", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg2)", margin: "14px auto 0", maxWidth: 520 }}>
          Free while in beta. No credit card. Your sessions stay yours.
        </p>
        <div style={{ position: "relative", display: "inline-flex", gap: 12, marginTop: 28 }}>
          <MsnSolid color="var(--color-orange)" size="lg">Sign up free <MsnIcon name="arrowR" size="12px" /></MsnSolid>
          <MsnFramed color="var(--fg1)" size="lg">Log in</MsnFramed>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{
        background: "var(--color-void)",
        borderTop: "1px solid var(--line-faint)",
        padding: "40px 32px 24px",
        display: "flex", flexDirection: "column", gap: 28,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
              <MsnWordmark size={14} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg3)", margin: 0, maxWidth: 280, lineHeight: 1.55 }}>
              A browser-based studio with a built-in audience. No installs, no tracking.
            </p>
          </div>
          <FooterCol title="Product" links={["Features", "Beat maker", "Recording", "Mixer", "Stream"]} />
          <FooterCol title="Community" links={["Discover", "Playlists", "Live now", "Discord", "Newsletter"]} />
          <FooterCol title="Resources" links={["Manuals", "Tutorials", "Changelog", "Status", "Roadmap"]} />
          <FooterCol title="Company" links={["About", "Contact", "Press kit"]} />
        </div>

        <div style={{ height: 1, background: "var(--line-faint)" }}/>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-body)" }}>
          <div>© 2026 MakeSomeNoise. Built with <span style={{ color: "var(--color-red)" }}>♥</span>.</div>
          <div style={{ display: "flex", gap: 18 }}>
            <a style={footerLegalLink}>Legal mentions</a>
            <a style={footerLegalLink}>Privacy</a>
            <a style={footerLegalLink}>Terms</a>
            <a style={footerLegalLink}>Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ===== Sub-components & data =====
const FEATURES = [
  {
    icon: "produce", color: "var(--color-orange)", title: "Beat maker",
    desc: "Drum scheduler, loops, instrument tracks and a timeline. Build a song in your tab.",
    bullets: ["Step sequencer", "Loop crates", "MIDI editor", "Sample library"],
  },
  {
    icon: "record", color: "var(--color-red)", title: "Recording",
    desc: "Capture vocals, instruments or field audio with monitoring and overdubs.",
    bullets: ["Multitrack", "Punch-in", "Latency comp", "Take comping"],
  },
  {
    icon: "mix", color: "var(--color-blue)", title: "Mixer & export",
    desc: "Channel strips, sends, busses, EQ. Bounce to MP3, WAV, or stream straight to your profile.",
    bullets: ["Channel strips", "Sends & busses", "EQ + comp", "MP3 / WAV export"],
  },
  {
    icon: "waveform", color: "var(--color-cyan)", title: "Waveform streaming",
    desc: "Push live takes and finished tracks to listeners with a synced waveform UI.",
    bullets: ["Live sessions", "Synced cursor", "Listener counts", "Replay"],
  },
  {
    icon: "users", color: "var(--color-green)", title: "Profiles & social",
    desc: "Followers, playlists, likes, profiles. Find collaborators and build an audience.",
    bullets: ["Profiles", "Follows", "Playlists", "Re-posts"],
  },
  {
    icon: "chat", color: "var(--color-purple)", title: "Chat & sessions",
    desc: "DM another producer or open a shared session. Trade stems without leaving the page.",
    bullets: ["DMs", "Group chat", "Shared sessions", "Stem swap"],
  },
];

const DEEP_DIVES = [
  {
    eyebrow: "PRODUCTION",
    title: "A drum machine that thinks like a sequencer.",
    body: "Schedule beats on a step grid, swap kits with a keystroke, automate any parameter on the fly. Loop crates and a global metronome keep the groove tight.",
    accent: "var(--color-orange)",
    image: "BEAT_MAKER_SCREENSHOT — step sequencer, sampler, drum kit",
  },
  {
    eyebrow: "STREAMING",
    title: "Stream a session. Watch listeners arrive.",
    body: "Go live with one click. Listeners see the same waveform you see, comment on specific bars, and clip their favourite moments. Replays stay in your profile.",
    accent: "var(--color-red)",
    image: "STREAM_SCREENSHOT — live session view with listener cursors",
  },
  {
    eyebrow: "MIXING",
    title: "Channel strips that don't get in your way.",
    body: "Pre-built busses, sends to anywhere, EQ and comp on every channel. Master out to your profile or download a clean WAV.",
    accent: "var(--color-blue)",
    image: "MIXER_SCREENSHOT — channel strip mixer with master meter",
  },
];

function FeatureCard({ icon, color, title, desc, bullets }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: 22,
      display: "flex", flexDirection: "column", gap: 12,
      position: "relative", overflow: "hidden",
      minHeight: 200,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 100% 0%, color-mix(in srgb, ${color} 14%, transparent), transparent 60%)`,
        pointerEvents: "none",
      }}/>
      <div style={{
        width: 44, height: 44, borderRadius: 4,
        background: `color-mix(in srgb, ${color} 14%, var(--color-void))`,
        color,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 8px -3px ${color}, inset 0 0 0 0.5px ${color}`,
      }}>
        <MsnIcon name={icon} size="22px" />
      </div>
      <div>
        <div style={{ color: "white", fontSize: 17, fontWeight: 400, marginBottom: 6 }}>{title}</div>
        <div style={{ color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: "auto" }}>
        {bullets.map(b => <MsnTag key={b} color={color}>{b}</MsnTag>)}
      </div>
    </div>
  );
}

function DeepDiveRow({ eyebrow, title, body, accent, image, reverse }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center",
      padding: "56px 0",
      borderTop: "1px solid var(--line-faint)",
    }}>
      <div style={{ order: reverse ? 2 : 1 }}>
        <div style={{ color: accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{eyebrow}</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, color: "white", margin: 0, letterSpacing: -0.01, lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg2)", margin: "14px 0 22px", maxWidth: 460, lineHeight: 1.55 }}>{body}</p>
        <a style={{ color: accent, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          Learn more <MsnIcon name="arrowR" size="11px" />
        </a>
      </div>
      <div style={{ order: reverse ? 1 : 2 }}>
        <ImagePlaceholder label={image} height={300} accent={accent} />
      </div>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{ color: "var(--fg1)", fontSize: 12, fontWeight: 400, marginBottom: 12, letterSpacing: 0.4 }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map(l => (
          <li key={l}><a style={footerLink}>{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

const navLink = { color: "var(--fg2)", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" };
const footerLink = { color: "var(--fg3)", fontSize: 12, fontFamily: "var(--font-body)", cursor: "pointer" };
const footerLegalLink = { color: "var(--fg2)", fontSize: 12, fontFamily: "var(--font-body)", cursor: "pointer" };
