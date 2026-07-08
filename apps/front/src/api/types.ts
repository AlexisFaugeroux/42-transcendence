export interface SignInValues {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  id: number;
  pseudo: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
}
