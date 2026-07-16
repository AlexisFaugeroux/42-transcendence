/* global React, AuthShell, MsnField, MsnSubmit, MsnIcon, StateSwitcher */
const { useState: useStateSignup } = React;

window.SignUpPage = function SignUpPage() {
  const [variant, setVariant] = useStateSignup("filled");

  const data = {
    default: { email: "", username: "", alias: "", password: "", emailErr: null, userErr: null, loading: false },
    filled:  { email: "rosa.petrov@example.com", username: "rosa.p", alias: "rosa petrov", password: "TapeReel-9-9-2026", emailErr: null, userErr: null, loading: false },
    error:   { email: "rosa@example.com", username: "rosa", alias: "rosa petrov", password: "shortpw", emailErr: "An account with that email already exists.", userErr: "Handle is taken — try rosa.99 or rosa_p", loading: false },
    loading: { email: "rosa.petrov@example.com", username: "rosa.p", alias: "rosa petrov", password: "TapeReel-9-9-2026", emailErr: null, userErr: null, loading: true },
  }[variant];

  // Password strength heuristic for the filled state
  const strength = passwordStrength(data.password);

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Free during beta. No tracking, no credit card."
      footer={<>Already have an account? <a href="MakeSomeNoise Login.html" style={{ color: "var(--color-orange)" }}>Log in →</a></>}
      width={460}
    >
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <MsnField
          label="Email"
          type="email"
          value={data.email}
          onChange={() => {}}
          placeholder="you@example.com"
          error={data.emailErr}
          autoFocus
        />
        <MsnField
          label="Username"
          value={data.username}
          onChange={() => {}}
          placeholder="lex.moreau"
          prefix="@"
          error={data.userErr}
          hint="Letters, numbers, dot, underscore"
        />
        <MsnField
          label="Producer alias"
          value={data.alias}
          onChange={() => {}}
          placeholder="Your artist name"
          hint="Visible on your profile"
        />
        <div>
          <MsnField
            label="Password"
            type="password"
            value={data.password}
            onChange={() => {}}
            placeholder="At least 10 characters"
          />
          {data.password && (
            <div style={{ marginTop: 8 }}>
              <PasswordMeter score={strength.score} label={strength.label} />
            </div>
          )}
        </div>

        <div style={{
          color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-body)", lineHeight: 1.5,
          padding: "8px 0",
        }}>
          By creating an account you agree to our{" "}
          <a style={{ color: "var(--fg2)" }}>Terms</a> and{" "}
          <a style={{ color: "var(--fg2)" }}>Privacy policy</a>.
        </div>

        <MsnSubmit loading={data.loading}>
          {data.loading ? "Creating account…" : <>Create account <MsnIcon name="arrowR" size="11px" /></>}
        </MsnSubmit>
      </form>

      <StateSwitcher variant={variant} setVariant={setVariant} options={[
        { v: "default", label: "Empty" },
        { v: "filled",  label: "Filled" },
        { v: "error",   label: "Error" },
        { v: "loading", label: "Loading" },
      ]} />
    </AuthShell>
  );
};

function passwordStrength(pw) {
  if (!pw) return { score: 0, label: "" };
  let s = 0;
  if (pw.length >= 8)  s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^\w\s]/.test(pw)) s++;
  const label = ["Too short", "Weak", "OK", "Good", "Strong", "Excellent"][s];
  return { score: s, label };
}

function PasswordMeter({ score, label }) {
  const colors = ["var(--color-red)", "var(--color-red)", "var(--color-orange)", "var(--color-yellow)", "var(--color-green)", "var(--color-green)"];
  const c = colors[score] || "var(--color-dark)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 3, flex: 1 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 1,
            background: i < score ? c : "var(--color-void)",
            boxShadow: i < score ? `0 0 4px -1px ${c}` : "none",
          }}/>
        ))}
      </div>
      <span style={{ color: c, fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</span>
    </div>
  );
}
