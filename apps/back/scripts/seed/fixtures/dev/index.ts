import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { Role, VisibilityType } from '../../../../src/generated/prisma/enums';
import { hashPassword } from '../../../../src/utils/password';
import type { SeedConfig } from '../../types';

const repoRoot = join(process.cwd(), '../..');
const samplesDir = join(repoRoot, 'samples');
const avatarsDir = join(repoRoot, 'avatars');

export const devConfig: SeedConfig = {
  avatars: [
    { artistName: 'alex', file: join(avatarsDir, 'alex.jpeg') },
    { artistName: 'julien', file: join(avatarsDir, 'julien.webp') },
  ],
  conversations: [
    {
      messages: [
        { author: 'julien', content: "T'es encore connecte ?" },
        { author: 'Maya', content: "J'aime trop la musique tu connais ^^" },
      ],
      participants: ['julien', 'Maya'],
    },
    {
      messages: [
        { author: 'antoine', content: 'Yo' },
        { author: 'alex', content: 'Lo' },
        { author: 'antoine', content: 'AHAHA toi puceau ?' },
      ],
      participants: ['antoine', 'alex'],
    },
    {
      messages: [
        { author: 'Naelle', content: "Mon cpp9 n'est pas rapide" },
        { author: 'julien', content: "C'est la dur loi de la jungle" },
        { author: 'Naelle', content: 'Ford et Johnson sont de bonnes voiture' },
      ],
      participants: ['julien', 'Naelle'],
    },
    {
      messages: [
        {
          author: 'Maya',
          content: "J'ai entendu dire que Ford et johnson etaient des voitures ?",
        },
        {
          author: 'alex',
          content:
            "Mdrrrr qu'est ce tu racontes ca n'existe pas les voitures. Revoie tes classiques (musicaux)",
        },
      ],
      participants: ['Maya', 'alex'],
    },
    {
      messages: [
        { author: 'antoine', content: 'Salut' },
        { author: 'Naelle', content: 'Salut' },
        { author: 'antoine', content: 'salut.......' },
      ],
      participants: ['antoine', 'Naelle'],
    },
  ],
  follows: {
    alex: ['julien'],
    antoine: [],
    julien: ['antoine'],
    Maya: ['user0', 'julien'],
    Naelle: ['alex'],
    user0: ['Maya'],
    user1: [],
  },
  mediaDir: join(repoRoot, 'infra/media_data'),
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
      avatarUpdatedAt: null,
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
      avatarUpdatedAt: null,
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
      artistName: 'Maya',
      avatarUpdatedAt: null,
      email: 'maya@maya.test',
      firstname: 'Maya-Line',
      handle: 'mpelage',
      id: randomUUID(),
      lastname: 'Pelage',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ADMIN,
    },
    {
      artistName: 'Naelle',
      avatarUpdatedAt: null,
      email: 'naelle@naelle.test',
      firstname: 'Naelle',
      handle: 'lvilmain',
      id: randomUUID(),
      lastname: 'SomeRandomName',
      location: 'Paris, FR',
      password: await hashPassword('mdp'),
      role: Role.ADMIN,
    },
    {
      artistName: 'julien',
      avatarUpdatedAt: null,
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
      avatarUpdatedAt: null,
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
      avatarUpdatedAt: null,
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
};
