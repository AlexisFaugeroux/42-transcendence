export interface RegisterBody {
  email: string;
  pseudo: string;
  password: string;
}

export interface AuthUser {
  email: string;
  id: string;
  pseudo: string;
  role: 'ADMIN' | 'ARTIST';
}

export interface AuthResponse {
  user: AuthUser;
}

export interface RegisterResponse {
  email: string;
  pseudo: string;
  role: 'ADMIN' | 'ARTIST';
}
