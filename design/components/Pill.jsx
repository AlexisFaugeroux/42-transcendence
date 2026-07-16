export function Pill({ label, dot, active, color = "var(--color-orange)", title, onClick }) {
  return (
    <span title={title} onClick={onClick} style={{
      width: 14, height: 14, borderRadius: 2,
      border: `0.5px solid ${active ? color : "var(--line-hover)"}`,
      background: active ? `color-mix(in srgb, ${color} 16%, transparent)` : "transparent",
      color: active ? color : "var(--fg3)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: 9, fontFamily: "var(--font-display)", fontWeight: 400,
      boxShadow: active ? `0 0 4px -1px ${color}` : "none",
      cursor: "pointer",
    }}>
      {dot ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }}/> : label}
    </span>
  );
}
