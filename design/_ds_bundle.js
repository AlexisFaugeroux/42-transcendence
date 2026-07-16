/* @ds-bundle: {"format":4,"namespace":"OpenDAWDesignSystem_019dce","components":[{"name":"Avatar","sourcePath":"components/Avatar.jsx"},{"name":"Button","sourcePath":"components/Button.jsx"},{"name":"Icon","sourcePath":"components/Icon.jsx"},{"name":"Knob","sourcePath":"components/Knob.jsx"},{"name":"PeakMeter","sourcePath":"components/PeakMeter.jsx"},{"name":"Pill","sourcePath":"components/Pill.jsx"},{"name":"Separator","sourcePath":"components/Separator.jsx"},{"name":"Tag","sourcePath":"components/Tag.jsx"},{"name":"Waveform","sourcePath":"components/Waveform.jsx"},{"name":"Wordmark","sourcePath":"components/Wordmark.jsx"}],"sourceHashes":{"auth-shell.jsx":"49e9e276ba60","components/Avatar.jsx":"8916ee26af6c","components/Button.jsx":"11d50a4fd5ad","components/Icon.jsx":"2519d09d8ea1","components/Knob.jsx":"43cb7eafd9c0","components/PeakMeter.jsx":"523c049efec2","components/Pill.jsx":"c1772434727c","components/Separator.jsx":"49c945a9244b","components/Tag.jsx":"158eaa36c828","components/Waveform.jsx":"1be206328250","components/Wordmark.jsx":"d4d8e471d3b5","dashboard.jsx":"d6ec931f52eb","data.js":"384765385a3f","design-canvas.jsx":"5d0e39003628","home-variant-a.jsx":"47913209253d","icons.jsx":"6767ad48c1bc","landing.jsx":"6e14ba1eba63","login.jsx":"67c71593bd0a","primitives.jsx":"e5cb2d731f17","profile.jsx":"ac9f6cc6edcd","samples.jsx":"2ea734a9b8dc","sessions.jsx":"39136451ba32","signup.jsx":"27071743128f","studio-icons.jsx":"fd14a6dbf468","studio.jsx":"f2e836b3b2c5","ui_kits/studio/Arrangement.jsx":"28f70c208f5e","ui_kits/studio/Browser.jsx":"f071baee8c29","ui_kits/studio/Dashboard.jsx":"ae9eab706522","ui_kits/studio/Footer.jsx":"f4b9d02648eb","ui_kits/studio/Header.jsx":"37d0d2eccadb","ui_kits/studio/Mixer.jsx":"a14c4acaa9f6","ui_kits/studio/Workspace.jsx":"458c4fdb612a","ui_kits/studio/primitives.jsx":"50c8d2324d93","users.jsx":"8580c5a58491"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OpenDAWDesignSystem_019dce = window.OpenDAWDesignSystem_019dce || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// auth-shell.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnSolid, MsnFramed, MsnTag */
const {
  useState
} = React;

// =================================================================
// Shared auth shell — centered card on a dark canvas
// =================================================================
window.AuthShell = function AuthShell({
  children,
  eyebrow,
  title,
  subtitle,
  footer,
  width = 440
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(circle at 85% 12%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 50%),
                     radial-gradient(circle at 12% 90%, color-mix(in srgb, var(--color-blue) 7%, transparent),   transparent 55%)`
    }
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 32px",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "22px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 16
  })), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      color: "var(--fg2)",
      fontSize: 12,
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowL",
    size: "12px"
  }), " Back to home")), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: "100%"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      textAlign: "center",
      marginBottom: 12
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 32,
      color: "white",
      margin: 0,
      letterSpacing: -0.01,
      textAlign: "center"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--fg2)",
      margin: "10px auto 0",
      textAlign: "center",
      maxWidth: 380,
      lineHeight: 1.5
    }
  }, subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 6,
      padding: 28,
      marginTop: 28,
      boxShadow: "0 24px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      textAlign: "center",
      color: "var(--fg3)",
      fontSize: 12,
      fontFamily: "var(--font-body)"
    }
  }, footer))), /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "20px 32px",
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "space-between",
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-body)",
      borderTop: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 MakeSomeNoise."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Legal mentions"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Terms"))));
};

// =================================================================
// Form primitives
// =================================================================
window.MsnField = function MsnField({
  label,
  value,
  type = "text",
  placeholder,
  error,
  hint,
  prefix,
  right,
  onChange,
  autoFocus
}) {
  const accent = error ? "var(--color-red)" : "var(--color-orange)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: error ? "var(--color-red)" : "var(--fg2)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-body)"
    }
  }, hint)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "var(--color-void)",
      border: `0.5px solid ${error ? "var(--color-red)" : "var(--line-soft)"}`,
      borderRadius: 3,
      padding: "0 10px",
      height: 36,
      boxShadow: error ? "0 0 6px -2px var(--color-red)" : "none"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 13,
      fontFamily: "var(--font-body)"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    autoFocus: autoFocus,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 13,
      height: "100%"
    }
  }), right), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-red)",
      fontSize: 11,
      fontFamily: "var(--font-body)",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      border: "1px solid var(--color-red)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      lineHeight: 1
    }
  }, "!"), error));
};
window.MsnCheckbox = function MsnCheckbox({
  label,
  checked,
  onChange,
  error
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 2,
      border: `0.5px solid ${error ? "var(--color-red)" : checked ? "var(--color-orange)" : "var(--line-soft)"}`,
      background: checked ? "color-mix(in srgb, var(--color-orange) 14%, var(--color-void))" : "var(--color-void)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 1
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      lineHeight: 1
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontSize: 12,
      fontFamily: "var(--font-body)",
      lineHeight: 1.4
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      display: "none"
    }
  }));
};
window.MsnSubmit = function MsnSubmit({
  children,
  color = "var(--color-orange)",
  loading,
  disabled,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled || loading,
    style: {
      width: "100%",
      height: 40,
      background: disabled ? "color-mix(in srgb, " + color + " 30%, var(--color-shadow))" : color,
      color: "rgba(0,0,0,0.85)",
      border: 0,
      borderRadius: 3,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 13,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : `0 0 14px -4px ${color}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      opacity: disabled ? 0.6 : 1
    }
  }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "msn-spin",
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      border: "1.5px solid rgba(0,0,0,0.25)",
      borderTopColor: "rgba(0,0,0,0.85)",
      display: "inline-block"
    }
  }), "Signing in\u2026") : children);
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "auth-shell.jsx", error: String((e && e.message) || e) }); }

// components/Avatar.jsx
try { (() => {
const AVATAR_PALETTE = ["var(--color-orange)", "var(--color-blue)", "var(--color-green)", "var(--color-yellow)", "var(--color-red)", "var(--color-purple)", "var(--color-cyan)"];
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
function Avatar({
  name = "User",
  size = 28,
  status,
  ring
}) {
  const initials = name.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const color = AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
  const dotSize = Math.max(6, Math.round(size * 0.28));
  const statusColor = {
    live: "var(--color-red)",
    online: "var(--color-green)",
    idle: "var(--color-yellow)",
    offline: "var(--color-dark)"
  }[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 4,
      background: `color-mix(in srgb, ${color} 18%, var(--color-shadow))`,
      color,
      border: ring ? `1px solid ${color}` : "0.5px solid var(--line-soft)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: Math.round(size * 0.42),
      letterSpacing: 0.5,
      boxShadow: ring ? `0 0 6px -2px ${color}` : "none"
    }
  }, initials), status && /*#__PURE__*/React.createElement("span", {
    title: status,
    style: {
      position: "absolute",
      right: -2,
      bottom: -2,
      width: dotSize,
      height: dotSize,
      borderRadius: "50%",
      background: statusColor,
      border: "1.5px solid var(--bg-panel)",
      boxShadow: status === "live" ? `0 0 6px -1px ${statusColor}` : "none"
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = "framed",
  color,
  size = "md",
  active,
  style,
  ...rest
}) {
  const heights = {
    sm: 22,
    md: 28,
    lg: 36
  };
  const fontSizes = {
    sm: 11,
    md: 12,
    lg: 13
  };
  if (variant === "solid") {
    const c = color || "var(--color-orange)";
    return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
      style: {
        background: c,
        color: "rgba(0,0,0,0.85)",
        border: 0,
        borderRadius: 3,
        padding: size === "lg" ? "0 18px" : "0 12px",
        height: {
          sm: 24,
          md: 32,
          lg: 40
        }[size],
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize: size === "lg" ? 13 : 12,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        cursor: "pointer",
        lineHeight: 1,
        whiteSpace: "nowrap",
        boxShadow: `0 0 12px -4px ${c}`,
        ...style
      }
    }), children);
  }
  const c = color || "var(--fg1)";
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      background: active ? `color-mix(in srgb, ${c} 8%, transparent)` : "transparent",
      color: c,
      border: "0.5px solid currentColor",
      borderRadius: 3,
      padding: size === "lg" ? "0 14px" : "0 10px",
      height: heights[size],
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: fontSizes[size],
      cursor: "pointer",
      lineHeight: 1,
      whiteSpace: "nowrap",
      boxShadow: active ? "0 0 4px -1px currentColor" : "none",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button.jsx", error: String((e && e.message) || e) }); }

// components/Icon.jsx
try { (() => {
const MSN_ICONS = {
  msn: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "8",
    width: "3",
    height: "8",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "5",
    width: "3",
    height: "14",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "9",
    width: "3",
    height: "6",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "12",
    r: "1.6"
  })),
  record: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "13",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 19h10v1H7z"
  })),
  produce: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "7",
    y: "10",
    width: "2",
    height: "10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "6",
    width: "2",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "11",
    width: "2",
    height: "9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "8",
    width: "2",
    height: "12"
  })),
  mix: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "9",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "7",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  })),
  search: /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4"
  })),
  bell: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a5 5 0 0 0-5 5v3l-2 3h14l-2-3V8a5 5 0 0 0-5-5zm-2 16a2 2 0 0 0 4 0",
    fill: "currentColor"
  }),
  plus: /*#__PURE__*/React.createElement("path", {
    d: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z",
    fill: "currentColor"
  }),
  arrowR: /*#__PURE__*/React.createElement("path", {
    d: "M5 12h12m-4-4l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  arrowL: /*#__PURE__*/React.createElement("path", {
    d: "M19 12H7m4-4l-4 4 4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  play: /*#__PURE__*/React.createElement("path", {
    d: "M7 4l13 8-13 8z",
    fill: "currentColor"
  }),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
    fill: "currentColor"
  }),
  chat: /*#__PURE__*/React.createElement("path", {
    d: "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2z",
    fill: "currentColor"
  }),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z",
    fill: "currentColor"
  }),
  home: /*#__PURE__*/React.createElement("path", {
    d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
    fill: "currentColor"
  }),
  user: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21a8 8 0 0 1 16 0z"
  })),
  users: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "8",
    r: "3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 20a7 7 0 0 1 14 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "9",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 20a7 7 0 0 1 8-3v3z"
  })),
  list: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "6",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "18",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "5",
    width: "12",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "11",
    width: "12",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "17",
    width: "12",
    height: "2"
  })),
  grid: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "8",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "3",
    width: "8",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "13",
    width: "8",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "13",
    width: "8",
    height: "8",
    rx: "1"
  })),
  settings: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 13l1.6-1.2-1.5-2.6-1.9.6a7 7 0 0 0-1.5-.9l-.4-2h-3l-.4 2a7 7 0 0 0-1.5.9l-1.9-.6L3.4 11.8 5 13a7 7 0 0 0 0 2l-1.6 1.2 1.5 2.6 1.9-.6a7 7 0 0 0 1.5.9l.4 2h3l.4-2a7 7 0 0 0 1.5-.9l1.9.6 1.5-2.6L19.4 15a7 7 0 0 0 0-2z"
  })),
  triangle: /*#__PURE__*/React.createElement("path", {
    d: "M5 9l4 4 4-4z",
    fill: "currentColor"
  }),
  download: /*#__PURE__*/React.createElement("path", {
    d: "M11 3h2v9h3l-4 4-4-4h3zM4 18h16v2H4z",
    fill: "currentColor"
  }),
  music: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 3l-9 2v10.2A3 3 0 1 0 12 18V8l7-1.5z"
  })),
  waveform: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "10",
    width: "2",
    height: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "8",
    width: "2",
    height: "8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "5",
    width: "2",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "9",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "6",
    width: "2",
    height: "12"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "11",
    width: "2",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "9",
    width: "2",
    height: "6"
  }))
};
function Icon({
  name,
  color,
  size = "1rem",
  style,
  title
}) {
  const icon = MSN_ICONS[name];
  if (!icon) return null;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-label": title,
    style: {
      color,
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
      ...style
    }
  }, icon);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon.jsx", error: String((e && e.message) || e) }); }

// components/Knob.jsx
try { (() => {
const PI_HALF = Math.PI / 2.0;
const TAU = Math.PI * 2.0;
const DEFAULT_DESIGN = {
  radius: 20,
  trackWidth: 1.5,
  angleOffset: Math.PI / 5.0,
  indicator: [0.3, 0.6],
  indicatorWidth: 2.5
};
function circleSegment(cx, cy, radius, a0, a1) {
  const x0 = cx + Math.cos(a0) * radius,
    y0 = cy + Math.sin(a0) * radius;
  const x1 = cx + Math.cos(a1) * radius,
    y1 = cy + Math.sin(a1) * radius;
  let range = a1 - a0;
  while (range < 0.0) range += TAU;
  const largeArc = range > Math.PI ? 1 : 0;
  return `M ${x0} ${y0} A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1}`;
}
function Knob({
  value = 0.5,
  anchor = 0,
  color,
  design = DEFAULT_DESIGN,
  onChange,
  onChangeEnd
}) {
  const id = React.useId();
  const rimId = `knob-rim-${id}`;
  const {
    radius,
    trackWidth,
    angleOffset,
    indicator,
    indicatorWidth
  } = design;
  const [min, max] = indicator;
  const trackRadius = Math.floor(radius - trackWidth * 0.5);
  const angleMin = PI_HALF + angleOffset;
  const angleMax = PI_HALF - angleOffset;
  const angleRange = TAU - angleOffset * 2.0;
  const width = radius * 2.0;
  const height = radius + Math.ceil(Math.cos(angleOffset) * radius);
  const trackPath = circleSegment(0, 0, trackRadius, angleMin, angleMax);
  const angleAnc = angleMin + anchor * angleRange;
  const angleVal = angleMin + value * angleRange;
  const aMin = Math.min(angleVal, angleAnc),
    aMax = Math.max(angleVal, angleAnc);
  const valuePath = circleSegment(0, 0, trackRadius, aMin - 1.0 / trackRadius, aMax + 1.0 / trackRadius);
  const cos = Math.cos(angleVal) * trackRadius,
    sin = Math.sin(angleVal) * trackRadius;
  const indicatorPath = `M ${cos * min} ${sin * min} L ${cos * max} ${sin * max}`;
  const dragRef = React.useRef(null);
  const onPointerDown = e => {
    if (!onChange) return;
    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    dragRef.current = {
      startY: e.clientY,
      startValue: value
    };
  };
  const onPointerMove = e => {
    if (!dragRef.current || !onChange) return;
    const delta = (dragRef.current.startY - e.clientY) / 150;
    onChange(Math.max(0, Math.min(1, dragRef.current.startValue + delta)));
  };
  const onPointerUp = () => {
    dragRef.current = null;
    onChangeEnd && onChangeEnd();
  };
  const onDoubleClick = () => onChange && onChange(anchor);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      minWidth: "1.75em",
      maxWidth: "1.75em",
      minHeight: "1.75em",
      maxHeight: "1.75em",
      placeSelf: "center",
      cursor: "pointer",
      touchAction: "none",
      color
    },
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onDoubleClick: onDoubleClick
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: rimId,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "white"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "black"
  }))), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "butt",
    strokeWidth: trackWidth,
    transform: `translate(${radius}, ${radius})`
  }, /*#__PURE__*/React.createElement("circle", {
    r: radius * max * 1.1,
    stroke: "none",
    fill: "black",
    cy: radius * 0.1,
    style: {
      opacity: 0.5,
      filter: "blur(1px)",
      mixBlendMode: "luminosity"
    }
  }), /*#__PURE__*/React.createElement("circle", {
    r: radius * max,
    stroke: "none",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    r: radius * max,
    stroke: `url(#${rimId})`,
    strokeOpacity: 0.5,
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeOpacity: 1 / 3,
    d: trackPath
  }), /*#__PURE__*/React.createElement("path", {
    d: valuePath
  }), /*#__PURE__*/React.createElement("path", {
    d: indicatorPath,
    strokeLinecap: "round",
    strokeWidth: indicatorWidth,
    stroke: "rgba(0,0,0,0.5)"
  })));
}
Object.assign(__ds_scope, { Knob });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Knob.jsx", error: String((e && e.message) || e) }); }

// components/PeakMeter.jsx
try { (() => {
function PeakMeter({
  l = 0.6,
  r = 0.5,
  width = 80
}) {
  const grad = "linear-gradient(90deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      display: "flex",
      flexDirection: "column",
      gap: 1
    }
  }, [l, r].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 4,
      background: "var(--color-void)",
      borderRadius: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${v * 100}%`,
      height: "100%",
      background: grad
    }
  }))));
}
Object.assign(__ds_scope, { PeakMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/PeakMeter.jsx", error: String((e && e.message) || e) }); }

// components/Pill.jsx
try { (() => {
function Pill({
  label,
  dot,
  active,
  color = "var(--color-orange)",
  title,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    title: title,
    onClick: onClick,
    style: {
      width: 14,
      height: 14,
      borderRadius: 2,
      border: `0.5px solid ${active ? color : "var(--line-hover)"}`,
      background: active ? `color-mix(in srgb, ${color} 16%, transparent)` : "transparent",
      color: active ? color : "var(--fg3)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 9,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      boxShadow: active ? `0 0 4px -1px ${color}` : "none",
      cursor: "pointer"
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }) : label);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Pill.jsx", error: String((e && e.message) || e) }); }

// components/Separator.jsx
try { (() => {
function Separator() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 26,
      background: "var(--line-soft)",
      margin: "0 4px"
    }
  });
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Separator.jsx", error: String((e && e.message) || e) }); }

// components/Tag.jsx
try { (() => {
function Tag({
  children,
  color = "var(--color-gray)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: `color-mix(in srgb, ${color} 12%, transparent)`,
      color,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 10,
      letterSpacing: 0.4,
      textTransform: "uppercase",
      padding: "2px 6px",
      borderRadius: 2,
      lineHeight: 1,
      whiteSpace: "nowrap"
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tag.jsx", error: String((e && e.message) || e) }); }

// components/Waveform.jsx
try { (() => {
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
function Waveform({
  seed = "x",
  width = 200,
  height = 36,
  color = "var(--color-orange)",
  bg = "transparent",
  progress
}) {
  const bars = 64;
  const bw = width / bars;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: "block",
      background: bg
    }
  }, Array.from({
    length: bars
  }).map((_, i) => {
    const t = i / bars;
    const env = Math.sin(t * Math.PI) * 0.55 + 0.45;
    const r = hashStr(seed + ":" + i) % 1000 / 1000;
    const h = Math.max(1.5, env * r * height);
    const past = progress != null && t < progress;
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: i * bw + bw * 0.18,
      y: (height - h) / 2,
      width: bw * 0.6,
      height: h,
      fill: past ? color : "color-mix(in srgb, currentColor 38%, transparent)",
      style: {
        color
      }
    });
  }));
}
Object.assign(__ds_scope, { Waveform });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Waveform.jsx", error: String((e && e.message) || e) }); }

// components/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 14,
  color = "var(--fg1)",
  accent = "var(--color-orange)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: size,
      color,
      letterSpacing: -0.01,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "make"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400
    }
  }, "some"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: accent
    }
  }, "noise"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      marginLeft: 1
    }
  }, "."));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Wordmark.jsx", error: String((e && e.message) || e) }); }

// dashboard.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag */
const {
  useState,
  useMemo,
  useEffect,
  useRef
} = React;

// ====== seed user data (used as the "saved" source of truth) ======
const SAVED_USER = {
  alias: "lex moreau",
  handle: "lex.moreau",
  email: "lex.moreau@example.com",
  bio: "live looper, modular dabbler. recording in a converted garage in lyon. always down to jam after 22h.",
  location: "Lyon, FR",
  links: [{
    kind: "site",
    url: "https://lexmoreau.fm"
  }, {
    kind: "soundcloud",
    url: "soundcloud.com/lexmoreau"
  }, {
    kind: "bandcamp",
    url: "lexmoreau.bandcamp.com"
  }],
  pronouns: "they/them",
  joined: "Apr 2026"
};

// ===========================================================================
// Top-level dashboard
// ===========================================================================
window.Dashboard = function Dashboard() {
  // Variant — drives the whole page state for previewing
  // "saved" | "editing" | "dirty" | "error" | "success" | "delete"
  const [variant, setVariant] = useState("saved");

  // Local form state — initialized from SAVED_USER, mutated only when 'editing' or 'dirty' or 'error'
  const stateForVariant = v => {
    switch (v) {
      case "editing":
        return {
          ...SAVED_USER
        };
      case "dirty":
        return {
          ...SAVED_USER,
          alias: "Lex Moreau",
          bio: "live looper, modular dabbler. moved to Berlin in March — looking for a new garage. always down to jam after 22h."
        };
      case "error":
        return {
          ...SAVED_USER,
          handle: "lex moreau",
          email: "lex.moreau@"
        };
      // invalid
      case "success":
        return {
          ...SAVED_USER,
          bio: "live looper, modular dabbler. moved to Berlin in March — looking for a new garage. always down to jam after 22h."
        };
      default:
        return {
          ...SAVED_USER
        };
    }
  };
  const [form, setForm] = useState(stateForVariant("saved"));
  useEffect(() => {
    setForm(stateForVariant(variant));
  }, [variant]);

  // Edit-mode toggles per section
  const profileEditing = variant === "editing" || variant === "dirty" || variant === "error";
  const isDirty = variant === "dirty" || variant === "error";

  // Anchored scroll
  const sections = [{
    id: "profile",
    label: "Profile",
    icon: "user"
  }, {
    id: "account",
    label: "Account",
    icon: "settings"
  }, {
    id: "danger",
    label: "Danger zone",
    icon: "bell"
  }];
  const [activeId, setActiveId] = useState("profile");
  const refs = useRef({});
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.1, 0.3, 0.6]
    });
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(DashHeader, null), isDirty && /*#__PURE__*/React.createElement(DirtyBanner, {
    onDiscard: () => setVariant("saved"),
    onSave: () => setVariant("success"),
    hasErrors: variant === "error"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "220px 1fr",
      maxWidth: 1180,
      margin: "0 auto",
      padding: "32px 32px 80px",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: isDirty ? 110 : 88,
      alignSelf: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 12
    }
  }, "Settings"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, sections.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: `#${s.id}`,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 10px",
      borderRadius: 3,
      background: activeId === s.id ? "color-mix(in srgb, var(--color-orange) 10%, transparent)" : "transparent",
      color: activeId === s.id ? "var(--color-orange)" : "var(--fg2)",
      borderLeft: `2px solid ${activeId === s.id ? "var(--color-orange)" : "transparent"}`,
      fontSize: 12,
      fontWeight: 300,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: s.icon,
    size: "13px"
  }), " ", s.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      paddingTop: 18,
      borderTop: "1px dashed var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      marginBottom: 8
    }
  }, "// preview state"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 4
    }
  }, [{
    v: "saved",
    label: "Saved"
  }, {
    v: "editing",
    label: "Editing"
  }, {
    v: "dirty",
    label: "Dirty"
  }, {
    v: "error",
    label: "Error"
  }, {
    v: "success",
    label: "Success"
  }, {
    v: "delete",
    label: "Delete"
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    onClick: () => setVariant(o.v),
    style: {
      background: variant === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      color: variant === o.v ? "var(--color-orange)" : "var(--fg2)",
      border: "0.5px solid var(--line-soft)",
      padding: "5px 8px",
      fontFamily: "var(--font-display)",
      fontSize: 10,
      cursor: "pointer",
      borderRadius: 2,
      textAlign: "left"
    }
  }, o.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("section", {
    id: "profile",
    ref: el => refs.current.profile = el
  }, /*#__PURE__*/React.createElement(ProfileSection, {
    form: form,
    setForm: setForm,
    editing: profileEditing,
    variant: variant,
    setVariant: setVariant
  })), /*#__PURE__*/React.createElement("section", {
    id: "account",
    ref: el => refs.current.account = el
  }, /*#__PURE__*/React.createElement(AccountSection, {
    form: form,
    variant: variant,
    setVariant: setVariant
  })), /*#__PURE__*/React.createElement("section", {
    id: "danger",
    ref: el => refs.current.danger = el
  }, /*#__PURE__*/React.createElement(DangerSection, {
    variant: variant,
    setVariant: setVariant
  })))), variant === "success" && /*#__PURE__*/React.createElement(Toast, {
    onDone: () => setVariant("saved")
  }), variant === "delete" && /*#__PURE__*/React.createElement(DeleteModal, {
    handle: SAVED_USER.handle,
    onCancel: () => setVariant("saved")
  }));
};

