export type Role = 'ADMIN' | 'ARTIST';

export interface PublicProducer {
  id: string;
  artistName: string;
  handle: string;
  bio?: string;
  location?: string;
  links?: { kind: string; url: string }[] | null;
  role: Role;
  joined: string; // JSON no Date
}

export interface PublicProducerProfile extends PublicProducer {
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}
