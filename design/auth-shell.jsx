/* global React, MsnIcon, MsnWordmark, MsnSolid, MsnFramed, MsnTag */
const { useState } = React;

// =================================================================
// Shared auth shell — centered card on a dark canvas
// =================================================================
window.AuthShell = function AuthShell({ children, eyebrow, title, subtitle, footer, width = 440 }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12, fontWeight: 300,
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient orange glow top-right + blue bottom-left */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(circle at 85% 12%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 50%),
                     radial-gradient(circle at 12% 90%, color-mix(in srgb, var(--color-blue) 7%, transparent),   transparent 55%)`,
      }}/>

      {/* Top bar — wordmark + back to landing */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 32px", position: "relative", zIndex: 1,
      }}>
        <a href="MakeSomeNoise Landing.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <MsnIcon name="msn" size="22px" color="var(--color-orange)" />
          <MsnWordmark size={16} />
        </a>
        <a href="MakeSomeNoise Landing.html" style={{
          color: "var(--fg2)", fontSize: 12,
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <MsnIcon name="arrowL" size="12px" /> Back to home
        </a>
      </header>

      {/* Centered card */}
      <main style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", position: "relative", zIndex: 1,
      }}>
        <div style={{ width, maxWidth: "100%" }}>
          {eyebrow && (
            <div style={{
              color: "var(--color-orange)", fontSize: 11,
              textTransform: "uppercase", letterSpacing: 1,
              textAlign: "center", marginBottom: 12,
            }}>{eyebrow}</div>
          )}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 32, color: "white", margin: 0,
            letterSpacing: -0.01, textAlign: "center",
          }}>{title}</h1>
          {subtitle && (
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 14,
              color: "var(--fg2)", margin: "10px auto 0",
              textAlign: "center", maxWidth: 380, lineHeight: 1.5,
            }}>{subtitle}</p>
          )}

          <div style={{
            background: "var(--bg-panel)",
            border: "0.5px solid var(--line-soft)",
            borderRadius: 6,
            padding: 28,
            marginTop: 28,
            boxShadow: "0 24px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02)",
          }}>
            {children}
          </div>

          {footer && (
            <div style={{
              marginTop: 18, textAlign: "center",
              color: "var(--fg3)", fontSize: 12, fontFamily: "var(--font-body)",
            }}>{footer}</div>
          )}
        </div>
      </main>

      {/* Footer with legal */}
      <footer style={{
        padding: "20px 32px", position: "relative", zIndex: 1,
        display: "flex", justifyContent: "space-between",
        color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-body)",
        borderTop: "1px solid var(--line-faint)",
      }}>
        <div>© 2026 MakeSomeNoise.</div>
        <div style={{ display: "flex", gap: 18 }}>
          <a style={{ color: "var(--fg2)" }}>Legal mentions</a>
          <a style={{ color: "var(--fg2)" }}>Privacy</a>
          <a style={{ color: "var(--fg2)" }}>Terms</a>
        </div>
      </footer>
    </div>
  );
};

// =================================================================
// Form primitives
// =================================================================
window.MsnField = function MsnField({ label, value, type = "text", placeholder, error, hint, prefix, right, onChange, autoFocus }) {
  const accent = error ? "var(--color-red)" : "var(--color-orange)";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ color: error ? "var(--color-red)" : "var(--fg2)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
        {hint && <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-body)" }}>{hint}</span>}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "var(--color-void)",
        border: `0.5px solid ${error ? "var(--color-red)" : "var(--line-soft)"}`,
        borderRadius: 3, padding: "0 10px", height: 36,
        boxShadow: error ? "0 0 6px -2px var(--color-red)" : "none",
      }}>
        {prefix && <span style={{ color: "var(--fg3)", fontSize: 13, fontFamily: "var(--font-body)" }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, background: "transparent", border: 0, outline: "none",
            color: "var(--fg1)", fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: 13, height: "100%",
          }}
        />
        {right}
      </div>
      {error && (
        <div style={{ color: "var(--color-red)", fontSize: 11, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid var(--color-red)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, lineHeight: 1 }}>!</span>
          {error}
        </div>
      )}
    </label>
  );
};

window.MsnCheckbox = function MsnCheckbox({ label, checked, onChange, error }) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
      <span style={{
        width: 16, height: 16, borderRadius: 2,
        border: `0.5px solid ${error ? "var(--color-red)" : checked ? "var(--color-orange)" : "var(--line-soft)"}`,
        background: checked ? "color-mix(in srgb, var(--color-orange) 14%, var(--color-void))" : "var(--color-void)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        marginTop: 1,
      }}>
        {checked && <span style={{ color: "var(--color-orange)", fontSize: 11, lineHeight: 1 }}>✓</span>}
      </span>
      <span style={{ color: "var(--fg2)", fontSize: 12, fontFamily: "var(--font-body)", lineHeight: 1.4 }}>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange && onChange(e.target.checked)} style={{ display: "none" }}/>
    </label>
  );
};

window.MsnSubmit = function MsnSubmit({ children, color = "var(--color-orange)", loading, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: "100%", height: 40,
        background: disabled ? "color-mix(in srgb, " + color + " 30%, var(--color-shadow))" : color,
        color: "rgba(0,0,0,0.85)", border: 0, borderRadius: 3,
        fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 13,
        letterSpacing: 0.6, textTransform: "uppercase",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : `0 0 14px -4px ${color}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: disabled ? 0.6 : 1,
      }}>
      {loading ? (
        <>
          <span className="msn-spin" style={{
            width: 14, height: 14, borderRadius: "50%",
            border: "1.5px solid rgba(0,0,0,0.25)",
            borderTopColor: "rgba(0,0,0,0.85)",
            display: "inline-block",
          }}/>
          Signing in…
        </>
      ) : children}
    </button>
  );
};
