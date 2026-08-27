import {Permissions} from './permissions'
import {Role} from './roles'

export const ROLES_PERMISSIONS : Record<Role, Permissions[]> = {
    [Role.ADMIN] : [Permissions.MANAGE_ACCOUNTS],
    [Role.MODERATOR] : [],
    [Role.ARTIST] : [],
    [Role.GUEST] : [],
}

export function can(role: Role, perm: Permissions): boolean {
    return ROLES_PERMISSIONS[role].includes(perm);
}