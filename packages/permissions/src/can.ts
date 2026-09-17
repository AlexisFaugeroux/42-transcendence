import { Permissions, type Permissions as PermissionsType } from './permissions';
import { Role, type Role as RoleType } from './roles';

export const ROLES_PERMISSIONS: Record<RoleType, PermissionsType[]> = {
  [Role.ADMIN]: [
    Permissions.MANAGE_ACCOUNTS,
    Permissions.SAMPLE_WRITE,
    Permissions.TRACK_WRITE,
    Permissions.TRACK_MODERATE,
    Permissions.CHAT_ACCESS,
    Permissions.STUDIO_ACCESS,
    Permissions.USER_READ,
    Permissions.USER_WRITE,
    Permissions.USER_DELETE,
    Permissions.SESSION_REVOKE,
  ],
  [Role.MODERATOR]: [
    Permissions.SAMPLE_WRITE,
    Permissions.TRACK_WRITE,
    Permissions.TRACK_MODERATE,
    Permissions.CHAT_ACCESS,
    Permissions.STUDIO_ACCESS,
    Permissions.USER_READ,
  ],
  [Role.ARTIST]: [
    Permissions.SAMPLE_WRITE,
    Permissions.TRACK_WRITE,
    Permissions.CHAT_ACCESS,
    Permissions.STUDIO_ACCESS,
  ],
  [Role.GUEST]: [],
};

export function can(role: RoleType, perm: PermissionsType): boolean {
  return ROLES_PERMISSIONS[role].includes(perm);
}
