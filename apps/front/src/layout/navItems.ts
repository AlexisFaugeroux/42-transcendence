import type { MsnIconLabel } from '@transcendence/ui';

export interface NavItemDef {
  icon: MsnIconLabel;
  label: string;
  to: string;
  badge?: string;
  badgeColor?: string;
}

export const WORKSPACE_ITEMS: NavItemDef[] = [
  { icon: 'home', label: 'Home', to: '/home' },
  { badge: '14', icon: 'folder', label: 'My Sessions', to: '/sessions' },
  { badge: '32', icon: 'music', label: 'Tracks', to: '/tracks' },
  { icon: 'waveform', label: 'Library', to: '/library' },
  { icon: 'download', label: 'Exports', to: '/exports' },
];

export const SOCIAL_ITEMS: NavItemDef[] = [
  { badge: '58', icon: 'users', label: 'Following', to: '/following' },
  { badge: '2', badgeColor: 'var(--color-red)', icon: 'chat', label: 'Messages', to: '/messages' },
  { icon: 'heart', label: 'Liked', to: '/liked' },
  { icon: 'list', label: 'Playlists', to: '/playlists' },
];
