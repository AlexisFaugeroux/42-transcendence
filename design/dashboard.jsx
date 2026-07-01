/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag */
const { useState, useMemo, useEffect, useRef } = React;

// ====== seed user data (used as the "saved" source of truth) ======
const SAVED_USER = {
  alias: "lex moreau",
  handle: "lex.moreau",
  email: "lex.moreau@example.com",
  bio: "live looper, modular dabbler. recording in a converted garage in lyon. always down to jam after 22h.",
  location: "Lyon, FR",
  links: [
    { kind: "site", url: "https://lexmoreau.fm" },
    { kind: "soundcloud", url: "soundcloud.com/lexmoreau" },
    { kind: "bandcamp", url: "lexmoreau.bandcamp.com" },
  ],
  pronouns: "they/them",
  joined: "Apr 2026",
};

// ===========================================================================
// Top-level dashboard
// ===========================================================================
window.Dashboard = function Dashboard() {
  // Variant — drives the whole page state for previewing
  // "saved" | "editing" | "dirty" | "error" | "success" | "delete"
  const [variant, setVariant] = useState("saved");

  // Local form state — initialized from SAVED_USER, mutated only when 'editing' or 'dirty' or 'error'
  const stateForVariant = (v) => {
    switch (v) {
      case "editing":
        return { ...SAVED_USER };
      case "dirty":
        return {
          ...SAVED_USER,
          alias: "Lex Moreau",
          bio: "live looper, modular dabbler. moved to Berlin in March — looking for a new garage. always down to jam after 22h.",
        };
      case "error":
        return { ...SAVED_USER, handle: "lex moreau", email: "lex.moreau@" }; // invalid
      case "success":
        return {
          ...SAVED_USER,
          bio: "live looper, modular dabbler. moved to Berlin in March — looking for a new garage. always down to jam after 22h.",
        };
      default:
        return { ...SAVED_USER };
    }
  };
  const [form, setForm] = useState(stateForVariant("saved"));
  useEffect(() => {
    setForm(stateForVariant(variant));
  }, [variant]);

  // Edit-mode toggles per section
  const profileEditing =
    variant === "editing" || variant === "dirty" || variant === "error";
  const isDirty = variant === "dirty" || variant === "error";

  // Anchored scroll
  const sections = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "account", label: "Account", icon: "settings" },
    { id: "danger", label: "Danger zone", icon: "bell" },
  ];
  const [activeId, setActiveId] = useState("profile");
  const refs = useRef({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-app)",
        color: "var(--fg1)",
        fontFamily: "var(--font-display)",
        fontSize: 12,
        fontWeight: 300,
        position: "relative",
      }}
    >
      <DashHeader />
      {isDirty && (
        <DirtyBanner
          onDiscard={() => setVariant("saved")}
          onSave={() => setVariant("success")}
          hasErrors={variant === "error"}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "32px 32px 80px",
          gap: 36,
        }}
      >
        {/* Sticky in-page sidebar */}
        <aside
          style={{
            position: "sticky",
            top: isDirty ? 110 : 88,
            alignSelf: "start",
          }}
        >
          <div
            style={{
              color: "var(--fg3)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Settings
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 3,
                  background:
                    activeId === s.id
                      ? "color-mix(in srgb, var(--color-orange) 10%, transparent)"
                      : "transparent",
                  color:
                    activeId === s.id ? "var(--color-orange)" : "var(--fg2)",
                  borderLeft: `2px solid ${activeId === s.id ? "var(--color-orange)" : "transparent"}`,
                  fontSize: 12,
                  fontWeight: 300,
                  textDecoration: "none",
                }}
              >
                <MsnIcon name={s.icon} size="13px" /> {s.label}
              </a>
            ))}
          </nav>

          {/* state preview switcher (dev-only) */}
          <div
            style={{
              marginTop: 28,
              paddingTop: 18,
              borderTop: "1px dashed var(--line-soft)",
            }}
          >
            <div
              style={{
                color: "var(--fg3)",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                marginBottom: 8,
              }}
            >
              // preview state
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 4,
              }}
            >
              {[
                { v: "saved", label: "Saved" },
                { v: "editing", label: "Editing" },
                { v: "dirty", label: "Dirty" },
                { v: "error", label: "Error" },
                { v: "success", label: "Success" },
                { v: "delete", label: "Delete" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setVariant(o.v)}
                  style={{
                    background:
                      variant === o.v
                        ? "color-mix(in srgb, var(--color-orange) 14%, transparent)"
                        : "transparent",
                    color:
                      variant === o.v ? "var(--color-orange)" : "var(--fg2)",
                    border: "0.5px solid var(--line-soft)",
                    padding: "5px 8px",
                    fontFamily: "var(--font-display)",
                    fontSize: 10,
                    cursor: "pointer",
                    borderRadius: 2,
                    textAlign: "left",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <section id="profile" ref={(el) => (refs.current.profile = el)}>
            <ProfileSection
              form={form}
              setForm={setForm}
              editing={profileEditing}
              variant={variant}
              setVariant={setVariant}
            />
          </section>
          <section id="account" ref={(el) => (refs.current.account = el)}>
            <AccountSection
              form={form}
              variant={variant}
              setVariant={setVariant}
            />
          </section>
          <section id="danger" ref={(el) => (refs.current.danger = el)}>
            <DangerSection variant={variant} setVariant={setVariant} />
          </section>
        </div>
      </div>

      {variant === "success" && <Toast onDone={() => setVariant("saved")} />}
      {variant === "delete" && (
        <DeleteModal
          handle={SAVED_USER.handle}
          onCancel={() => setVariant("saved")}
        />
      )}
    </div>
  );
};

// ===========================================================================
// Header
// ===========================================================================
function DashHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line-faint)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="MakeSomeNoise Landing.html"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} />
      </a>
      <nav
        style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 12 }}
      >
        <a
          href="MakeSomeNoise Home.html"
          style={{ color: "var(--fg2)", textDecoration: "none" }}
        >
          Home
        </a>
        <a style={{ color: "var(--fg2)" }}>Sessions</a>
        <a style={{ color: "var(--fg2)" }}>Library</a>
        <span style={{ color: "var(--color-orange)" }}>Settings</span>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          title="Notifications"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--fg2)",
            cursor: "pointer",
          }}
        >
          <MsnIcon name="bell" size="16px" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MsnAvatar name={SAVED_USER.alias} size={28} status="online" />
          <span style={{ color: "var(--fg1)", fontSize: 12 }}>
            @{SAVED_USER.handle}
          </span>
          <MsnIcon name="triangle" size="10px" color="var(--fg3)" />
        </div>
      </div>
    </header>
  );
}

