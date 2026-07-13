export type Role = 'ADMIN' | 'ARTIST';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  location?: string;
  bio?: string;
  handle: string;
  links?: { kind: string; url: string }[] | null;
  artistName: string;
  password: string;
  role: Role;
  ownerId?: string;
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
  lastnane?: string;
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
