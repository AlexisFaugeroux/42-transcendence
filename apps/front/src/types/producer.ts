import type { Role } from '@transcendence/permissions';

export interface Producer {
  id: string;
  artistName: string;
  handle: string;
  bio?: string;
  location?: string;
  links?: { kind: string; url: string }[] | null;
  role: Role;
  joined: string; // JSON no Date
}

export interface ProducerProfile extends Producer {
  followersCount: number;
  followingCount: number;
  likesReceived: number;
  isFollowing: boolean;
}
