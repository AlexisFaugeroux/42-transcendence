export const Permissions = {
  MANAGE_ACCOUNTS: 'MANAGE_ACCOUNTS',
} as const;

export type Permissions = (typeof Permissions)[keyof typeof Permissions];
