import type { CSSProperties, JSX, ReactNode } from "react";
import { MsnIcon } from "../MsnIcon/MsnIcon";
import type { MsnIconLabel } from "../MsnIcon/types";

interface IconBtnProps {
  title?: string;
  name?: MsnIconLabel;
  color?: CSSProperties["color"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  background?: CSSProperties["background"];
  borderColor?: CSSProperties["borderColor"];
  borderRadius?: CSSProperties["borderRadius"];
  boxShadow?: CSSProperties["boxShadow"];
  fontSize?: CSSProperties["fontSize"];
  padding?: CSSProperties["padding"];
  onClick?: () => void;
  children: ReactNode;
}

export function IconBtn({
  name,
  title,
  color,
  background = "transparent",
  borderRadius,
  width = 26,
  height = 26,
  borderColor,
  fontSize,
  padding,
  onClick,
  children,
}: IconBtnProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width,
        height,
        background,
        borderRadius,
        borderColor,
        color: color ? color : "var(--fg2)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize,
        padding,
      }}
    >
      {children || <MsnIcon name={name ?? "msn"} size="12px" />}
    </button>
  );
}
