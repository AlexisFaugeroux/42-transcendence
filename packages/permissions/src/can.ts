import {
  Permissions,
  type Permissions as PermissionsType,
} from "./permissions";
import { Role, type Role as RoleType } from "./roles";

export const ROLES_PERMISSIONS: Record<RoleType, PermissionsType[]> = {
  [Role.ADMIN]: [Permissions.MANAGE_ACCOUNTS],
  [Role.MODERATOR]: [],
  [Role.ARTIST]: [],
  [Role.GUEST]: [],
};

export function can(role: RoleType, perm: PermissionsType): boolean {
  return ROLES_PERMISSIONS[role].includes(perm);
}
