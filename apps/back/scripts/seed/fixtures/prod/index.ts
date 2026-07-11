import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { Role, VisibilityType } from '../../../../src/generated/prisma/enums';
import { hashPassword } from '../../../../src/utils/password';
import type { SeedConfig } from '../../types';

// Prod seeding runs from the Docker image's WORKDIR `/app`. The entrypoint
// unzips the bundled samples into `/app/samples/<owner>` before running the
// seed, and the audio volume is the absolute host path `/var/www/audio`.
const samplesDir = join(process.cwd(), 'samples');

export const prodConfig: SeedConfig = {
  cleanupDirs: ['samples'],
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
      email: 'antoine@antoine.test',
      id: randomUUID(),
      firstname: 'Antoine',
      lastname: 'Audibert',
      location: 'Paris, FR',
      handle: 'anaudibe',
      password: await hashPassword('mdp'),
      artistName: 'antoine',
      role: Role.ADMIN,
    },
    {
      email: 'alex@alex.test',
      id: randomUUID(),
      firstname: 'Alexis',
      location: 'Paris, FR',
      lastname: 'Faugeroux',
      bio: "Puceau moi ? Sérieusement ^^ on me l'avait pas sortie celle là depuis longtemps ! Demande à mes potes si j'suis puceau, tu vas voir les réponses qu'tu vas te prendre",
      links: [
        {
          kind: 'soundcloud',
          url: 'https://soundcloud.com/user/afaugero',
        },
        {
          kind: 'bandcamp',
          url: 'https://bandcamp.com/user/afaugero',
        },
      ],
      handle: 'afaugero',
      password: await hashPassword('mdp'),
      artistName: 'alex',
      role: Role.ADMIN,
    },
    {
      email: 'quentin@quentin.test',
      id: randomUUID(),
      firstname: 'Quentin',
      lastname: 'Lefevre',
      location: 'Paris, FR',
      handle: 'quelefev',
      password: await hashPassword('mdp'),
      artistName: 'quentin',
      role: Role.ADMIN,
    },
    {
      email: 'julien@julien.test',
      id: randomUUID(),
      firstname: 'Julien',
      lastname: 'Bayonne',
      location: 'Paris, FR',
      handle: 'jbayonne',
      password: await hashPassword('mdp'),
      artistName: 'julien',
      role: Role.ADMIN,
    },
    {
      email: 'user0@user0.test',
      id: randomUUID(),
      firstname: 'user',
      lastname: '0',
      handle: 'user_0',
      password: await hashPassword('mdp'),
      artistName: 'user0',
      role: Role.ARTIST,
    },
    {
      email: 'user1@user1.test',
      id: randomUUID(),
      firstname: 'user',
      lastname: '1',
      location: 'Paris, FR',
      handle: 'user_1',
      password: await hashPassword('mdp'),
      artistName: 'user1',
      role: Role.ARTIST,
    },
  ],
  volumeDir: '/var/www/audio',
};