// ===========================================================================
// Header
// ===========================================================================
function DashHeader() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "20px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 15
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Home.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Sessions"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Library"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    title: "Notifications",
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "bell",
    size: "16px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: SAVED_USER.alias,
    size: 28,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 12
    }
  }, "@", SAVED_USER.handle), /*#__PURE__*/React.createElement(MsnIcon, {
    name: "triangle",
    size: "10px",
    color: "var(--fg3)"
  }))));
}
function DirtyBanner({
  onDiscard,
  onSave,
  hasErrors
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 57,
      zIndex: 4,
      background: hasErrors ? "color-mix(in srgb, var(--color-red) 16%, var(--bg-panel))" : "color-mix(in srgb, var(--color-orange) 16%, var(--bg-panel))",
      borderBottom: `1px solid ${hasErrors ? "var(--color-red)" : "var(--color-orange)"}`,
      padding: "10px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "var(--fg1)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1px solid ${hasErrors ? "var(--color-red)" : "var(--color-orange)"}`,
      color: hasErrors ? "var(--color-red)" : "var(--color-orange)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 400
    }
  }, hasErrors ? "!" : "•"), hasErrors ? "Fix the highlighted fields before saving." : "You have unsaved changes."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onDiscard,
    color: "var(--fg2)"
  }, "Discard"), /*#__PURE__*/React.createElement(MsnSolid, {
    onClick: onSave,
    color: hasErrors ? "var(--color-red)" : "var(--color-orange)"
  }, "Save changes")));
}

// ===========================================================================
// Profile section
// ===========================================================================
function ProfileSection({
  form,
  setForm,
  editing,
  variant,
  setVariant
}) {
  const setField = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const errors = variant === "error" ? {
    handle: "Handles can only contain letters, numbers, dot, underscore.",
    email: "That doesn't look like a valid email address."
  } : {};
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Profile",
    subtitle: "Public information shown on your producer page.",
    right: editing ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-orange)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 1,
        fontFamily: "var(--font-mono)"
      }
    }, "\u25CF Editing") : /*#__PURE__*/React.createElement(MsnFramed, {
      onClick: () => setVariant("editing"),
      color: "var(--fg1)"
    }, /*#__PURE__*/React.createElement(MsnIcon, {
      name: "settings",
      size: "11px"
    }), " Edit profile")
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Row, {
    label: "Avatar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: form.alias,
    size: 64
  }), editing && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "sm"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "download",
    size: "11px",
    style: {
      transform: "rotate(180deg)"
    }
  }), " Upload image"), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-red)",
    size: "sm"
  }, "Remove")))), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Producer alias"
  }, /*#__PURE__*/React.createElement(FieldText, {
    editing: editing,
    value: form.alias,
    onChange: v => setField("alias", v),
    placeholder: "Your artist name"
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Handle",
    hint: "Used in your URL: makesomenoise.fm/@\u2026"
  }, /*#__PURE__*/React.createElement(FieldText, {
    editing: editing,
    value: form.handle,
    onChange: v => setField("handle", v),
    prefix: "@",
    error: errors.handle
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Pronouns"
  }, /*#__PURE__*/React.createElement(FieldText, {
    editing: editing,
    value: form.pronouns,
    onChange: v => setField("pronouns", v),
    placeholder: "they/them"
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Location"
  }, /*#__PURE__*/React.createElement(FieldText, {
    editing: editing,
    value: form.location,
    onChange: v => setField("location", v),
    placeholder: "City, country"
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Bio",
    hint: "Up to 240 characters"
  }, /*#__PURE__*/React.createElement(FieldArea, {
    editing: editing,
    value: form.bio,
    onChange: v => setField("bio", v),
    max: 240
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Links",
    hint: "Site, SoundCloud, Bandcamp, etc."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, form.links.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MsnTag, {
    color: "var(--color-blue)"
  }, l.kind), /*#__PURE__*/React.createElement(FieldText, {
    editing: editing,
    value: l.url,
    onChange: v => {
      const next = [...form.links];
      next[i] = {
        ...next[i],
        url: v
      };
      setField("links", next);
    },
    small: true
  }), editing && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const next = form.links.filter((_, j) => j !== i);
      setField("links", next);
    },
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer",
      padding: 4
    }
  }, "\xD7"))), editing && /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg2)",
    size: "sm",
    style: {
      alignSelf: "flex-start",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "plus",
    size: "11px"
  }), " Add link")))), editing && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: () => setVariant("saved"),
    color: "var(--fg2)"
  }, "Cancel"), /*#__PURE__*/React.createElement(MsnSolid, {
    onClick: () => setVariant(variant === "error" ? "error" : "success"),
    color: "var(--color-orange)"
  }, "Save changes")));
}

// ===========================================================================
// Account section
// ===========================================================================
function AccountSection({
  form,
  variant,
  setVariant
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Account",
    subtitle: "Login credentials and security."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Row, {
    label: "Email"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: "space-between",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, form.email), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "sm"
  }, "Change email"))), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Password",
    hint: "Last changed 2 weeks ago"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: "space-between",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      letterSpacing: 2
    }
  }, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "sm"
  }, "Change password"))), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Two-factor auth",
    hint: "Adds a second step at login"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: "space-between",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 12
    }
  }, "Not enabled"), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    size: "sm"
  }, "Enable 2FA"))), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(Row, {
    label: "Member since"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, form.joined))));
}

// ===========================================================================
// Danger zone section
// ===========================================================================
function DangerSection({
  variant,
  setVariant
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-red)"
      }
    }, "Danger zone"),
    subtitle: "Irreversible actions. Read carefully."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "color-mix(in srgb, var(--color-red) 6%, var(--bg-panel-2))",
      border: "0.5px solid color-mix(in srgb, var(--color-red) 40%, transparent)",
      borderRadius: 4,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 540
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 15,
      fontWeight: 400,
      color: "var(--fg1)"
    }
  }, "Delete this account"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "var(--fg2)",
      fontSize: 13,
      fontFamily: "var(--font-body)",
      lineHeight: 1.55
    }
  }, "Permanently remove your profile, sessions you own, uploads, and history. Collaborators on shared sessions will keep their copies. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fg1)"
    }
  }, "This cannot be undone.")), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "12px 0 0",
      paddingLeft: 18,
      color: "var(--fg3)",
      fontSize: 12,
      fontFamily: "var(--font-body)",
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("li", null, "3 sessions you own will be deleted"), /*#__PURE__*/React.createElement("li", null, "148 uploaded sounds will be removed"), /*#__PURE__*/React.createElement("li", null, "Your handle ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: "var(--color-orange)"
    }
  }, "@", SAVED_USER.handle), " will be released after 30 days"))), /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: () => setVariant("delete"),
    color: "var(--color-red)"
  }, "Delete account"))));
}

// ===========================================================================
// Delete confirmation modal
// ===========================================================================
function DeleteModal({
  handle,
  onCancel
}) {
  const [typed, setTyped] = useState("");
  const [reason, setReason] = useState("");
  const matches = typed.trim() === handle;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--bg-elevated)",
      border: "0.5px solid color-mix(in srgb, var(--color-red) 50%, transparent)",
      boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px var(--line-soft), 0 0 30px -8px var(--color-red)",
      borderRadius: 6,
      width: 480,
      maxWidth: "100%",
      padding: 28,
      fontFamily: "var(--font-display)",
      color: "var(--fg1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "color-mix(in srgb, var(--color-red) 20%, transparent)",
      color: "var(--color-red)",
      border: "1px solid var(--color-red)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 400,
      fontSize: 14
    }
  }, "!"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 400
    }
  }, "Delete your account?")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.55
    }
  }, "This will ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fg1)"
    }
  }, "permanently delete"), " your profile, owned sessions, sounds and history. There is no undo."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Why are you leaving? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      textTransform: "none",
      letterSpacing: 0
    }
  }, "(optional)")), /*#__PURE__*/React.createElement("textarea", {
    value: reason,
    onChange: e => setReason(e.target.value),
    rows: 2,
    placeholder: "So we can do better next time",
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "8px 10px",
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      resize: "vertical",
      outline: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Type ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: "var(--color-red)",
      fontFamily: "var(--font-mono)"
    }
  }, handle), " to confirm"), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: typed,
    onChange: e => setTyped(e.target.value),
    placeholder: handle,
    style: {
      background: "var(--color-void)",
      border: `0.5px solid ${matches ? "var(--color-red)" : "var(--line-soft)"}`,
      borderRadius: 3,
      padding: "0 10px",
      height: 36,
      color: "var(--fg1)",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      outline: "none",
      boxShadow: matches ? "0 0 8px -2px var(--color-red)" : "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onCancel,
    color: "var(--fg1)"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    disabled: !matches,
    style: {
      background: matches ? "var(--color-red)" : "color-mix(in srgb, var(--color-red) 30%, var(--color-shadow))",
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
      opacity: matches ? 1 : 0.55
    }
  }, "Yes, delete forever"))));
}

// ===========================================================================
// Toast
// ===========================================================================
function Toast({
  onDone
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 28,
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--bg-elevated)",
      color: "var(--fg1)",
      border: "0.5px solid color-mix(in srgb, var(--color-green) 60%, transparent)",
      boxShadow: "0 12px 32px rgba(0,0,0,0.55), 0 0 18px -6px var(--color-green)",
      borderRadius: 4,
      padding: "10px 16px",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-display)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "color-mix(in srgb, var(--color-green) 20%, transparent)",
      color: "var(--color-green)",
      border: "1px solid var(--color-green)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11
    }
  }, "\u2713"), "Profile saved.");
}

// ===========================================================================
// Helpers
// ===========================================================================
function SectionHeader({
  title,
  subtitle,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 16,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: 400,
      letterSpacing: -0.01
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, subtitle)), right);
}
function Card({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4
    }
  }, children);
}
function Row({
  label,
  hint,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      padding: "16px 20px",
      gap: 24,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      fontWeight: 400
    }
  }, label), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-body)",
      marginTop: 4,
      lineHeight: 1.4
    }
  }, hint)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, children));
}
function Hr() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line-faint)"
    }
  });
}
function FieldText({
  editing,
  value,
  onChange,
  placeholder,
  prefix,
  error,
  small
}) {
  if (!editing) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontFamily: "var(--font-body)",
        fontSize: small ? 12 : 13
      }
    }, prefix && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, prefix), value || /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, "\u2014"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "var(--color-void)",
      border: `0.5px solid ${error ? "var(--color-red)" : "var(--line-soft)"}`,
      borderRadius: 3,
      padding: "0 10px",
      height: small ? 30 : 34,
      boxShadow: error ? "0 0 6px -2px var(--color-red)" : "none"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: small ? 12 : 13,
      height: "100%"
    }
  })), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-red)",
      fontSize: 11,
      fontFamily: "var(--font-body)"
    }
  }, error));
}
function FieldArea({
  editing,
  value,
  onChange,
  max
}) {
  const len = value ? value.length : 0;
  if (!editing) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        lineHeight: 1.55,
        whiteSpace: "pre-wrap"
      }
    }, value || /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, "\u2014"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    rows: 3,
    maxLength: max,
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "8px 10px",
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      resize: "vertical",
      outline: "none",
      lineHeight: 1.55
    }
  }), max && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "flex-end",
      color: len > max * 0.9 ? "var(--color-yellow)" : "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)"
    }
  }, len, "/", max));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard.jsx", error: String((e && e.message) || e) }); }

// data.js
try { (() => {
/* global */
// Demo data for the MakeSomeNoise home screen mockups.
window.MSN_DATA = {
  user: {
    name: "Lex Moreau",
    handle: "@lex.moreau",
    plan: "Producer"
  },
  savedSessions: [{
    id: 1,
    title: "Liquid Drum 808",
    kind: "production",
    bpm: 142,
    key: "F min",
    updated: "2h ago",
    duration: "3:42",
    seed: "liquid808"
  }, {
    id: 2,
    title: "Tape Saturator demo",
    kind: "mixing",
    bpm: 96,
    key: "A min",
    updated: "yesterday",
    duration: "2:51",
    seed: "tapesat"
  }, {
    id: 3,
    title: "Vocal Take 04",
    kind: "recording",
    bpm: 88,
    key: "C maj",
    updated: "3d ago",
    duration: "1:08",
    seed: "vocal4"
  }, {
    id: 4,
    title: "Granular Pads",
    kind: "production",
    bpm: 110,
    key: "D# min",
    updated: "1w ago",
    duration: "5:20",
    seed: "granular"
  }, {
    id: 5,
    title: "Late Night Bounce",
    kind: "mixing",
    bpm: 128,
    key: "G min",
    updated: "1w ago",
    duration: "4:02",
    seed: "latenight"
  }, {
    id: 6,
    title: "First Steps",
    kind: "production",
    bpm: 120,
    key: "C maj",
    updated: "2w ago",
    duration: "2:14",
    seed: "firststeps"
  }, {
    id: 7,
    title: "Field Recording 02",
    kind: "recording",
    bpm: null,
    key: null,
    updated: "3w ago",
    duration: "6:48",
    seed: "field2"
  }],
  online: [{
    name: "Maya Okafor",
    handle: "@maya.o",
    status: "live",
    activity: "Recording vocals",
    listeners: 12
  }, {
    name: "Theo Rivera",
    handle: "@theo",
    status: "online",
    activity: "Mixing — Side B",
    listeners: 0
  }, {
    name: "Anouk Lemaire",
    handle: "@anouk",
    status: "online",
    activity: "Producing — 92 BPM",
    listeners: 0
  }, {
    name: "Idris Khan",
    handle: "@idris",
    status: "live",
    activity: "Streaming a beat set",
    listeners: 47
  }, {
    name: "Rosa Petrov",
    handle: "@rosa",
    status: "idle",
    activity: "Browsing samples",
    listeners: 0
  }, {
    name: "Jun Park",
    handle: "@junpark",
    status: "online",
    activity: "Mastering single",
    listeners: 0
  }, {
    name: "Cleo Banner",
    handle: "@cleo.b",
    status: "live",
    activity: "Live drum jam",
    listeners: 8
  }, {
    name: "Sam West",
    handle: "@samwest",
    status: "online",
    activity: "Playlist: late night",
    listeners: 0
  }],
  activity: [{
    who: "Maya Okafor",
    did: "liked",
    what: "your track \u201CLiquid Drum 808\u201D",
    when: "3m"
  }, {
    who: "Theo Rivera",
    did: "commented",
    what: "on \u201CTape Saturator demo\u201D",
    when: "12m"
  }, {
    who: "Anouk Lemaire",
    did: "added",
    what: "you to \u201CFriday Lab\u201D playlist",
    when: "1h"
  }, {
    who: "Idris Khan",
    did: "started",
    what: "a live mixing session",
    when: "2h"
  }, {
    who: "Cleo Banner",
    did: "followed",
    what: "you back",
    when: "5h"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "data.js", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), labels/titles are inline-editable,
// and any artboard can be opened in a fullscreen focus overlay (←/→/Esc).
// State persists to a .design-canvas.state.json sidecar via the host
// bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}', '.dc-card{transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px}', '.dc-grip{cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{cursor:pointer;border-radius:4px;padding:3px 6px;display:flex;align-items:center;transition:background .12s}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-expand{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s,background .12s;', '  width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}', '.dc-expand:hover{background:rgba(0,0,0,.06);color:#2a251f}', '[data-dc-slot]:hover .dc-expand{opacity:1}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, focused
// artboard). Order/titles/labels persist to a .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Only direct DCSection > DCArtboard children are
  // walked — wrapping them in other elements opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  React.Children.forEach(children, sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const srcIds = [];
    React.Children.forEach(sec.props.children, ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (!aid) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(children);
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const srcOrder = artboards.map(a => a.props.id ?? a.props.label);
  const sec = ctx && sid && ctx.section(sid) || {};
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 56px'
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow",
    style: {
      position: 'absolute',
      bottom: '100%',
      left: -4,
      marginBottom: 4,
      color: DC.label
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    onPointerDown: e => e.stopPropagation(),
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    const ns = sectionOrder[(secIdx + d + sectionOrder.length) % sectionOrder.length];
    const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
    if (first) ctx.setFocus(`${ns}/${first}`);
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// home-variant-a.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnWaveform, MsnPeakMeter, MsnFramed, MsnSolid, MsnTag, MsnHr, MsnCover, MSN_DATA */

const SESSION_TYPES = [{
  key: "record",
  title: "Recording Session",
  blurb: "Capture vocals, instruments or field audio. Multitrack with monitoring and overdubs.",
  icon: "record",
  color: "var(--color-red)",
  meta: ["Multitrack", "Monitor", "Overdub"]
}, {
  key: "produce",
  title: "Music Production",
  blurb: "Beat maker, drum scheduler, loops and instrument tracks on the timeline.",
  icon: "produce",
  color: "var(--color-orange)",
  meta: ["Beat maker", "Loops", "MIDI"]
}, {
  key: "mix",
  title: "Mixing Session",
  blurb: "Open the channel strip mixer. EQ, sends, busses and master export.",
  icon: "mix",
  color: "var(--color-blue)",
  meta: ["Strips", "Sends", "Export"]
}];

// =================================================================
// VARIATION A — Sidebar layout, orange-led, all 3 sessions equal
// =================================================================
window.HomeVariantA = function HomeVariantA({
  onlineLayout = "list"
}) {
  const data = MSN_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1440,
      height: 960,
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300,
      display: "grid",
      gridTemplateColumns: "220px 1fr 320px",
      gridTemplateRows: "44px 1fr",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / 4",
      background: "var(--bg-panel)",
      borderBottom: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      width: 220 - 16
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "18px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 480,
      height: 26,
      borderRadius: 3,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 10px",
      color: "var(--fg3)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "13px"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Search sessions, samples, friends\u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: 10
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "0 4px"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "bell",
    size: "14px"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--color-orange)",
      color: "rgba(0,0,0,0.85)",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 9,
      padding: "0 4px",
      borderRadius: 6,
      lineHeight: "12px"
    }
  }, "3")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingLeft: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: data.user.name,
    size: 26,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.15,
      minWidth: 0,
      maxWidth: 110
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 12,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, data.user.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, data.user.handle)), /*#__PURE__*/React.createElement(MsnIcon, {
    name: "triangle",
    size: "10px",
    color: "var(--fg3)"
  }))), /*#__PURE__*/React.createElement("nav", {
    style: {
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      padding: "16px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Workspace"), /*#__PURE__*/React.createElement(NavItem, {
    icon: "home",
    label: "Home",
    active: true,
    accent: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "folder",
    label: "My Sessions",
    badge: "14"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "music",
    label: "Tracks",
    badge: "32"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "waveform",
    label: "Samples"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "download",
    label: "Exports"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement(SectionLabel, null, "Social"), /*#__PURE__*/React.createElement(NavItem, {
    icon: "users",
    label: "Following",
    badge: "58"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "chat",
    label: "Messages",
    badge: "2",
    badgeColor: "var(--color-red)"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "heart",
    label: "Liked"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "list",
    label: "Playlists"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-card)",
      borderRadius: 3,
      padding: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--fg3)",
      fontSize: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "STORAGE"), /*#__PURE__*/React.createElement("span", null, "4.2 / 10 GB")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: "var(--color-void)",
      borderRadius: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "42%",
      height: "100%",
      background: "var(--color-green)"
    }
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 8,
      background: "transparent",
      color: "var(--fg2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "6px 10px",
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 11,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "settings",
    size: "13px"
  }), " Preferences")), /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--bg-panel-2)",
      overflow: "hidden",
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 32,
      color: "white",
      margin: 0,
      letterSpacing: -0.01
    }
  }, "Good evening, Lex."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 16,
      color: "var(--color-orange)",
      margin: "4px 0 0"
    }
  }, "Pick up where you left off, or start something new.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 12,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 13,
      color: "var(--color-orange)",
      margin: 0,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      whiteSpace: "nowrap"
    }
  }, "Start a new session"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      whiteSpace: "nowrap"
    }
  }, "Templates \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14
    }
  }, SESSION_TYPES.map(s => /*#__PURE__*/React.createElement(SessionCard, _extends({
    key: s.key
  }, s))))), /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 12,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 13,
      color: "var(--color-orange)",
      margin: 0,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      whiteSpace: "nowrap"
    }
  }, "Continue a saved session"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      whiteSpace: "nowrap"
    }
  }, data.savedSessions.length, " sessions")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowL",
    size: "14px"
  })), /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "14px"
  })), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      marginLeft: 8,
      whiteSpace: "nowrap"
    }
  }, "View all"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      overflow: "hidden",
      paddingBottom: 4
    }
  }, data.savedSessions.slice(0, 6).map(s => /*#__PURE__*/React.createElement(SavedSessionTile, {
    key: s.id,
    session: s
  })))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 13,
      color: "var(--color-orange)",
      margin: "0 0 10px",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      whiteSpace: "nowrap"
    }
  }, "Recent activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      background: "var(--bg-card)",
      borderRadius: 3,
      border: "0.5px solid var(--line-soft)",
      overflow: "hidden"
    }
  }, data.activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      padding: "10px 14px",
      borderRight: i < data.activity.length - 1 ? "1px solid var(--line-faint)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: a.who,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 11,
      fontWeight: 400
    }
  }, a.who.split(" ")[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      marginLeft: "auto"
    }
  }, a.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      lineHeight: 1.35,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, a.did), " ", a.what)))))), /*#__PURE__*/React.createElement("aside", {
    style: {
      background: "var(--bg-panel)",
      borderLeft: "1px solid var(--line-faint)",
      padding: "20px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 13,
      color: "var(--color-orange)",
      margin: 0,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      whiteSpace: "nowrap"
    }
  }, "Connected"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-green)"
    }
  }, "\u25CF"), " ", MSN_DATA.online.filter(o => o.status !== "offline").length, " online")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-red)",
      fontSize: 10,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: 6,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--color-red)",
      boxShadow: "0 0 4px var(--color-red)"
    }
  }), "Live now"), MSN_DATA.online.filter(o => o.status === "live").map(u => /*#__PURE__*/React.createElement(LiveUserRow, {
    key: u.handle,
    u: u
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line-faint)"
    }
  }), onlineLayout === "list" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Online"), MSN_DATA.online.filter(o => o.status !== "live").map(u => /*#__PURE__*/React.createElement(OnlineUserRow, {
    key: u.handle,
    u: u
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      letterSpacing: 0.6,
      textTransform: "uppercase"
    }
  }, "Online"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 8
    }
  }, MSN_DATA.online.filter(o => o.status !== "live").map(u => /*#__PURE__*/React.createElement("div", {
    key: u.handle,
    title: `${u.name} — ${u.activity}`,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: u.name,
    size: 36,
    status: u.status
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontSize: 10,
      maxWidth: 56,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, u.name.split(" ")[0]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 12,
      borderTop: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    style: {
      width: "100%",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "plus",
    size: "12px"
  }), " Invite to session"))));
};

// ============ Sub-components for variant A ============
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      padding: "6px 6px 4px"
    }
  }, children);
}
function NavItem({
  icon,
  label,
  active,
  badge,
  badgeColor,
  accent
}) {
  const color = active ? accent || "var(--color-orange)" : "var(--fg2)";
  return /*#__PURE__*/React.createElement("a", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 8px",
      borderRadius: 3,
      color,
      background: active ? "color-mix(in srgb, var(--color-orange) 8%, transparent)" : "transparent",
      fontSize: 12,
      cursor: "pointer",
      borderLeft: active ? `2px solid ${color}` : "2px solid transparent",
      paddingLeft: active ? 6 : 8
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: icon,
    size: "14px"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      background: badgeColor ? `color-mix(in srgb, ${badgeColor} 18%, transparent)` : "var(--color-void)",
      color: badgeColor || "var(--fg3)",
      fontSize: 10,
      padding: "1px 6px",
      borderRadius: 8,
      fontFamily: "var(--font-mono)"
    }
  }, badge));
}
function SessionCard({
  title,
  blurb,
  icon,
  color,
  meta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-card)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      minHeight: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(circle at 100% 0%, color-mix(in srgb, ${color} 14%, transparent), transparent 60%)`,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 4,
      background: `color-mix(in srgb, ${color} 14%, var(--color-void))`,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 8px -3px ${color}, inset 0 0 0 0.5px ${color}`
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: icon,
    size: "22px"
  })), /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "18px",
    color: "var(--fg3)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "white",
      fontSize: 16,
      fontWeight: 400,
      marginBottom: 6
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      lineHeight: 1.45
    }
  }, blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginTop: "auto",
      flexWrap: "wrap"
    }
  }, meta.map(m => /*#__PURE__*/React.createElement(MsnTag, {
    key: m,
    color: color
  }, m))));
}
const KIND_COLOR = {
  recording: "var(--color-red)",
  production: "var(--color-orange)",
  mixing: "var(--color-blue)"
};
const KIND_ICON = {
  recording: "record",
  production: "produce",
  mixing: "mix"
};
function SavedSessionTile({
  session
}) {
  const color = KIND_COLOR[session.kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 200px",
      background: "var(--bg-card)",
      borderRadius: 4,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      cursor: "pointer",
      border: "0.5px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(MsnCover, {
    seed: session.seed,
    size: 36,
    accent: color
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 0.4
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: KIND_ICON[session.kind],
    size: "11px"
  }), " ", session.kind)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 13,
      fontWeight: 400,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, session.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", null, session.bpm ? `${session.bpm} BPM` : "—", " \xB7 ", session.key || "no key"), /*#__PURE__*/React.createElement("span", null, session.duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10
    }
  }, session.updated));
}
function LiveUserRow({
  u
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 4px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: u.name,
    size: 32,
    status: "live",
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 12,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, u.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-red)",
      fontSize: 10,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, u.activity)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-red)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      border: "0.5px solid var(--color-red)",
      borderRadius: 2,
      padding: "1px 5px"
    }
  }, u.listeners, " \u25C9"));
}
function OnlineUserRow({
  u
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "5px 4px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: u.name,
    size: 26,
    status: u.status
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 11,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, u.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, u.activity)));
}
const iconBtn = {
  background: "transparent",
  color: "var(--fg2)",
  border: "0.5px solid var(--line-soft)",
  borderRadius: 3,
  width: 24,
  height: 22,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

// Expose helpers globally for variant B reuse
Object.assign(window, {
  SessionCard,
  SavedSessionTile,
  LiveUserRow,
  OnlineUserRow,
  KIND_COLOR,
  KIND_ICON,
  SESSION_TYPES,
  NavItem,
  SectionLabel,
  iconBtn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "home-variant-a.jsx", error: String((e && e.message) || e) }); }

// icons.jsx
try { (() => {
/* global React */
// MakeSomeNoise — bespoke icon set, currentColor, 24x24 viewBox
const MSN_ICONS = {
  // brand mark — three vertical bars + a dot
  msn: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "8",
    width: "3",
    height: "8",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "5",
    width: "3",
    height: "14",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "9",
    width: "3",
    height: "6",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "12",
    r: "1.6"
  })),
  // session types
  record: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "13",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 19h10v1H7z"
  })),
  produce: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "7",
    y: "10",
    width: "2",
    height: "10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "6",
    width: "2",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "11",
    width: "2",
    height: "9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "8",
    width: "2",
    height: "12"
  })),
  mix: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "9",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "7",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  })),
  // ui
  search: /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4"
  })),
  bell: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a5 5 0 0 0-5 5v3l-2 3h14l-2-3V8a5 5 0 0 0-5-5zm-2 16a2 2 0 0 0 4 0",
    fill: "currentColor"
  }),
  plus: /*#__PURE__*/React.createElement("path", {
    d: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z",
    fill: "currentColor"
  }),
  arrowR: /*#__PURE__*/React.createElement("path", {
    d: "M5 12h12m-4-4l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  arrowL: /*#__PURE__*/React.createElement("path", {
    d: "M19 12H7m4-4l-4 4 4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  play: /*#__PURE__*/React.createElement("path", {
    d: "M7 4l13 8-13 8z",
    fill: "currentColor"
  }),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
    fill: "currentColor"
  }),
  chat: /*#__PURE__*/React.createElement("path", {
    d: "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2z",
    fill: "currentColor"
  }),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z",
    fill: "currentColor"
  }),
  home: /*#__PURE__*/React.createElement("path", {
    d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
    fill: "currentColor"
  }),
  user: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21a8 8 0 0 1 16 0z"
  })),
  users: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "8",
    r: "3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 20a7 7 0 0 1 14 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "9",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 20a7 7 0 0 1 8-3v3z"
  })),
  list: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "6",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "18",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "5",
    width: "12",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "11",
    width: "12",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "17",
    width: "12",
    height: "2"
  })),
  grid: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "8",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "3",
    width: "8",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "13",
    width: "8",
    height: "8",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "13",
    width: "8",
    height: "8",
    rx: "1"
  })),
  settings: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 13l1.6-1.2-1.5-2.6-1.9.6a7 7 0 0 0-1.5-.9l-.4-2h-3l-.4 2a7 7 0 0 0-1.5.9l-1.9-.6L3.4 11.8 5 13a7 7 0 0 0 0 2l-1.6 1.2 1.5 2.6 1.9-.6a7 7 0 0 0 1.5.9l.4 2h3l.4-2a7 7 0 0 0 1.5-.9l1.9.6 1.5-2.6L19.4 15a7 7 0 0 0 0-2z"
  })),
  triangle: /*#__PURE__*/React.createElement("path", {
    d: "M5 9l4 4 4-4z",
    fill: "currentColor"
  }),
  download: /*#__PURE__*/React.createElement("path", {
    d: "M11 3h2v9h3l-4 4-4-4h3zM4 18h16v2H4z",
    fill: "currentColor"
  }),
  music: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 3l-9 2v10.2A3 3 0 1 0 12 18V8l7-1.5z"
  })),
  waveform: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "10",
    width: "2",
    height: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "8",
    width: "2",
    height: "8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "5",
    width: "2",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "9",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "6",
    width: "2",
    height: "12"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "11",
    width: "2",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "9",
    width: "2",
    height: "6"
  }))
};
window.MsnIcon = function MsnIcon({
  name,
  size = "1em",
  color,
  style,
  title
}) {
  const path = MSN_ICONS[name];
  if (!path) return null;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-label": title,
    style: {
      color,
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
      ...style
    }
  }, path);
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "icons.jsx", error: String((e && e.message) || e) }); }

// landing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, MsnIcon, MsnWordmark, MsnFramed, MsnSolid, MsnTag, MsnAvatar, MsnWaveform, MSN_DATA */

// Reusable striped image placeholder — explicit "DROP HERE" mono caption.
function ImagePlaceholder({
  label,
  width = "100%",
  height = 240,
  accent = "var(--color-orange)",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 4,
      background: `repeating-linear-gradient(135deg, var(--color-shadow) 0 14px, var(--bg-panel-2) 14px 28px)`,
      border: "0.5px solid var(--line-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(circle at 20% 20%, color-mix(in srgb, ${accent} 12%, transparent), transparent 60%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg3)",
      background: "var(--color-void)",
      padding: "4px 10px",
      borderRadius: 2,
      border: `0.5px dashed ${accent}`,
      position: "relative",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent
    }
  }, "// "), label));
}
window.LandingPage = function LandingPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1440,
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 64,
      background: "var(--bg-panel)",
      borderBottom: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "center",
      padding: "0 32px",
      gap: 28,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "22px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 16
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      marginLeft: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: navLink
  }, "Features"), /*#__PURE__*/React.createElement("a", {
    style: navLink
  }, "Make beats"), /*#__PURE__*/React.createElement("a", {
    style: navLink
  }, "Stream"), /*#__PURE__*/React.createElement("a", {
    style: navLink
  }, "Community"), /*#__PURE__*/React.createElement("a", {
    style: navLink
  }, "Manuals")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg2)"
  }, "Log in"), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)"
  }, "Sign up free")), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 32px 48px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "center",
      background: "var(--bg-panel-2)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 55%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(MsnTag, {
    color: "var(--color-orange)"
  }, "Beta \xB7 open access"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 11
    }
  }, "No install. Runs in the browser.")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 64,
      lineHeight: 1.05,
      color: "white",
      margin: 0,
      letterSpacing: -0.015
    }
  }, "Make beats.", /*#__PURE__*/React.createElement("br", null), "Record takes.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "Make some noise.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 16,
      lineHeight: 1.55,
      color: "var(--fg2)",
      margin: "20px 0 0",
      maxWidth: 480
    }
  }, "MakeSomeNoise is a browser-based studio for producing beats, recording sessions and mixing tracks \u2014 with a built-in audience. Stream live, share waveforms, and connect with other producers without leaving the page."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 32,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    size: "lg"
  }, "Sign up free ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "12px"
  })), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "lg"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "play",
    size: "12px"
  }), " Watch a demo"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      marginLeft: 4
    }
  }, "2:14")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, MSN_DATA.online.slice(0, 5).map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: u.handle,
    style: {
      marginLeft: i === 0 ? 0 : -8
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: u.name,
    size: 26
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg2)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)"
    }
  }, "4,200+ producers"), " already making noise"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(ImagePlaceholder, {
    label: "HERO_SCREENSHOT \u2014 beat maker / mixer view (1.6:1)",
    height: 420,
    accent: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -24,
      bottom: 28,
      background: "var(--bg-card)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--color-red)",
      boxShadow: "0 0 6px var(--color-red)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 12
    }
  }, "Maya Okafor"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-red)",
      fontSize: 10
    }
  }, "LIVE \xB7 12 listeners"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -16,
      top: 28,
      background: "var(--bg-card)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)",
      fontFamily: "var(--font-mono)",
      fontSize: 10
    }
  }, "142 BPM"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)"
    }
  }, /*#__PURE__*/React.createElement(MsnWaveform, {
    seed: "herofloat",
    width: 120,
    height: 20,
    color: "var(--color-orange)",
    progress: 0.62
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "20px 32px",
      borderTop: "1px solid var(--line-faint)",
      borderBottom: "1px solid var(--line-faint)",
      background: "var(--bg-panel)",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 1
    }
  }, [{
    k: "4.2k+",
    v: "active producers",
    c: "var(--color-orange)"
  }, {
    k: "180k",
    v: "tracks streamed",
    c: "var(--color-blue)"
  }, {
    k: "0",
    v: "downloads required",
    c: "var(--color-green)"
  }, {
    k: "100%",
    v: "in-browser audio",
    c: "var(--color-purple)"
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "14px 20px",
      background: "var(--bg-panel)",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      borderLeft: i === 0 ? "none" : "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: s.c,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 28,
      letterSpacing: -0.01
    }
  }, s.k), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, s.v)))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 32px",
      background: "var(--bg-panel-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      maxWidth: 720,
      margin: "0 auto 48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "What it does"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 36,
      color: "white",
      margin: 0,
      letterSpacing: -0.01
    }
  }, "A studio, a stage, and a community \u2014 in one tab."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--fg2)",
      margin: "12px auto 0",
      maxWidth: 520
    }
  }, "Every tool you need to go from an idea to a release, plus a live audience that hears it before anyone else.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, FEATURES.map(f => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: f.title
  }, f))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 32px 48px",
      background: "var(--bg-panel-2)"
    }
  }, DEEP_DIVES.map((d, i) => /*#__PURE__*/React.createElement(DeepDiveRow, _extends({
    key: d.title
  }, d, {
    reverse: i % 2 === 1,
    accent: d.accent
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 32px",
      background: "var(--bg-panel)",
      borderTop: "1px solid var(--line-faint)",
      borderBottom: "1px solid var(--line-faint)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "Community"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 32,
      color: "white",
      margin: 0,
      letterSpacing: -0.01
    }
  }, "Built-in audience. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "From the first beat.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--fg2)",
      margin: "14px 0 0",
      maxWidth: 480,
      lineHeight: 1.55
    }
  }, "Stream sessions live. Drop tracks into shared playlists. DM another producer to swap stems. Likes, follows and comments tied to the waveform itself \u2014 feedback lands on the bar it was meant for."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: "24px 0 0",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [{
    i: "chat",
    c: "var(--color-blue)",
    t: "Direct messaging and group chat"
  }, {
    i: "users",
    c: "var(--color-green)",
    t: "Profiles, follows and live presence"
  }, {
    i: "list",
    c: "var(--color-purple)",
    t: "Shared playlists and re-posts"
  }, {
    i: "heart",
    c: "var(--color-red)",
    t: "Timestamp-pinned likes and comments"
  }].map(b => /*#__PURE__*/React.createElement("li", {
    key: b.t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "var(--fg2)",
      fontSize: 13,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: b.c,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: b.i,
    size: "16px"
  })), " ", b.t)))), /*#__PURE__*/React.createElement(ImagePlaceholder, {
    label: "COMMUNITY_SCREENSHOT \u2014 chat / live listening party",
    height: 360,
    accent: "var(--color-blue)"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 32px",
      background: "var(--bg-panel-2)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 60%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 44,
      color: "white",
      margin: 0,
      letterSpacing: -0.01
    }
  }, "Press record. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "Make some noise.")), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "relative",
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--fg2)",
      margin: "14px auto 0",
      maxWidth: 520
    }
  }, "Free while in beta. No credit card. Your sessions stay yours."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    size: "lg"
  }, "Sign up free ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "12px"
  })), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "lg"
  }, "Log in"))), /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--color-void)",
      borderTop: "1px solid var(--line-faint)",
      padding: "40px 32px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "20px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 14
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--fg3)",
      margin: 0,
      maxWidth: 280,
      lineHeight: 1.55
    }
  }, "A browser-based studio with a built-in audience. No installs, no tracking.")), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Product",
    links: ["Features", "Beat maker", "Recording", "Mixer", "Stream"]
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Community",
    links: ["Discover", "Playlists", "Live now", "Discord", "Newsletter"]
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Resources",
    links: ["Manuals", "Tutorials", "Changelog", "Status", "Roadmap"]
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Company",
    links: ["About", "Contact", "Press kit"]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line-faint)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 MakeSomeNoise. Built with ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-red)"
    }
  }, "\u2665"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: footerLegalLink
  }, "Legal mentions"), /*#__PURE__*/React.createElement("a", {
    style: footerLegalLink
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    style: footerLegalLink
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    style: footerLegalLink
  }, "Cookies")))));
};

// ===== Sub-components & data =====
const FEATURES = [{
  icon: "produce",
  color: "var(--color-orange)",
  title: "Beat maker",
  desc: "Drum scheduler, loops, instrument tracks and a timeline. Build a song in your tab.",
  bullets: ["Step sequencer", "Loop crates", "MIDI editor", "Sample library"]
}, {
  icon: "record",
  color: "var(--color-red)",
  title: "Recording",
  desc: "Capture vocals, instruments or field audio with monitoring and overdubs.",
  bullets: ["Multitrack", "Punch-in", "Latency comp", "Take comping"]
}, {
  icon: "mix",
  color: "var(--color-blue)",
  title: "Mixer & export",
  desc: "Channel strips, sends, busses, EQ. Bounce to MP3, WAV, or stream straight to your profile.",
  bullets: ["Channel strips", "Sends & busses", "EQ + comp", "MP3 / WAV export"]
}, {
  icon: "waveform",
  color: "var(--color-cyan)",
  title: "Waveform streaming",
  desc: "Push live takes and finished tracks to listeners with a synced waveform UI.",
  bullets: ["Live sessions", "Synced cursor", "Listener counts", "Replay"]
}, {
  icon: "users",
  color: "var(--color-green)",
  title: "Profiles & social",
  desc: "Followers, playlists, likes, profiles. Find collaborators and build an audience.",
  bullets: ["Profiles", "Follows", "Playlists", "Re-posts"]
}, {
  icon: "chat",
  color: "var(--color-purple)",
  title: "Chat & sessions",
  desc: "DM another producer or open a shared session. Trade stems without leaving the page.",
  bullets: ["DMs", "Group chat", "Shared sessions", "Stem swap"]
}];
const DEEP_DIVES = [{
  eyebrow: "PRODUCTION",
  title: "A drum machine that thinks like a sequencer.",
  body: "Schedule beats on a step grid, swap kits with a keystroke, automate any parameter on the fly. Loop crates and a global metronome keep the groove tight.",
  accent: "var(--color-orange)",
  image: "BEAT_MAKER_SCREENSHOT — step sequencer, sampler, drum kit"
}, {
  eyebrow: "STREAMING",
  title: "Stream a session. Watch listeners arrive.",
  body: "Go live with one click. Listeners see the same waveform you see, comment on specific bars, and clip their favourite moments. Replays stay in your profile.",
  accent: "var(--color-red)",
  image: "STREAM_SCREENSHOT — live session view with listener cursors"
}, {
  eyebrow: "MIXING",
  title: "Channel strips that don't get in your way.",
  body: "Pre-built busses, sends to anywhere, EQ and comp on every channel. Master out to your profile or download a clean WAV.",
  accent: "var(--color-blue)",
  image: "MIXER_SCREENSHOT — channel strip mixer with master meter"
}];
function FeatureCard({
  icon,
  color,
  title,
  desc,
  bullets
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-card)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      position: "relative",
      overflow: "hidden",
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(circle at 100% 0%, color-mix(in srgb, ${color} 14%, transparent), transparent 60%)`,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 4,
      background: `color-mix(in srgb, ${color} 14%, var(--color-void))`,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 8px -3px ${color}, inset 0 0 0 0.5px ${color}`
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: icon,
    size: "22px"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "white",
      fontSize: 17,
      fontWeight: 400,
      marginBottom: 6
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.5
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap",
      marginTop: "auto"
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement(MsnTag, {
    key: b,
    color: color
  }, b))));
}
function DeepDiveRow({
  eyebrow,
  title,
  body,
  accent,
  image,
  reverse
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center",
      padding: "56px 0",
      borderTop: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      order: reverse ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: accent,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 28,
      color: "white",
      margin: 0,
      letterSpacing: -0.01,
      lineHeight: 1.2
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--fg2)",
      margin: "14px 0 22px",
      maxWidth: 460,
      lineHeight: 1.55
    }
  }, body), /*#__PURE__*/React.createElement("a", {
    style: {
      color: accent,
      fontSize: 13,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      whiteSpace: "nowrap"
    }
  }, "Learn more ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "11px"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      order: reverse ? 1 : 2
    }
  }, /*#__PURE__*/React.createElement(ImagePlaceholder, {
    label: image,
    height: 300,
    accent: accent
  })));
}
function FooterCol({
  title,
  links
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 12,
      fontWeight: 400,
      marginBottom: 12,
      letterSpacing: 0.4
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    style: footerLink
  }, l)))));
}
const navLink = {
  color: "var(--fg2)",
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap"
};
const footerLink = {
  color: "var(--fg3)",
  fontSize: 12,
  fontFamily: "var(--font-body)",
  cursor: "pointer"
};
const footerLegalLink = {
  color: "var(--fg2)",
  fontSize: 12,
  fontFamily: "var(--font-body)",
  cursor: "pointer"
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "landing.jsx", error: String((e && e.message) || e) }); }

// login.jsx
try { (() => {
/* global React, AuthShell, MsnField, MsnSubmit, MsnIcon */
const {
  useState: useStateLogin
} = React;
window.LoginPage = function LoginPage() {
  // State variant: "default" | "error" | "filled" | "loading"
  const [variant, setVariant] = useStateLogin("default");

  // Per-variant prefilled values
  const data = {
    default: {
      email: "",
      password: "",
      error: null,
      loading: false
    },
    error: {
      email: "lex.moreau@example.com",
      password: "hunter2222",
      error: "That password doesn't match our records.",
      loading: false
    },
    filled: {
      email: "lex.moreau@example.com",
      password: "••••••••••",
      error: null,
      loading: false
    },
    loading: {
      email: "lex.moreau@example.com",
      password: "••••••••••",
      error: null,
      loading: true
    }
  }[variant];
  const [showPass, setShowPass] = useStateLogin(false);
  return /*#__PURE__*/React.createElement(AuthShell, {
    eyebrow: "Welcome back",
    title: "Log in to MakeSomeNoise",
    subtitle: "Pick up your session, your friends, your beats.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, "New here? ", /*#__PURE__*/React.createElement("a", {
      href: "MakeSomeNoise SignUp.html",
      style: {
        color: "var(--color-orange)"
      }
    }, "Create an account \u2192"))
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(MsnField, {
    label: "Email",
    type: "email",
    value: data.email,
    onChange: () => {},
    placeholder: "you@example.com",
    autoFocus: true
  }), /*#__PURE__*/React.createElement(MsnField, {
    label: "Password",
    type: showPass ? "text" : "password",
    value: data.password,
    onChange: () => {},
    placeholder: "Your password",
    error: data.error,
    hint: /*#__PURE__*/React.createElement("a", {
      style: {
        color: "var(--fg3)"
      }
    }, "Forgot password?"),
    right: /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setShowPass(s => !s),
      style: {
        background: "transparent",
        border: 0,
        color: "var(--fg3)",
        cursor: "pointer",
        padding: 4,
        display: "inline-flex"
      },
      title: showPass ? "Hide password" : "Show password"
    }, /*#__PURE__*/React.createElement(MsnIcon, {
      name: showPass ? "users" : "user",
      size: "14px"
    }))
  }), /*#__PURE__*/React.createElement(MsnSubmit, {
    loading: data.loading,
    disabled: false
  }, data.loading ? "Signing in…" : /*#__PURE__*/React.createElement(React.Fragment, null, "Log in ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "11px"
  })))), /*#__PURE__*/React.createElement(StateSwitcher, {
    variant: variant,
    setVariant: setVariant,
    options: [{
      v: "default",
      label: "Empty"
    }, {
      v: "filled",
      label: "Filled"
    }, {
      v: "error",
      label: "Error"
    }, {
      v: "loading",
      label: "Loading"
    }]
  }));
};
window.StateSwitcher = function StateSwitcher({
  variant,
  setVariant,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      paddingTop: 16,
      borderTop: "1px dashed var(--line-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "// preview state"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    onClick: () => setVariant(o.v),
    style: {
      background: variant === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      color: variant === o.v ? "var(--color-orange)" : "var(--fg2)",
      border: 0,
      padding: "4px 10px",
      fontFamily: "var(--font-display)",
      fontSize: 11,
      cursor: "pointer",
      borderRight: "0.5px solid var(--line-soft)"
    }
  }, o.label))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "login.jsx", error: String((e && e.message) || e) }); }

// primitives.jsx
try { (() => {
/* global React */
// Shared MakeSomeNoise UI primitives — built on the openDAW design system tokens.

// ============= Wordmark =============
window.MsnWordmark = function MsnWordmark({
  size = 14,
  color = "var(--fg1)",
  accent = "var(--color-orange)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: size,
      color,
      letterSpacing: -0.01,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "baseline",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "make"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400
    }
  }, "some"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: accent
    }
  }, "noise"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      marginLeft: 1
    }
  }, "."));
};

// ============= Avatar — initials on a colored tile =============
const AVATAR_PALETTE = ["var(--color-orange)", "var(--color-blue)", "var(--color-green)", "var(--color-yellow)", "var(--color-red)", "var(--color-purple)", "var(--color-cyan)"];
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
window.MsnAvatar = function MsnAvatar({
  name,
  size = 28,
  status,
  ring
}) {
  const initials = name.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const color = AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
  const dotSize = Math.max(6, Math.round(size * 0.28));
  const statusColor = {
    live: "var(--color-red)",
    online: "var(--color-green)",
    idle: "var(--color-yellow)",
    offline: "var(--color-dark)"
  }[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 4,
      background: `color-mix(in srgb, ${color} 18%, var(--color-shadow))`,
      color,
      border: ring ? `1px solid ${color}` : "0.5px solid var(--line-soft)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: Math.round(size * 0.42),
      letterSpacing: 0.5,
      boxShadow: ring ? `0 0 6px -2px ${color}` : "none"
    }
  }, initials), status && /*#__PURE__*/React.createElement("span", {
    title: status,
    style: {
      position: "absolute",
      right: -2,
      bottom: -2,
      width: dotSize,
      height: dotSize,
      borderRadius: "50%",
      background: statusColor,
      border: "1.5px solid var(--bg-panel)",
      boxShadow: status === "live" ? `0 0 6px -1px ${statusColor}` : "none"
    }
  }));
};

// ============= Waveform thumb (deterministic) =============
window.MsnWaveform = function MsnWaveform({
  seed = "x",
  width = 200,
  height = 36,
  color = "var(--color-orange)",
  bg = "transparent",
  progress
}) {
  const bars = 64;
  const rand = i => {
    const h = hashStr(seed + ":" + i);
    return h % 1000 / 1000;
  };
  const bw = width / bars;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: "block",
      background: bg
    }
  }, Array.from({
    length: bars
  }).map((_, i) => {
    const t = i / bars;
    const env = Math.sin(t * Math.PI) * 0.55 + 0.45;
    const r = rand(i);
    const h = Math.max(1.5, env * r * height);
    const y = (height - h) / 2;
    const x = i * bw;
    const past = progress != null && t < progress;
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: x + bw * 0.18,
      y: y,
      width: bw * 0.6,
      height: h,
      fill: past ? color : "color-mix(in srgb, currentColor 38%, transparent)",
      style: {
        color
      }
    });
  }));
};

// ============= Peak meter (horizontal pair) =============
window.MsnPeakMeter = function MsnPeakMeter({
  l = 0.6,
  r = 0.5,
  width = 80
}) {
  const grad = "linear-gradient(90deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      display: "flex",
      flexDirection: "column",
      gap: 1
    }
  }, [l, r].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 4,
      background: "var(--color-void)",
      borderRadius: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${v * 100}%`,
      height: "100%",
      background: grad
    }
  }))));
};

