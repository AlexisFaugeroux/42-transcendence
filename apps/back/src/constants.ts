export const SAMPLE_USER_QUOTA_BYTES = 524_288_000; // 500 MiB

export const MAX_UPLOAD_BYTES = 104_857_600; // 100 MiB

export const AVATAR_MAX_BYTES = 5_242_880;

export const PAGINATION_DEFAULT_LIMIT = 20;
export const PAGINATION_MAX_LIMIT = 100;

export const RATE_LIMITS = {
  auth: { max: 5, timeWindow: '1 minute' },
  write: { max: 40, timeWindow: '1 minute' },
  upload: { max: 10, timeWindow: '5 minutes' },
  read: { max: 60, timeWindow: '1 minute' },
  destructive: { max: 10, timeWindow: '1 minute' },
  dm: { max: 10, timeWindow: '1 minute' },
} as const;
