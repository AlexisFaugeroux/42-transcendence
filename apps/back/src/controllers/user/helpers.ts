import type { User, UserOnlineStatus } from '../../domain/user';

export function formatUserWithOnlineStatus(user: User): Omit<UserOnlineStatus, 'status'> {
  const { id, handle, artistName, role } = user;
  return {
    id,
    handle,
    artistName,
    role,
  };
}