// ============= Framed button =============
window.MsnFramed = function MsnFramed({
  children,
  color = "var(--fg1)",
  active,
  size = "md",
  onClick,
  style,
  title
}) {
  const heights = {
    sm: 22,
    md: 28,
    lg: 36
  };
  const fontSizes = {
    sm: 11,
    md: 12,
    lg: 13
  };
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    onClick: onClick,
    style: {
      background: active ? `color-mix(in srgb, ${color} 8%, transparent)` : "transparent",
      color,
      border: "0.5px solid currentColor",
      borderRadius: 3,
      padding: size === "lg" ? "0 14px" : "0 10px",
      height: heights[size],
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: fontSizes[size],
      cursor: "pointer",
      lineHeight: 1,
      whiteSpace: "nowrap",
      boxShadow: active ? "0 0 4px -1px currentColor" : "none",
      ...style
    }
  }, children);
};

// ============= Solid CTA =============
window.MsnSolid = function MsnSolid({
  children,
  color = "var(--color-orange)",
  onClick,
  size = "md",
  style,
  title
}) {
  const heights = {
    sm: 24,
    md: 32,
    lg: 40
  };
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    onClick: onClick,
    style: {
      background: color,
      color: "rgba(0,0,0,0.85)",
      border: 0,
      borderRadius: 3,
      padding: size === "lg" ? "0 18px" : "0 12px",
      height: heights[size],
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: size === "lg" ? 13 : 12,
      letterSpacing: 0.4,
      textTransform: "uppercase",
      cursor: "pointer",
      lineHeight: 1,
      whiteSpace: "nowrap",
      boxShadow: `0 0 12px -4px ${color}`,
      ...style
    }
  }, children);
};

// ============= Tag / pill =============
window.MsnTag = function MsnTag({
  children,
  color = "var(--color-gray)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: `color-mix(in srgb, ${color} 12%, transparent)`,
      color,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 10,
      letterSpacing: 0.4,
      textTransform: "uppercase",
      padding: "2px 6px",
      borderRadius: 2,
      lineHeight: 1,
      whiteSpace: "nowrap"
    }
  }, children);
};

// ============= Hairline divider =============
window.MsnHr = function MsnHr({
  vertical,
  margin = 8,
  color = "var(--line-soft)"
}) {
  return vertical ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: "stretch",
      background: color,
      margin: `0 ${margin}px`
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      alignSelf: "stretch",
      background: color,
      margin: `${margin}px 0`
    }
  });
};

// ============= Cover art (deterministic gradient + grain) =============
window.MsnCover = function MsnCover({
  seed = "x",
  size = 56,
  radius = 4,
  accent
}) {
  const h1 = hashStr(seed) % 360;
  const h2 = hashStr(seed + "b") % 360;
  const palettes = [[`hsl(${h1},45%,18%)`, `hsl(${h2},35%,10%)`], [`hsl(${h1},40%,16%)`, `hsl(${(h1 + 40) % 360},35%,12%)`]];
  const [a, b] = palettes[hashStr(seed) % palettes.length];
  const accentColor = accent || `hsl(${h1}, 70%, 55%)`;
  // Pick a glyph
  const glyphs = ["▲", "●", "◆", "■", "◐", "◇", "▶"];
  const glyph = glyphs[hashStr(seed + "g") % glyphs.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: radius,
      background: `linear-gradient(135deg, ${a}, ${b})`,
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
      boxShadow: "inset 0 0 0 0.5px var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.42,
      color: accentColor,
      opacity: 0.85,
      fontFamily: "var(--font-display)"
    }
  }, glyph));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "primitives.jsx", error: String((e && e.message) || e) }); }

// profile.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnWaveform */
const {
  useState: useStateProfile,
  useMemo: useMemoProfile
} = React;

// Public profile data, keyed by handle (matches the Users directory)
const PROFILES = {
  "maya.o": {
    alias: "maya okafor",
    handle: "maya.o",
    bio: "vocalist + beatmaker. layering breath and tape hiss into something you can dance to. lagos ↔ berlin.",
    location: "Berlin, DE",
    joined: "Jan 2026",
    followers: 3120,
    following: 184,
    likes: 892,
    live: true,
    liveTitle: "Recording vocals — take 6",
    liveListeners: 12,
    links: [{
      kind: "site",
      label: "mayaokafor.fm",
      url: "#"
    }, {
      kind: "soundcloud",
      label: "soundcloud.com/mayao",
      url: "#"
    }, {
      kind: "bandcamp",
      label: "mayaokafor.bandcamp.com",
      url: "#"
    }],
    tracks: [{
      id: 1,
      title: "Breath Control",
      bpm: 96,
      key: "A min",
      dur: "3:12",
      plays: "48.2k",
      likes: "3.1k",
      seed: "breath",
      kind: "production"
    }, {
      id: 2,
      title: "Tape Hiss Lullaby",
      bpm: 72,
      key: "D maj",
      dur: "4:02",
      plays: "22.9k",
      likes: "1.8k",
      seed: "lullaby",
      kind: "production"
    }, {
      id: 3,
      title: "Lagos Night Bus",
      bpm: 124,
      key: "F min",
      dur: "2:48",
      plays: "61.4k",
      likes: "5.2k",
      seed: "nightbus",
      kind: "mixing"
    }, {
      id: 4,
      title: "Overdub 04 (demo)",
      bpm: 88,
      key: "C maj",
      dur: "1:36",
      plays: "9.7k",
      likes: "612",
      seed: "overdub",
      kind: "recording"
    }, {
      id: 5,
      title: "Static Choir",
      bpm: 110,
      key: "G min",
      dur: "3:44",
      plays: "34.0k",
      likes: "2.6k",
      seed: "choir",
      kind: "production"
    }],
    liked: [{
      title: "Liquid Drum 808",
      who: "lex moreau",
      seed: "liquid808",
      kind: "production"
    }, {
      title: "Sundown Loop",
      who: "lex moreau",
      seed: "sundown",
      kind: "production"
    }, {
      title: "Late Night Bounce",
      who: "theo rivera",
      seed: "latenight",
      kind: "mixing"
    }, {
      title: "Field Cafe Lyon",
      who: "rosa petrov",
      seed: "fieldcafe",
      kind: "recording"
    }],
    followersList: ["lex moreau", "theo rivera", "anouk lemaire", "idris khan", "rosa petrov", "jun park"],
    followingList: ["cleo banner", "sam west", "nadia haddad", "bruno costa"]
  }
};
const FALLBACK = {
  alias: "producer",
  handle: "unknown",
  bio: "",
  location: "",
  joined: "2026",
  followers: 0,
  following: 0,
  likes: 0,
  live: false,
  links: [],
  tracks: [],
  liked: [],
  followersList: [],
  followingList: []
};
function getHandle() {
  const m = new URLSearchParams(location.search).get("u");
  return m || "maya.o";
}
const KIND_COLOR = {
  recording: "var(--color-red)",
  production: "var(--color-orange)",
  mixing: "var(--color-blue)"
};
const KIND_ICON = {
  recording: "record",
  production: "produce",
  mixing: "mix"
};
window.ProfilePage = function ProfilePage() {
  const handle = getHandle();
  const p = PROFILES[handle] || {
    ...FALLBACK,
    handle
  };

  // Preview-state switcher
  const [variant, setVariant] = useStateProfile("default"); // default | following | live | empty
  const following = variant === "following";
  const isLive = variant === "live" ? true : variant === "empty" ? false : variant === "default" || variant === "following" ? false : p.live;
  const showLive = variant === "live";
  const tracks = variant === "empty" ? [] : p.tracks;
  const [tab, setTab] = useStateProfile("tracks"); // tracks | liked | followers | following

  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300
    }
  }, /*#__PURE__*/React.createElement(ProfileHeader, null), showLive && /*#__PURE__*/React.createElement(LiveBanner, {
    p: p
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "28px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      alignItems: "flex-start",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: p.alias,
    size: 96,
    status: showLive ? "live" : undefined,
    ring: showLive
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 400,
      letterSpacing: -0.01,
      textTransform: "capitalize"
    }
  }, p.alias), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 13,
      fontFamily: "var(--font-mono)",
      marginTop: 2
    }
  }, "@", p.handle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexShrink: 0
    }
  }, following ? /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    active: true,
    onClick: () => setVariant("default")
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "users",
    size: "12px"
  }), " Following") : /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    onClick: () => setVariant("following")
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "plus",
    size: "12px"
  }), " Follow"), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "chat",
    size: "12px"
  }), " Message"))), p.bio && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      maxWidth: 620,
      fontFamily: "var(--font-body)",
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--fg2)"
    }
  }, p.bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 16,
      marginTop: 14,
      color: "var(--fg3)",
      fontSize: 12
    }
  }, p.location && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "home",
    size: "12px"
  }), " ", p.location), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "user",
    size: "12px"
  }), " Joined ", p.joined)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    n: p.followers,
    label: "Followers",
    onClick: () => setTab("followers")
  }), /*#__PURE__*/React.createElement(Stat, {
    n: p.following,
    label: "Following",
    onClick: () => setTab("following")
  }), /*#__PURE__*/React.createElement(Stat, {
    n: p.likes,
    label: "Likes"
  })), p.links.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 16
    }
  }, p.links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.url,
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-blue)",
    size: "sm"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: l.kind === "site" ? "home" : "music",
    size: "11px"
  }), " ", l.label)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--line-soft)",
      marginBottom: 20
    }
  }, [{
    v: "tracks",
    label: "Tracks",
    count: tracks.length
  }, {
    v: "liked",
    label: "Liked",
    count: p.liked.length
  }, {
    v: "followers",
    label: "Followers",
    count: p.followers
  }, {
    v: "following",
    label: "Following",
    count: p.following
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.v,
    onClick: () => setTab(t.v),
    style: {
      background: "transparent",
      border: 0,
      padding: "10px 14px",
      color: tab === t.v ? "var(--fg1)" : "var(--fg2)",
      fontFamily: "var(--font-display)",
      fontSize: 13,
      cursor: "pointer",
      borderBottom: `2px solid ${tab === t.v ? "var(--color-orange)" : "transparent"}`,
      marginBottom: -1,
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, t.label, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      fontSize: 11
    }
  }, fmt(t.count))))), tab === "tracks" && (tracks.length === 0 ? /*#__PURE__*/React.createElement(EmptyTracks, {
    alias: p.alias
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, tracks.map((t, i) => /*#__PURE__*/React.createElement(TrackRow, {
    key: t.id,
    t: t,
    index: i
  })))), tab === "liked" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 12
    }
  }, p.liked.map((t, i) => /*#__PURE__*/React.createElement(LikedCard, {
    key: i,
    t: t
  }))), tab === "followers" && /*#__PURE__*/React.createElement(PeopleList, {
    people: p.followersList
  }), tab === "following" && /*#__PURE__*/React.createElement(PeopleList, {
    people: p.followingList
  })), /*#__PURE__*/React.createElement(StateSwitcher, {
    variant: variant,
    setVariant: setVariant
  }));
};

