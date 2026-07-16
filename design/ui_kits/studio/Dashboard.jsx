/* global React, Icon */

const DEMO = [
  { title: "Liquid Drum",    artist: "andre michelle", g: "linear-gradient(135deg, hsl(280,40%,18%), hsl(210,50%,14%))" },
  { title: "Tape Saturator", artist: "andre michelle", g: "linear-gradient(135deg, hsl(25,45%,18%), hsl(8,40%,14%))" },
  { title: "First Steps",    artist: "tutorial",       g: "linear-gradient(135deg, hsl(140,30%,16%), hsl(197,30%,10%))" },
  { title: "Ambient Pads",   artist: "andre michelle", g: "linear-gradient(135deg, hsl(190,40%,16%), hsl(280,30%,12%))" },
  { title: "Granular Test",  artist: "demo",           g: "linear-gradient(135deg, hsl(45,40%,18%), hsl(25,30%,12%))" },
  { title: "808 Workshop",   artist: "tutorial",       g: "linear-gradient(135deg, hsl(8,45%,18%), hsl(280,30%,12%))" },
];

const RES = [
  { label: "Manuals",    href: "#", icon: "help",  color: "var(--color-green)" },
  { label: "Education",  href: "#", icon: "help",  color: "var(--color-orange)" },
  { label: "Discord",    href: "#", icon: "help",  color: "var(--color-blue)" },
  { label: "GitHub",     href: "#", icon: "help",  color: "var(--fg1)" },
  { label: "Newsletter", href: "#", icon: "help",  color: "var(--color-purple)" },
  { label: "Music Portal", href: "#", icon: "help", color: "var(--color-cyan)" },
];

window.Dashboard = function Dashboard({ onOpenProject }) {
  return (
    <div style={{
      flex: 1,
      overflow: "auto",
      background: "var(--bg-panel-2)",
      display: "flex",
      justifyContent: "center",
      padding: "32px 24px",
    }}>
      <article style={{ width: "min(900px, 100%)" }}>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: 36, color: "white", margin: "0 0 0.05em -3px", letterSpacing: -0.01,
        }}>Welcome to openDAW</h1>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: 18, color: "var(--color-blue)", margin: 0,
        }}>A new holistic exploration of music creation inside your browser</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg2)", lineHeight: 1.55, margin: "0.6em 0 0" }}>
          openDAW is an open source web based music studio with a clear focus on{" "}
          <a href="#" style={{ color: "var(--color-blue)" }}>education</a> and{" "}
          <a href="#" style={{ color: "var(--color-blue)" }}>data privacy</a>,
          open to everyone with no login required so you can start creating{" "}
          <a href="#" style={{ color: "var(--color-blue)" }}>music</a> right away. The studio is still
          evolving and not production ready yet.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 36, marginTop: 32 }}>
          {/* Demo Projects */}
          <section>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 14, color: "var(--color-orange)", margin: 0, marginBottom: 12 }}>Demo Projects</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
              {DEMO.map((d, i) => (
                <button key={i} onClick={() => onOpenProject(d.title)} style={{
                  background: "var(--bg-card)", border: 0, borderRadius: 4,
                  padding: 0, cursor: "pointer", textAlign: "left", overflow: "hidden",
                }}>
                  <div style={{ aspectRatio: "1 / 1", background: d.g, position: "relative" }}>
                    <div style={{
                      position: "absolute", right: 6, bottom: 6, width: 22, height: 22,
                      borderRadius: "50%", background: "rgba(0,0,0,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg1)",
                    }}>
                      <Icon name="play" size="9px" />
                    </div>
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontSize: 11, color: "var(--fg1)" }}>{d.title}</div>
                    <div style={{ fontSize: 10, color: "var(--fg3)" }}>{d.artist}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 14, color: "var(--color-orange)", margin: 0, marginBottom: 12 }}>Resources</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {RES.map((r, i) => (
                <li key={i}>
                  <a href={r.href} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    color: r.color, fontSize: 12, padding: "4px 0",
                    fontFamily: "var(--font-display)", fontWeight: 300,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }}/>
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p style={{ marginTop: "3em", fontSize: 11, textAlign: "center", color: "var(--fg3)", fontFamily: "var(--font-body)" }}>
          Visit <a href="#" style={{ color: "var(--color-blue)" }}>Discord</a> and{" "}
          <a href="#" style={{ color: "var(--color-blue)" }}>GitHub</a> for more information.{" "}
          Subscribe to our <a href="#" style={{ color: "var(--color-blue)" }}>Newsletter</a>.{" "}
          Built with ❤️
        </p>
      </article>
    </div>
  );
};
