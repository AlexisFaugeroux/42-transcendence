/* global React */

window.Footer = function Footer({ project }) {
  const Item = ({ children, accent }) => (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "0 8px", height: "100%",
      borderRight: "1px solid var(--line-faint)",
      color: accent || "var(--fg2)",
      fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: 0.02,
    }}>{children}</div>
  );
  return (
    <footer style={{
      height: "1.25rem",
      minHeight: 22,
      background: "var(--bg-panel)",
      borderTop: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "stretch",
      fontSize: 10,
      flexShrink: 0,
    }}>
      <Item><span style={{ color: "var(--color-green)" }}>●</span> {project || "Untitled Project"}</Item>
      <Item>48000 Hz</Item>
      <Item>buffer 256</Item>
      <Item accent="var(--color-yellow)">latency 5.3 ms</Item>
      <Item>storage 41%</Item>
      <div style={{ flex: 1 }}/>
      <Item>v2026.04 · build a3f</Item>
      <Item accent="var(--color-blue)">opendaw.studio</Item>
    </footer>
  );
};
