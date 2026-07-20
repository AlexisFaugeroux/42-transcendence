import type { AuthUser } from '@transcendence/auth';

export interface RegisterBody {
  email: string;
  firstname: string;
  lastname: string;
  handle: string;
  artistName: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
}

export interface RegisterResponse {
  email: string;
  artistName: string;
  role: 'ADMIN' | 'ARTIST';
}
