import type { AuthUser } from '@transcendence/auth';
import type { Role } from '@transcendence/permissions';

export interface RegisterBody {
  email: string;
  firstname: string;
  lastname: string;
  handle: string;
  artistName: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
}

export interface RegisterResponse {
  email: string;
  artistName: string;
  role: 'ADMIN' | 'ARTIST';
}
