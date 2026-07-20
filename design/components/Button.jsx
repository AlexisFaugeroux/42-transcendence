export function Button({
  children,
  variant = "framed",
  color,
  size = "md",
  active,
  style,
  ...rest
}) {
  const heights = { sm: 22, md: 28, lg: 36 };
  const fontSizes = { sm: 11, md: 12, lg: 13 };
  if (variant === "solid") {
    const c = color || "var(--color-orange)";
    return (
      <button
        {...rest}
        style={{
          background: c,
          color: "rgba(0,0,0,0.85)",
          border: 0,
          borderRadius: 3,
          padding: size === "lg" ? "0 18px" : "0 12px",
          height: { sm: 24, md: 32, lg: 40 }[size],
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: size === "lg" ? 13 : 12,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          cursor: "pointer",
          lineHeight: 1,
          whiteSpace: "nowrap",
          boxShadow: `0 0 12px -4px ${c}`,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }
  const c = color || "var(--fg1)";
  return (
    <button
      {...rest}
      style={{
        background: active
          ? `color-mix(in srgb, ${c} 8%, transparent)`
          : "transparent",
        color: c,
        border: "0.5px solid currentColor",
        borderRadius: 3,
        padding: size === "lg" ? "0 14px" : "0 10px",
        height: heights[size],
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: fontSizes[size],
        cursor: "pointer",
        lineHeight: 1,
        whiteSpace: "nowrap",
        boxShadow: active ? "0 0 4px -1px currentColor" : "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