// ===== Live banner =====
function LiveBanner({
  p
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "color-mix(in srgb, var(--color-red) 14%, var(--bg-panel))",
      borderBottom: "1px solid var(--color-red)",
      padding: "10px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      color: "var(--color-red)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--color-red)",
      boxShadow: "0 0 6px var(--color-red)"
    }
  }), " Live now"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 13
    }
  }, p.liveTitle), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 12,
      fontFamily: "var(--font-mono)"
    }
  }, p.liveListeners, " listening"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-red)",
    size: "sm"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "play",
    size: "11px"
  }), " Join session")));
}

// ===== Track row =====
function TrackRow({
  t,
  index
}) {
  const [playing, setPlaying] = useStateProfile(false);
  const color = KIND_COLOR[t.kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "40px 1.4fr 2fr 90px 70px 70px",
      gap: 14,
      alignItems: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlaying(v => !v),
    title: playing ? "Pause" : "Play",
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      cursor: "pointer",
      background: playing ? "var(--color-orange)" : "transparent",
      color: playing ? "rgba(0,0,0,0.85)" : "var(--color-orange)",
      border: "1px solid var(--color-orange)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, playing ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 11,
      background: "currentColor"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 11,
      background: "currentColor"
    }
  })) : /*#__PURE__*/React.createElement(MsnIcon, {
    name: "play",
    size: "12px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 14,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(MsnTag, {
    color: color
  }, t.kind), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      fontSize: 11
    }
  }, t.bpm, " BPM \xB7 ", t.key))), /*#__PURE__*/React.createElement("div", {
    style: {
      color
    }
  }, /*#__PURE__*/React.createElement(MsnWaveform, {
    seed: t.seed,
    width: 320,
    height: 30,
    color: color,
    progress: playing ? 0.4 : undefined
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--fg2)"
    }
  }, t.dur), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--fg2)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "play",
    size: "10px",
    color: "var(--fg3)"
  }), " ", t.plays), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--fg2)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "heart",
    size: "11px",
    color: "var(--color-red)"
  }), " ", t.likes));
}
function LikedCard({
  t
}) {
  const color = KIND_COLOR[t.kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: KIND_ICON[t.kind],
    size: "14px"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 13,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      color
    }
  }, /*#__PURE__*/React.createElement(MsnWaveform, {
    seed: t.seed,
    width: 216,
    height: 26,
    color: color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "var(--fg3)",
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "capitalize",
      fontFamily: "var(--font-body)"
    }
  }, t.who), /*#__PURE__*/React.createElement(MsnIcon, {
    name: "heart",
    size: "12px",
    color: "var(--color-red)"
  })));
}
function PeopleList({
  people
}) {
  if (people.length === 0) return /*#__PURE__*/React.createElement(Empty, {
    label: "No one here yet."
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 12
    }
  }, people.map((name, i) => {
    const handle = name.replace(/\s+/g, ".").toLowerCase();
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "var(--bg-panel-2)",
        border: "0.5px solid var(--line-soft)",
        borderRadius: 4,
        padding: 12,
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(MsnAvatar, {
      name: name,
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "var(--fg1)",
        fontSize: 14,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "var(--fg3)",
        fontSize: 12,
        fontFamily: "var(--font-mono)"
      }
    }, "@", handle)), /*#__PURE__*/React.createElement("a", {
      href: "MakeSomeNoise Profile.html?u=" + encodeURIComponent(handle),
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement(MsnFramed, {
      color: "var(--color-orange)",
      size: "sm"
    }, "View")));
  }));
}
function EmptyTracks({
  alias
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px 24px",
      textAlign: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px dashed var(--line-soft)",
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "waveform",
    size: "26px"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 400,
      fontSize: 16,
      color: "var(--fg1)",
      textTransform: "capitalize"
    }
  }, alias, " hasn't published any tracks yet"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--fg2)"
    }
  }, "When they release something, it'll show up here."));
}
function Empty({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "50px 24px",
      textAlign: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px dashed var(--line-soft)",
      borderRadius: 4,
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, label);
}
function Stat({
  n,
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: "transparent",
      border: 0,
      cursor: onClick ? "pointer" : "default",
      padding: 0,
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 18,
      letterSpacing: -0.01
    }
  }, fmt(n)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label));
}
function StateSwitcher({
  variant,
  setVariant
}) {
  const opts = [{
    v: "default",
    label: "Default"
  }, {
    v: "following",
    label: "Following"
  }, {
    v: "live",
    label: "Live now"
  }, {
    v: "empty",
    label: "No tracks"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "var(--bg-elevated)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: "6px 10px",
      boxShadow: "0 12px 32px rgba(0,0,0,0.5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)"
    }
  }, "// preview state"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    onClick: () => setVariant(o.v),
    style: {
      background: variant === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      color: variant === o.v ? "var(--color-orange)" : "var(--fg2)",
      border: 0,
      borderRight: "0.5px solid var(--line-soft)",
      padding: "4px 10px",
      fontFamily: "var(--font-display)",
      fontSize: 11,
      cursor: "pointer"
    }
  }, o.label))));
}
function ProfileHeader() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "20px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 15
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Home.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Sessions.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Sessions"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Samples.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Library"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Users.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Producers")), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "lex moreau",
    size: 28,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 12
    }
  }, "@lex.moreau")));
}
function fmt(n) {
  if (typeof n !== "number") return n;
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "profile.jsx", error: String((e && e.message) || e) }); }

// samples.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnWaveform */
const {
  useState: useStateSamples,
  useMemo: useMemoSamples,
  useRef: useRefSamples
} = React;

// =====================================================================
// Sample dataset — deterministic, varied
// =====================================================================
const SAMPLE_KINDS = ["one-shot", "loop", "field", "vocal", "stem"];
const SAMPLE_FAMILIES = ["drums", "bass", "synth", "vocal", "fx", "perc", "texture"];
const SAMPLE_PACKS = ["Garage Tape Vol.2", "Field Lyon 04", "Cassette Drums", "Modular Cells", "Vocal Chops 03", "Personal", "Granular Pads"];
const SAMPLES = [{
  id: 1,
  name: "kick_garage_07.wav",
  family: "drums",
  kind: "one-shot",
  bpm: null,
  key: null,
  dur: "0:01",
  size: 2.3,
  pack: "Cassette Drums",
  added: "2h ago",
  tags: ["punchy", "808"],
  fav: true,
  seed: "kick07"
}, {
  id: 2,
  name: "loop_house_124_C.wav",
  family: "drums",
  kind: "loop",
  bpm: 124,
  key: "C min",
  dur: "0:08",
  size: 4.1,
  pack: "Garage Tape Vol.2",
  added: "yesterday",
  tags: ["house", "groove"],
  fav: false,
  seed: "loop124"
}, {
  id: 3,
  name: "subbass_140_F.wav",
  family: "bass",
  kind: "one-shot",
  bpm: 140,
  key: "F min",
  dur: "0:02",
  size: 1.8,
  pack: "Modular Cells",
  added: "3d ago",
  tags: ["sub", "clean"],
  fav: true,
  seed: "sub140"
}, {
  id: 4,
  name: "vox_breath_long.wav",
  family: "vocal",
  kind: "vocal",
  bpm: null,
  key: "A maj",
  dur: "0:14",
  size: 7.2,
  pack: "Vocal Chops 03",
  added: "3d ago",
  tags: ["airy", "texture"],
  fav: false,
  seed: "voxlong"
}, {
  id: 5,
  name: "field_cafe_lyon_03.flac",
  family: "texture",
  kind: "field",
  bpm: null,
  key: null,
  dur: "1:42",
  size: 38.4,
  pack: "Field Lyon 04",
  added: "5d ago",
  tags: ["ambience", "city"],
  fav: false,
  seed: "fieldcafe"
}, {
  id: 6,
  name: "snare_room_dust.wav",
  family: "drums",
  kind: "one-shot",
  bpm: null,
  key: null,
  dur: "0:01",
  size: 1.6,
  pack: "Cassette Drums",
  added: "1w ago",
  tags: ["dusty", "mid"],
  fav: false,
  seed: "snareroom"
}, {
  id: 7,
  name: "pad_granular_Cmin.wav",
  family: "synth",
  kind: "loop",
  bpm: 88,
  key: "C min",
  dur: "0:32",
  size: 12.7,
  pack: "Granular Pads",
  added: "1w ago",
  tags: ["pad", "airy"],
  fav: true,
  seed: "padgran"
}, {
  id: 8,
  name: "perc_shaker_off.wav",
  family: "perc",
  kind: "loop",
  bpm: 120,
  key: null,
  dur: "0:04",
  size: 2.0,
  pack: "Garage Tape Vol.2",
  added: "1w ago",
  tags: ["off-grid"],
  fav: false,
  seed: "shakeroff"
}, {
  id: 9,
  name: "fx_riser_long.wav",
  family: "fx",
  kind: "one-shot",
  bpm: null,
  key: null,
  dur: "0:06",
  size: 3.4,
  pack: "Personal",
  added: "2w ago",
  tags: ["riser", "build"],
  fav: false,
  seed: "fxriser"
}, {
  id: 10,
  name: "vox_chop_amaj_03.wav",
  family: "vocal",
  kind: "vocal",
  bpm: 92,
  key: "A maj",
  dur: "0:03",
  size: 2.2,
  pack: "Vocal Chops 03",
  added: "2w ago",
  tags: ["chop", "wet"],
  fav: true,
  seed: "voxchop"
}, {
  id: 11,
  name: "hat_open_brushed.wav",
  family: "drums",
  kind: "one-shot",
  bpm: null,
  key: null,
  dur: "0:01",
  size: 1.1,
  pack: "Cassette Drums",
  added: "2w ago",
  tags: ["brush", "bright"],
  fav: false,
  seed: "hatopen"
}, {
  id: 12,
  name: "stem_rhodes_take2.wav",
  family: "synth",
  kind: "stem",
  bpm: 96,
  key: "G min",
  dur: "2:14",
  size: 48.6,
  pack: "Personal",
  added: "3w ago",
  tags: ["rhodes", "warm"],
  fav: false,
  seed: "rhodes2"
}, {
  id: 13,
  name: "field_train_st.flac",
  family: "texture",
  kind: "field",
  bpm: null,
  key: null,
  dur: "0:48",
  size: 22.1,
  pack: "Field Lyon 04",
  added: "3w ago",
  tags: ["transport"],
  fav: false,
  seed: "fieldtrain"
}, {
  id: 14,
  name: "bass_slap_one.wav",
  family: "bass",
  kind: "one-shot",
  bpm: null,
  key: "E min",
  dur: "0:01",
  size: 0.8,
  pack: "Modular Cells",
  added: "4w ago",
  tags: ["slap", "short"],
  fav: false,
  seed: "bassslap"
}, {
  id: 15,
  name: "loop_breakbeat_172.wav",
  family: "drums",
  kind: "loop",
  bpm: 172,
  key: null,
  dur: "0:05",
  size: 2.7,
  pack: "Cassette Drums",
  added: "5w ago",
  tags: ["jungle", "break"],
  fav: true,
  seed: "break172"
}, {
  id: 16,
  name: "fx_swell_dark.wav",
  family: "fx",
  kind: "one-shot",
  bpm: null,
  key: null,
  dur: "0:09",
  size: 4.6,
  pack: "Personal",
  added: "6w ago",
  tags: ["swell", "dark"],
  fav: false,
  seed: "fxswell"
}, {
  id: 17,
  name: "perc_woodblock_a.wav",
  family: "perc",
  kind: "one-shot",
  bpm: null,
  key: null,
  dur: "0:01",
  size: 0.4,
  pack: "Garage Tape Vol.2",
  added: "8w ago",
  tags: ["wood", "tight"],
  fav: false,
  seed: "wood_a"
}, {
  id: 18,
  name: "synth_arp_140_Dmin.wav",
  family: "synth",
  kind: "loop",
  bpm: 140,
  key: "D min",
  dur: "0:11",
  size: 5.3,
  pack: "Modular Cells",
  added: "9w ago",
  tags: ["arp", "driving"],
  fav: false,
  seed: "arp140"
}];
const STORAGE_LIMIT_GB = 4;
const STORAGE_LIMIT_MB = STORAGE_LIMIT_GB * 1024;

// =====================================================================
// Page
// =====================================================================
window.SamplesPage = function SamplesPage() {
  // Filters & sort
  const [query, setQuery] = useStateSamples("");
  const [family, setFamily] = useStateSamples("all");
  const [kind, setKind] = useStateSamples("all");
  const [favOnly, setFavOnly] = useStateSamples(false);
  const [sort, setSort] = useStateSamples("recent"); // recent | name | duration | size | bpm
  const [view, setView] = useStateSamples("list"); // list | grid
  const [selected, setSelected] = useStateSamples(new Set());
  const [playingId, setPlayingId] = useStateSamples(null);
  const [confirmDelete, setConfirmDelete] = useStateSamples(null); // sample obj or "selection"
  const [uploadOpen, setUploadOpen] = useStateSamples(false);

  // Derived
  const filtered = useMemoSamples(() => {
    let rows = SAMPLES.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.pack.toLowerCase().includes(q) || r.tags.some(t => t.includes(q)));
    }
    if (family !== "all") rows = rows.filter(r => r.family === family);
    if (kind !== "all") rows = rows.filter(r => r.kind === kind);
    if (favOnly) rows = rows.filter(r => r.fav);
    rows.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "duration":
          return parseDur(a.dur) - parseDur(b.dur);
        case "size":
          return b.size - a.size;
        case "bpm":
          return (a.bpm ?? 999) - (b.bpm ?? 999);
        case "recent":
        default:
          return SAMPLES.indexOf(a) - SAMPLES.indexOf(b);
      }
    });
    return rows;
  }, [query, family, kind, favOnly, sort]);
  const usedMB = SAMPLES.reduce((acc, s) => acc + s.size, 0);
  const usedPct = Math.min(1, usedMB / STORAGE_LIMIT_MB);

  // Selection helpers
  const toggleSel = id => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());else setSelected(new Set(filtered.map(r => r.id)));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300
    }
  }, /*#__PURE__*/React.createElement(SamplesHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "28px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
      fontFamily: "var(--font-mono)"
    }
  }, "Library"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 30,
      fontWeight: 400,
      letterSpacing: -0.01
    }
  }, "Samples"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, SAMPLES.length, " sounds \xB7 ", Math.round(usedMB), " MB used of ", STORAGE_LIMIT_GB, " GB")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "lg"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "folder",
    size: "13px"
  }), " New folder"), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    size: "lg",
    onClick: () => setUploadOpen(true)
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "plus",
    size: "13px"
  }), " Add sample"))), /*#__PURE__*/React.createElement(StorageBar, {
    usedMB: usedMB,
    limitMB: STORAGE_LIMIT_MB
  }), /*#__PURE__*/React.createElement(Toolbar, {
    query: query,
    setQuery: setQuery,
    family: family,
    setFamily: setFamily,
    kind: kind,
    setKind: setKind,
    favOnly: favOnly,
    setFavOnly: setFavOnly,
    sort: sort,
    setSort: setSort,
    view: view,
    setView: setView,
    totalCount: SAMPLES.length,
    shownCount: filtered.length
  }), selected.size > 0 && /*#__PURE__*/React.createElement(SelectionBar, {
    count: selected.size,
    onClear: () => setSelected(new Set()),
    onDelete: () => setConfirmDelete("selection")
  }), filtered.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    onClear: () => {
      setQuery("");
      setFamily("all");
      setKind("all");
      setFavOnly(false);
    }
  }) : view === "list" ? /*#__PURE__*/React.createElement(SampleTable, {
    rows: filtered,
    selected: selected,
    allSelected: selected.size === filtered.length && filtered.length > 0,
    onToggle: toggleSel,
    onToggleAll: toggleAll,
    playingId: playingId,
    onPlay: id => setPlayingId(p => p === id ? null : id),
    onDelete: s => setConfirmDelete(s)
  }) : /*#__PURE__*/React.createElement(SampleGrid, {
    rows: filtered,
    playingId: playingId,
    onPlay: id => setPlayingId(p => p === id ? null : id),
    onDelete: s => setConfirmDelete(s)
  })), confirmDelete && /*#__PURE__*/React.createElement(DeleteSampleModal, {
    target: confirmDelete,
    selectedCount: selected.size,
    onCancel: () => setConfirmDelete(null),
    onConfirm: () => {
      setConfirmDelete(null);
      setSelected(new Set());
    }
  }), uploadOpen && /*#__PURE__*/React.createElement(UploadModal, {
    onClose: () => setUploadOpen(false),
    usedMB: usedMB,
    limitMB: STORAGE_LIMIT_MB
  }));
};

// =====================================================================
// Header
// =====================================================================
function SamplesHeader() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "20px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 15
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Home.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Sessions"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "Library"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    title: "Notifications",
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "bell",
    size: "16px"
  })), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "lex moreau",
    size: 28,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 12
    }
  }, "@lex.moreau"))));
}

// =====================================================================
// Storage bar
// =====================================================================
function StorageBar({
  usedMB,
  limitMB
}) {
  const pct = Math.min(1, usedMB / limitMB);
  const remaining = Math.max(0, limitMB - usedMB);
  const warn = pct > 0.8;
  // Stack by family for the bar
  const byFamily = {};
  SAMPLES.forEach(s => {
    byFamily[s.family] = (byFamily[s.family] || 0) + s.size;
  });
  const familyOrder = ["drums", "bass", "synth", "vocal", "perc", "texture", "fx"];
  const familyColors = {
    drums: "var(--color-orange)",
    bass: "var(--color-red)",
    synth: "var(--color-blue)",
    vocal: "var(--color-yellow)",
    perc: "var(--color-green)",
    texture: "var(--color-cyan)",
    fx: "var(--color-purple)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: "16px 18px",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 11,
      color: "var(--fg3)",
      textTransform: "uppercase",
      letterSpacing: 1
    }
  }, "Storage"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--fg1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: warn ? "var(--color-yellow)" : "var(--color-orange)"
    }
  }, formatMB(usedMB)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)"
    }
  }, " / ", STORAGE_LIMIT_GB, " GB")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--fg3)"
    }
  }, "(", Math.round(pct * 100), "% \u2014 ", formatMB(remaining), " free)")), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--color-blue)",
      fontSize: 12,
      fontFamily: "var(--font-display)"
    }
  }, "Upgrade plan \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 2,
      overflow: "hidden",
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      display: "flex"
    }
  }, familyOrder.map(f => {
    const w = (byFamily[f] || 0) / limitMB;
    if (w === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: f,
      title: `${f} — ${formatMB(byFamily[f])}`,
      style: {
        width: `${w * 100}%`,
        background: familyColors[f],
        height: "100%"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      marginTop: 10
    }
  }, familyOrder.filter(f => byFamily[f]).map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      color: "var(--fg2)",
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 1,
      background: familyColors[f]
    }
  }), f, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)"
    }
  }, formatMB(byFamily[f]))))));
}

// =====================================================================
// Toolbar (search + filters + sort + view)
// =====================================================================
function Toolbar({
  query,
  setQuery,
  family,
  setFamily,
  kind,
  setKind,
  favOnly,
  setFavOnly,
  sort,
  setSort,
  view,
  setView,
  totalCount,
  shownCount
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      padding: "12px 14px",
      borderRadius: 4,
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "0 10px",
      height: 30,
      width: 280
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "13px",
    color: "var(--fg3)"
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search by name, pack, tag\u2026",
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      height: "100%"
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuery(""),
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Select, {
    label: "Family",
    value: family,
    onChange: setFamily,
    options: [{
      v: "all",
      label: "All families"
    }, ...SAMPLE_FAMILIES.map(f => ({
      v: f,
      label: f
    }))]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Type",
    value: kind,
    onChange: setKind,
    options: [{
      v: "all",
      label: "All types"
    }, ...SAMPLE_KINDS.map(k => ({
      v: k,
      label: k
    }))]
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFavOnly(v => !v),
    style: {
      height: 30,
      padding: "0 10px",
      borderRadius: 3,
      border: `0.5px solid ${favOnly ? "var(--color-orange)" : "var(--line-soft)"}`,
      background: favOnly ? "color-mix(in srgb, var(--color-orange) 12%, transparent)" : "transparent",
      color: favOnly ? "var(--color-orange)" : "var(--fg2)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "heart",
    size: "11px"
  }), " Favorites"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-mono)"
    }
  }, shownCount, "/", totalCount), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Select, {
    label: "Sort",
    value: sort,
    onChange: setSort,
    options: [{
      v: "recent",
      label: "Recently added"
    }, {
      v: "name",
      label: "Name (A→Z)"
    }, {
      v: "duration",
      label: "Duration"
    }, {
      v: "size",
      label: "Size"
    }, {
      v: "bpm",
      label: "BPM"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, [{
    v: "list",
    icon: "list"
  }, {
    v: "grid",
    icon: "grid"
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    onClick: () => setView(o.v),
    style: {
      background: view === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      color: view === o.v ? "var(--color-orange)" : "var(--fg2)",
      border: 0,
      padding: "0 10px",
      height: 30,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      borderRight: o.v === "list" ? "0.5px solid var(--line-soft)" : 0
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: o.icon,
    size: "13px"
  })))));
}
function Select({
  label,
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange(e.target.value),
    style: {
      appearance: "none",
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300,
      height: 30,
      padding: "0 24px 0 10px",
      cursor: "pointer",
      textTransform: "none",
      letterSpacing: 0
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.v,
    value: o.v
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--fg3)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "triangle",
    size: "9px"
  }))));
}
function Divider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 18,
      background: "var(--line-soft)"
    }
  });
}

// =====================================================================
// Selection bar
// =====================================================================
function SelectionBar({
  count,
  onClear,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: "10px 14px",
      borderRadius: 4,
      background: "color-mix(in srgb, var(--color-orange) 10%, var(--bg-panel-2))",
      border: "0.5px solid color-mix(in srgb, var(--color-orange) 50%, transparent)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "var(--fg1)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)",
      fontFamily: "var(--font-mono)"
    }
  }, count, " selected"), /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer",
      fontSize: 11,
      fontFamily: "var(--font-mono)"
    }
  }, "clear")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "sm"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "folder",
    size: "11px"
  }), " Move to\u2026"), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--fg1)",
    size: "sm"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "download",
    size: "11px"
  }), " Download"), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-red)",
    size: "sm",
    onClick: onDelete
  }, "Delete")));
}

// =====================================================================
// Sample table (list view)
// =====================================================================
function SampleTable({
  rows,
  selected,
  allSelected,
  onToggle,
  onToggleAll,
  playingId,
  onPlay,
  onDelete
}) {
  const colWidths = "32px 48px 1.6fr 1.4fr 92px 80px 90px 76px 110px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: colWidths,
      gap: 12,
      alignItems: "center",
      padding: "10px 14px",
      color: "var(--fg3)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      borderBottom: "1px solid var(--line-soft)",
      background: "var(--bg-panel)"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    checked: allSelected,
    onChange: onToggleAll
  }), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "Name"), /*#__PURE__*/React.createElement("span", null, "Waveform"), /*#__PURE__*/React.createElement("span", null, "BPM / Key"), /*#__PURE__*/React.createElement("span", null, "Length"), /*#__PURE__*/React.createElement("span", null, "Size"), /*#__PURE__*/React.createElement("span", null, "Type"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "Actions")), rows.map(row => {
    const isSel = selected.has(row.id);
    const isPlay = playingId === row.id;
    return /*#__PURE__*/React.createElement("div", {
      key: row.id,
      style: {
        display: "grid",
        gridTemplateColumns: colWidths,
        gap: 12,
        alignItems: "center",
        padding: "10px 14px",
        borderBottom: "1px solid var(--line-faint)",
        background: isSel ? "color-mix(in srgb, var(--color-orange) 8%, transparent)" : "transparent",
        transition: "background 120ms"
      }
    }, /*#__PURE__*/React.createElement(Check, {
      checked: isSel,
      onChange: () => onToggle(row.id)
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => onPlay(row.id),
      title: isPlay ? "Stop" : "Play",
      style: {
        width: 32,
        height: 32,
        borderRadius: 3,
        cursor: "pointer",
        background: isPlay ? "var(--color-orange)" : "var(--color-void)",
        color: isPlay ? "rgba(0,0,0,0.85)" : "var(--fg1)",
        border: "0.5px solid var(--line-soft)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, isPlay ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 3,
        height: 12,
        background: "currentColor"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 3,
        height: 12,
        background: "currentColor"
      }
    })) : /*#__PURE__*/React.createElement(MsnIcon, {
      name: "play",
      size: "11px"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, row.fav && /*#__PURE__*/React.createElement(MsnIcon, {
      name: "heart",
      size: "11px",
      color: "var(--color-orange)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, row.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginTop: 3,
        color: "var(--fg3)",
        fontSize: 11,
        fontFamily: "var(--font-body)"
      }
    }, /*#__PURE__*/React.createElement(MsnTag, {
      color: familyColor(row.family)
    }, row.family), /*#__PURE__*/React.createElement("span", null, row.pack), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "added ", row.added))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(MsnWaveform, {
      seed: row.seed,
      width: 220,
      height: 28,
      color: familyColor(row.family),
      progress: isPlay ? 0.42 : undefined
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--fg2)"
      }
    }, row.bpm ? `${row.bpm}` : /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, "\u2014"), row.key && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, " \xB7 ", row.key)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--fg2)"
      }
    }, row.dur), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--fg2)"
      }
    }, formatMB(row.size)), /*#__PURE__*/React.createElement(MsnTag, {
      color: "var(--fg2)"
    }, row.kind), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(IconBtn, {
      title: "Add to session",
      name: "plus"
    }), /*#__PURE__*/React.createElement(IconBtn, {
      title: "Download",
      name: "download"
    }), /*#__PURE__*/React.createElement(IconBtn, {
      title: "Delete",
      name: "bell",
      danger: true,
      onClick: () => onDelete(row)
    }, "\xD7")));
  }));
}
function Check({
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onChange,
    style: {
      width: 16,
      height: 16,
      borderRadius: 2,
      border: `0.5px solid ${checked ? "var(--color-orange)" : "var(--line-hover)"}`,
      background: checked ? "color-mix(in srgb, var(--color-orange) 18%, var(--color-void))" : "var(--color-void)",
      color: "var(--color-orange)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      fontSize: 11,
      lineHeight: 1
    }
  }, checked ? "✓" : "");
}
function IconBtn({
  name,
  title,
  danger,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    style: {
      width: 26,
      height: 26,
      borderRadius: 3,
      background: "transparent",
      border: "0.5px solid var(--line-soft)",
      color: danger ? "var(--color-red)" : "var(--fg2)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontSize: 14
    }
  }, children || /*#__PURE__*/React.createElement(MsnIcon, {
    name: name,
    size: "12px"
  }));
}

// =====================================================================
// Sample grid (card view)
// =====================================================================
function SampleGrid({
  rows,
  playingId,
  onPlay,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 12
    }
  }, rows.map(row => {
    const isPlay = playingId === row.id;
    return /*#__PURE__*/React.createElement("div", {
      key: row.id,
      style: {
        background: "var(--bg-panel-2)",
        border: "0.5px solid var(--line-soft)",
        borderRadius: 4,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, row.fav && /*#__PURE__*/React.createElement(MsnIcon, {
      name: "heart",
      size: "11px",
      color: "var(--color-orange)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block"
      }
    }, row.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        color: "var(--fg3)",
        fontSize: 11,
        fontFamily: "var(--font-body)"
      }
    }, row.pack)), /*#__PURE__*/React.createElement(MsnTag, {
      color: familyColor(row.family)
    }, row.family)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 8,
        background: "var(--color-void)",
        borderRadius: 3,
        border: "0.5px solid var(--line-soft)",
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onPlay(row.id),
      style: {
        width: 28,
        height: 28,
        borderRadius: 14,
        cursor: "pointer",
        background: isPlay ? "var(--color-orange)" : "transparent",
        color: isPlay ? "rgba(0,0,0,0.85)" : "var(--color-orange)",
        border: `1px solid var(--color-orange)`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(MsnIcon, {
      name: isPlay ? "list" : "play",
      size: "11px"
    })), /*#__PURE__*/React.createElement(MsnWaveform, {
      seed: row.seed,
      width: 180,
      height: 36,
      color: familyColor(row.family),
      progress: isPlay ? 0.4 : undefined
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "var(--fg2)",
        fontFamily: "var(--font-mono)",
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("span", null, row.dur), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, formatMB(row.size)), row.bpm && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, row.bpm, " BPM")), row.key && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, row.key)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }
    }, row.tags.map(t => /*#__PURE__*/React.createElement(MsnTag, {
      key: t,
      color: "var(--fg2)"
    }, "#", t))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "auto",
        paddingTop: 4
      }
    }, /*#__PURE__*/React.createElement(MsnFramed, {
      color: "var(--fg1)",
      size: "sm"
    }, /*#__PURE__*/React.createElement(MsnIcon, {
      name: "plus",
      size: "11px"
    }), " To session"), /*#__PURE__*/React.createElement(MsnFramed, {
      color: "var(--color-red)",
      size: "sm",
      onClick: () => onDelete(row)
    }, "Delete")));
  }));
}

