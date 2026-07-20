import type { MsnIconLabel } from '@transcendence/ui';

export interface Feature {
  icon: MsnIconLabel;
  color: string;
  title: string;
  desc: string;
  bullets: string[];
}

export const FEATURES: Feature[] = [
  {
    bullets: ['Step sequencer', 'Loop crates', 'MIDI editor', 'Sample library'],
    color: 'hsl(25, 90%, 55%)',
    desc: 'Drum scheduler, loops, instrument tracks and a timeline. Build a song in your tab.',
    icon: 'produce',
    title: 'Beat maker',
  },
  {
    bullets: ['Multitrack', 'Punch-in', 'Latency comp', 'Take comping'],
    color: 'hsl(8, 85%, 55%)',
    desc: 'Capture vocals, instruments or field audio with monitoring and overdubs.',
    icon: 'record',
    title: 'Recording',
  },
  {
    bullets: ['Channel strips', 'Sends & busses', 'EQ + comp', 'MP3 / WAV export'],
    color: 'hsl(210, 90%, 50%)',
    desc: 'Channel strips, sends, busses, EQ. Bounce to MP3, WAV, or stream to your profile.',
    icon: 'mix',
    title: 'Mixer & export',
  },
  {
    bullets: ['Live sessions', 'Synced cursor', 'Listener counts', 'Replay'],
    color: 'hsl(190, 75%, 50%)',
    desc: 'Push live takes and finished tracks to listeners with a synced waveform UI.',
    icon: 'waveform',
    title: 'Waveform streaming',
  },
  {
    bullets: ['Profiles', 'Follows', 'Playlists', 'Re-posts'],
    color: 'hsl(140, 65%, 45%)',
    desc: 'Followers, playlists, likes, profiles. Find collaborators and build an audience.',
    icon: 'users',
    title: 'Profiles & social',
  },
  {
    bullets: ['DMs', 'Group chat', 'Shared sessions', 'Stem swap'],
    color: 'hsl(280, 65%, 60%)',
    desc: 'DM another producer or open a shared session. Trade stems without leaving the page.',
    icon: 'chat',
    title: 'Chat & sessions',
  },
];

export interface DeepDive {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  image: string;
}

export const DEEP_DIVES: DeepDive[] = [
  {
    accent: 'hsl(25, 90%, 55%)',
    body: 'Schedule beats on a step grid, swap kits with a keystroke, automate any parameter on the fly. Loop crates and a global metronome keep the groove tight.',
    eyebrow: 'PRODUCTION',
    image: 'DAW — step sequencer, sampler, drum kit',
    title: 'A DAW in the browser, accessible anywhere',
  },
  {
    accent: 'hsl(8, 85%, 55%)',
    body: 'Go live with one click. Listeners see the same waveform you see, comment on specific bars, and clip their favourite moments. Replays stay in your profile.',
    eyebrow: 'STREAMING',
    image: 'STREAM_SCREENSHOT — live session view with listener cursors',
    title: 'Stream a session. Watch listeners arrive.',
  },
  {
    accent: 'hsl(210, 90%, 50%)',
    body: 'Pre-built busses, sends to anywhere, EQ and comp on every channel. Master out to your profile or download a clean WAV.',
    eyebrow: 'MIXING',
    image: 'MIXER_SCREENSHOT — channel strip mixer with master meter',
    title: "Channel strips that don't get in your way.",
  },
];
