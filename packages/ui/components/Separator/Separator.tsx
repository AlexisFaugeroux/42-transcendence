import type { JSX } from "react";

export function Separator(): JSX.Element {
  return (
    <div
      style={{
        width: 1,
        height: 26,
        background: "var(--line-soft)",
        margin: "0 4px",
      }}
    />
  );
}