// =====================================================================
// Empty state
// =====================================================================
function EmptyState({
  onClear
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px 24px",
      textAlign: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px dashed var(--line-soft)",
      borderRadius: 4,
      color: "var(--fg2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      color: "var(--color-orange)",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "28px"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 400,
      fontSize: 16,
      color: "var(--fg1)"
    }
  }, "No samples match these filters"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 16px",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, "Try clearing the filters or searching for a different term."), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    onClick: onClear
  }, "Clear filters"));
}

// =====================================================================
// Delete modal
// =====================================================================
function DeleteSampleModal({
  target,
  selectedCount,
  onCancel,
  onConfirm
}) {
  const isMulti = target === "selection";
  const title = isMulti ? `Delete ${selectedCount} samples?` : "Delete this sample?";
  const body = isMulti ? "These files will be removed from your library. Sessions that already use them will keep their cached copies." : /*#__PURE__*/React.createElement(React.Fragment, null, "The file ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: "var(--color-orange)",
      fontFamily: "var(--font-mono)"
    }
  }, target.name), " will be removed from your library. Sessions that already use it will keep their cached copies.");
  return /*#__PURE__*/React.createElement("div", {
    onClick: onCancel,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--bg-elevated)",
      border: "0.5px solid color-mix(in srgb, var(--color-red) 50%, transparent)",
      boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 30px -8px var(--color-red)",
      borderRadius: 6,
      width: 420,
      maxWidth: "100%",
      padding: 24,
      fontFamily: "var(--font-display)",
      color: "var(--fg1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "color-mix(in srgb, var(--color-red) 20%, transparent)",
      color: "var(--color-red)",
      border: "1px solid var(--color-red)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 400
    }
  }, "!"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 400
    }
  }, title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.55
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onCancel,
    color: "var(--fg1)"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    style: {
      background: "var(--color-red)",
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
      cursor: "pointer",
      boxShadow: "0 0 12px -4px var(--color-red)"
    }
  }, "Delete"))));
}

// =====================================================================
// Upload modal — simulated drag/drop, with live storage check
// =====================================================================
function UploadModal({
  onClose,
  usedMB,
  limitMB
}) {
  const fakeFiles = [{
    name: "shaker_swing_120.wav",
    size: 1.4,
    status: "done"
  }, {
    name: "vox_breath_short.wav",
    size: 0.9,
    status: "done"
  }, {
    name: "synth_lead_140_Amin.wav",
    size: 5.6,
    status: "uploading",
    progress: 0.62
  }, {
    name: "field_market.flac",
    size: 22.0,
    status: "queued"
  }];
  const total = fakeFiles.reduce((a, f) => a + f.size, 0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--bg-elevated)",
      border: "0.5px solid var(--line-soft)",
      boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
      borderRadius: 6,
      width: 540,
      maxWidth: "100%",
      padding: 24,
      fontFamily: "var(--font-display)",
      color: "var(--fg1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 400
    }
  }, "Add samples"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      cursor: "pointer",
      fontSize: 18
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 18px",
      textAlign: "center",
      background: "color-mix(in srgb, var(--color-orange) 6%, var(--color-void))",
      border: "1px dashed color-mix(in srgb, var(--color-orange) 50%, transparent)",
      borderRadius: 4,
      color: "var(--fg2)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "download",
    size: "22px",
    color: "var(--color-orange)",
    style: {
      transform: "rotate(180deg)",
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 14
    }
  }, "Drop audio files here"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--fg3)"
    }
  }, ".wav .mp3 .flac .aif \u2014 up to 100 MB per file"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)"
  }, "Browse files\u2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 8
    }
  }, "Queue \xB7 ", fakeFiles.length, " files \xB7 ", formatMB(total)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, fakeFiles.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 60px 90px",
      alignItems: "center",
      gap: 10,
      padding: "8px 10px",
      borderRadius: 3,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--fg1)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, f.name), f.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      height: 3,
      background: "var(--bg-panel)",
      borderRadius: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${f.progress * 100}%`,
      height: "100%",
      background: "var(--color-orange)"
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg2)"
    }
  }, formatMB(f.size)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      textTransform: "uppercase",
      textAlign: "right",
      color: f.status === "done" ? "var(--color-green)" : f.status === "uploading" ? "var(--color-orange)" : "var(--fg3)"
    }
  }, f.status === "done" ? "✓ Added" : f.status === "uploading" ? `${Math.round(f.progress * 100)}%` : "Queued"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: "10px 12px",
      borderRadius: 3,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-faint)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg2)",
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, "After upload"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, formatMB(usedMB + total)), " / ", STORAGE_LIMIT_GB, " GB")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onClose,
    color: "var(--fg1)"
  }, "Done"))));
}

// =====================================================================
// Helpers
// =====================================================================
function familyColor(f) {
  return {
    drums: "var(--color-orange)",
    bass: "var(--color-red)",
    synth: "var(--color-blue)",
    vocal: "var(--color-yellow)",
    perc: "var(--color-green)",
    texture: "var(--color-cyan)",
    fx: "var(--color-purple)"
  }[f] || "var(--fg2)";
}
function formatMB(mb) {
  if (mb >= 1024) return (mb / 1024).toFixed(2) + " GB";
  if (mb < 1) return Math.round(mb * 1000) + " KB";
  return mb.toFixed(1) + " MB";
}
function parseDur(d) {
  const [m, s] = d.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "samples.jsx", error: String((e && e.message) || e) }); }

// sessions.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnCover, MsnWaveform */
const {
  useState: useStateSess,
  useMemo: useMemoSess,
  useRef: useRefSess,
  useEffect: useEffectSess
} = React;

// =====================================================================
// Sessions data
// =====================================================================
const SESS_TYPES = ["production", "recording", "mixing"];
const SESS_GENRES = ["house", "ambient", "drum&bass", "hip-hop", "techno", "indie", "lo-fi", "experimental", "vocal"];
const SESSIONS = [{
  id: 1,
  title: "Liquid Drum 808",
  type: "production",
  bpm: 142,
  key: "F min",
  edited: "2h ago",
  editedAt: "2026-05-06 13:14",
  size: 142.6,
  tags: ["drum&bass", "liquid"],
  seed: "liquid808",
  archived: false
}, {
  id: 2,
  title: "Tape Saturator demo",
  type: "mixing",
  bpm: 96,
  key: "A min",
  edited: "yesterday",
  editedAt: "2026-05-05 22:01",
  size: 84.2,
  tags: ["lo-fi", "mix"],
  seed: "tapesat",
  archived: false
}, {
  id: 3,
  title: "Vocal Take 04",
  type: "recording",
  bpm: 88,
  key: "C maj",
  edited: "3d ago",
  editedAt: "2026-05-03 10:42",
  size: 46.8,
  tags: ["vocal", "indie"],
  seed: "vocal4",
  archived: false
}, {
  id: 4,
  title: "Granular Pads",
  type: "production",
  bpm: 110,
  key: "D# min",
  edited: "1w ago",
  editedAt: "2026-04-29 18:07",
  size: 226.1,
  tags: ["ambient", "texture"],
  seed: "granular",
  archived: false
}, {
  id: 5,
  title: "Late Night Bounce",
  type: "mixing",
  bpm: 128,
  key: "G min",
  edited: "1w ago",
  editedAt: "2026-04-28 23:18",
  size: 118.3,
  tags: ["house", "late"],
  seed: "latenight",
  archived: false
}, {
  id: 6,
  title: "First Steps",
  type: "production",
  bpm: 120,
  key: "C maj",
  edited: "2w ago",
  editedAt: "2026-04-22 16:00",
  size: 58.7,
  tags: ["lo-fi", "chill"],
  seed: "firststeps",
  archived: false
}, {
  id: 7,
  title: "Field Recording 02",
  type: "recording",
  bpm: null,
  key: null,
  edited: "3w ago",
  editedAt: "2026-04-15 09:33",
  size: 312.4,
  tags: ["experimental", "field"],
  seed: "field2",
  archived: false
}, {
  id: 8,
  title: "Kick Drift",
  type: "production",
  bpm: 134,
  key: "A min",
  edited: "4w ago",
  editedAt: "2026-04-08 12:10",
  size: 72.0,
  tags: ["techno", "drum"],
  seed: "kickdrift",
  archived: false
}, {
  id: 9,
  title: "Sundown Loop",
  type: "production",
  bpm: 92,
  key: "E min",
  edited: "5w ago",
  editedAt: "2026-04-01 19:22",
  size: 38.6,
  tags: ["lo-fi", "hip-hop"],
  seed: "sundown",
  archived: false
},
// Archived
{
  id: 10,
  title: "Demo for Cleo",
  type: "mixing",
  bpm: 110,
  key: "D min",
  edited: "Mar 12",
  editedAt: "2026-03-12 11:11",
  size: 95.2,
  tags: ["mix"],
  seed: "demoCleo",
  archived: true
}, {
  id: 11,
  title: "Old Vocals Folder",
  type: "recording",
  bpm: null,
  key: null,
  edited: "Feb 28",
  editedAt: "2026-02-28 20:00",
  size: 28.1,
  tags: ["vocal"],
  seed: "oldVox",
  archived: true
}, {
  id: 12,
  title: "Birthday Beat (final)",
  type: "production",
  bpm: 128,
  key: "F# min",
  edited: "Feb 03",
  editedAt: "2026-02-03 14:14",
  size: 104.6,
  tags: ["hip-hop", "gift"],
  seed: "bday",
  archived: true
}];

// =====================================================================
// Page
// =====================================================================
window.SessionsPage = function SessionsPage() {
  // State
  const [bucket, setBucket] = useStateSess("owned"); // owned | archived
  const [query, setQuery] = useStateSess("");
  const [type, setType] = useStateSess("all");
  const [genre, setGenre] = useStateSess("all");
  const [sort, setSort] = useStateSess("edited"); // edited | name | bpm
  const [confirmDelete, setConfirmDelete] = useStateSess(null);
  const [renameTarget, setRenameTarget] = useStateSess(null);
  const [newOpen, setNewOpen] = useStateSess(false);
  const [emptyMode, setEmptyMode] = useStateSess(false); // dev toggle for empty state

  // Filter
  const filtered = useMemoSess(() => {
    if (emptyMode) return [];
    let rows = SESSIONS.filter(s => bucket === "archived" ? s.archived : !s.archived);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(r => r.title.toLowerCase().includes(q));
    }
    if (type !== "all") rows = rows.filter(r => r.type === type);
    if (genre !== "all") rows = rows.filter(r => r.tags.includes(genre));
    rows.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.title.localeCompare(b.title);
        case "bpm":
          return (a.bpm ?? 999) - (b.bpm ?? 999);
        case "edited":
        default:
          return b.editedAt.localeCompare(a.editedAt);
      }
    });
    return rows;
  }, [bucket, query, type, genre, sort, emptyMode]);
  const counts = {
    owned: SESSIONS.filter(s => !s.archived).length,
    archived: SESSIONS.filter(s => s.archived).length
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300
    }
  }, /*#__PURE__*/React.createElement(SessHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "28px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
      fontFamily: "var(--font-mono)"
    }
  }, "Workspace"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 30,
      fontWeight: 400,
      letterSpacing: -0.01
    }
  }, "My sessions"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, counts.owned, " active \xB7 ", counts.archived, " archived")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEmptyMode(v => !v),
    title: "Toggle empty state preview",
    style: {
      background: "transparent",
      border: "0.5px dashed var(--line-soft)",
      color: emptyMode ? "var(--color-orange)" : "var(--fg3)",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      padding: "0 10px",
      height: 30,
      borderRadius: 3,
      cursor: "pointer"
    }
  }, emptyMode ? "● empty" : "○ empty"), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    size: "lg",
    onClick: () => setNewOpen(true)
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "plus",
    size: "13px"
  }), " New session"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--line-soft)",
      marginBottom: 18
    }
  }, [{
    v: "owned",
    label: "Owned by me",
    count: counts.owned
  }, {
    v: "archived",
    label: "Archived",
    count: counts.archived
  }].map(b => /*#__PURE__*/React.createElement("button", {
    key: b.v,
    onClick: () => setBucket(b.v),
    style: {
      background: "transparent",
      border: 0,
      padding: "10px 14px",
      color: bucket === b.v ? "var(--fg1)" : "var(--fg2)",
      fontFamily: "var(--font-display)",
      fontSize: 13,
      cursor: "pointer",
      borderBottom: `2px solid ${bucket === b.v ? "var(--color-orange)" : "transparent"}`,
      marginBottom: -1,
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, b.label, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      fontSize: 11
    }
  }, b.count)))), /*#__PURE__*/React.createElement(SessToolbar, {
    query: query,
    setQuery: setQuery,
    type: type,
    setType: setType,
    genre: genre,
    setGenre: setGenre,
    sort: sort,
    setSort: setSort,
    shown: filtered.length,
    total: counts[bucket]
  }), filtered.length === 0 ? emptyMode || counts[bucket] === 0 ? /*#__PURE__*/React.createElement(SessEmpty, {
    onNew: () => setNewOpen(true),
    bucket: bucket
  }) : /*#__PURE__*/React.createElement(SessNoMatches, {
    onClear: () => {
      setQuery("");
      setType("all");
      setGenre("all");
    }
  }) : /*#__PURE__*/React.createElement(SessGrid, {
    rows: filtered,
    archived: bucket === "archived",
    onDelete: s => setConfirmDelete(s),
    onRename: s => setRenameTarget(s)
  })), confirmDelete && /*#__PURE__*/React.createElement(DeleteSessModal, {
    session: confirmDelete,
    onCancel: () => setConfirmDelete(null),
    onConfirm: () => setConfirmDelete(null)
  }), renameTarget && /*#__PURE__*/React.createElement(RenameSessModal, {
    session: renameTarget,
    onCancel: () => setRenameTarget(null),
    onConfirm: () => setRenameTarget(null)
  }), newOpen && /*#__PURE__*/React.createElement(NewSessionModal, {
    onClose: () => setNewOpen(false)
  }));
};

// =====================================================================
// Header
// =====================================================================
function SessHeader() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "20px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 15
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Home.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Home"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "Sessions"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Samples.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Library"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    title: "Notifications",
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "bell",
    size: "16px"
  })), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "lex moreau",
    size: 28,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 12
    }
  }, "@lex.moreau"))));
}

// =====================================================================
// Toolbar
// =====================================================================
function SessToolbar({
  query,
  setQuery,
  type,
  setType,
  genre,
  setGenre,
  sort,
  setSort,
  shown,
  total
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      padding: "12px 14px",
      borderRadius: 4,
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "0 10px",
      height: 30,
      width: 280
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "13px",
    color: "var(--fg3)"
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search by title\u2026",
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      height: "100%"
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuery(""),
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement(SessDivider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, ["all", ...SESS_TYPES].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setType(t),
    style: {
      background: type === t ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      color: type === t ? "var(--color-orange)" : "var(--fg2)",
      border: 0,
      padding: "0 12px",
      height: 30,
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.4,
      borderRight: i < SESS_TYPES.length ? "0.5px solid var(--line-soft)" : 0,
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, t !== "all" && /*#__PURE__*/React.createElement(MsnIcon, {
    name: t === "recording" ? "record" : t === "mixing" ? "mix" : "produce",
    size: "11px"
  }), t))), /*#__PURE__*/React.createElement(SessSelect, {
    label: "Genre",
    value: genre,
    onChange: setGenre,
    options: [{
      v: "all",
      label: "All genres"
    }, ...SESS_GENRES.map(g => ({
      v: g,
      label: g
    }))]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-mono)"
    }
  }, shown, "/", total), /*#__PURE__*/React.createElement(SessDivider, null), /*#__PURE__*/React.createElement(SessSelect, {
    label: "Sort",
    value: sort,
    onChange: setSort,
    options: [{
      v: "edited",
      label: "Last edited"
    }, {
      v: "name",
      label: "Name (A→Z)"
    }, {
      v: "bpm",
      label: "BPM"
    }]
  }));
}
function SessDivider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 18,
      background: "var(--line-soft)"
    }
  });
}
function SessSelect({
  label,
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange(e.target.value),
    style: {
      appearance: "none",
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300,
      height: 30,
      padding: "0 24px 0 10px",
      cursor: "pointer",
      textTransform: "none",
      letterSpacing: 0
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.v,
    value: o.v
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--fg3)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "triangle",
    size: "9px"
  }))));
}

// =====================================================================
// Card grid
// =====================================================================
function SessGrid({
  rows,
  archived,
  onDelete,
  onRename
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 14
    }
  }, rows.map(s => /*#__PURE__*/React.createElement(SessCard, {
    key: s.id,
    session: s,
    archived: archived,
    onDelete: onDelete,
    onRename: onRename
  })));
}
function SessCard({
  session,
  archived,
  onDelete,
  onRename
}) {
  const [menuOpen, setMenuOpen] = useStateSess(false);
  const menuRef = useRefSess(null);
  useEffectSess(() => {
    if (!menuOpen) return;
    const onDoc = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);
  const typeColor = session.type === "recording" ? "var(--color-red)" : session.type === "mixing" ? "var(--color-blue)" : "var(--color-orange)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      opacity: archived ? 0.85 : 1,
      transition: "transform 140ms, border-color 140ms, box-shadow 140ms",
      cursor: "pointer",
      position: "relative"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--line-hover)";
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--line-soft)";
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: `linear-gradient(135deg, color-mix(in srgb, ${typeColor} 25%, var(--color-shadow)), color-mix(in srgb, ${typeColor} 4%, var(--color-void)))`,
      padding: 14,
      height: 130,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, archived && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: 10,
      background: "var(--color-void)",
      color: "var(--fg2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 2,
      padding: "2px 6px",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: 0.5,
      textTransform: "uppercase"
    }
  }, "archived"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      right: 10,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: typeColor,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      background: "color-mix(in srgb, " + typeColor + " 14%, transparent)",
      padding: "3px 6px",
      borderRadius: 2,
      border: "0.5px solid color-mix(in srgb, " + typeColor + " 40%, transparent)"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: session.type === "recording" ? "record" : session.type === "mixing" ? "mix" : "produce",
    size: "11px"
  }), session.type)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: 18,
      color: typeColor,
      opacity: 0.08
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: session.type === "recording" ? "record" : session.type === "mixing" ? "mix" : "produce",
    size: "180px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 70,
      height: 70,
      borderRadius: 8,
      background: `color-mix(in srgb, ${typeColor} 14%, var(--color-void))`,
      border: `1px solid color-mix(in srgb, ${typeColor} 50%, transparent)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: typeColor,
      boxShadow: `0 0 20px -6px ${typeColor}, inset 0 0 0 1px color-mix(in srgb, ${typeColor} 18%, transparent)`
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: session.type === "recording" ? "record" : session.type === "mixing" ? "mix" : "produce",
    size: "38px"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 15,
      color: "var(--fg1)",
      letterSpacing: -0.01,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      minWidth: 0,
      flex: 1
    }
  }, session.title), /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: "relative",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setMenuOpen(o => !o);
    },
    style: {
      background: "transparent",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg2)",
      borderRadius: 3,
      height: 24,
      width: 24,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      lineHeight: 1,
      padding: 0
    }
  }, "\u22EF"), menuOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 28,
      zIndex: 20,
      background: "var(--bg-elevated)",
      border: "0.5px solid var(--line-soft)",
      boxShadow: "0 14px 32px rgba(0,0,0,0.55)",
      borderRadius: 4,
      padding: 4,
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement(CardMenuItem, {
    icon: "play",
    label: "Open in editor"
  }), /*#__PURE__*/React.createElement(CardMenuItem, {
    icon: "settings",
    label: "Rename",
    onClick: () => {
      setMenuOpen(false);
      onRename(session);
    }
  }), /*#__PURE__*/React.createElement(CardMenuItem, {
    icon: "download",
    label: "Export bounce"
  }), /*#__PURE__*/React.createElement(CardMenuItem, {
    icon: "folder",
    label: archived ? "Unarchive" : "Archive"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line-faint)",
      margin: "4px 0"
    }
  }), /*#__PURE__*/React.createElement(CardMenuItem, {
    icon: "bell",
    danger: true,
    label: "Delete",
    onClick: () => {
      setMenuOpen(false);
      onDelete(session);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg2)",
      flexWrap: "wrap"
    }
  }, session.bpm ? /*#__PURE__*/React.createElement("span", null, session.bpm, " BPM") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)"
    }
  }, "\u2014 BPM"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, session.key || "—"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, formatSize(session.size))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, session.tags.map(t => /*#__PURE__*/React.createElement(MsnTag, {
    key: t,
    color: "var(--fg2)"
  }, "#", t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontFamily: "var(--font-body)",
      fontSize: 11
    }
  }, "Edited ", session.edited), /*#__PURE__*/React.createElement(MsnFramed, {
    color: archived ? "var(--fg1)" : "var(--color-orange)",
    size: "sm"
  }, archived ? "Restore" : "Open", " ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "11px"
  })))));
}
function CardMenuItem({
  icon,
  label,
  onClick,
  danger
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: "100%",
      textAlign: "left",
      background: "transparent",
      border: 0,
      padding: "7px 10px",
      borderRadius: 3,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: danger ? "var(--color-red)" : "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12
    },
    onMouseEnter: e => e.currentTarget.style.background = danger ? "color-mix(in srgb, var(--color-red) 14%, transparent)" : "color-mix(in srgb, var(--fg1) 6%, transparent)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: icon,
    size: "12px"
  }), label);
}

// =====================================================================
// Empty states
// =====================================================================
function SessEmpty({
  onNew,
  bucket
}) {
  if (bucket === "archived") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "60px 24px",
        textAlign: "center",
        background: "var(--bg-panel-2)",
        border: "0.5px dashed var(--line-soft)",
        borderRadius: 4,
        color: "var(--fg2)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        color: "var(--color-blue)",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(MsnIcon, {
      name: "folder",
      size: "28px"
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontWeight: 400,
        fontSize: 16,
        color: "var(--fg1)"
      }
    }, "Nothing archived"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "6px 0 0",
        fontFamily: "var(--font-body)",
        fontSize: 13
      }
    }, "Archived sessions will live here when you're done with them."));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "70px 24px",
      textAlign: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px dashed color-mix(in srgb, var(--color-orange) 30%, var(--line-soft))",
      borderRadius: 4,
      color: "var(--fg2)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-orange) 10%, transparent), transparent 60%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, ["produce", "record", "mix"].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      width: 56,
      height: 56,
      borderRadius: 6,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: ["var(--color-orange)", "var(--color-red)", "var(--color-blue)"][i],
      transform: `rotate(${(i - 1) * 4}deg)`
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: n,
    size: "22px"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 400,
      fontSize: 18,
      color: "var(--fg1)"
    }
  }, "No sessions yet"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--fg2)",
      maxWidth: 360
    }
  }, "Sessions are where you record, produce and mix. Start your first one \u2014 it takes about three seconds.")), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    size: "lg",
    onClick: onNew
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "plus",
    size: "13px"
  }), " Create your first session"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-mono)"
    }
  }, "or import from a file")));
}
function SessNoMatches({
  onClear
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "50px 24px",
      textAlign: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px dashed var(--line-soft)",
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "22px"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 400,
      fontSize: 15,
      color: "var(--fg1)"
    }
  }, "No sessions match these filters"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 14px",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--fg2)"
    }
  }, "Try changing your filters or clearing them."), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    onClick: onClear
  }, "Clear filters"));
}

// =====================================================================
// Modals
// =====================================================================
function ModalShell({
  children,
  onClose,
  accent = "var(--line-soft)",
  width = 460
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--bg-elevated)",
      border: `0.5px solid ${accent}`,
      boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 30px -8px ${accent}`,
      borderRadius: 6,
      width,
      maxWidth: "100%",
      padding: 24,
      fontFamily: "var(--font-display)",
      color: "var(--fg1)"
    }
  }, children));
}
function DeleteSessModal({
  session,
  onCancel,
  onConfirm
}) {
  return /*#__PURE__*/React.createElement(ModalShell, {
    onClose: onCancel,
    accent: "color-mix(in srgb, var(--color-red) 50%, transparent)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "color-mix(in srgb, var(--color-red) 20%, transparent)",
      color: "var(--color-red)",
      border: "1px solid var(--color-red)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "!"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 400
    }
  }, "Delete this session?")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("code", {
    style: {
      color: "var(--color-orange)",
      fontFamily: "var(--font-mono)"
    }
  }, session.title), " and all its tracks, automation and edits will be permanently removed. Sample files referenced from your library are kept."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onCancel,
    color: "var(--fg1)"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    style: {
      background: "var(--color-red)",
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
      cursor: "pointer",
      boxShadow: "0 0 12px -4px var(--color-red)"
    }
  }, "Delete session")));
}
function RenameSessModal({
  session,
  onCancel,
  onConfirm
}) {
  const [val, setVal] = useStateSess(session.title);
  return /*#__PURE__*/React.createElement(ModalShell, {
    onClose: onCancel
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 400
    }
  }, "Rename session"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: val,
    onChange: e => setVal(e.target.value),
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "0 10px",
      height: 36,
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onCancel,
    color: "var(--fg1)"
  }, "Cancel"), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)",
    onClick: onConfirm
  }, "Save")));
}
function NewSessionModal({
  onClose
}) {
  const [picked, setPicked] = useStateSess("production");
  const opts = [{
    v: "production",
    label: "Production",
    color: "var(--color-orange)",
    desc: "Full DAW: tracks, MIDI, effects, automation."
  }, {
    v: "recording",
    label: "Recording",
    color: "var(--color-red)",
    desc: "Get a take down. Multi-mic, punch-in, comp."
  }, {
    v: "mixing",
    label: "Mixing",
    color: "var(--color-blue)",
    desc: "Stems in, mix out. Faders, busses, FX chains."
  }];
  return /*#__PURE__*/React.createElement(ModalShell, {
    onClose: onClose,
    width: 560
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 400
    }
  }, "Start a new session"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, "Pick the kind of session, then we'll set up the right workspace."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10,
      marginTop: 18
    }
  }, opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    onClick: () => setPicked(o.v),
    style: {
      background: picked === o.v ? `color-mix(in srgb, ${o.color} 12%, transparent)` : "var(--color-void)",
      border: `1px solid ${picked === o.v ? o.color : "var(--line-soft)"}`,
      borderRadius: 4,
      padding: 14,
      cursor: "pointer",
      textAlign: "left",
      color: "var(--fg1)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxShadow: picked === o.v ? `0 0 14px -6px ${o.color}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: o.color,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: o.v === "recording" ? "record" : o.v === "mixing" ? "mix" : "produce",
    size: "18px"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 14,
      fontWeight: 400
    }
  }, o.label)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      lineHeight: 1.5
    }
  }, o.desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(NewField, {
    label: "Title",
    placeholder: "Untitled session"
  }), /*#__PURE__*/React.createElement(NewField, {
    label: "BPM",
    placeholder: "120"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    onClick: onClose,
    color: "var(--fg1)"
  }, "Cancel"), /*#__PURE__*/React.createElement(MsnSolid, {
    color: "var(--color-orange)"
  }, "Create & open ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "11px"
  }))));
}
function NewField({
  label,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg2)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    placeholder: placeholder,
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "0 10px",
      height: 34,
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      outline: "none"
    }
  }));
}

// =====================================================================
// Helpers
// =====================================================================
function formatSize(mb) {
  if (mb >= 1024) return (mb / 1024).toFixed(2) + " GB";
  return mb.toFixed(1) + " MB";
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "sessions.jsx", error: String((e && e.message) || e) }); }

