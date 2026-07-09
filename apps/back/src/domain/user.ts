export type Role = 'ADMIN' | 'ARTIST';

export interface User {
  id: string;
  email: string;
  pseudo: string;
  password: string;
  role: Role;
  ownerId?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  pseudo: string;
  role?: Role;
}

export interface GetUserInput {
  ids?: string[];
  emails?: string[];
  roles?: Role[];
}

export interface UpdateUserInput {
  email?: string;
  pseudo?: string;
  password?: string;
  role?: Role;
}
