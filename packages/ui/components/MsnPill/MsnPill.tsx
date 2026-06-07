import type { JSX } from "react";
import { theme } from "../../theme/theme";

interface MsnPillProps {
  active: boolean;
  color: string;
  title?: string;
  label?: string;
  dot?: boolean;
  onClick?: () => void;
}

export function MsnPill({
  label,
  dot,
  active,
  color,
  title,
  onClick,
}: MsnPillProps): JSX.Element {
  return (
    <span
      title={title}
      style={{
        width: 14,
        height: 14,
        borderRadius: 2,
        border: `0.5px solid ${active ? color : theme.lineHover}`,
        background: active
          ? `color-mix(in srgb, ${color} 16%, transparent)`
          : "transparent",
        color: active ? color : theme.fg3,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        boxShadow: active ? `0 0 4px -1px ${color}` : "none",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {dot ? (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "currentColor",
          }}
        ></span>
      ) : (
        label
      )}
    </span>
  );
}
