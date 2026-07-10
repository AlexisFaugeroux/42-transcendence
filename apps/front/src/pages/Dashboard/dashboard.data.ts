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
  pronouns: string;
  joined: string;
  links: ProfileLink[];
}

// The "saved" source of truth. Later tasks copy this into editable form state.
export const SAVED_USER: UserProfile = {
  alias: 'lex moreau',
  bio: 'live looper, modular dabbler. recording in a converted garage in lyon. always down to jam after 22h.',
  email: 'lex.moreau@example.com',
  handle: 'lex.moreau',
  joined: 'Apr 2026',
  links: [
    { kind: 'site', url: 'https://lexmoreau.fm' },
    { kind: 'soundcloud', url: 'soundcloud.com/lexmoreau' },
    { kind: 'bandcamp', url: 'lexmoreau.bandcamp.com' },
  ],
  location: 'Lyon, FR',
  pronouns: 'they/them',
};

export type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

export function validateProfile(form: UserProfile): ProfileErrors {
  const errors: ProfileErrors = {};
  if (!/^[\w.]+$/.test(form.handle)) {
    errors.handle = 'Handles can only contain letters, numbers, dot, underscore.';
  }
  return errors;
}
