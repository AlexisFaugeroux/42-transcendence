import {Permissions} from './permissions'
import {Role} from './roles'

export enum ROLES_PERMISSIONS {
    ADMIN = [Permissions.MANAGE_ACCOUNTS],
    MODERATOR = [],
    ARTIST = [],
    GUEST = [],
}

export function can(role: Role, perm: Permissions): boolean {
    return ROLES_PERMISSIONS[role].contains(perm);
}