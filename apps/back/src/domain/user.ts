import type { Role } from '@transcendence/permissions';
import type { Role as PrismaRole } from '@prisma/client';
import type { PaginatedResponse } from './pagination';

export type PresenceStatus = 'live' | 'online' | 'idle' | 'offline';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatarUpdatedAt: string | null;
  location?: string;
  bio?: string;
  handle: string;
  links?: { kind: string; url: string }[] | null;
  artistName: string;
  password: string;
  role: Record<PrismaRole, Role>;
  ownerId: string;
}

export interface OnlineUser {
  id: string;
  name: string;
  handle: string;
  status: PresenceStatus;
  activity: string;
  listeners: number;
}

export interface PublicProducer {
  id: string;
  artistName: string;
  handle: string;
  bio?: string;
  location?: string;
  links?: { kind: string; url: string }[] | null;
  role: Role;
  joined: Date;
}

export interface PublicProducerProfile extends PublicProducer {
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface CreateUserInput {
  email: string;
  firstname: string;
  lastname: string;
  handle: string;
  password: string;
  artistName: string;
  role?: Role;
}

export interface GetUserInput {
  ids?: string[];
  emails?: string[];
  roles?: Role[];
}

export interface UpdateUserInput {
  email?: string;
  handle?: string;
  firstname?: string;
  lastname?: string;
  avatarUpdatedAt?: string | null;
  links?: { kind: string; url: string }[];
  location?: string;
  artistName?: string;
  password?: string;
  role?: Role;
  bio?: string;
}

export interface UserResponse {
  user: User;
}

export interface PublicProducerProfileResponse {
  producer: PublicProducerProfile;
}

export type PaginatedProducersResponse = PaginatedResponse<PublicProducer>;
