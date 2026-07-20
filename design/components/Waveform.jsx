function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function Waveform({
  seed = "x",
  width = 200,
  height = 36,
  color = "var(--color-orange)",
  bg = "transparent",
  progress,
}) {
  const bars = 64;
  const bw = width / bars;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", background: bg }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const t = i / bars;
        const env = Math.sin(t * Math.PI) * 0.55 + 0.45;
        const r = (hashStr(seed + ":" + i) % 1000) / 1000;
        const h = Math.max(1.5, env * r * height);
        const past = progress != null && t < progress;
        return (
          <rect
            key={i}
            x={i * bw + bw * 0.18}
            y={(height - h) / 2}
            width={bw * 0.6}
            height={h}
            fill={
              past ? color : "color-mix(in srgb, currentColor 38%, transparent)"
            }
            style={{ color }}
          />
        );
      })}
    </svg>
  );
}
