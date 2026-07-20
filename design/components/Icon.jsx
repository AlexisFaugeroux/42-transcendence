const MSN_ICONS = {
  msn: (
    <g fill="currentColor">
      <rect x="3" y="8" width="3" height="8" rx="0.5" />
      <rect x="8" y="5" width="3" height="14" rx="0.5" />
      <rect x="13" y="9" width="3" height="6" rx="0.5" />
      <circle cx="20" cy="12" r="1.6" />
    </g>
  ),
  record: (
    <g fill="currentColor">
      <circle cx="12" cy="9" r="4" />
      <rect x="11" y="13" width="2" height="6" />
      <path d="M7 19h10v1H7z" />
    </g>
  ),
  produce: (
    <g fill="currentColor">
      <rect x="3" y="14" width="2" height="6" />
      <rect x="7" y="10" width="2" height="10" />
      <rect x="11" y="6" width="2" height="14" />
      <rect x="15" y="11" width="2" height="9" />
      <rect x="19" y="8" width="2" height="12" />
    </g>
  ),
  mix: (
    <g fill="currentColor">
      <rect x="4" y="3" width="2" height="18" />
      <rect x="11" y="3" width="2" height="18" />
      <rect x="18" y="3" width="2" height="18" />
      <circle
        cx="5"
        cy="9"
        r="2.2"
        fill="var(--bg-app)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="12"
        cy="14"
        r="2.2"
        fill="var(--bg-app)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="19"
        cy="7"
        r="2.2"
        fill="var(--bg-app)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </g>
  ),
  search: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </g>
  ),
  bell: (
    <path
      d="M12 3a5 5 0 0 0-5 5v3l-2 3h14l-2-3V8a5 5 0 0 0-5-5zm-2 16a2 2 0 0 0 4 0"
      fill="currentColor"
    />
  ),
  plus: <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor" />,
  arrowR: (
    <path
      d="M5 12h12m-4-4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  arrowL: (
    <path
      d="M19 12H7m4-4l-4 4 4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  play: <path d="M7 4l13 8-13 8z" fill="currentColor" />,
  heart: (
    <path
      d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
      fill="currentColor"
    />
  ),
  chat: (
    <path
      d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2z"
      fill="currentColor"
    />
  ),
  folder: (
    <path
      d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"
      fill="currentColor"
    />
  ),
  home: (
    <path
      d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"
      fill="currentColor"
    />
  ),
  user: (
    <g fill="currentColor">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0z" />
    </g>
  ),
  users: (
    <g fill="currentColor">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20a7 7 0 0 1 14 0z" />
      <circle cx="17" cy="9" r="3" />
      <path d="M14 20a7 7 0 0 1 8-3v3z" />
    </g>
  ),
  list: (
    <g fill="currentColor">
      <circle cx="5" cy="6" r="1.6" />
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="5" cy="18" r="1.6" />
      <rect x="9" y="5" width="12" height="2" />
      <rect x="9" y="11" width="12" height="2" />
      <rect x="9" y="17" width="12" height="2" />
    </g>
  ),
  grid: (
    <g fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </g>
  ),
  settings: (
    <g fill="currentColor">
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      <path d="M19.4 13l1.6-1.2-1.5-2.6-1.9.6a7 7 0 0 0-1.5-.9l-.4-2h-3l-.4 2a7 7 0 0 0-1.5.9l-1.9-.6L3.4 11.8 5 13a7 7 0 0 0 0 2l-1.6 1.2 1.5 2.6 1.9-.6a7 7 0 0 0 1.5.9l.4 2h3l.4-2a7 7 0 0 0 1.5-.9l1.9.6 1.5-2.6L19.4 15a7 7 0 0 0 0-2z" />
    </g>
  ),
  triangle: <path d="M5 9l4 4 4-4z" fill="currentColor" />,
  download: (
    <path d="M11 3h2v9h3l-4 4-4-4h3zM4 18h16v2H4z" fill="currentColor" />
  ),
  music: (
    <g fill="currentColor">
      <path d="M19 3l-9 2v10.2A3 3 0 1 0 12 18V8l7-1.5z" />
    </g>
  ),
  waveform: (
    <g fill="currentColor">
      <rect x="2" y="10" width="2" height="4" />
      <rect x="5" y="8" width="2" height="8" />
      <rect x="8" y="5" width="2" height="14" />
      <rect x="11" y="9" width="2" height="6" />
      <rect x="14" y="6" width="2" height="12" />
      <rect x="17" y="11" width="2" height="2" />
      <rect x="20" y="9" width="2" height="6" />
    </g>
  ),
};

export function Icon({ name, color, size = "1rem", style, title }) {
  const icon = MSN_ICONS[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-label={title}
      style={{
        color,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
    >
      {icon}
    </svg>
  );
}
