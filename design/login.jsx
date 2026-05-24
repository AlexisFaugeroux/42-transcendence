/* global React, AuthShell, MsnField, MsnSubmit, MsnIcon */
const { useState: useStateLogin } = React;

window.LoginPage = function LoginPage() {
  // State variant: "default" | "error" | "filled" | "loading"
  const [variant, setVariant] = useStateLogin("default");

  // Per-variant prefilled values
  const data = {
    default: { email: "",                     password: "",            error: null,                      loading: false },
    error:   { email: "lex.moreau@example.com", password: "hunter2222", error: "That password doesn't match our records.", loading: false },
    filled:  { email: "lex.moreau@example.com", password: "••••••••••", error: null,                      loading: false },
    loading: { email: "lex.moreau@example.com", password: "••••••••••", error: null,                      loading: true  },
  }[variant];

  const [showPass, setShowPass] = useStateLogin(false);

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to MakeSomeNoise"
      subtitle="Pick up your session, your friends, your beats."
      footer={<>New here? <a href="MakeSomeNoise SignUp.html" style={{ color: "var(--color-orange)" }}>Create an account →</a></>}
    >
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <MsnField
          label="Email"
          type="email"
          value={data.email}
          onChange={() => {}}
          placeholder="you@example.com"
          autoFocus
        />
        <MsnField
          label="Password"
          type={showPass ? "text" : "password"}
          value={data.password}
          onChange={() => {}}
          placeholder="Your password"
          error={data.error}
          hint={<a style={{ color: "var(--fg3)" }}>Forgot password?</a>}
          right={
            <button
              type="button"
              onClick={() => setShowPass(s => !s)}
              style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer", padding: 4, display: "inline-flex" }}
              title={showPass ? "Hide password" : "Show password"}
            >
              <MsnIcon name={showPass ? "users" : "user"} size="14px" />
            </button>
          }
        />
        <MsnSubmit loading={data.loading} disabled={false}>
          {data.loading ? "Signing in…" : <>Log in <MsnIcon name="arrowR" size="11px" /></>}
        </MsnSubmit>
      </form>

      {/* Variant switcher — UI for previewing states (not part of the design) */}
      <StateSwitcher variant={variant} setVariant={setVariant} options={[
        { v: "default", label: "Empty" },
        { v: "filled",  label: "Filled" },
        { v: "error",   label: "Error" },
        { v: "loading", label: "Loading" },
      ]} />
    </AuthShell>
  );
};

window.StateSwitcher = function StateSwitcher({ variant, setVariant, options }) {
  return (
    <div style={{
      marginTop: 22, paddingTop: 16,
      borderTop: "1px dashed var(--line-soft)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)",
    }}>
      <span>// preview state</span>
      <div style={{ display: "inline-flex", border: "0.5px solid var(--line-soft)", borderRadius: 3, overflow: "hidden" }}>
        {options.map(o => (
          <button key={o.v} onClick={() => setVariant(o.v)} style={{
            background: variant === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
            color: variant === o.v ? "var(--color-orange)" : "var(--fg2)",
            border: 0, padding: "4px 10px", fontFamily: "var(--font-display)", fontSize: 11, cursor: "pointer",
            borderRight: "0.5px solid var(--line-soft)",
          }}>{o.label}</button>
        ))}
      </div>
    </div>
  );
};