// signup.jsx
try { (() => {
/* global React, AuthShell, MsnField, MsnSubmit, MsnIcon, StateSwitcher */
const {
  useState: useStateSignup
} = React;
window.SignUpPage = function SignUpPage() {
  const [variant, setVariant] = useStateSignup("filled");
  const data = {
    default: {
      email: "",
      username: "",
      alias: "",
      password: "",
      emailErr: null,
      userErr: null,
      loading: false
    },
    filled: {
      email: "rosa.petrov@example.com",
      username: "rosa.p",
      alias: "rosa petrov",
      password: "TapeReel-9-9-2026",
      emailErr: null,
      userErr: null,
      loading: false
    },
    error: {
      email: "rosa@example.com",
      username: "rosa",
      alias: "rosa petrov",
      password: "shortpw",
      emailErr: "An account with that email already exists.",
      userErr: "Handle is taken — try rosa.99 or rosa_p",
      loading: false
    },
    loading: {
      email: "rosa.petrov@example.com",
      username: "rosa.p",
      alias: "rosa petrov",
      password: "TapeReel-9-9-2026",
      emailErr: null,
      userErr: null,
      loading: true
    }
  }[variant];

  // Password strength heuristic for the filled state
  const strength = passwordStrength(data.password);
  return /*#__PURE__*/React.createElement(AuthShell, {
    eyebrow: "Get started",
    title: "Create your account",
    subtitle: "Free during beta. No tracking, no credit card.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, "Already have an account? ", /*#__PURE__*/React.createElement("a", {
      href: "MakeSomeNoise Login.html",
      style: {
        color: "var(--color-orange)"
      }
    }, "Log in \u2192")),
    width: 460
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(MsnField, {
    label: "Email",
    type: "email",
    value: data.email,
    onChange: () => {},
    placeholder: "you@example.com",
    error: data.emailErr,
    autoFocus: true
  }), /*#__PURE__*/React.createElement(MsnField, {
    label: "Username",
    value: data.username,
    onChange: () => {},
    placeholder: "lex.moreau",
    prefix: "@",
    error: data.userErr,
    hint: "Letters, numbers, dot, underscore"
  }), /*#__PURE__*/React.createElement(MsnField, {
    label: "Producer alias",
    value: data.alias,
    onChange: () => {},
    placeholder: "Your artist name",
    hint: "Visible on your profile"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MsnField, {
    label: "Password",
    type: "password",
    value: data.password,
    onChange: () => {},
    placeholder: "At least 10 characters"
  }), data.password && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(PasswordMeter, {
    score: strength.score,
    label: strength.label
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-body)",
      lineHeight: 1.5,
      padding: "8px 0"
    }
  }, "By creating an account you agree to our", " ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Terms"), " and", " ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg2)"
    }
  }, "Privacy policy"), "."), /*#__PURE__*/React.createElement(MsnSubmit, {
    loading: data.loading
  }, data.loading ? "Creating account…" : /*#__PURE__*/React.createElement(React.Fragment, null, "Create account ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "11px"
  })))), /*#__PURE__*/React.createElement(StateSwitcher, {
    variant: variant,
    setVariant: setVariant,
    options: [{
      v: "default",
      label: "Empty"
    }, {
      v: "filled",
      label: "Filled"
    }, {
      v: "error",
      label: "Error"
    }, {
      v: "loading",
      label: "Loading"
    }]
  }));
};
function passwordStrength(pw) {
  if (!pw) return {
    score: 0,
    label: ""
  };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^\w\s]/.test(pw)) s++;
  const label = ["Too short", "Weak", "OK", "Good", "Strong", "Excellent"][s];
  return {
    score: s,
    label
  };
}
function PasswordMeter({
  score,
  label
}) {
  const colors = ["var(--color-red)", "var(--color-red)", "var(--color-orange)", "var(--color-yellow)", "var(--color-green)", "var(--color-green)"];
  const c = colors[score] || "var(--color-dark)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      flex: 1
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 3,
      borderRadius: 1,
      background: i < score ? c : "var(--color-void)",
      boxShadow: i < score ? `0 0 4px -1px ${c}` : "none"
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c,
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.4
    }
  }, label));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "signup.jsx", error: String((e && e.message) || e) }); }

// studio-icons.jsx
try { (() => {
/* global React */
// Studio-only icons (extends MSN icon vocabulary for DAW chrome)
window.StudioIcon = function StudioIcon({
  name,
  size = "1em",
  color,
  style
}) {
  const P = STUDIO_ICONS[name];
  if (!P) return null;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    style: {
      color,
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
      ...style
    }
  }, P);
};
const STUDIO_ICONS = {
  play: /*#__PURE__*/React.createElement("path", {
    d: "M6 4l14 8-14 8z",
    fill: "currentColor"
  }),
  stop: /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5",
    width: "14",
    height: "14",
    rx: "1",
    fill: "currentColor"
  }),
  pause: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "4",
    width: "4",
    height: "16"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "4",
    height: "16"
  })),
  rec: /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6",
    fill: "currentColor"
  }),
  loop: /*#__PURE__*/React.createElement("path", {
    d: "M5 8h10a4 4 0 0 1 4 4M19 16H9a4 4 0 0 1-4-4M16 5l3 3-3 3M8 19l-3-3 3-3",
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  metro: /*#__PURE__*/React.createElement("path", {
    d: "M9 3h6l3 16H6L9 3zm1 4l-2 10h8l-2-10h-4z",
    fill: "currentColor"
  }),
  midi: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "13",
    r: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "13",
    r: "1.2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "14.5",
    width: "6",
    height: "2.8",
    rx: ".5"
  })),
  undo: /*#__PURE__*/React.createElement("path", {
    d: "M9 7L4 12l5 5v-3h6a4 4 0 0 1 0 8h-3v2h3a6 6 0 0 0 0-12H9V7z",
    fill: "currentColor"
  }),
  redo: /*#__PURE__*/React.createElement("path", {
    d: "M15 7l5 5-5 5v-3H9a4 4 0 0 0 0 8h3v2H9a6 6 0 0 1 0-12h6V7z",
    fill: "currentColor"
  }),
  triangle: /*#__PURE__*/React.createElement("path", {
    d: "M5 9l4 4 4-4z",
    fill: "currentColor"
  }),
  arrange: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "2.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "14",
    height: "2.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "17",
    width: "10",
    height: "2.5"
  })),
  mixer: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "9",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "7",
    r: "2.2",
    fill: "var(--bg-app)",
    stroke: "currentColor",
    strokeWidth: "1.4"
  })),
  piano: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "6",
    width: "18",
    height: "12",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "6",
    width: "2",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "6",
    width: "2",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "6",
    width: "2",
    height: "7"
  })),
  meter: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "14",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "10",
    width: "2",
    height: "10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "6",
    width: "2",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "12",
    width: "2",
    height: "8"
  })),
  device: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "6",
    width: "18",
    height: "12",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "12",
    r: "2",
    fill: "var(--bg-app)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "11",
    width: "6",
    height: "2",
    fill: "var(--bg-app)"
  })),
  sample: /*#__PURE__*/React.createElement("path", {
    d: "M3 12c2-4 4 4 6 0s4 4 6 0 4 4 6 0",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round"
  }),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z",
    fill: "currentColor"
  }),
  font: /*#__PURE__*/React.createElement("path", {
    d: "M5 19l5-14h2l5 14h-2.2l-1.3-3.7H8.5L7.2 19H5zm4-5.4h4l-2-5.7-2 5.7z",
    fill: "currentColor"
  }),
  search: /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4"
  })),
  add: /*#__PURE__*/React.createElement("path", {
    d: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z",
    fill: "currentColor"
  }),
  more: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "12",
    r: "1.6"
  })),
  walk: /*#__PURE__*/React.createElement("path", {
    d: "M14 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 4l-3 4 2 5 3-4 1 4 3-1-1-3 1-3-2-2h-4z",
    fill: "currentColor"
  }),
  marker: /*#__PURE__*/React.createElement("path", {
    d: "M5 4h11l3 4-3 4H5z",
    fill: "currentColor"
  }),
  clip: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "6",
    width: "16",
    height: "12",
    rx: "1"
  })),
  scene: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "5",
    width: "6",
    height: "14",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "5",
    width: "6",
    height: "14",
    rx: "1"
  })),
  save: /*#__PURE__*/React.createElement("path", {
    d: "M5 3h11l3 3v15H5V3zm2 2v6h10V5H7zm0 8v6h10v-6H7z",
    fill: "currentColor"
  }),
  share: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11l8-4M8 13l8 4",
    stroke: "currentColor",
    strokeWidth: "1.4"
  })),
  close: /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }),
  collapseV: /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  pencil: /*#__PURE__*/React.createElement("path", {
    d: "M3 17.25V21h3.75L18 9.75 14.25 6 3 17.25zM20.7 7.04a1 1 0 0 0 0-1.4l-2.34-2.34a1 1 0 0 0-1.4 0L15.13 5.13l3.74 3.74 1.83-1.83z",
    fill: "currentColor"
  }),
  cursor: /*#__PURE__*/React.createElement("path", {
    d: "M5 3l14 7-6 2-2 6-6-15z",
    fill: "currentColor"
  }),
  scissors: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "3",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 8l12 9M9 16l12-9",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }))
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "studio-icons.jsx", error: String((e && e.message) || e) }); }

// studio.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid, MsnTag, MsnPeakMeter, StudioIcon */
const {
  useState: useStateStudio,
  useMemo: useMemoStudio
} = React;

// =====================================================================
// Demo project data
// =====================================================================
const PROJECT = {
  title: "Liquid Drum 808",
  bpm: 128,
  bar: "003",
  beat: "1",
  meter: "4/4",
  online: true,
  sampleRate: 48000,
  latency: 192,
  collabs: 3
};
const TRACKS = [{
  id: 1,
  name: "Playfield",
  instr: "Drums",
  type: "midi",
  color: "var(--color-orange)",
  regions: [{
    s: 1,
    l: 5,
    label: "Drums A"
  }, {
    s: 6,
    l: 7,
    label: "Drums B"
  }]
}, {
  id: 2,
  name: "Playfield",
  instr: "Notes",
  type: "midi",
  color: "var(--color-yellow)",
  regions: [{
    s: 1,
    l: 1,
    label: "Notes",
    pattern: true
  }, {
    s: 2,
    l: 1,
    label: "Notes",
    pattern: true
  }, {
    s: 3,
    l: 1,
    label: "Notes",
    pattern: true
  }, {
    s: 4,
    l: 1,
    label: "Notes",
    pattern: true
  }]
}, {
  id: 3,
  name: "Tape",
  instr: "Audio",
  type: "audio",
  color: "var(--color-cyan)",
  regions: [{
    s: 0.5,
    l: 6.5,
    label: "vox-take.wav"
  }, {
    s: 8,
    l: 5,
    label: "texture-pad.wav"
  }]
}, {
  id: 4,
  name: "Vaporisateur",
  instr: "Bass",
  type: "midi",
  color: "var(--color-purple)",
  regions: [{
    s: 2,
    l: 4,
    label: "Bass Lo"
  }, {
    s: 8,
    l: 4,
    label: "Bass Hi"
  }]
}, {
  id: 5,
  name: "Modular",
  instr: "Pad",
  type: "midi",
  color: "var(--color-blue)",
  regions: [{
    s: 0,
    l: 13,
    label: "Pad sustained"
  }],
  muted: true
}];
const BARS = 13;

// =====================================================================
// Page
// =====================================================================
window.StudioPage = function StudioPage() {
  const [transport, setTransport] = useStateStudio("stop"); // stop | play | rec
  const [activeTrack, setActiveTrack] = useStateStudio(2);
  const [view, setView] = useStateStudio("arrange"); // arrange | mixer | piano | meter
  const [metro, setMetro] = useStateStudio(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(StudioHeader, {
    transport: transport,
    setTransport: setTransport,
    view: view,
    setView: setView,
    metro: metro,
    setMetro: setMetro
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Browser, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minWidth: 0,
      background: "var(--color-void)"
    }
  }, /*#__PURE__*/React.createElement(Timeline, {
    activeTrack: activeTrack,
    setActiveTrack: setActiveTrack
  }), /*#__PURE__*/React.createElement(PianoRollEditor, null), /*#__PURE__*/React.createElement(DevicePanel, null)), /*#__PURE__*/React.createElement(Mixer, null)), /*#__PURE__*/React.createElement(StudioFooter, null));
};

// =====================================================================
// Header — brand · midi/help · transport · counters · view tabs · master
// =====================================================================
function StudioHeader({
  transport,
  setTransport,
  view,
  setView,
  metro,
  setMetro
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 52,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderBottom: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Sessions.html",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      padding: "0 8px",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "18px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 13
  })), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Project"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 13
    }
  }, PROJECT.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-green)",
      fontSize: 9,
      padding: "1px 5px",
      borderRadius: 2,
      border: "0.5px solid var(--color-green)",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      fontFamily: "var(--font-mono)"
    }
  }, "\u25CF saved")), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(IconBtn, {
    icon: "undo",
    title: "Undo (\u2318Z)"
  }), /*#__PURE__*/React.createElement(IconBtn, {
    icon: "redo",
    title: "Redo (\u2318\u21E7Z)"
  }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(IconBtn, {
    icon: "midi",
    color: "var(--color-orange)",
    active: true,
    title: "MIDI Access"
  }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "0 4px"
    }
  }, /*#__PURE__*/React.createElement(TransportBtn, {
    name: "rec",
    color: "var(--color-red)",
    active: transport === "rec",
    onClick: () => setTransport(t => t === "rec" ? "stop" : "rec"),
    title: "Record"
  }), /*#__PURE__*/React.createElement(TransportBtn, {
    name: "play",
    color: "var(--color-green)",
    active: transport === "play",
    onClick: () => setTransport(t => t === "play" ? "stop" : "play"),
    title: "Play (Space)"
  }), /*#__PURE__*/React.createElement(TransportBtn, {
    name: "stop",
    color: "var(--fg1)",
    active: transport === "stop",
    onClick: () => setTransport("stop"),
    title: "Stop"
  }), /*#__PURE__*/React.createElement(TransportBtn, {
    name: "loop",
    color: "var(--color-orange)",
    title: "Loop"
  })), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Counter, {
    value: PROJECT.bar,
    unit: "bar",
    accent: "var(--fg1)",
    big: true
  }), /*#__PURE__*/React.createElement(Counter, {
    value: PROJECT.beat,
    unit: "beat"
  }), /*#__PURE__*/React.createElement(Counter, {
    value: PROJECT.bpm,
    unit: "bpm",
    accent: "var(--color-orange)",
    big: true
  }), /*#__PURE__*/React.createElement(Counter, {
    value: PROJECT.meter,
    unit: "meter"
  }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMetro(v => !v),
    title: "Metronome",
    style: {
      background: "transparent",
      border: 0,
      color: metro ? "var(--color-orange)" : "var(--fg2)",
      padding: 6,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "metro",
    size: "16px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 3,
      padding: "0 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 9,
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Master \xB7 \u22122.6 dB"), /*#__PURE__*/React.createElement(MsnPeakMeter, {
    l: 0.62,
    r: 0.55,
    width: 120
  })), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, [{
    v: "arrange",
    icon: "arrange",
    title: "Arrangement"
  }, {
    v: "mixer",
    icon: "mixer",
    title: "Mixer"
  }, {
    v: "piano",
    icon: "piano",
    title: "Piano roll"
  }, {
    v: "meter",
    icon: "meter",
    title: "Meter"
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    title: o.title,
    onClick: () => setView(o.v),
    style: {
      background: view === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      color: view === o.v ? "var(--color-orange)" : "var(--fg2)",
      border: 0,
      padding: "0 10px",
      height: 30,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      borderRight: o.v !== "meter" ? "0.5px solid var(--line-soft)" : 0
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: o.icon,
    size: "14px"
  })))), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: -4,
      padding: "0 8px"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "Lex Moreau",
    size: 24,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -6
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "Maya Okafor",
    size: 24,
    status: "live"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -6
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "Theo Rivera",
    size: 24,
    status: "online"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      color: "var(--fg3)",
      fontSize: 11,
      fontFamily: "var(--font-mono)"
    }
  }, "+0")), /*#__PURE__*/React.createElement("button", {
    title: "Share",
    style: {
      background: "transparent",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg1)",
      borderRadius: 3,
      height: 28,
      padding: "0 10px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "share",
    size: "11px"
  }), " Share"));
}
function Sep() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 26,
      background: "var(--line-soft)",
      margin: "0 4px"
    }
  });
}
function IconBtn({
  icon,
  color = "var(--fg2)",
  active,
  onClick,
  title
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    style: {
      background: "transparent",
      border: 0,
      color: active ? color : "var(--fg2)",
      padding: 6,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: icon,
    size: "14px"
  }));
}
function TransportBtn({
  name,
  color,
  active,
  onClick,
  title
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    style: {
      width: 28,
      height: 28,
      borderRadius: 3,
      background: active ? `color-mix(in srgb, ${color} 18%, var(--color-void))` : "var(--color-void)",
      border: `0.5px solid ${active ? color : "var(--line-soft)"}`,
      color: active ? color : "var(--fg2)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: active ? `0 0 8px -3px ${color}` : "none"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: name,
    size: "13px"
  }));
}
function Counter({
  value,
  unit,
  accent = "var(--fg1)",
  big
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: "0 10px",
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 400,
      fontSize: big ? 18 : 13,
      color: accent,
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginTop: 2,
      fontFamily: "var(--font-mono)"
    }
  }, unit));
}

// =====================================================================
// Browser sidebar — Devices / Samples / Soundfonts tabs
// =====================================================================
function Browser() {
  const [tab, setTab] = useStateStudio("samples");
  const tabs = [{
    v: "devices",
    label: "Devices",
    icon: "device"
  }, {
    v: "samples",
    label: "Samples",
    icon: "sample"
  }, {
    v: "soundfonts",
    label: "Soundfonts",
    icon: "font"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    icon: "folder",
    title: "Browser"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid var(--line-faint)"
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.v,
    onClick: () => setTab(t.v),
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      color: tab === t.v ? "var(--color-orange)" : "var(--fg3)",
      padding: "8px 0",
      cursor: "pointer",
      fontSize: 10,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      borderBottom: tab === t.v ? "1px solid var(--color-orange)" : "1px solid transparent"
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 10px",
      display: "flex",
      alignItems: "center",
      gap: 6,
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    title: "My library",
    style: {
      background: "color-mix(in srgb, var(--color-orange) 14%, transparent)",
      border: "0.5px solid var(--color-orange)",
      color: "var(--color-orange)",
      borderRadius: 3,
      height: 24,
      width: 24,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "folder",
    size: "12px"
  })), /*#__PURE__*/React.createElement("button", {
    title: "Shared",
    style: {
      background: "transparent",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg2)",
      borderRadius: 3,
      height: 24,
      width: 24,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "users",
    size: "12px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 5,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "0 8px",
      height: 24
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "search",
    size: "11px",
    color: "var(--fg3)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Filter\u2026",
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg1)",
      fontSize: 11,
      fontFamily: "var(--font-body)",
      height: "100%"
    }
  }))), tab === "samples" && /*#__PURE__*/React.createElement(SampleList, null), tab === "devices" && /*#__PURE__*/React.createElement(DeviceList, null), tab === "soundfonts" && /*#__PURE__*/React.createElement(SoundfontList, null));
}
const SAMPLES = [{
  name: "175_ArcLoop_SP_01",
  bpm: 175.0,
  sec: 5.5
}, {
  name: "175_SwitchLoop_SP_03",
  bpm: 175.0,
  sec: 2.7
}, {
  name: "909 Bassdrum",
  bpm: 0.0,
  sec: 0.5
}, {
  name: "909 Clap",
  bpm: 0.0,
  sec: 0.5
}, {
  name: "909 Closed Hat",
  bpm: 0.0,
  sec: 0.2
}, {
  name: "909 Crash",
  bpm: 0.0,
  sec: 1.1
}, {
  name: "909 High Tom",
  bpm: 0.0,
  sec: 0.5
}, {
  name: "909 Low Tom",
  bpm: 0.0,
  sec: 0.5
}, {
  name: "909 Mid Tom",
  bpm: 0.0,
  sec: 0.4
}, {
  name: "909 Open Hat",
  bpm: 0.0,
  sec: 0.5
}, {
  name: "909 Ride",
  bpm: 0.0,
  sec: 1.7
}, {
  name: "909 Rimshot",
  bpm: 0.0,
  sec: 0.1
}, {
  name: "909 Snare",
  bpm: 0.0,
  sec: 0.2
}, {
  name: "Bass 01 F",
  bpm: 158.9,
  sec: 3.0
}, {
  name: "Bass 02 F",
  bpm: 142.4,
  sec: 3.4
}, {
  name: "Bass 03 F",
  bpm: 144.9,
  sec: 3.3
}, {
  name: "Bass 04 F",
  bpm: 134.4,
  sec: 3.6
}, {
  name: "Bass 05 F",
  bpm: 148.8,
  sec: 3.2
}, {
  name: "Bass 06 F",
  bpm: 156.6,
  sec: 3.1
}, {
  name: "Bass Loop 1 - F2",
  bpm: 140.0,
  sec: 13.7
}, {
  name: "Bass Loop 2 - F2",
  bpm: 140.0,
  sec: 13.7
}, {
  name: "Bass Loop 3 - G2",
  bpm: 140.0,
  sec: 13.7
}, {
  name: "Bass Loop 4 - G2",
  bpm: 140.0,
  sec: 13.7
}, {
  name: "Bass Loop 5 - F#2",
  bpm: 140.0,
  sec: 13.7
}, {
  name: "BV_PULSE_Drums_Tops_05_1…",
  bpm: 100.0,
  sec: 4.8
}, {
  name: "BV_PULSE_Drums_Tops_08_7…",
  bpm: 150.0,
  sec: 12.8,
  sel: true
}, {
  name: "BV_PULSE_Kick_Snare_02…",
  bpm: 150.0,
  sec: 6.4
}, {
  name: "BV_PULSE_Percussion_03_75…",
  bpm: 150.0,
  sec: 6.4
}, {
  name: "BVKER - Analog Full Drum 01",
  bpm: 100.0,
  sec: 9.6
}, {
  name: "BVKER - Analog Full Drum 02",
  bpm: 105.0,
  sec: 4.6
}, {
  name: "BVKER - Analog Full Drum 03",
  bpm: 110.0,
  sec: 8.7
}];
function SampleList() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 50px 38px",
      gap: 6,
      padding: "6px 10px",
      color: "var(--fg3)",
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      borderBottom: "1px solid var(--line-faint)",
      position: "sticky",
      top: 0,
      background: "var(--bg-panel)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Name"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "Bpm"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "Sec")), SAMPLES.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    draggable: true,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 50px 38px",
      gap: 6,
      padding: "4px 10px",
      color: s.sel ? "rgba(0,0,0,0.85)" : "var(--fg1)",
      background: s.sel ? "var(--color-orange)" : "transparent",
      cursor: "grab",
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      color: s.sel ? "rgba(0,0,0,0.65)" : "var(--fg2)"
    }
  }, s.bpm.toFixed(1)), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      color: s.sel ? "rgba(0,0,0,0.65)" : "var(--fg2)"
    }
  }, s.sec))));
}
function DeviceList() {
  const items = [{
    name: "Playfield",
    type: "Instrument",
    color: "var(--color-orange)"
  }, {
    name: "Vaporisateur",
    type: "Instrument",
    color: "var(--color-purple)"
  }, {
    name: "Modular",
    type: "Instrument",
    color: "var(--color-blue)"
  }, {
    name: "Tape",
    type: "Instrument",
    color: "var(--color-cyan)"
  }, {
    name: "Compressor",
    type: "Effect",
    color: "var(--color-yellow)"
  }, {
    name: "Maximizer",
    type: "Effect",
    color: "var(--color-red)"
  }, {
    name: "Revamp EQ",
    type: "Effect",
    color: "var(--color-green)"
  }, {
    name: "Gate",
    type: "Effect",
    color: "var(--color-cyan)"
  }, {
    name: "Reverb",
    type: "Effect",
    color: "var(--color-purple)"
  }, {
    name: "Delay",
    type: "Effect",
    color: "var(--color-orange)"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      fontSize: 11
    }
  }, items.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    draggable: true,
    style: {
      padding: "5px 10px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "grab",
      color: "var(--fg1)",
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)"
    }
  }, d.type === "Instrument" ? "INS" : "FX"))));
}
function SoundfontList() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "16px",
      color: "var(--fg3)",
      fontSize: 11,
      textAlign: "center",
      lineHeight: 1.5
    }
  }, "Drop a .sf2 / .sfz file", /*#__PURE__*/React.createElement("br", null), "to import a soundfont.");
}

// =====================================================================
// Timeline (arrangement) — track headers + region lanes
// =====================================================================
function Timeline({
  activeTrack,
  setActiveTrack
}) {
  const ZOOM = 90; // px per bar
  const headW = 280;
  const totalW = BARS * ZOOM;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    icon: "arrange",
    title: "Timeline",
    right: /*#__PURE__*/React.createElement(TimelineHeaderRight, null)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid var(--line-faint)",
      background: "var(--bg-panel)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: headW,
      flexShrink: 0,
      padding: "6px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRight: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Markers"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)",
      fontFamily: "var(--font-mono)",
      fontSize: 11
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      height: 24
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: totalW,
    height: 24,
    style: {
      display: "block"
    }
  }, Array.from({
    length: BARS + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("line", {
    x1: i * ZOOM,
    y1: i % 4 === 0 ? 4 : 14,
    x2: i * ZOOM,
    y2: 24,
    stroke: i % 4 === 0 ? "var(--fg2)" : "var(--line-soft)",
    strokeWidth: 1
  }), i < BARS && /*#__PURE__*/React.createElement("text", {
    x: i * ZOOM + 5,
    y: 11,
    fill: i === 0 ? "var(--color-orange)" : "var(--fg2)",
    fontSize: 10,
    fontFamily: "var(--font-mono)"
  }, i + 1))), /*#__PURE__*/React.createElement("rect", {
    x: 0,
    y: 2,
    width: 3 * ZOOM,
    height: 4,
    fill: "var(--color-orange)",
    rx: 2
  }), /*#__PURE__*/React.createElement("line", {
    x1: 2.4 * ZOOM,
    y1: 0,
    x2: 2.4 * ZOOM,
    y2: 24,
    stroke: "var(--color-orange)",
    strokeWidth: 1
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${2.4 * ZOOM - 5},0 ${2.4 * ZOOM + 5},0 ${2.4 * ZOOM},6`,
    fill: "var(--color-orange)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 200,
      overflow: "auto"
    }
  }, TRACKS.map((t, i) => /*#__PURE__*/React.createElement(TrackRow, {
    key: t.id,
    track: t,
    index: i,
    zoom: ZOOM,
    headW: headW,
    totalW: totalW,
    active: activeTrack === t.id,
    onSelect: () => setActiveTrack(t.id)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 12px",
      color: "var(--fg3)",
      fontSize: 11,
      cursor: "pointer",
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "add",
    size: "12px"
  }), " Add track")));
}
function TimelineHeaderRight() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Snap"), /*#__PURE__*/React.createElement("select", {
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 11,
      height: 22,
      padding: "0 6px",
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("option", null, "Smart"), /*#__PURE__*/React.createElement("option", null, "1/16"), /*#__PURE__*/React.createElement("option", null, "1/8"), /*#__PURE__*/React.createElement("option", null, "1/4"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(ToolBtn, {
    icon: "cursor",
    active: true,
    title: "Select"
  }), /*#__PURE__*/React.createElement(ToolBtn, {
    icon: "pencil",
    title: "Pencil"
  }), /*#__PURE__*/React.createElement(ToolBtn, {
    icon: "scissors",
    title: "Scissors"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, [1, 2, 3].map(i => /*#__PURE__*/React.createElement("button", {
    key: i,
    title: `Scene ${i}`,
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg2)",
      height: 22,
      padding: "0 8px",
      borderRadius: 2,
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      cursor: "pointer"
    }
  }, i, " ", /*#__PURE__*/React.createElement(StudioIcon, {
    name: "play",
    size: "9px",
    color: "var(--color-green)"
  })))));
}
function ToolBtn({
  icon,
  active,
  title
}) {
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    style: {
      background: active ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
      border: "0.5px solid " + (active ? "var(--color-orange)" : "var(--line-soft)"),
      color: active ? "var(--color-orange)" : "var(--fg2)",
      width: 24,
      height: 22,
      borderRadius: 2,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: icon,
    size: "11px"
  }));
}
function TrackRow({
  track,
  index,
  zoom,
  headW,
  totalW,
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onSelect,
    style: {
      display: "flex",
      height: 50,
      borderBottom: "1px solid var(--line-faint)",
      background: active ? "color-mix(in srgb, var(--color-orange) 6%, transparent)" : "transparent",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: headW,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      padding: "6px 8px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      opacity: track.muted ? 0.55 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 3,
      background: `color-mix(in srgb, ${track.color} 16%, var(--color-void))`,
      color: track.color,
      border: `0.5px solid color-mix(in srgb, ${track.color} 50%, transparent)`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: track.type === "audio" ? "sample" : "piano",
    size: "14px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--fg1)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, track.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, track.instr)), /*#__PURE__*/React.createElement("span", {
    title: "Pan",
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, color-mix(in srgb, ${track.color} 25%, var(--color-void)), var(--color-void))`,
      border: `1px solid ${track.color}`,
      boxShadow: `0 0 4px -1px ${track.color}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    title: "Volume",
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: `radial-gradient(circle at 65% 35%, color-mix(in srgb, var(--color-green) 30%, var(--color-void)), var(--color-void))`,
      border: "1px solid var(--color-green)",
      boxShadow: "0 0 4px -1px var(--color-green)"
    }
  }), /*#__PURE__*/React.createElement(Pill, {
    label: "M",
    active: track.muted,
    color: "var(--color-red)"
  }), /*#__PURE__*/React.createElement(Pill, {
    label: "S",
    color: "var(--color-yellow)"
  }), /*#__PURE__*/React.createElement(Pill, {
    dot: true,
    color: "var(--color-red)",
    title: "Arm record"
  }), /*#__PURE__*/React.createElement("button", {
    title: "Track menu",
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "more",
    size: "14px"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      background: index % 2 ? "transparent" : "rgba(255,255,255,0.012)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: totalW,
    height: 50,
    style: {
      position: "absolute",
      inset: 0
    }
  }, Array.from({
    length: BARS + 1
  }).map((_, b) => /*#__PURE__*/React.createElement("line", {
    key: b,
    x1: b * zoom,
    y1: 0,
    x2: b * zoom,
    y2: 50,
    stroke: b % 4 === 0 ? "var(--line-soft)" : "var(--line-faint)",
    strokeWidth: 1
  }))), track.regions.map((r, ri) => /*#__PURE__*/React.createElement(Region, {
    key: ri,
    r: r,
    color: track.color,
    type: track.type,
    zoom: zoom
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 2.4 * zoom,
      width: 1,
      background: "var(--color-orange)",
      pointerEvents: "none"
    }
  })));
}
function Pill({
  label,
  dot,
  active,
  color,
  title
}) {
  return /*#__PURE__*/React.createElement("span", {
    title: title,
    style: {
      width: 16,
      height: 16,
      borderRadius: 2,
      border: `0.5px solid ${active ? color : "var(--line-hover)"}`,
      background: active ? `color-mix(in srgb, ${color} 16%, transparent)` : "transparent",
      color: active ? color : "var(--fg3)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 9,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      boxShadow: active ? `0 0 4px -1px ${color}` : "none"
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }) : label);
}
function Region({
  r,
  color,
  type,
  zoom
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: r.s * zoom + 2,
      top: 6,
      width: r.l * zoom - 4,
      height: 38,
      background: type === "audio" ? `linear-gradient(180deg, color-mix(in srgb, ${color} 22%, var(--color-void)), color-mix(in srgb, ${color} 8%, var(--color-void)))` : `color-mix(in srgb, ${color} 22%, var(--color-void))`,
      border: `0.5px solid ${color}`,
      borderRadius: 2,
      padding: "3px 6px",
      fontSize: 9,
      color: "var(--fg1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: type === "audio" ? "var(--font-mono)" : "var(--font-display)",
      overflow: "hidden",
      boxShadow: `inset 0 0 0 0.5px color-mix(in srgb, ${color} 40%, transparent)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      color
    }
  }, r.label), type === "audio" ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 14",
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: 14,
      color
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 7 L4 4 L8 9 L12 3 L16 10 L20 5 L24 8 L28 2 L32 9 L36 4 L40 7 L44 10 L48 3 L52 8 L56 5 L60 9 L64 4 L68 7 L72 8 L76 5 L80 9 L84 3 L88 7 L92 8 L96 4 L100 7 L104 5 L108 8 L112 4 L116 6 L120 7",
    stroke: "currentColor",
    strokeWidth: "0.7",
    fill: "none"
  })) : r.pattern ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, [0, 1, 2].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      gap: 2
    }
  }, Array.from({
    length: 16
  }).map((_, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      width: (r.l * zoom - 24) / 16 - 2,
      height: 2,
      background: (j + k) % 4 === 0 ? color : "transparent",
      borderRadius: 1
    }
  }))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      height: 14,
      justifyContent: "flex-end"
    }
  }, [0.4, 0.7, 0.55, 0.6].map((v, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 1.5,
      background: color,
      width: `${v * 100}%`,
      opacity: 0.7,
      borderRadius: 0.5
    }
  }))));
}

