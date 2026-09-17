import type { TranslationKey } from '@transcendence/i18n';
import { type Permissions as PermissionsType, Permissions } from '@transcendence/permissions';
import type { MsnIconLabel } from '@transcendence/ui';

export interface NavItemDef {
  icon: MsnIconLabel;
  labelKey: TranslationKey;
  to: string;
  badgeColor?: string;
  permission?: PermissionsType;
}

export const ADMIN_ITEMS: NavItemDef[] = [
  {
    icon: 'settings',
    labelKey: 'nav.admin',
    to: '/admin',
    permission: Permissions.USER_READ,
  },
];

export const WORKSPACE_ITEMS: NavItemDef[] = [
  { icon: 'home', labelKey: 'nav.home', to: '/home' },
  {
    icon: 'folder',
    labelKey: 'nav.mySessions',
    to: '/sessions',
    permission: Permissions.STUDIO_ACCESS,
  },
  { icon: 'music', labelKey: 'nav.tracks', to: '/tracks', permission: Permissions.TRACK_WRITE },
  {
    icon: 'waveform',
    labelKey: 'nav.library',
    to: '/library',
    permission: Permissions.SAMPLE_WRITE,
  },
];

export const SOCIAL_ITEMS: NavItemDef[] = [
  { icon: 'users', labelKey: 'nav.following', to: '/following' },
  {
    badgeColor: 'var(--color-red)',
    icon: 'chat',
    labelKey: 'nav.messages',
    to: '/messages',
  },
  { icon: 'heart', labelKey: 'nav.liked', to: '/liked' },
  { icon: 'users', labelKey: 'nav.producers', to: '/producers' },
];
