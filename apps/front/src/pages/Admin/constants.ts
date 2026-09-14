import type { TranslationKey } from '@transcendence/i18n';
import { Role } from '@transcendence/permissions';

export const ROLE_LABEL: Record<Role, TranslationKey> = {
  [Role.ADMIN]: 'admin.users.roles.ADMIN',
  [Role.ARTIST]: 'admin.users.roles.ARTIST',
  [Role.GUEST]: 'admin.users.roles.GUEST',
  [Role.MODERATOR]: 'admin.users.roles.MODERATOR',
};

export const ROLE_ORDER: Role[] = [Role.ADMIN, Role.MODERATOR, Role.ARTIST, Role.GUEST];
