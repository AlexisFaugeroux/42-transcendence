import type { JSX } from "react";

interface MsnWordmarkProps {
  size: number;
  color?: string;
  accent?: string;
}

export function MsnWordmark({
  size,
  color,
  accent,
}: MsnWordmarkProps): JSX.Element {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize: size,
        color,
        letterSpacing: -0.01,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 0,
      }}
    >
      <span style={{ fontWeight: 300 }}>make</span>
      <span style={{ fontWeight: 400 }}>some</span>
      <span style={{ fontWeight: 400, color: accent }}>noise</span>
      <span style={{ color: accent, marginLeft: 1 }}>.</span>
    </span>
  );
}
