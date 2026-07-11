export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  artistName: string;
  password: string;
}

export interface AuthUser {
  email: string;
  id: string;
  artistName: string;
  firstname: string;
  lastname: string;
  location?: string;
  handle: string;
  bio?: string;
  links?: { kind: string; url: string }[] | null;
  role: "ADMIN" | "ARTIST";
  joined: Date;
}

export interface AuthResponse {
  user: AuthUser;
}
