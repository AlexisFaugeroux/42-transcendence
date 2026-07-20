export function PeakMeter({ l = 0.6, r = 0.5, width = 80 }) {
  const grad =
    "linear-gradient(90deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 1 }}>
      {[l, r].map((v, i) => (
        <div
          key={i}
          style={{
            height: 4,
            background: "var(--color-void)",
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
  );
}