function DirtyBanner({ onDiscard, onSave, hasErrors }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 57,
        zIndex: 4,
        background: hasErrors
          ? "color-mix(in srgb, var(--color-red) 16%, var(--bg-panel))"
          : "color-mix(in srgb, var(--color-orange) 16%, var(--bg-panel))",
        borderBottom: `1px solid ${hasErrors ? "var(--color-red)" : "var(--color-orange)"}`,
        padding: "10px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--fg1)",
          fontSize: 12,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: `1px solid ${hasErrors ? "var(--color-red)" : "var(--color-orange)"}`,
            color: hasErrors ? "var(--color-red)" : "var(--color-orange)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 400,
          }}
        >
          {hasErrors ? "!" : "•"}
        </span>
        {hasErrors
          ? "Fix the highlighted fields before saving."
          : "You have unsaved changes."}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <MsnFramed onClick={onDiscard} color="var(--fg2)">
          Discard
        </MsnFramed>
        <MsnSolid
          onClick={onSave}
          color={hasErrors ? "var(--color-red)" : "var(--color-orange)"}
        >
          Save changes
        </MsnSolid>
      </div>
    </div>
  );
}

// ===========================================================================
// Profile section
// ===========================================================================
function ProfileSection({ form, setForm, editing, variant, setVariant }) {
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const errors =
    variant === "error"
      ? {
          handle: "Handles can only contain letters, numbers, dot, underscore.",
          email: "That doesn't look like a valid email address.",
        }
      : {};

  return (
    <div>
      <SectionHeader
        title="Profile"
        subtitle="Public information shown on your producer page."
        right={
          editing ? (
            <span
              style={{
                color: "var(--color-orange)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: "var(--font-mono)",
              }}
            >
              ● Editing
            </span>
          ) : (
            <MsnFramed onClick={() => setVariant("editing")} color="var(--fg1)">
              <MsnIcon name="settings" size="11px" /> Edit profile
            </MsnFramed>
          )
        }
      />

      <Card>
        {/* Avatar row */}
        <Row label="Avatar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <MsnAvatar name={form.alias} size={64} />
            {editing && (
              <div style={{ display: "flex", gap: 8 }}>
                <MsnFramed color="var(--fg1)" size="sm">
                  <MsnIcon
                    name="download"
                    size="11px"
                    style={{ transform: "rotate(180deg)" }}
                  />{" "}
                  Upload image
                </MsnFramed>
                <MsnFramed color="var(--color-red)" size="sm">
                  Remove
                </MsnFramed>
              </div>
            )}
          </div>
        </Row>
        <Hr />

        <Row label="Producer alias">
          <FieldText
            editing={editing}
            value={form.alias}
            onChange={(v) => setField("alias", v)}
            placeholder="Your artist name"
          />
        </Row>
        <Hr />

        <Row label="Handle" hint="Used in your URL: makesomenoise.fm/@…">
          <FieldText
            editing={editing}
            value={form.handle}
            onChange={(v) => setField("handle", v)}
            prefix="@"
            error={errors.handle}
          />
        </Row>
        <Hr />

        <Row label="Pronouns">
          <FieldText
            editing={editing}
            value={form.pronouns}
            onChange={(v) => setField("pronouns", v)}
            placeholder="they/them"
          />
        </Row>
        <Hr />

        <Row label="Location">
          <FieldText
            editing={editing}
            value={form.location}
            onChange={(v) => setField("location", v)}
            placeholder="City, country"
          />
        </Row>
        <Hr />

        <Row label="Bio" hint="Up to 240 characters">
          <FieldArea
            editing={editing}
            value={form.bio}
            onChange={(v) => setField("bio", v)}
            max={240}
          />
        </Row>
        <Hr />

        <Row label="Links" hint="Site, SoundCloud, Bandcamp, etc.">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {form.links.map((l, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <MsnTag color="var(--color-blue)">{l.kind}</MsnTag>
                <FieldText
                  editing={editing}
                  value={l.url}
                  onChange={(v) => {
                    const next = [...form.links];
                    next[i] = { ...next[i], url: v };
                    setField("links", next);
                  }}
                  small
                />
                {editing && (
                  <button
                    onClick={() => {
                      const next = form.links.filter((_, j) => j !== i);
                      setField("links", next);
                    }}
                    style={{
                      background: "transparent",
                      border: 0,
                      color: "var(--fg3)",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {editing && (
              <MsnFramed
                color="var(--fg2)"
                size="sm"
                style={{ alignSelf: "flex-start", marginTop: 4 }}
              >
                <MsnIcon name="plus" size="11px" /> Add link
              </MsnFramed>
            )}
          </div>
        </Row>
      </Card>

      {editing && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 14,
          }}
        >
          <MsnFramed onClick={() => setVariant("saved")} color="var(--fg2)">
            Cancel
          </MsnFramed>
          <MsnSolid
            onClick={() =>
              setVariant(variant === "error" ? "error" : "success")
            }
            color="var(--color-orange)"
          >
            Save changes
          </MsnSolid>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Account section
// ===========================================================================
function AccountSection({ form, variant, setVariant }) {
  return (
    <div>
      <SectionHeader
        title="Account"
        subtitle="Login credentials and security."
      />

      <Card>
        <Row label="Email">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "var(--fg1)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
              }}
            >
              {form.email}
            </span>
            <MsnFramed color="var(--fg1)" size="sm">
              Change email
            </MsnFramed>
          </div>
        </Row>
        <Hr />

        <Row label="Password" hint="Last changed 2 weeks ago">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "var(--fg2)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: 2,
              }}
            >
              ••••••••••••
            </span>
            <MsnFramed color="var(--fg1)" size="sm">
              Change password
            </MsnFramed>
          </div>
        </Row>
        <Hr />

        <Row label="Two-factor auth" hint="Adds a second step at login">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span style={{ color: "var(--fg3)", fontSize: 12 }}>
              Not enabled
            </span>
            <MsnFramed color="var(--color-orange)" size="sm">
              Enable 2FA
            </MsnFramed>
          </div>
        </Row>
        <Hr />

        <Row label="Member since">
          <span
            style={{
              color: "var(--fg2)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          >
            {form.joined}
          </span>
        </Row>
      </Card>
    </div>
  );
}

// ===========================================================================
// Danger zone section
// ===========================================================================
function DangerSection({ variant, setVariant }) {
  return (
    <div>
      <SectionHeader
        title={<span style={{ color: "var(--color-red)" }}>Danger zone</span>}
        subtitle="Irreversible actions. Read carefully."
      />

      <div
        style={{
          background:
            "color-mix(in srgb, var(--color-red) 6%, var(--bg-panel-2))",
          border:
            "0.5px solid color-mix(in srgb, var(--color-red) 40%, transparent)",
          borderRadius: 4,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 400,
                color: "var(--fg1)",
              }}
            >
              Delete this account
            </h3>
            <p
              style={{
                margin: "8px 0 0",
                color: "var(--fg2)",
                fontSize: 13,
                fontFamily: "var(--font-body)",
                lineHeight: 1.55,
              }}
            >
              Permanently remove your profile, sessions you own, uploads, and
              history. Collaborators on shared sessions will keep their copies.{" "}
              <strong style={{ color: "var(--fg1)" }}>
                This cannot be undone.
              </strong>
            </p>
            <ul
              style={{
                margin: "12px 0 0",
                paddingLeft: 18,
                color: "var(--fg3)",
                fontSize: 12,
                fontFamily: "var(--font-body)",
                lineHeight: 1.7,
              }}
            >
              <li>3 sessions you own will be deleted</li>
              <li>148 uploaded sounds will be removed</li>
              <li>
                Your handle{" "}
                <code style={{ color: "var(--color-orange)" }}>
                  @{SAVED_USER.handle}
                </code>{" "}
                will be released after 30 days
              </li>
            </ul>
          </div>
          <MsnFramed
            onClick={() => setVariant("delete")}
            color="var(--color-red)"
          >
            Delete account
          </MsnFramed>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Delete confirmation modal
// ===========================================================================
function DeleteModal({ handle, onCancel }) {
  const [typed, setTyped] = useState("");
  const [reason, setReason] = useState("");
  const matches = typed.trim() === handle;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)",
          border:
            "0.5px solid color-mix(in srgb, var(--color-red) 50%, transparent)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px var(--line-soft), 0 0 30px -8px var(--color-red)",
          borderRadius: 6,
          width: 480,
          maxWidth: "100%",
          padding: 28,
          fontFamily: "var(--font-display)",
          color: "var(--fg1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background:
                "color-mix(in srgb, var(--color-red) 20%, transparent)",
              color: "var(--color-red)",
              border: "1px solid var(--color-red)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 400,
              fontSize: 14,
            }}
          >
            !
          </span>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400 }}>
            Delete your account?
          </h2>
        </div>
        <p
          style={{
            margin: 0,
            color: "var(--fg2)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.55,
          }}
        >
          This will{" "}
          <strong style={{ color: "var(--fg1)" }}>permanently delete</strong>{" "}
          your profile, owned sessions, sounds and history. There is no undo.
        </p>

        <div style={{ marginTop: 18 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                color: "var(--fg2)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Why are you leaving?{" "}
              <span
                style={{
                  color: "var(--fg3)",
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                (optional)
              </span>
            </span>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              placeholder="So we can do better next time"
              style={{
                background: "var(--color-void)",
                border: "0.5px solid var(--line-soft)",
                borderRadius: 3,
                padding: "8px 10px",
                color: "var(--fg1)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                resize: "vertical",
                outline: "none",
              }}
            />
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                color: "var(--fg2)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Type{" "}
              <code
                style={{
                  color: "var(--color-red)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {handle}
              </code>{" "}
              to confirm
            </span>
            <input
              autoFocus
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={handle}
              style={{
                background: "var(--color-void)",
                border: `0.5px solid ${matches ? "var(--color-red)" : "var(--line-soft)"}`,
                borderRadius: 3,
                padding: "0 10px",
                height: 36,
                color: "var(--fg1)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                outline: "none",
                boxShadow: matches ? "0 0 8px -2px var(--color-red)" : "none",
              }}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 22,
          }}
        >
          <MsnFramed onClick={onCancel} color="var(--fg1)">
            Cancel
          </MsnFramed>
          <button
            disabled={!matches}
            style={{
              background: matches
                ? "var(--color-red)"
                : "color-mix(in srgb, var(--color-red) 30%, var(--color-shadow))",
              color: "rgba(0,0,0,0.85)",
              border: 0,
              borderRadius: 3,
              height: 32,
              padding: "0 14px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              cursor: matches ? "pointer" : "not-allowed",
              boxShadow: matches ? "0 0 12px -4px var(--color-red)" : "none",
              opacity: matches ? 1 : 0.55,
            }}
          >
            Yes, delete forever
          </button>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Toast
// ===========================================================================
function Toast({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--bg-elevated)",
        color: "var(--fg1)",
        border:
          "0.5px solid color-mix(in srgb, var(--color-green) 60%, transparent)",
        boxShadow:
          "0 12px 32px rgba(0,0,0,0.55), 0 0 18px -6px var(--color-green)",
        borderRadius: 4,
        padding: "10px 16px",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-display)",
        fontSize: 12,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "color-mix(in srgb, var(--color-green) 20%, transparent)",
          color: "var(--color-green)",
          border: "1px solid var(--color-green)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
        }}
      >
        ✓
      </span>
      Profile saved.
    </div>
  );
}

// ===========================================================================
// Helpers
// ===========================================================================
function SectionHeader({ title, subtitle, right }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 16,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: -0.01,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              margin: "4px 0 0",
              color: "var(--fg2)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "var(--bg-panel-2)",
        border: "0.5px solid var(--line-soft)",
        borderRadius: 4,
      }}
    >
      {children}
    </div>
  );
}

function Row({ label, hint, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        padding: "16px 20px",
        gap: 24,
        alignItems: "flex-start",
      }}
    >
      <div>
        <div
          style={{
            color: "var(--fg2)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: 400,
          }}
        >
          {label}
        </div>
        {hint && (
          <div
            style={{
              color: "var(--fg3)",
              fontSize: 11,
              fontFamily: "var(--font-body)",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {hint}
          </div>
        )}
      </div>
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  );
}

function Hr() {
  return <div style={{ height: 1, background: "var(--line-faint)" }} />;
}

function FieldText({
  editing,
  value,
  onChange,
  placeholder,
  prefix,
  error,
  small,
}) {
  if (!editing) {
    return (
      <span
        style={{
          color: "var(--fg1)",
          fontFamily: "var(--font-body)",
          fontSize: small ? 12 : 13,
        }}
      >
        {prefix && <span style={{ color: "var(--fg3)" }}>{prefix}</span>}
        {value || <span style={{ color: "var(--fg3)" }}>—</span>}
      </span>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "var(--color-void)",
          border: `0.5px solid ${error ? "var(--color-red)" : "var(--line-soft)"}`,
          borderRadius: 3,
          padding: "0 10px",
          height: small ? 30 : 34,
          boxShadow: error ? "0 0 6px -2px var(--color-red)" : "none",
        }}
      >
        {prefix && (
          <span
            style={{
              color: "var(--fg3)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
            }}
          >
            {prefix}
          </span>
        )}
        <input
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "var(--fg1)",
            fontFamily: "var(--font-body)",
            fontSize: small ? 12 : 13,
            height: "100%",
          }}
        />
      </div>
      {error && (
        <div
          style={{
            color: "var(--color-red)",
            fontSize: 11,
            fontFamily: "var(--font-body)",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

function FieldArea({ editing, value, onChange, max }) {
  const len = value ? value.length : 0;
  if (!editing) {
    return (
      <span
        style={{
          color: "var(--fg1)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
        }}
      >
        {value || <span style={{ color: "var(--fg3)" }}>—</span>}
      </span>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        rows={3}
        maxLength={max}
        style={{
          background: "var(--color-void)",
          border: "0.5px solid var(--line-soft)",
          borderRadius: 3,
          padding: "8px 10px",
          color: "var(--fg1)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          resize: "vertical",
          outline: "none",
          lineHeight: 1.55,
        }}
      />
      {max && (
        <div
          style={{
            alignSelf: "flex-end",
            color: len > max * 0.9 ? "var(--color-yellow)" : "var(--fg3)",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
          }}
        >
          {len}/{max}
        </div>
      )}
    </div>
  );
}
