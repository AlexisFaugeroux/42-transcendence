import type { Role } from '@transcendence/permissions';

// Miroir de UserOnlineStatus (apps/back/src/domain/user.ts) : ce que renvoient
// /api/user/listFollowing et /api/user/listFollowers.
export interface UserOnlineStatus {
  id: string;
  artistName: string;
  handle: string;
  role: Role;
  status: 'online' | 'offline';
}

// Ce que StatusAvatar sait peindre. 'live' attend le recorder : le socket ne
// produit que online et offline.
export type PresenceStatus = UserOnlineStatus['status'] | 'live';
