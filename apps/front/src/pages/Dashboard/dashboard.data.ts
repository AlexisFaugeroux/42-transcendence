import type { AuthUser } from '@transcendence/auth';

export interface ProfileLink {
  kind: string;
  url: string;
}

export interface UserProfile {
  alias: string;
  handle: string;
  email: string;
  bio: string;
  location: string;
  joined: string;
  links: ProfileLink[];
}

export type ProfileErrors = Partial<Record<keyof AuthUser, string>>;
