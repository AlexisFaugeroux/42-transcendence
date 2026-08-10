import type { TranslationKey } from '@transcendence/i18n';
import type { MsnIconLabel } from '@transcendence/ui';

export interface NavItemDef {
  icon: MsnIconLabel;
  labelKey: TranslationKey;
  to: string;
  badge?: string;
  badgeColor?: string;
}

export const WORKSPACE_ITEMS: NavItemDef[] = [
  { icon: 'home', labelKey: 'nav.home', to: '/home' },
  { badge: '14', icon: 'folder', labelKey: 'nav.mySessions', to: '/sessions' },
  { badge: '32', icon: 'music', labelKey: 'nav.tracks', to: '/tracks' },
  { icon: 'waveform', labelKey: 'nav.library', to: '/library' },
  { icon: 'download', labelKey: 'nav.exports', to: '/exports' },
];

export const SOCIAL_ITEMS: NavItemDef[] = [
  { icon: 'users', labelKey: 'nav.following', to: '/following' },
  { badge: '2', badgeColor: 'var(--color-red)', icon: 'chat', labelKey: 'nav.messages', to: '/messages' },
  { icon: 'heart', labelKey: 'nav.liked', to: '/liked' },
  { icon: 'list', labelKey: 'nav.playlists', to: '/playlists' },
  { icon: 'users', labelKey: 'nav.producers', to: '/producers' },
];
