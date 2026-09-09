import { formatDate } from '@transcendence/date';
import type { AuthUser } from '../../domain/auth';
import type { User } from '../../generated/prisma/client';
import { toLinks } from '../../repositories/user/helpers';

export function formatAuthUser(user: User): AuthUser {
  return {
    artistName: user.artistName,
    avatarUpdatedAt: user.avatarUpdatedAt ? formatDate(user.avatarUpdatedAt) : null,
    bio: user.bio ?? undefined,
    email: user.email,
    firstname: user.firstname,
    handle: user.handle,
    id: user.id,
    joined: user.createdAt,
    lastname: user.lastname,
    links: toLinks(user.links),
    location: user.location ?? undefined,
    ownerId: user.ownerId,
    role: user.role,
  };
}
