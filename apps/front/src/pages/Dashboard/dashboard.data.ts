import type { AuthUser } from '@transcendence/auth';
import type { TranslationKey } from '@transcendence/i18n';

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

// Keys, not strings: validation runs outside the render, so the message is
// resolved by the component that displays it.
export type ProfileErrors = Partial<Record<keyof AuthUser, TranslationKey>>;
