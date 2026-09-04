export const Role = {
  ADMIN: 'ADMIN',
  ARTIST: 'ARTIST',
  MODERATOR: 'MODERATOR',
  GUEST: 'GUEST',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
