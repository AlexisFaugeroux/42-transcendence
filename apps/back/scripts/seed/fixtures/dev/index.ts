import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { Role, VisibilityType } from '../../../../src/generated/prisma/enums';
import { hashPassword } from '../../../../src/utils/password';
import type { SeedConfig } from '../../types';

const repoRoot = join(process.cwd(), '../..');
const samplesDir = join(repoRoot, 'samples');

export const devConfig: SeedConfig = {
  follows: {
    alex: ['julien'],
    antoine: [],
    julien: ['antoine'],
    quentin: ['user0', 'julien'],
    user0: ['quentin'],
    user1: [],
  },
  sampleSets: [
    {
      dir: join(samplesDir, 'platform'),
      owner: 'PLATFORM',
      visibility: VisibilityType.PUBLIC,
    },
    {
      dir: join(samplesDir, 'alex'),
      owner: { pseudo: 'alex' },
      visibility: VisibilityType.PRIVATE,
    },
    {
      dir: join(samplesDir, 'julien'),
      owner: { pseudo: 'julien' },
      visibility: (index) => (index % 2 === 0 ? VisibilityType.PUBLIC : VisibilityType.SHARED),
    },
  ],
  users: [
    {
      email: 'antoine@antoine.test',
      id: randomUUID(),
      password: await hashPassword('mdp'),
      pseudo: 'antoine',
      role: Role.ADMIN,
    },
    {
      email: 'alex@alex.test',
      id: randomUUID(),
      password: await hashPassword('mdp'),
      pseudo: 'alex',
      role: Role.ADMIN,
    },
    {
      email: 'quentin@quentin.test',
      id: randomUUID(),
      password: await hashPassword('mdp'),
      pseudo: 'quentin',
      role: Role.ADMIN,
    },
    {
      email: 'julien@julien.test',
      id: randomUUID(),
      password: await hashPassword('mdp'),
      pseudo: 'julien',
      role: Role.ADMIN,
    },
    {
      email: 'user0@user0.test',
      id: randomUUID(),
      password: await hashPassword('mdp'),
      pseudo: 'user0',
      role: Role.ARTIST,
    },
    {
      email: 'user1@user1.test',
      id: randomUUID(),
      password: await hashPassword('mdp'),
      pseudo: 'user1',
      role: Role.ARTIST,
    },
  ],
  volumeDir: join(repoRoot, 'infra/audio_data'),
};
