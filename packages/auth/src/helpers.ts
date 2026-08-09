export function avatarUrl(
  userId: string,
  avatarUpdatedAt: string | null,
): string | null {
  if (!avatarUpdatedAt) return null;
  return `/avatars/${userId}.webp?v=${encodeURIComponent(avatarUpdatedAt)}`;
}
