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
      owner: { artistName: 'alex' },
      visibility: VisibilityType.PRIVATE,
    },
    {
      dir: join(samplesDir, 'julien'),
      owner: { artistName: 'julien' },
      visibility: (index) => (index % 2 === 0 ? VisibilityType.PUBLIC : VisibilityType.SHARED),
    },
  ],
  users: [
    {
      artistName: 'antoine',
      email: 'antoine@antoine.test',
      firstname: 'Antoine',
      handle: 'anaudibe',
      id: randomUUID(),
      lastname: 'Audibert',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ADMIN,
    },
    {
      artistName: 'alex',
      bio: "Puceau moi ? Sérieusement ^^ on me l'avait pas sortie celle là depuis longtemps ! Demande à mes potes si j'suis puceau, tu vas voir les réponses qu'tu vas te prendre",
      email: 'alex@alex.test',
      firstname: 'Alexis',
      handle: 'afaugero',
      id: randomUUID(),
      lastname: 'Faugeroux',
      links: [
        {
          kind: 'soundcloud',
          url: 'https://soundcloud.com/profile/afaugero',
        },
        {
          kind: 'bandcamp',
          url: 'https://bandcamp.com/profile/afaugero',
        },
      ],
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ADMIN,
    },
    {
      artistName: 'quentin',
      email: 'quentin@quentin.test',
      firstname: 'Quentin',
      handle: 'quelefev',
      id: randomUUID(),
      lastname: 'Lefevre',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ADMIN,
    },
    {
      artistName: 'julien',
      email: 'julien@julien.test',
      firstname: 'Julien',
      handle: 'jbayonne',
      id: randomUUID(),
      lastname: 'Bayonne',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ADMIN,
    },
    {
      artistName: 'user0',
      email: 'user0@user0.test',
      firstname: 'user',
      handle: 'user_0',
      id: randomUUID(),
      lastname: '0',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ARTIST,
    },
    {
      artistName: 'user1',
      email: 'user1@user1.test',
      firstname: 'user',
      handle: 'user_1',
      id: randomUUID(),
      lastname: '1',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ARTIST,
    },
  ],
  volumeDir: join(repoRoot, 'infra/audio_data'),
};
