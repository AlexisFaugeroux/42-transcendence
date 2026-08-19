import type { CSSProperties, JSX, SVGProps } from 'react';
import type { StudioIconLabel } from './types';

/* The device glyphs are adapted from openDAW (github.com/andremichelle/openDAW),
   whose icon library ships with the application rather than the @opendaw/* packages. */

const DEFAULT_VIEW_BOX = '0 0 24 24';

type IconDefinition =
  | JSX.Element
  | { viewBox: string; props?: SVGProps<SVGSVGElement>; children: JSX.Element };

const STUDIO_ICONS: Record<StudioIconLabel, IconDefinition | undefined> = {
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
  compressor: {
    viewBox: '15 15 70 70',
    children: (
      <g>
        <path d="M24,54H76a4,4,0,0,0,0-8H24a4,4,0,0,0,0,8Z" />
        <path d="M42.07,33.71a11.22,11.22,0,0,0,15.87,0l6.89-6.89a4,4,0,0,0-.55-6.12,4.16,4.16,0,0,0-5.27.62l-6.86,6.87a3,3,0,0,1-4.29,0l-7-7a4.06,4.06,0,0,0-5.08-.6,4,4,0,0,0-.65,6.19Z" />
        <path d="M64.18,79.37a4,4,0,0,0,.65-6.19l-6.89-6.89a11.22,11.22,0,0,0-15.87,0l-6.89,6.89a4,4,0,0,0,.55,6.12A4.16,4.16,0,0,0,41,78.68l6.86-6.87a3,3,0,0,1,4.29,0l7,7A4.06,4.06,0,0,0,64.18,79.37Z" />
      </g>
    ),
  },
  crusher: {
    viewBox: '1 1 22 22',
    children: (
      <path d="M5.07089 16C5.02417 15.6734 5 15.3395 5 15V14H3V12H5V11C5 10.6605 5.02417 10.3266 5.07089 10H3V8.00001H5.67363C6.28647 6.70996 7.28227 5.6371 8.51412 4.92834L7.46447 3.87869L8.87868 2.46448L10.5621 4.14785C11.0262 4.05095 11.5071 4.00001 12 4.00001C12.4929 4.00001 12.9738 4.05095 13.4379 4.14785L15.1213 2.46448L16.5355 3.87869L15.4859 4.92834C16.7177 5.6371 17.7135 6.70996 18.3264 8.00001H21V10H18.9291C18.9758 10.3266 19 10.6605 19 11V12H21V14H19V15C19 15.3395 18.9758 15.6734 18.9291 16H21V18H18.3264C17.2029 20.365 14.7924 22 12 22C9.2076 22 6.7971 20.365 5.67363 18H3V16H5.07089ZM9 10V12H15V10H9ZM9 14V16H15V14H9Z" />
    ),
  },
  cursor: <path d="M5 3l14 7-6 2-2 6-6-15z" fill="currentColor" />,
  dattorro: {
    viewBox: '2 2 20 20',
    props: {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    children: (
      <g>
        <path d="M12 3L19.7942 7.5V15.3453C19.7942 16.0598 19.413 16.7201 18.7942 17.0774L13 20.4226C12.3812 20.7799 11.6188 20.7799 11 20.4226L5.20578 17.0774C4.58698 16.7201 4.20578 16.0598 4.20578 15.3453V7.5L12 3Z" />
        <path d="M12 7V12L7.66986 14.5" />
        <path d="M12 12L16.3301 14.5" />
      </g>
    ),
  },
  delay: {
    viewBox: '0 0 24 24',
    children: (
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z" />
    ),
  },
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
  fold: {
    viewBox: '0 0 60 60',
    children: (
      <g>
        <path d="M6,49c0,2.76,2.24,5,5,5h34c4.96,0,9-4.04,9-9c0-3.48-1.99-6.5-4.9-8c2.9-1.5,4.9-4.52,4.9-8c0-2.4-0.93-4.66-2.64-6.37 C49.66,20.93,47.4,20,45,20H11c-2.76,0-5,2.24-5,5c0,1.32,0.52,2.58,1.47,3.54C7.64,28.71,7.81,28.86,8,29c-1.21,0.91-2,2.37-2,4 c0,1.32,0.52,2.58,1.47,3.54c0.17,0.17,0.37,0.31,0.56,0.46C6.81,37.91,6,39.36,6,41c0,1.63,0.79,3.09,2,4C6.79,45.91,6,47.37,6,49z M8.88,35.13C8.31,34.55,8,33.8,8,33c0-1.65,1.35-3,3-3h5c2.21,0,4,1.79,4,4c0,0.55,0.45,1,1,1s1-0.45,1-1c0-2.21,1.79-4,4-4h11 c0.55,0,1-0.45,1-1s-0.45-1-1-1H26c-2.21,0-4-1.79-4-4c0-0.55-0.45-1-1-1s-1,0.45-1,1c0,2.21-1.79,4-4,4h-5 c-0.8,0-1.55-0.31-2.12-0.87C8.31,26.55,8,25.8,8,25c0-1.65,1.35-3,3-3h34c1.86,0,3.62,0.73,4.95,2.04C51.27,25.38,52,27.14,52,29 c0,3.86-3.14,7-7,7H11C10.2,36,9.45,35.69,8.88,35.13z M19.31,29c0.67-0.44,1.24-1.02,1.69-1.69c0.44,0.67,1.02,1.24,1.69,1.69 c-0.67,0.44-1.24,1.02-1.69,1.69C20.56,30.02,19.98,29.44,19.31,29z M11,46h26c0.55,0,1-0.45,1-1s-0.45-1-1-1H11c-1.65,0-3-1.35-3-3 s1.35-3,3-3h34c3.86,0,7,3.14,7,7s-3.14,7-7,7H11c-1.65,0-3-1.35-3-3S9.35,46,11,46z" />
        <path d="M36,13c2.21,0,4,1.79,4,4c0,0.55,0.45,1,1,1s1-0.45,1-1c0-2.21,1.79-4,4-4c0.55,0,1-0.45,1-1s-0.45-1-1-1 c-2.21,0-4-1.79-4-4c0-0.55-0.45-1-1-1s-1,0.45-1,1c0,2.21-1.79,4-4,4c-0.55,0-1,0.45-1,1S35.45,13,36,13z M41,10.31 c0.44,0.67,1.02,1.24,1.69,1.69c-0.67,0.44-1.24,1.02-1.69,1.69c-0.44-0.67-1.02-1.24-1.69-1.69C39.98,11.56,40.56,10.98,41,10.31z" />
      </g>
    ),
  },
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
  gate: {
    viewBox: '-2 -2 28 28',
    children: (
      <path d="M19.92 12.08L12 20l-7.92-7.92l1.42-1.41l5.5 5.5V2h2v14.17l5.5-5.51zM12 20H2v2h20v-2z" />
    ),
  },
  loop: (
    <g fill="currentColor">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z" />
      <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
    </g>
  ),
  marker: <path d="M5 4h11l3 4-3 4H5z" fill="currentColor" />,
  maximizer: {
    viewBox: '0 0 24 24',
    children: (
      <path d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z" />
    ),
  },
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
  reverb: {
    viewBox: '-2 -2 36 36',
    children: (
      <g>
        <path d="M16,32c-0.419,0-0.838-0.077-1.221-0.232L1.47,26.362C0.564,25.995,0,25.245,0,24.403V7.596c0-0.84,0.563-1.59,1.47-1.958 l13.307-5.404c0.766-0.312,1.68-0.312,2.445,0l13.307,5.404C31.437,6.006,32,6.757,32,7.596v16.807 c0,0.841-0.563,1.592-1.472,1.959l-13.306,5.405C16.839,31.922,16.419,32,16,32z M2.006,24.396c0.019,0,0.086,0.06,0.216,0.112 l13.309,5.405c0.281,0.113,0.659,0.113,0.941,0l13.306-5.405c0,0,0,0,0.001,0c0.154-0.062,0.221-0.136,0.231-0.156L30,7.596 c0,0.03-0.066-0.042-0.224-0.106L16.47,2.086c-0.281-0.113-0.658-0.114-0.939,0L2.223,7.49C2.068,7.554,2.001,7.627,1.99,7.648 L2,24.403C2,24.398,2.002,24.396,2.006,24.396z" />
        <path d="M16,32c-0.552,0-1-0.447-1-1V13.677L1.206,8.16c-0.513-0.206-0.762-0.787-0.557-1.3c0.205-0.513,0.785-0.762,1.3-0.557 l14.423,5.769C16.751,12.223,17,12.591,17,13v18C17,31.553,16.552,32,16,32z" />
        <path d="M16,14c-0.397,0-0.772-0.238-0.929-0.629c-0.205-0.513,0.044-1.095,0.557-1.3l14.423-5.769 c0.508-0.202,1.095,0.044,1.3,0.557c0.205,0.513-0.045,1.095-0.558,1.3l-14.422,5.769C16.25,13.977,16.124,14,16,14z" />
      </g>
    ),
  },
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
  stereoTool: {
    viewBox: '0 0 24 24',
    children: (
      <path d="M12,4.805C13.057,4.29 14.245,4 15.5,4C19.915,4 23.5,7.585 23.5,12C23.5,16.415 19.915,20 15.5,20C14.245,20 13.057,19.71 12,19.195C10.943,19.71 9.755,20 8.5,20C4.085,20 0.5,16.415 0.5,12C0.5,7.585 4.085,4 8.5,4C9.755,4 10.943,4.29 12,4.805ZM10.003,17.81C8.462,16.351 7.5,14.287 7.5,12C7.5,9.713 8.462,7.649 10.003,6.19C9.523,6.066 9.019,6 8.5,6C5.189,6 2.5,8.689 2.5,12C2.5,15.311 5.189,18 8.5,18C9.019,18 9.522,17.934 10.003,17.81ZM12.501,17.197C13.383,17.708 14.408,18 15.5,18C18.811,18 21.5,15.311 21.5,12C21.5,8.689 18.811,6 15.5,6C14.408,6 13.383,6.292 12.501,6.803C10.708,7.841 9.5,9.781 9.5,12C9.5,14.219 10.708,16.159 12.501,17.197Z" />
    ),
  },
  stop: <rect x="5" y="5" width="14" height="14" rx="1" fill="currentColor" />,
  tremolo: {
    viewBox: '16 16 68 68',
    children: (
      <path d="M19,50a83.76,83.76,0,0,0,1.13,13.73A19.64,19.64,0,0,0,36.27,79.86a83.86,83.86,0,0,0,27.46,0A19.63,19.63,0,0,0,79.86,63.73,83.69,83.69,0,0,0,81,50a83.67,83.67,0,0,0-1.14-13.73A19.63,19.63,0,0,0,63.73,20.14a83.49,83.49,0,0,0-27.46,0A19.64,19.64,0,0,0,20.13,36.27,83.76,83.76,0,0,0,19,50ZM74.2,61.15c-.08.5-.16,1-.25,1.59A13.63,13.63,0,0,1,62.74,73.95,77.63,77.63,0,0,1,50,75a77.63,77.63,0,0,1-12.74-1.05A13.63,13.63,0,0,1,26.05,62.74c-.14-.87-.26-1.74-.38-2.61L25.53,59h8.11a8.5,8.5,0,0,0,7.14-3.77,8.64,8.64,0,0,0,1.1-2.41,14.74,14.74,0,0,1,9.5-9.59l2.44-.65-1.33,2.14a10,10,0,0,0,7.08,15.17A10.1,10.1,0,0,0,61,60H74.38ZM26.05,37.26A13.63,13.63,0,0,1,37.26,26.05a77.81,77.81,0,0,1,25.48,0,13.63,13.63,0,0,1,11.2,11.21A77.56,77.56,0,0,1,75,50c0,1.12,0,2.1,0,3l0,1H61a4.12,4.12,0,0,1-.57,0,4,4,0,0,1-.36-7.83,3.83,3.83,0,0,0,1.37-6.81C60.26,38.45,57.59,37,53,37c-6.2,0-14.46,5.7-16.89,14.18A2.45,2.45,0,0,1,33.64,53H25.07l0-1.37c0-.54,0-1.09,0-1.63A77.68,77.68,0,0,1,26.05,37.26Z" />
    ),
  },
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
  waveshaper: {
    viewBox: '0 0 256 256',
    props: { fillRule: 'evenodd' },
    children: (
      <path d="M233 64.5h-28.495c-18.104 0-32.517 4.04-49.695 18.089c-15.765 12.892-30.941 31.655-39.559 46.948c-12.478 22.144-33.858 39.953-43.54 43.463c-9.68 3.51-23.202 3.5-30.711 3.5H25V192h23.5c9.747 0 26.265-.681 39.867-7.61c18.496-9.42 33.507-35.51 47.578-54.853c9.879-13.579 21.773-27.756 32.732-36.034C182.775 82.853 196.637 80 216.5 80H233z" />
    ),
  },
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
  const { viewBox, props, children } =
    'viewBox' in icon ? icon : { viewBox: DEFAULT_VIEW_BOX, props: undefined, children: icon };
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill="currentColor"
      {...props}
      style={{
        background: 'transparent',
        color,
        display: 'inline-block',
        flexShrink: 0,
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {children}
    </svg>
  );
}
