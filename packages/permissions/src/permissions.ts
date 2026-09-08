export const Permissions = {
  MANAGE_ACCOUNTS: 'manage_accounts',
  CHAT_ACCESS: 'chat:access',
  SAMPLE_WRITE: 'sample:write',
  TRACK_WRITE: 'track:write',
  STUDIO_ACCESS: 'studio:access',
} as const;

export type Permissions = (typeof Permissions)[keyof typeof Permissions];
