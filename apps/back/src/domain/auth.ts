import type { Role } from './user';

export interface RegisterBody {
  email: string;
  firstname: string;
  lastname: string;
  handle: string;
  artistName: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  ownerId: string;
  artistName: string;
  email: string;
  joined: Date;
  firstname: string;
  lastname: string;
  avatarUpdatedAt: string | null;
  location?: string;
  handle: string;
  links?: { kind: string; url: string }[] | null;
  bio?: string;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
}
