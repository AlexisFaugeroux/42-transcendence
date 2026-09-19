import type { Role } from '@transcendence/permissions';

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

export interface Session {
  id: string;
  expiresAt: string;
  createdAt: string;
  userAgent: string | null;
}

export interface SessionList {
  items: Session[];
  total: number;
}

export interface UpdateUserBody {
  id: string;
  email?: string;
  handle?: string;
  artistName?: string;
}
