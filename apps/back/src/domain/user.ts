import type { Role } from '@transcendence/permissions';
import type { AuthUser } from './auth';
import type { PaginatedResponse } from './pagination';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatarUpdatedAt: string | null;
  location?: string;
  bio?: string;
  handle: string;
  links: { kind: string; url: string }[];
  artistName: string;
  role: Role;
  ownerId: string;
  joined: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserOnlineStatus {
  id: string;
  artistName: string;
  handle: string;
  role: Role;
  status: 'online' | 'offline';
}

export interface Producer {
  id: string;
  artistName: string;
  handle: string;
  bio?: string;
  location?: string;
  links: { kind: string; url: string }[];
  role: Role;
  joined: Date;
}

export interface ProducerProfile extends Producer {
  followersCount: number;
  followingCount: number;
  likesReceived: number;
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
  bio?: string;
}

export const USER_SEARCH_FIELDS = ['handle', 'artistName', 'email'] as const;
export type UserSearchField = (typeof USER_SEARCH_FIELDS)[number];

export interface UserResponse {
  user: AuthUser;
}

export interface ProducerProfileResponse {
  producer: ProducerProfile;
}

export type PaginatedProducersResponse = PaginatedResponse<Producer>;
