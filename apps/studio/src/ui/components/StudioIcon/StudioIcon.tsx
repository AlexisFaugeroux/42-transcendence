import type { CSSProperties, JSX } from 'react';
import type { StudioIconLabel } from './types';

const STUDIO_ICONS: Record<StudioIconLabel, JSX.Element | undefined> = {
  add: <path d="M10.5 5h3v5.5h5.5v3h-5.5v5.5h-3v-5.5H5v-3h5.5z" fill="currentColor" />,
  arrange: (
    <g fill="currentColor">
      <rect x="3" y="5" width="18" height="2.5" />
      <rect x="3" y="11" width="14" height="2.5" />
      <rect x="3" y="17" width="10" height="2.5" />
    </g>
  ),
  clip: (
    <g fill="currentColor">
      <rect x="4" y="6" width="16" height="12" rx="1" />
    </g>
  ),
  close: (
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  ),
  collapseV: (
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cursor: <path d="M5 3l14 7-6 2-2 6-6-15z" fill="currentColor" />,
  delete: (
    <g fill="currentColor">
      <path d="M6 7h12l-1 13H7L6 7z" />
      <rect x="4" y="4" width="16" height="2" rx="1" />
      <rect x="9" y="2" width="6" height="2" rx="1" />
      <rect x="9.5" y="10" width="1.5" height="7" rx=".5" />
      <rect x="13" y="10" width="1.5" height="7" rx=".5" />
    </g>
  ),
  device: (
    <g fill="currentColor">
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <circle cx="8" cy="12" r="2" fill="var(--bg-app)" />
      <rect x="13" y="11" width="6" height="2" fill="var(--bg-app)" />
    </g>
  ),
  folder: (
    <path
      d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"
      fill="currentColor"
    />
  ),
  font: (
    <path
      d="M5 19l5-14h2l5 14h-2.2l-1.3-3.7H8.5L7.2 19H5zm4-5.4h4l-2-5.7-2 5.7z"
      fill="currentColor"
    />
  ),
  loop: (
    <g fill="currentColor">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z" />
      <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
    </g>
  ),
  marker: <path d="M5 4h11l3 4-3 4H5z" fill="currentColor" />,
  meter: (
    <g fill="currentColor">
      <rect x="4" y="14" width="2" height="6" />
      <rect x="8" y="10" width="2" height="10" />
      <rect x="12" y="6" width="2" height="14" />
      <rect x="16" y="12" width="2" height="8" />
    </g>
  ),
  metro: <path d="M9 3h6l3 16H6L9 3zm1 4l-2 10h8l-2-10h-4z" fill="currentColor" />,
  midi: (
    <g fill="currentColor">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="7" r="1.2" />
      <circle cx="7" cy="13" r="1.2" />
      <circle cx="17" cy="13" r="1.2" />
      <rect x="9" y="14.5" width="6" height="2.8" rx=".5" />
    </g>
  ),
  mixer: (
    <g fill="currentColor">
      <rect x="4" y="3" width="2" height="18" />
      <rect x="11" y="3" width="2" height="18" />
      <rect x="18" y="3" width="2" height="18" />
      <circle cx="5" cy="9" r="2.2" fill="var(--bg-app)" stroke="currentColor" strokeWidth="1.4" />
      <circle
        cx="12"
        cy="14"
        r="2.2"
        fill="var(--bg-app)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="19" cy="7" r="2.2" fill="var(--bg-app)" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  more: (
    <g fill="currentColor">
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18" cy="12" r="1.6" />
    </g>
  ),
  moreV: (
    <g fill="currentColor">
      <circle cx="12" cy="6" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="18" r="1.6" />
    </g>
  ),
  pause: (
    <g fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </g>
  ),
  pencil: (
    <path
      d="M3 17.25V21h3.75L18 9.75 14.25 6 3 17.25zM20.7 7.04a1 1 0 0 0 0-1.4l-2.34-2.34a1 1 0 0 0-1.4 0L15.13 5.13l3.74 3.74 1.83-1.83z"
      fill="currentColor"
    />
  ),
  piano: (
    <g fill="currentColor">
      <rect x="3" y="6" width="18" height="12" fill="white" />
      <rect x="6" y="6" width="2" height="7" />
      <rect x="11" y="6" width="2" height="7" />
      <rect x="16" y="6" width="2" height="7" />
    </g>
  ),
  play: <path d="M6 4l14 8-14 8z" fill="currentColor" />,
  rec: <circle cx="12" cy="12" r="6" fill="currentColor" />,
  redo: <path d="M15 7l5 5-5 5v-3H9a4 4 0 0 0 0 8h3v2H9a6 6 0 0 1 0-12h6V7z" fill="currentColor" />,
  sample: (
    <path
      d="M3 12c2-4 4 4 6 0s4 4 6 0 4 4 6 0"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  ),
  save: <path d="M5 3h11l3 3v15H5V3zm2 2v6h10V5H7zm0 8v6h10v-6H7z" fill="currentColor" />,
  scene: (
    <g fill="currentColor">
      <rect x="4" y="5" width="6" height="14" rx="1" />
      <rect x="14" y="5" width="6" height="14" rx="1" />
    </g>
  ),
  scissors: (
    <g fill="currentColor">
      <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 8l12 9M9 16l12-9" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  search: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </g>
  ),
  share: (
    <g fill="currentColor">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8 11l8-4M8 13l8 4" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  stop: <rect x="5" y="5" width="14" height="14" rx="1" fill="currentColor" />,
  triangle: <path d="M5 9l4 4 4-4z" fill="currentColor" />,
  undo: (
    <path d="M9 7L4 12l5 5v-3h6a4 4 0 0 1 0 8h-3v2h3a6 6 0 0 0 0-12H9V7z" fill="currentColor" />
  ),
  walk: (
    <path
      d="M14 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 4l-3 4 2 5 3-4 1 4 3-1-1-3 1-3-2-2h-4z"
      fill="currentColor"
    />
  ),
};

interface StudioIconsProps {
  name: StudioIconLabel;
  size: CSSProperties['width'];
  color?: CSSProperties['color'];
  style?: CSSProperties;
}

export function StudioIcon({ color, name, size, style }: StudioIconsProps): JSX.Element | null {
  const icon = STUDIO_ICONS[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      style={{
        background: 'transparent',
        color,
        display: 'inline-block',
        flexShrink: 0,
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {icon}
    </svg>
  );
}
