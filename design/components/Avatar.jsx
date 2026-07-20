const AVATAR_PALETTE = [
  "var(--color-orange)",
  "var(--color-blue)",
  "var(--color-green)",
  "var(--color-yellow)",
  "var(--color-red)",
  "var(--color-purple)",
  "var(--color-cyan)",
];
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function Avatar({ name = "User", size = 28, status, ring }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
  const dotSize = Math.max(6, Math.round(size * 0.28));
  const statusColor = {
    live: "var(--color-red)",
    online: "var(--color-green)",
    idle: "var(--color-yellow)",
    offline: "var(--color-dark)",
  }[status];
  return (
    <span
      style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 4,
          background: `color-mix(in srgb, ${color} 18%, var(--color-shadow))`,
          color,
          border: ring ? `1px solid ${color}` : "0.5px solid var(--line-soft)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: Math.round(size * 0.42),
          letterSpacing: 0.5,
          boxShadow: ring ? `0 0 6px -2px ${color}` : "none",
        }}
      >
        {initials}
      </span>
      {status && (
        <span
          title={status}
          style={{
            position: "absolute",
            right: -2,
            bottom: -2,
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: statusColor,
            border: "1.5px solid var(--bg-panel)",
            boxShadow:
              status === "live" ? `0 0 6px -1px ${statusColor}` : "none",
          }}
        />
      )}
    </span>
  );
}
