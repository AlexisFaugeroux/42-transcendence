import type { JSX } from "react";
import { theme } from "../../theme/theme";

interface MsnPeakMeterProps {
  layout?: "vertical" | "horizontal";
  l?: number;
  r?: number;
  width?: number;
}

export function MsnPeakMeter({
  layout = "vertical",
  l = 0.6,
  r = 0.5,
  width = 80,
}: MsnPeakMeterProps): JSX.Element {
  const { green, yellow, red } = theme;

  const grad = `linear-gradient(90deg, ${green} 0%, ${green} 65%, ${yellow} 65%, ${yellow} 88%, ${red} 88%, ${red} 100%)`;

  // TODO: handle vertical layout
  return layout === "horizontal" ? (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 1 }}>
      {[l, r].map((v, i) => (
        <div
          key={i}
          style={{
            height: 4,
            background: theme.void,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{ width: `${v * 100}%`, height: "100%", background: grad }}
          />
        </div>
      ))}
    </div>
  ) : (
    <div>Prout</div>
  );
}
