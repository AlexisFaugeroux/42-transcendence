export type UniqueRef = { id: string } | { email: string } | { handle: string };

export interface FollowListOptions {
  skip?: number;
  take?: number;
  q?: string;
}
