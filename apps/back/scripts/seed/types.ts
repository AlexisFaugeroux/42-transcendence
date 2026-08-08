import type { User } from '../../src/domain/user';
import type { VisibilityType } from '../../src/generated/prisma/enums';

export type UserFixture = Omit<User, 'ownerId'>;

export type SampleOwner = 'PLATFORM' | { artistName: string };

export interface SampleSet {
  dir: string;
  owner: SampleOwner;
  // fixed visibility, or a per-file rule keyed by index (for mixes)
  visibility: VisibilityType | ((index: number) => VisibilityType);
}

export interface SeedConfig {
  users: UserFixture[];
  follows: Record<string, string[]>;
  sampleSets: SampleSet[];
  mediaDir: string;
  cleanupDirs?: string[];
}
