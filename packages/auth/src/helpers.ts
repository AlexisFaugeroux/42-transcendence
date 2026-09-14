export function avatarUrl(ownerId: string, avatarUpdatedAt: string | null): string | null {
  if (!avatarUpdatedAt) return null;
  return `/avatars/${ownerId}.webp?v=${encodeURIComponent(avatarUpdatedAt)}`;
}
