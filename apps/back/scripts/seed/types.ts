import type { User } from '../../src/domain/user';
import type { VisibilityType } from '../../src/generated/prisma/enums';

export type UserFixture = Omit<User, 'ownerId'>;

export type SampleOwner = 'PLATFORM' | { artistName: string };

export interface AvatarFixture {
  artistName: string;
  file: string;
}

export interface MessageFixture {
  author: string;
  content: string;
}

export interface ConversationFixture {
  messages: [MessageFixture, ...MessageFixture[]];
  participants: [string, string];
}

export interface SampleSet {
  dir: string;
  owner: SampleOwner;
  // fixed visibility, or a per-file rule keyed by index (for mixes)
  visibility: VisibilityType | ((index: number) => VisibilityType);
}

export interface TrackFixture {
  file: string;
  likes?: string[];
  owner: SampleOwner;
  title: string;
  description?: string;
  visibility: VisibilityType;
}

export interface SeedConfig {
  users: UserFixture[];
  follows: Record<string, string[]>;
  conversations: ConversationFixture[];
  sampleSets: SampleSet[];
  tracks?: TrackFixture[];
  avatars?: AvatarFixture[];
  mediaDir: string;
  cleanupDirs?: string[];
}
