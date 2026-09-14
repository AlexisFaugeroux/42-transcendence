export const Permissions = {
  MANAGE_ACCOUNTS: 'manage_accounts',
  SAMPLE_WRITE: 'sample:write',
  TRACK_WRITE: 'track:write',
  STUDIO_ACCESS: 'studio:access',
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  SESSION_REVOKE: 'session:revoke',
} as const;

export type Permissions = (typeof Permissions)[keyof typeof Permissions];