// =====================================================================
// Piano-roll editor
// =====================================================================
function PianoRollEditor() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid var(--line-soft)",
      minHeight: 220,
      background: "var(--bg-panel)"
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    icon: "piano",
    title: "Editor \u2014 Playfield \xB7 Notes",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)",
        fontSize: 10,
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: 0.5
      }
    }, "Snap"), /*#__PURE__*/React.createElement("select", {
      style: {
        background: "var(--color-void)",
        border: "0.5px solid var(--line-soft)",
        color: "var(--fg1)",
        fontSize: 11,
        height: 22,
        padding: "0 6px"
      }
    }, /*#__PURE__*/React.createElement("option", null, "Smart")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)"
      }
    }, "|"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-orange)",
        fontSize: 11,
        cursor: "pointer"
      }
    }, "View"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)",
        fontSize: 11,
        cursor: "pointer"
      }
    }, "Edit"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      flexShrink: 0,
      borderRight: "1px solid var(--line-faint)",
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg2)"
    }
  }, /*#__PURE__*/React.createElement(NoteField, {
    icon: "C",
    label: "Key",
    value: "F#3"
  }), /*#__PURE__*/React.createElement(NoteField, {
    icon: "L",
    label: "Length",
    value: "000.0.1.000"
  }), /*#__PURE__*/React.createElement(NoteField, {
    icon: "V",
    label: "Velocity",
    value: "79 %"
  }), /*#__PURE__*/React.createElement(NoteField, {
    icon: "P",
    label: "Cents",
    value: "0 cents"
  }), /*#__PURE__*/React.createElement(NoteField, {
    icon: "C",
    label: "Chance",
    value: "100 %"
  }), /*#__PURE__*/React.createElement(NoteField, {
    icon: "#",
    label: "Repeat",
    value: "1"
  }), /*#__PURE__*/React.createElement(NoteField, {
    icon: "\u223C",
    label: "Curve",
    value: "0 %"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(PianoKeys, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      overflow: "auto",
      background: "var(--color-void)"
    }
  }, /*#__PURE__*/React.createElement(PianoGrid, null)))), /*#__PURE__*/React.createElement(VelocityStrip, null));
}
function NoteField({
  icon,
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 2,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      color: "var(--color-orange)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      width: 50
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 2,
      padding: "3px 8px",
      color: "var(--fg1)",
      fontSize: 11
    }
  }, value));
}
function PianoKeys() {
  // 24 keys, C4–C6, with C5 highlighted
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const keys = [];
  for (let oct = 6; oct >= 4; oct--) for (let n = 11; n >= 0; n--) keys.push({
    note: NOTES[n],
    oct
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      overflow: "hidden"
    }
  }, keys.map((k, i) => {
    const isBlack = k.note.includes("#");
    const isC = k.note === "C";
    const isC5 = isC && k.oct === 5;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        height: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 4,
        background: isC5 ? "var(--color-orange)" : isBlack ? "var(--color-shadow)" : "var(--bg-panel)",
        color: isC5 ? "rgba(0,0,0,0.85)" : isC ? "var(--fg2)" : "transparent",
        fontFamily: "var(--font-mono)",
        fontSize: 8,
        borderBottom: "0.5px solid var(--line-faint)"
      }
    }, isC ? `C${k.oct}` : "");
  }));
}
function PianoGrid() {
  const COLS = 32; // 16th-note cells across ~4 bars
  const ROWS = 36; // 3 octaves visible
  // notes scattered in a melodic pattern
  const notes = [{
    c: 2,
    r: 18,
    len: 2,
    v: 0.7
  }, {
    c: 5,
    r: 16,
    len: 2,
    v: 0.85
  }, {
    c: 8,
    r: 14,
    len: 2,
    v: 0.6
  }, {
    c: 11,
    r: 16,
    len: 2,
    v: 0.78
  }, {
    c: 14,
    r: 18,
    len: 2,
    v: 0.7
  }, {
    c: 17,
    r: 20,
    len: 2,
    v: 0.65
  }, {
    c: 20,
    r: 18,
    len: 2,
    v: 0.7
  }, {
    c: 23,
    r: 14,
    len: 4,
    v: 0.9
  }];
  const cellW = 24,
    cellH = 12;
  const W = COLS * cellW,
    H = ROWS * cellH;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: W,
      height: H,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: W,
    height: H,
    style: {
      position: "absolute",
      inset: 0
    }
  }, Array.from({
    length: ROWS
  }).map((_, r) => {
    const noteIdx = (12 - r % 12 - 1 + 12) % 12;
    const isBlack = [1, 3, 6, 8, 10].includes(noteIdx);
    return /*#__PURE__*/React.createElement("rect", {
      key: r,
      x: 0,
      y: r * cellH,
      width: W,
      height: cellH,
      fill: isBlack ? "rgba(255,255,255,0.018)" : "transparent"
    });
  }), Array.from({
    length: COLS + 1
  }).map((_, c) => /*#__PURE__*/React.createElement("line", {
    key: c,
    x1: c * cellW,
    y1: 0,
    x2: c * cellW,
    y2: H,
    stroke: c % 4 === 0 ? "var(--line-soft)" : "var(--line-faint)",
    strokeWidth: 1
  })), Array.from({
    length: 5
  }).map((_, b) => /*#__PURE__*/React.createElement("text", {
    key: b,
    x: b * cellW * 8 + 5,
    y: 10,
    fill: "var(--fg2)",
    fontSize: 9,
    fontFamily: "var(--font-mono)"
  }, b + 1, b > 0 && `\u00B7${b % 4 + 1}`)), notes.map((n, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: n.c * cellW + 1,
    y: n.r * cellH + 1,
    width: n.len * cellW - 2,
    height: cellH - 2,
    fill: "var(--color-orange)",
    rx: 1,
    opacity: 0.55 + n.v * 0.4,
    style: {
      filter: "drop-shadow(0 0 3px var(--color-orange))"
    }
  })), /*#__PURE__*/React.createElement("line", {
    x1: 6 * cellW,
    y1: 0,
    x2: 6 * cellW,
    y2: H,
    stroke: "var(--color-orange)",
    strokeWidth: 1,
    opacity: 0.7
  })));
}
function VelocityStrip() {
  const vels = [0.7, 0.85, 0.6, 0.78, 0.7, 0.65, 0.7, 0.9];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 70,
      borderTop: "1px solid var(--line-faint)",
      display: "flex",
      background: "var(--bg-panel)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      flexShrink: 0,
      padding: "8px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRight: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("select", {
    style: {
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg1)",
      fontSize: 11,
      height: 22,
      padding: "0 6px",
      width: 100
    }
  }, /*#__PURE__*/React.createElement("option", null, "Velocity"), /*#__PURE__*/React.createElement("option", null, "Pitch"), /*#__PURE__*/React.createElement("option", null, "Mod")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--fg3)",
      fontSize: 9,
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "0%"), /*#__PURE__*/React.createElement("span", null, "100%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      padding: "8px 12px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "54",
    preserveAspectRatio: "none",
    viewBox: `0 0 ${vels.length * 60} 54`,
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: 0,
    y1: 54,
    x2: vels.length * 60,
    y2: 54,
    stroke: "var(--line-faint)",
    strokeWidth: 0.5
  }), vels.map((v, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("line", {
    x1: i * 60 + 30,
    y1: 54,
    x2: i * 60 + 30,
    y2: 54 - v * 48,
    stroke: "var(--color-orange)",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("circle", {
    cx: i * 60 + 30,
    cy: 54 - v * 48,
    r: 3,
    fill: "var(--color-orange)"
  }))))));
}

// =====================================================================
// Devices panel — Tape device with reels
// =====================================================================
function DevicePanel() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-panel)",
      borderTop: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    icon: "device",
    title: "Devices",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)",
        fontSize: 11,
        fontFamily: "var(--font-body)"
      }
    }, "Drag an effect from the ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-orange)",
        padding: "1px 6px",
        border: "0.5px solid var(--color-orange)",
        borderRadius: 2,
        marginLeft: 2
      }
    }, "Device Browser"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
      padding: 12,
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DeviceCard, {
    active: true,
    title: "Tape",
    color: "var(--color-cyan)"
  }, /*#__PURE__*/React.createElement(TapeReels, null)), /*#__PURE__*/React.createElement(DeviceCard, {
    title: "Compressor",
    color: "var(--color-yellow)",
    placeholder: true
  }), /*#__PURE__*/React.createElement(DeviceCard, {
    title: "Reverb",
    color: "var(--color-purple)",
    placeholder: true
  }), /*#__PURE__*/React.createElement("button", {
    title: "Add device",
    style: {
      width: 40,
      alignSelf: "stretch",
      background: "transparent",
      border: "0.5px dashed var(--line-soft)",
      borderRadius: 4,
      color: "var(--fg3)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "add",
    size: "14px"
  }))));
}
function DeviceCard({
  title,
  color,
  active,
  placeholder,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      flexShrink: 0,
      background: "var(--color-void)",
      border: `0.5px solid ${active ? color : "var(--line-soft)"}`,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: active ? `0 0 14px -8px ${color}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px",
      borderBottom: `0.5px solid ${active ? color : "var(--line-faint)"}`,
      background: `color-mix(in srgb, ${color} 8%, transparent)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 3,
      background: `color-mix(in srgb, ${color} 18%, var(--color-void))`,
      color,
      border: `0.5px solid ${color}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "device",
    size: "11px"
  })), /*#__PURE__*/React.createElement("button", {
    title: "Power",
    style: {
      background: "transparent",
      border: 0,
      color: active ? color : "var(--fg3)",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 3h2v9h-2zM6 6.6L4.6 8a8 8 0 1 0 14.8 0L18 6.6a6 6 0 1 1-12 0z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: "var(--fg1)",
      fontSize: 12
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: "more",
    size: "14px"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: placeholder ? "var(--fg3)" : "inherit",
      fontSize: 11
    }
  }, placeholder ? "—" : children));
}
function TapeReels() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 220 130",
    width: "100%",
    height: "100%",
    style: {
      color: "var(--color-cyan)"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "reel",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "color-mix(in srgb, currentColor 40%, var(--color-void))"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--color-void)"
  }))), [55, 165].map((cx, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: 55,
    r: 42,
    fill: "url(#reel)",
    stroke: "currentColor",
    strokeOpacity: 0.5,
    strokeWidth: 1
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: 55,
    r: 11,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: 55,
    r: 4,
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx - 3,
    cy: 55 - 2,
    r: 2.5,
    fill: "var(--color-void)",
    stroke: "currentColor",
    strokeWidth: 0.6
  }), [0, 60, 120, 180, 240, 300].map(a => /*#__PURE__*/React.createElement("line", {
    key: a,
    x1: cx,
    y1: 55,
    x2: cx + 38 * Math.cos((a + i * 12) * Math.PI / 180),
    y2: 55 + 38 * Math.sin((a + i * 12) * Math.PI / 180),
    stroke: "currentColor",
    strokeOpacity: 0.25,
    strokeWidth: 0.5
  })))), /*#__PURE__*/React.createElement("path", {
    d: "M55 97 Q 110 130 165 97",
    stroke: "currentColor",
    strokeWidth: 1,
    fill: "none",
    opacity: 0.5
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 100 L 207 100",
    stroke: "currentColor",
    strokeWidth: 0.5,
    fill: "none",
    opacity: 0.3
  }), /*#__PURE__*/React.createElement("line", {
    x1: 97,
    y1: 100,
    x2: 123,
    y2: 100,
    stroke: "currentColor",
    strokeWidth: 3
  }));
}

// =====================================================================
// Mixer (right edge, vertical strip)
// =====================================================================
function Mixer() {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 100,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderLeft: "1px solid var(--line-soft)",
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    icon: "mixer",
    title: "Mixer"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      padding: 10,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      color: "var(--fg3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "0.00"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)",
      fontSize: 9
    }
  }, "\u22122.6"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 280,
      width: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      background: "var(--color-void)",
      borderRadius: 2,
      border: "0.5px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 40,
    height: 280,
    style: {
      position: "absolute",
      inset: 0
    }
  }, [0, -6, -12, -18, -24, -30, -36, -42, -48, -54].map((db, i) => {
    const y = 18 + i * 26;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: 6,
      y1: y,
      x2: 10,
      y2: y,
      stroke: "var(--line-soft)",
      strokeWidth: 0.5
    }), /*#__PURE__*/React.createElement("text", {
      x: 34,
      y: y + 3,
      fill: "var(--fg3)",
      fontSize: 7,
      textAnchor: "end",
      fontFamily: "var(--font-mono)"
    }, db));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 1,
      marginTop: 4,
      marginBottom: 4
    }
  }, [0.62, 0.55].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 7,
      height: "100%",
      background: "rgba(255,255,255,0.04)",
      display: "flex",
      flexDirection: "column-reverse"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${v * 100}%`,
      background: "linear-gradient(0deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: 38,
      width: 28,
      height: 6,
      background: "var(--color-orange)",
      borderRadius: 1,
      boxShadow: "0 0 6px -1px var(--color-orange)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "var(--fg3)"
    }
  }, "db"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    label: "M",
    color: "var(--color-red)"
  }), /*#__PURE__*/React.createElement(Pill, {
    label: "S",
    color: "var(--color-yellow)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 10,
      fontFamily: "var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Master"))));
}

// =====================================================================
// Footer status bar
// =====================================================================
function StudioFooter() {
  const Item = ({
    label,
    value,
    accent
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "0 12px",
      height: "100%",
      borderRight: "1px solid var(--line-faint)",
      color: "var(--fg2)",
      fontFamily: "var(--font-mono)",
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg3)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent || "var(--fg1)"
    }
  }, value));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      height: 26,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderTop: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement(Item, {
    label: "Online",
    value: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-green)"
      }
    }, "\u25CF Yes")
  }), /*#__PURE__*/React.createElement(Item, {
    label: "Project",
    value: PROJECT.title
  }), /*#__PURE__*/React.createElement(Item, {
    label: "Sample rate",
    value: "48 000 Hz"
  }), /*#__PURE__*/React.createElement(Item, {
    label: "Latency",
    value: "192.0 ms",
    accent: "var(--color-yellow)"
  }), /*#__PURE__*/React.createElement(Item, {
    label: "Users",
    value: `${PROJECT.collabs} live`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: "0 12px",
      color: "var(--fg3)",
      fontSize: 10,
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg3)"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--fg3)"
    }
  }, "Imprint")));
}

// =====================================================================
// Helpers
// =====================================================================
function PanelHeader({
  icon,
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 30,
      padding: "0 12px",
      background: "var(--bg-panel)",
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: "var(--fg2)",
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement(StudioIcon, {
    name: icon,
    size: "12px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400
    }
  }, title)), right);
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "studio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Arrangement.jsx
try { (() => {
/* global React, Icon */
const {
  useState
} = React;

// Track data — bars 1..16, each region: { start, len, label, color, type: "audio" | "midi" }
const TRACKS = [{
  name: "Drums",
  instr: "Playfield",
  color: "var(--color-blue)",
  muted: false,
  regions: [{
    s: 0,
    l: 4,
    label: "Drums A",
    type: "midi"
  }, {
    s: 4,
    l: 4,
    label: "Drums A",
    type: "midi"
  }, {
    s: 8,
    l: 8,
    label: "Drums B",
    type: "midi"
  }]
}, {
  name: "Bass",
  instr: "Vaporisateur",
  color: "var(--color-purple)",
  muted: false,
  regions: [{
    s: 2,
    l: 6,
    label: "Bass Lo",
    type: "midi"
  }, {
    s: 10,
    l: 6,
    label: "Bass Hi",
    type: "midi"
  }]
}, {
  name: "Lead",
  instr: "Vaporisateur",
  color: "var(--color-yellow)",
  muted: false,
  regions: [{
    s: 4,
    l: 4,
    label: "Lead",
    type: "midi"
  }, {
    s: 12,
    l: 4,
    label: "Lead",
    type: "midi"
  }]
}, {
  name: "Pad",
  instr: "Modular",
  color: "var(--color-cyan)",
  muted: true,
  regions: [{
    s: 0,
    l: 16,
    label: "Pad sustained",
    type: "midi"
  }]
}, {
  name: "Vocal",
  instr: "Audio",
  color: "var(--color-orange)",
  muted: false,
  regions: [{
    s: 6,
    l: 5,
    label: "vox-take-03.wav",
    type: "audio"
  }]
}, {
  name: "Texture",
  instr: "Tape",
  color: "var(--color-red)",
  muted: false,
  regions: [{
    s: 8,
    l: 8,
    label: "tape-loop.wav",
    type: "audio"
  }]
}];
const BARS = 16;
window.Arrangement = function Arrangement() {
  const [zoom] = useState(34); // px per bar
  const totalWidth = BARS * zoom;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "var(--color-void)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      borderBottom: "1px solid var(--line-faint)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      fontSize: 10,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: 0.06,
      height: 24
    }
  }, "Tracks"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      height: 24,
      overflow: "hidden",
      background: "var(--bg-panel)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: totalWidth,
    height: 24,
    style: {
      display: "block"
    }
  }, Array.from({
    length: BARS + 1
  }).map((_, i) => {
    const x = i * zoom;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: i % 4 === 0 ? 4 : 14,
      x2: x,
      y2: 24,
      stroke: i % 4 === 0 ? "var(--fg2)" : "var(--line-soft)",
      strokeWidth: 1
    }), i % 4 === 0 && i < BARS && /*#__PURE__*/React.createElement("text", {
      x: x + 3,
      y: 11,
      fill: "var(--fg2)",
      fontSize: 9,
      fontFamily: "var(--font-mono)"
    }, i + 1));
  }), /*#__PURE__*/React.createElement("line", {
    x1: 2.5 * zoom,
    y1: 0,
    x2: 2.5 * zoom,
    y2: 24,
    stroke: "var(--color-orange)",
    strokeWidth: 1
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${2.5 * zoom - 4},0 ${2.5 * zoom + 4},0 ${2.5 * zoom},6`,
    fill: "var(--color-orange)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto"
    }
  }, TRACKS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      height: 44,
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      flexShrink: 0,
      background: "var(--bg-panel)",
      borderRight: "1px solid var(--line-faint)",
      padding: "4px 8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 2,
      opacity: t.muted ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 1,
      background: t.color,
      boxShadow: `0 0 4px -1px ${t.color}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--fg1)",
      flex: 1
    }
  }, t.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: t.muted ? "var(--color-red)" : "var(--fg3)",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      padding: "1px 4px",
      border: `0.5px solid ${t.muted ? "var(--color-red)" : "var(--color-dark)"}`,
      borderRadius: 2
    }
  }, "M"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      padding: "1px 4px",
      border: "0.5px solid var(--color-dark)",
      borderRadius: 2
    }
  }, "S"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "var(--color-red)",
      padding: "1px 4px",
      border: "0.5px solid var(--color-red)",
      borderRadius: 2,
      opacity: 0.4
    }
  }, "R")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)",
      letterSpacing: 0.04
    }
  }, t.instr)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      background: i % 2 ? "var(--color-void)" : "rgba(255,255,255,0.008)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: totalWidth,
    height: 44,
    style: {
      position: "absolute",
      inset: 0
    }
  }, Array.from({
    length: BARS + 1
  }).map((_, b) => /*#__PURE__*/React.createElement("line", {
    key: b,
    x1: b * zoom,
    y1: 0,
    x2: b * zoom,
    y2: 44,
    stroke: b % 4 === 0 ? "var(--line-soft)" : "var(--line-faint)",
    strokeWidth: 1
  }))), t.regions.map((r, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      position: "absolute",
      left: r.s * zoom + 1,
      top: 4,
      width: r.l * zoom - 2,
      height: 36,
      background: r.type === "audio" ? `color-mix(in srgb, ${t.color} 14%, var(--color-void))` : `color-mix(in srgb, ${t.color} 22%, var(--color-void))`,
      border: `0.5px solid ${t.color}`,
      borderRadius: 2,
      padding: "2px 5px",
      fontSize: 9,
      color: t.color,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: r.type === "audio" ? "var(--font-mono)" : "var(--font-display)",
      opacity: t.muted ? 0.4 : 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  }, r.label), r.type === "audio" ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 12",
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: 12
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 6 L4 4 L8 7 L12 3 L16 9 L20 5 L24 8 L28 2 L32 7 L36 4 L40 6 L44 9 L48 3 L52 7 L56 5 L60 8 L64 4 L68 6 L72 7 L76 5 L80 8 L84 4 L88 6 L92 7 L96 4 L100 6",
    stroke: "currentColor",
    strokeWidth: "0.6",
    fill: "none"
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      height: 12
    }
  }, [0.4, 0.7, 0.55, 0.6].map((v, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 1.5,
      background: "currentColor",
      width: `${v * 100}%`,
      opacity: 0.7,
      borderRadius: 0.5
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 2.5 * zoom,
      width: 1,
      background: "var(--color-orange)",
      pointerEvents: "none"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 12px",
      color: "var(--fg3)",
      fontSize: 11,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "add",
    size: "12px"
  }), " Add Track")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Arrangement.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Browser.jsx
try { (() => {
/* global React, Icon */
const {
  useState
} = React;
const DEVICES = [{
  name: "Vaporisateur",
  type: "Instrument",
  color: "var(--color-purple)"
}, {
  name: "Tape",
  type: "Instrument",
  color: "var(--color-orange)"
}, {
  name: "Playfield",
  type: "Instrument",
  color: "var(--color-blue)"
}, {
  name: "Compressor",
  type: "Effect",
  color: "var(--color-yellow)"
}, {
  name: "Maximizer",
  type: "Effect",
  color: "var(--color-red)"
}, {
  name: "Revamp EQ",
  type: "Effect",
  color: "var(--color-green)"
}, {
  name: "Gate",
  type: "Effect",
  color: "var(--color-cyan)"
}, {
  name: "Modular",
  type: "Instrument",
  color: "var(--color-purple)"
}];
const SAMPLES = ["Kick_808_01.wav", "Snare_Vinyl.wav", "Hat_Open.wav", "Perc_Loop_120.wav", "Bass_Sub_F.wav", "Pad_Ambient.wav", "Vocal_Chop.wav", "Texture_Tape.wav"];
const TABS = [{
  key: "devices",
  label: "Devices",
  icon: "device"
}, {
  key: "samples",
  label: "Samples",
  icon: "sample"
}, {
  key: "files",
  label: "Files",
  icon: "folder"
}];
window.Browser = function Browser() {
  const [tab, setTab] = useState("devices");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220,
      flexShrink: 0,
      background: "var(--color-black)",
      borderRight: "1px solid var(--line-faint)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid var(--line-faint)"
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    onClick: () => setTab(t.key),
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      color: tab === t.key ? "var(--color-orange)" : "var(--fg3)",
      padding: "8px 0",
      cursor: "pointer",
      fontSize: 10,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: 0.06,
      borderBottom: tab === t.key ? "1px solid var(--color-orange)" : "1px solid transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: "11px"
  }), t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8,
      borderBottom: "1px solid var(--line-faint)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: `Filter ${tab}…`,
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      color: "var(--fg1)",
      padding: "4px 8px",
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 11,
      borderRadius: 3,
      outline: "none",
      height: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "4px 0"
    }
  }, tab === "devices" && DEVICES.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    draggable: true,
    style: {
      padding: "5px 10px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "grab",
      fontSize: 11,
      color: "var(--fg1)"
    },
    onMouseDown: e => e.currentTarget.style.background = "var(--color-active)",
    onMouseUp: e => e.currentTarget.style.background = "transparent",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      fontFamily: "var(--font-mono)"
    }
  }, d.type === "Instrument" ? "INS" : "FX"))), tab === "samples" && SAMPLES.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "5px 10px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "grab",
      fontSize: 11,
      color: "var(--fg1)",
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sample",
    size: "11px",
    style: {
      color: "var(--color-cyan)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, s))), tab === "files" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      fontSize: 11,
      color: "var(--fg3)",
      textAlign: "center",
      lineHeight: 1.5
    }
  }, "Drop a folder of audio", /*#__PURE__*/React.createElement("br", null), "files here.")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Browser.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Dashboard.jsx
