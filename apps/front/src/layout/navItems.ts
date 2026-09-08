import type { Permissions } from '@transcendence/permissions';
import type { TranslationKey } from '@transcendence/i18n';
import type { MsnIconLabel } from '@transcendence/ui';

export interface NavItemDef {
  icon: MsnIconLabel;
  labelKey: TranslationKey;
  to: string;
  badge?: string;
  badgeColor?: string;
  permission?: Permissions;
}

export const WORKSPACE_ITEMS: NavItemDef[] = [
  { icon: 'home', labelKey: 'nav.home', to: '/home' },
  {
    badge: '14',
    icon: 'folder',
    labelKey: 'nav.mySessions',
    permission: 'studio:access',
    to: '/sessions',
  },
  { icon: 'music', labelKey: 'nav.tracks', permission: 'track:write', to: '/tracks' },
  { icon: 'waveform', labelKey: 'nav.library', permission: 'studio:access', to: '/library' },
  { icon: 'download', labelKey: 'nav.exports', permission: 'studio:access', to: '/exports' },
];

export const SOCIAL_ITEMS: NavItemDef[] = [
  { icon: 'users', labelKey: 'nav.following', to: '/following' },
  {
    badge: '2',
    badgeColor: 'var(--color-red)',
    icon: 'chat',
    labelKey: 'nav.messages',
    permission: 'chat:access',
    to: '/messages',
  },
  { icon: 'heart', labelKey: 'nav.liked', to: '/liked' },
  { icon: 'list', labelKey: 'nav.playlists', to: '/playlists' },
  { icon: 'users', labelKey: 'nav.producers', to: '/producers' },
];

export const ADMIN_ITEMS: NavItemDef[] = [
  { icon: 'settings', labelKey: 'nav.admin', permission: 'manage_accounts', to: '/admin' },
];
