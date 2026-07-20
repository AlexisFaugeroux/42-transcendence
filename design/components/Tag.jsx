export function Tag({ children, color = "var(--color-gray)" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        color,
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: 10,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        padding: "2px 6px",
        borderRadius: 2,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