try { (() => {
/* global React, Icon */

const DEMO = [{
  title: "Liquid Drum",
  artist: "andre michelle",
  g: "linear-gradient(135deg, hsl(280,40%,18%), hsl(210,50%,14%))"
}, {
  title: "Tape Saturator",
  artist: "andre michelle",
  g: "linear-gradient(135deg, hsl(25,45%,18%), hsl(8,40%,14%))"
}, {
  title: "First Steps",
  artist: "tutorial",
  g: "linear-gradient(135deg, hsl(140,30%,16%), hsl(197,30%,10%))"
}, {
  title: "Ambient Pads",
  artist: "andre michelle",
  g: "linear-gradient(135deg, hsl(190,40%,16%), hsl(280,30%,12%))"
}, {
  title: "Granular Test",
  artist: "demo",
  g: "linear-gradient(135deg, hsl(45,40%,18%), hsl(25,30%,12%))"
}, {
  title: "808 Workshop",
  artist: "tutorial",
  g: "linear-gradient(135deg, hsl(8,45%,18%), hsl(280,30%,12%))"
}];
const RES = [{
  label: "Manuals",
  href: "#",
  icon: "help",
  color: "var(--color-green)"
}, {
  label: "Education",
  href: "#",
  icon: "help",
  color: "var(--color-orange)"
}, {
  label: "Discord",
  href: "#",
  icon: "help",
  color: "var(--color-blue)"
}, {
  label: "GitHub",
  href: "#",
  icon: "help",
  color: "var(--fg1)"
}, {
  label: "Newsletter",
  href: "#",
  icon: "help",
  color: "var(--color-purple)"
}, {
  label: "Music Portal",
  href: "#",
  icon: "help",
  color: "var(--color-cyan)"
}];
window.Dashboard = function Dashboard({
  onOpenProject
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      background: "var(--bg-panel-2)",
      display: "flex",
      justifyContent: "center",
      padding: "32px 24px"
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      width: "min(900px, 100%)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 36,
      color: "white",
      margin: "0 0 0.05em -3px",
      letterSpacing: -0.01
    }
  }, "Welcome to openDAW"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 18,
      color: "var(--color-blue)",
      margin: 0
    }
  }, "A new holistic exploration of music creation inside your browser"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--fg2)",
      lineHeight: 1.55,
      margin: "0.6em 0 0"
    }
  }, "openDAW is an open source web based music studio with a clear focus on", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--color-blue)"
    }
  }, "education"), " and", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--color-blue)"
    }
  }, "data privacy"), ", open to everyone with no login required so you can start creating", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--color-blue)"
    }
  }, "music"), " right away. The studio is still evolving and not production ready yet."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 240px",
      gap: 36,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 14,
      color: "var(--color-orange)",
      margin: 0,
      marginBottom: 12
    }
  }, "Demo Projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: 10
    }
  }, DEMO.map((d, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onOpenProject(d.title),
    style: {
      background: "var(--bg-card)",
      border: 0,
      borderRadius: 4,
      padding: 0,
      cursor: "pointer",
      textAlign: "left",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "1 / 1",
      background: d.g,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 6,
      bottom: 6,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--fg1)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: "9px"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--fg1)"
    }
  }, d.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--fg3)"
    }
  }, d.artist)))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 14,
      color: "var(--color-orange)",
      margin: 0,
      marginBottom: 12
    }
  }, "Resources"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, RES.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: r.href,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      color: r.color,
      fontSize: 12,
      padding: "4px 0",
      fontFamily: "var(--font-display)",
      fontWeight: 300
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }), r.label)))))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "3em",
      fontSize: 11,
      textAlign: "center",
      color: "var(--fg3)",
      fontFamily: "var(--font-body)"
    }
  }, "Visit ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--color-blue)"
    }
  }, "Discord"), " and", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--color-blue)"
    }
  }, "GitHub"), " for more information.", " ", "Subscribe to our ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--color-blue)"
    }
  }, "Newsletter"), ".", " ", "Built with \u2764\uFE0F")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Footer.jsx
try { (() => {
/* global React */

window.Footer = function Footer({
  project
}) {
  const Item = ({
    children,
    accent
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "0 8px",
      height: "100%",
      borderRight: "1px solid var(--line-faint)",
      color: accent || "var(--fg2)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      letterSpacing: 0.02
    }
  }, children);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      height: "1.25rem",
      minHeight: 22,
      background: "var(--bg-panel)",
      borderTop: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "stretch",
      fontSize: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Item, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-green)"
    }
  }, "\u25CF"), " ", project || "Untitled Project"), /*#__PURE__*/React.createElement(Item, null, "48000 Hz"), /*#__PURE__*/React.createElement(Item, null, "buffer 256"), /*#__PURE__*/React.createElement(Item, {
    accent: "var(--color-yellow)"
  }, "latency 5.3 ms"), /*#__PURE__*/React.createElement(Item, null, "storage 41%"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Item, null, "v2026.04 \xB7 build a3f"), /*#__PURE__*/React.createElement(Item, {
    accent: "var(--color-blue)"
  }, "opendaw.studio"));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Header.jsx
try { (() => {
/* global React, Icon, Hr, FramedButton, IconButton, PeakMeter, UnitDisplay */
const {
  useState
} = React;
window.Header = function Header({
  screen,
  onScreenChange,
  onBrandClick,
  transport,
  onTransportChange
}) {
  const [metro, setMetro] = useState(false);
  const [midi, setMidi] = useState(true);
  const screens = [{
    key: "dashboard",
    icon: "brand",
    title: "Dashboard"
  }, {
    key: "default",
    icon: "arrange",
    title: "Arrangement"
  }, {
    key: "mixer",
    icon: "mixer",
    title: "Mixer"
  }, {
    key: "piano",
    icon: "piano",
    title: "Piano Roll"
  }, {
    key: "shadertoy",
    icon: "shadertoy",
    title: "Shadertoy"
  }, {
    key: "meter",
    icon: "meter",
    title: "Meter"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: "2.5em",
      minHeight: 36,
      background: "var(--bg-panel)",
      borderBottom: "1px solid var(--line-faint)",
      display: "flex",
      alignItems: "center",
      padding: "0 6px",
      gap: 0,
      fontSize: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBrandClick,
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "0 8px",
      height: "100%",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("h5", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 12,
      color: "var(--fg1)",
      margin: 0,
      letterSpacing: -0.01
    }
  }, "openDAW"), /*#__PURE__*/React.createElement(Icon, {
    name: "triangle",
    size: "10px"
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(IconButton, {
    icon: "undo",
    title: "Undo (\u2318Z)"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "redo",
    title: "Redo (\u2318\u21E7Z)"
  }), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(IconButton, {
    icon: "midi",
    active: midi,
    color: "var(--color-orange)",
    title: "Midi Access",
    onClick: () => setMidi(!midi)
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "help",
    color: "var(--color-green)",
    title: "Manuals"
  }), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "play",
    active: transport === "play",
    color: "var(--color-green)",
    title: "Play (Space)",
    onClick: () => onTransportChange("play"),
    size: "14px"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "stop",
    active: transport === "stop",
    color: "var(--fg1)",
    title: "Stop",
    onClick: () => onTransportChange("stop"),
    size: "14px"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "record",
    active: transport === "record",
    color: "var(--color-red)",
    title: "Record",
    onClick: () => onTransportChange("record"),
    size: "14px"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "loop",
    title: "Loop",
    size: "14px"
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(UnitDisplay, {
    value: "120",
    unit: "bpm"
  }), /*#__PURE__*/React.createElement(UnitDisplay, {
    value: "4/4",
    unit: "sig"
  }), /*#__PURE__*/React.createElement(UnitDisplay, {
    value: "01.01.000",
    unit: "bars",
    accent: "var(--color-blue)",
    large: true
  }), /*#__PURE__*/React.createElement(UnitDisplay, {
    value: "00:00:00",
    unit: "time"
  }), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement(IconButton, {
    icon: "metronome",
    active: metro,
    color: "var(--color-orange)",
    title: "Metronome",
    onClick: () => setMetro(!metro)
  }), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 6px"
    }
  }, /*#__PURE__*/React.createElement(PeakMeter, {
    l: 0.62,
    r: 0.55,
    width: 64
  })), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: "0.5px solid var(--color-dark)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, screens.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    title: s.title,
    onClick: () => onScreenChange(s.key),
    style: {
      background: screen === s.key ? "color-mix(in srgb, var(--color-blue) 14%, transparent)" : "transparent",
      border: 0,
      borderRight: "0.5px solid var(--color-dark)",
      color: screen === s.key ? "var(--color-blue)" : "var(--fg2)",
      padding: "4px 8px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: "13px"
  })))), /*#__PURE__*/React.createElement(Hr, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.1,
      color: "var(--fg3)",
      fontSize: 9,
      fontFamily: "var(--font-mono)",
      padding: "0 6px"
    }
  }, /*#__PURE__*/React.createElement("div", null, "CPU 14%"), /*#__PURE__*/React.createElement("div", null, "MEM 312MB")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Mixer.jsx
try { (() => {
/* global React, Knob, Fader, VertPeakMeter, FramedButton */

const CHANNELS = [{
  name: "Drums",
  color: "var(--color-blue)",
  level: 0.72,
  peak: [0.7, 0.65],
  mute: false,
  solo: false,
  pan: 0.5
}, {
  name: "Bass",
  color: "var(--color-purple)",
  level: 0.78,
  peak: [0.62, 0.6],
  mute: false,
  solo: false,
  pan: 0.5
}, {
  name: "Lead",
  color: "var(--color-yellow)",
  level: 0.55,
  peak: [0.4, 0.45],
  mute: false,
  solo: false,
  pan: 0.62
}, {
  name: "Pad",
  color: "var(--color-cyan)",
  level: 0.5,
  peak: [0, 0],
  mute: true,
  solo: false,
  pan: 0.5
}, {
  name: "Vocal",
  color: "var(--color-orange)",
  level: 0.68,
  peak: [0.55, 0.5],
  mute: false,
  solo: true,
  pan: 0.4
}, {
  name: "Texture",
  color: "var(--color-red)",
  level: 0.42,
  peak: [0.3, 0.32],
  mute: false,
  solo: false,
  pan: 0.55
}, {
  name: "Reverb",
  color: "var(--color-green)",
  level: 0.6,
  peak: [0.5, 0.5],
  mute: false,
  solo: false,
  pan: 0.5,
  isAux: true
}, {
  name: "Master",
  color: "var(--fg1)",
  level: 0.85,
  peak: [0.66, 0.6],
  mute: false,
  solo: false,
  pan: 0.5,
  isMaster: true
}];
const Strip = ({
  ch
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: 56,
    flexShrink: 0,
    background: ch.isMaster ? "var(--bg-card)" : "var(--bg-panel)",
    borderRight: "1px solid var(--line-faint)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 0",
    gap: 6,
    position: "relative"
  }
}, ch.isAux && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 8,
    color: "var(--color-orange)",
    textTransform: "uppercase",
    letterSpacing: 0.06
  }
}, "AUX"), ch.isMaster && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 8,
    color: "var(--fg1)",
    textTransform: "uppercase",
    letterSpacing: 0.08,
    fontWeight: 400
  }
}, "MASTER"), /*#__PURE__*/React.createElement(Knob, {
  value: ch.pan,
  bipolar: true,
  color: "var(--color-green)",
  size: 22
}), !ch.isAux && !ch.isMaster && /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
    padding: "0 8px"
  }
}, [0.3, 0.0].map((v, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 8,
    color: "var(--fg3)",
    fontFamily: "var(--font-mono)"
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    height: 3,
    background: "var(--color-void)",
    borderRadius: 1,
    overflow: "hidden"
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: `${v * 100}%`,
    height: "100%",
    background: "var(--color-orange)"
  }
})), /*#__PURE__*/React.createElement("span", null, i === 0 ? "RV" : "DL")))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 3
  }
}, /*#__PURE__*/React.createElement("button", {
  style: {
    background: ch.mute ? "color-mix(in srgb, var(--color-red) 14%, transparent)" : "transparent",
    color: ch.mute ? "var(--color-red)" : "var(--fg3)",
    border: "0.5px solid currentColor",
    borderRadius: 2,
    padding: "1px 5px",
    fontSize: 9,
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    boxShadow: ch.mute ? "0 0 3px -1px currentColor" : "none"
  }
}, "M"), /*#__PURE__*/React.createElement("button", {
  style: {
    background: ch.solo ? "color-mix(in srgb, var(--color-yellow) 14%, transparent)" : "transparent",
    color: ch.solo ? "var(--color-yellow)" : "var(--fg3)",
    border: "0.5px solid currentColor",
    borderRadius: 2,
    padding: "1px 5px",
    fontSize: 9,
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    boxShadow: ch.solo ? "0 0 3px -1px currentColor" : "none"
  }
}, "S")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 4,
    alignItems: "center",
    height: 130
  }
}, /*#__PURE__*/React.createElement(Fader, {
  value: ch.level,
  height: 130,
  color: ch.color
}), /*#__PURE__*/React.createElement(VertPeakMeter, {
  l: ch.peak[0],
  r: ch.peak[1],
  height: 130
})), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 9,
    color: "var(--fg2)",
    fontFamily: "var(--font-mono)"
  }
}, ch.level === 0.85 ? "0.0" : (Math.log10(ch.level + 0.01) * 20 + 6).toFixed(1)), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: "70%",
    height: 3,
    background: ch.color,
    borderRadius: 1,
    marginBottom: 4
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: "var(--fg1)",
    textAlign: "center",
    padding: "0 4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%"
  }
}, ch.name)));
window.Mixer = function Mixer() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      overflowX: "auto",
      height: "100%",
      background: "var(--color-void)"
    }
  }, CHANNELS.map((c, i) => /*#__PURE__*/React.createElement(Strip, {
    key: i,
    ch: c
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Mixer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Workspace.jsx
try { (() => {
/* global React, Browser, Arrangement, Mixer */
const {
  useState
} = React;
window.Workspace = function Workspace({
  screen
}) {
  if (screen === "mixer") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Browser, null), /*#__PURE__*/React.createElement(Mixer, null));
  }
  // default = arrangement
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Browser, null), /*#__PURE__*/React.createElement(Arrangement, null));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Workspace.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/primitives.jsx
try { (() => {
/* global React */
const {
  useState,
  useRef,
  useEffect
} = React;

// ============= Icon =============
// Inline minimal openDAW icon set — currentColor, sized via font-size: 1em
const ICONS = {
  brand: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M8,3L8,21C8,22.1 7.1,23 6,23L3,23C1.9,23 1,22.1 1,21L1,3C1,1.9 1.9,1 3,1L6,1C7.1,1 8,1.9 8,3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23,3L23,11C23,12.1 22.1,13 21,13L12,13C10.9,13 10,12.1 10,11L10,3C10,1.9 10.9,1 12,1L21,1C22.1,1 23,1.9 23,3ZM22,3C22,2.4 21.5,2 21,2L12,2C11.4,2 11,2.4 11,3L11,11C11,11.5 11.4,12 12,12L21,12C21.5,12 22,11.5 22,11L22,3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23,17L23,21C23,22.1 22.1,23 21,23L12,23C10.9,23 10,22.1 10,21L10,17C10,15.9 10.9,15 12,15L21,15C22.1,15 23,15.9 23,17Z"
  })),
  play: /*#__PURE__*/React.createElement("path", {
    d: "M5 3.5l11 6.5-11 6.5z"
  }),
  stop: /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "1.5"
  }),
  record: /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  }),
  loop: /*#__PURE__*/React.createElement("path", {
    d: "M5 8h10a4 4 0 0 1 4 4M19 16H9a4 4 0 0 1-4-4M16 5l3 3-3 3M8 19l-3-3 3-3",
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round"
  }),
  add: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-1 8H7v2h4v4h2v-4h4v-2h-4V7h-2z"
  }),
  menu: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "5",
    r: "1.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "19",
    r: "1.3"
  })),
  triangle: /*#__PURE__*/React.createElement("path", {
    d: "M5 9l4 4 4-4z"
  }),
  metronome: /*#__PURE__*/React.createElement("path", {
    d: "M9 3h6l3 16H6L9 3zm1 4l-2 10h8l-2-10h-4z",
    fill: "currentColor"
  }),
  midi: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "13",
    r: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "13",
    r: "1.2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "14",
    width: "6",
    height: "3",
    rx: ".5"
  })),
  help: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7c-1.7 0-3 1.2-3 2.7h2c0-.5.4-.9 1-.9s1 .4 1 .9-.5.7-1 1.1c-.7.5-1.2 1.1-1.2 2.2h2c0-.6.3-.8.9-1.3.6-.5 1.3-1 1.3-2 0-1.5-1.3-2.7-3-2.7zm-1 8h2v2h-2z"
  })),
  arrange: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "14",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "17",
    width: "10",
    height: "2"
  })),
  mixer: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "3",
    width: "2",
    height: "18"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "9",
    r: "2",
    fill: "var(--bg-app)",
    stroke: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "2",
    fill: "var(--bg-app)",
    stroke: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "7",
    r: "2",
    fill: "var(--bg-app)",
    stroke: "currentColor"
  })),
  piano: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "6",
    width: "18",
    height: "12",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "6",
    width: "2",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "6",
    width: "2",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "6",
    width: "2",
    height: "7"
  })),
  shadertoy: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 14c2 2 8 2 10 0"
  })),
  meter: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "14",
    width: "2",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "10",
    width: "2",
    height: "10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "6",
    width: "2",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "12",
    width: "2",
    height: "8"
  })),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z",
    fill: "currentColor"
  }),
  device: /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "6",
    width: "18",
    height: "12",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "12",
    r: "2",
    fill: "var(--color-void)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "11",
    width: "6",
    height: "2",
    fill: "var(--color-void)"
  })),
  sample: /*#__PURE__*/React.createElement("path", {
    d: "M3 12c2-4 4 4 6 0s4 4 6 0 4 4 6 0",
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round"
  }),
  undo: /*#__PURE__*/React.createElement("path", {
    d: "M9 7L4 12l5 5v-3h6a4 4 0 0 1 0 8h-3v2h3a6 6 0 0 0 0-12H9V7z",
    fill: "currentColor"
  }),
  redo: /*#__PURE__*/React.createElement("path", {
    d: "M15 7l5 5-5 5v-3H9a4 4 0 0 0 0 8h3v2H9a6 6 0 0 1 0-12h6V7z",
    fill: "currentColor"
  })
};
window.Icon = function Icon({
  name,
  size = "1em",
  color,
  style
}) {
  const path = ICONS[name];
  if (!path) return null;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    style: {
      color,
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
      ...style
    }
  }, path);
};

// ============= Hr divider =============
window.Hr = function Hr() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: "stretch",
      background: "var(--line-faint)",
      margin: "0 6px"
    }
  });
};

// ============= FramedButton =============
window.FramedButton = function FramedButton({
  children,
  active,
  color,
  onClick,
  title,
  style
}) {
  const [hover, setHover] = useState(false);
  const c = active ? color || "var(--color-orange)" : "var(--fg2)";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: active ? `color-mix(in srgb, ${color || "var(--color-orange)"} 6%, transparent)` : "transparent",
      color: c,
      border: "0.5px solid currentColor",
      borderRadius: 3,
      padding: "0 8px",
      height: 22,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 11,
      cursor: "pointer",
      boxShadow: active || hover ? "0 0 3px -1px currentColor" : "none",
      lineHeight: 1,
      ...style
    }
  }, children);
};

// ============= IconButton (no frame, just hover->bright) =============
window.IconButton = function IconButton({
  icon,
  active,
  color,
  onClick,
  title,
  size
}) {
  const [hover, setHover] = useState(false);
  const c = active ? color || "var(--color-orange)" : hover ? "var(--fg1)" : "var(--fg2)";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "transparent",
      border: 0,
      color: c,
      padding: 4,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size || "14px"
  }));
};

// ============= Knob =============
window.Knob = function Knob({
  value = 0.5,
  color = "var(--color-yellow)",
  size = 28,
  label,
  valueText,
  bipolar
}) {
  const cx = 50,
    cy = 50,
    r = 36;
  const startA = bipolar ? -90 : 135; // degrees
  const sweep = bipolar ? 270 : 270;
  const valA = startA + (bipolar ? (value - 0.5) * 270 : value * sweep);
  const ang = a => (a - 90) * Math.PI / 180;
  const x1 = cx + r * Math.cos(ang(startA)),
    y1 = cy + r * Math.sin(ang(startA));
  const x2 = cx + r * Math.cos(ang(valA)),
    y2 = cy + r * Math.sin(ang(valA));
  const large = Math.abs(valA - startA) > 180 ? 1 : 0;
  const dir = valA > startA ? 1 : 0;
  const pointer = ang(valA);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: "var(--color-void)",
    strokeWidth: 6
  }), /*#__PURE__*/React.createElement("path", {
    d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${dir} ${x2} ${y2}`,
    fill: "none",
    stroke: color,
    strokeWidth: 6,
    strokeLinecap: "round",
    style: {
      filter: `drop-shadow(0 0 2px ${color})`
    }
  }), /*#__PURE__*/React.createElement("line", {
    x1: cx,
    y1: cy,
    x2: cx + (r - 6) * Math.cos(pointer),
    y2: cy + (r - 6) * Math.sin(pointer),
    stroke: "var(--fg1)",
    strokeWidth: 3,
    strokeLinecap: "round"
  })), valueText && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      color: "var(--fg1)"
    }
  }, valueText), label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "var(--fg3)",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, label));
};

// ============= PeakMeter (horizontal pair) =============
window.PeakMeter = function PeakMeter({
  l = 0.6,
  r = 0.5,
  width = 60
}) {
  const grad = "linear-gradient(90deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      display: "flex",
      flexDirection: "column",
      gap: 1
    }
  }, [l, r].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 4,
      background: "var(--color-void)",
      borderRadius: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${v * 100}%`,
      height: "100%",
      background: grad
    }
  }))));
};

// ============= VerticalPeakMeter =============
window.VertPeakMeter = function VertPeakMeter({
  l = 0.6,
  r = 0.5,
  height = 100
}) {
  const grad = "linear-gradient(0deg, var(--color-green) 0%, var(--color-green) 65%, var(--color-yellow) 65%, var(--color-yellow) 88%, var(--color-red) 88%, var(--color-red) 100%)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      display: "flex",
      gap: 1
    }
  }, [l, r].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 4,
      background: "var(--color-void)",
      borderRadius: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column-reverse"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${v * 100}%`,
      width: "100%",
      background: grad
    }
  }))));
};

// ============= Fader =============
window.Fader = function Fader({
  value = 0.7,
  height = 110,
  color = "var(--color-yellow)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height,
      position: "relative",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      height: "100%",
      background: "var(--color-void)",
      borderRadius: 1,
      backgroundImage: "repeating-linear-gradient(0deg, transparent 0 6px, var(--line-soft) 6px 7px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, 50%)",
      bottom: `${value * 100}%`,
      width: 14,
      height: 6,
      background: color,
      borderRadius: 1,
      boxShadow: `0 0 4px -1px ${color}, inset 0 1px 0 rgba(255,255,255,0.2)`
    }
  }));
};

// ============= UnitDisplay (e.g. BPM, signature, time) =============
window.UnitDisplay = function UnitDisplay({
  value,
  unit,
  accent,
  large
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: "0 6px",
      fontFamily: "var(--font-display)",
      borderRadius: 2,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: large ? 18 : 14,
      fontWeight: 400,
      color: accent || "var(--fg1)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "var(--fg3)",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginTop: 1
    }
  }, unit));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/primitives.jsx", error: String((e && e.message) || e) }); }

// users.jsx
try { (() => {
/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed */
const {
  useState: useStateUsers,
  useMemo: useMemoUsers
} = React;

// Platform users — alias + handle only (public directory)
const USERS = [{
  alias: "lex moreau",
  handle: "lex.moreau"
}, {
  alias: "maya okafor",
  handle: "maya.o"
}, {
  alias: "theo rivera",
  handle: "theo"
}, {
  alias: "anouk lemaire",
  handle: "anouk"
}, {
  alias: "idris khan",
  handle: "idris"
}, {
  alias: "rosa petrov",
  handle: "rosa"
}, {
  alias: "jun park",
  handle: "junpark"
}, {
  alias: "cleo banner",
  handle: "cleo.b"
}, {
  alias: "sam west",
  handle: "samwest"
}, {
  alias: "nadia haddad",
  handle: "nadia.h"
}, {
  alias: "bruno costa",
  handle: "brunoc"
}, {
  alias: "elin sató",
  handle: "elin"
}, {
  alias: "marco vidal",
  handle: "marco.v"
}, {
  alias: "priya nair",
  handle: "priya"
}, {
  alias: "otis bl" + "ake",
  handle: "otis"
}, {
  alias: "yuki tanaka",
  handle: "yuki.t"
}, {
  alias: "hana mbeki",
  handle: "hana"
}, {
  alias: "leo fontaine",
  handle: "leo.f"
}, {
  alias: "zara ahmed",
  handle: "zara"
}, {
  alias: "dev kapoor",
  handle: "devk"
}, {
  alias: "iris volkov",
  handle: "iris.v"
}, {
  alias: "noah brandt",
  handle: "noah"
}];
function profileHref(handle) {
  return "MakeSomeNoise Profile.html?u=" + encodeURIComponent(handle);
}
window.UsersPage = function UsersPage() {
  const [query, setQuery] = useStateUsers("");
  const filtered = useMemoUsers(() => {
    const q = query.trim().toLowerCase();
    if (!q) return USERS;
    return USERS.filter(u => u.alias.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
  }, [query]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--bg-app)",
      color: "var(--fg1)",
      fontFamily: "var(--font-display)",
      fontSize: 12,
      fontWeight: 300
    }
  }, /*#__PURE__*/React.createElement(UsersHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "28px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
      fontFamily: "var(--font-mono)"
    }
  }, "Community"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 30,
      fontWeight: 400,
      letterSpacing: -0.01
    }
  }, "Producers"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--fg2)",
      fontFamily: "var(--font-body)",
      fontSize: 13
    }
  }, USERS.length, " producers on MakeSomeNoise")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "var(--color-void)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 3,
      padding: "0 10px",
      height: 34,
      width: 300
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "13px",
    color: "var(--fg3)"
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search alias or @handle\u2026",
    style: {
      flex: 1,
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      height: "100%"
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuery(""),
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg3)",
      cursor: "pointer"
    }
  }, "\xD7"))), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "50px 24px",
      textAlign: "center",
      background: "var(--bg-panel-2)",
      border: "0.5px dashed var(--line-soft)",
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-orange)",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "search",
    size: "22px"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 400,
      fontSize: 15,
      color: "var(--fg1)"
    }
  }, "No producers match \u201C", query, "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 14px",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--fg2)"
    }
  }, "Try a different name or handle."), /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    onClick: () => setQuery("")
  }, "Clear search")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 12
    }
  }, filtered.map(u => /*#__PURE__*/React.createElement(UserCard, {
    key: u.handle,
    user: u
  })))));
};
function UserCard({
  user
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-panel-2)",
      border: "0.5px solid var(--line-soft)",
      borderRadius: 4,
      padding: 14,
      display: "flex",
      alignItems: "center",
      gap: 12,
      transition: "border-color 140ms, transform 140ms"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--line-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--line-soft)";
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: user.alias,
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg1)",
      fontSize: 15,
      fontWeight: 400,
      textTransform: "capitalize",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, user.alias), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg3)",
      fontSize: 12,
      fontFamily: "var(--font-mono)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "@", user.handle)), /*#__PURE__*/React.createElement("a", {
    href: profileHref(user.handle),
    style: {
      textDecoration: "none",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MsnFramed, {
    color: "var(--color-orange)",
    size: "sm"
  }, "View profile ", /*#__PURE__*/React.createElement(MsnIcon, {
    name: "arrowR",
    size: "11px"
  }))));
}
function UsersHeader() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 5,
      background: "color-mix(in srgb, var(--bg-app) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-faint)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Landing.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "msn",
    size: "20px",
    color: "var(--color-orange)"
  }), /*#__PURE__*/React.createElement(MsnWordmark, {
    size: 15
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Home.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Sessions.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Sessions"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Samples.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Library"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-orange)"
    }
  }, "Producers"), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      color: "var(--fg2)",
      textDecoration: "none"
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    title: "Notifications",
    style: {
      background: "transparent",
      border: 0,
      color: "var(--fg2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(MsnIcon, {
    name: "bell",
    size: "16px"
  })), /*#__PURE__*/React.createElement("a", {
    href: "MakeSomeNoise Dashboard.html",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(MsnAvatar, {
    name: "lex moreau",
    size: 28,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg1)",
      fontSize: 12
    }
  }, "@lex.moreau"))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "users.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Knob = __ds_scope.Knob;

__ds_ns.PeakMeter = __ds_scope.PeakMeter;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Waveform = __ds_scope.Waveform;

__ds_ns.Wordmark = __ds_scope.Wordmark;

})();
