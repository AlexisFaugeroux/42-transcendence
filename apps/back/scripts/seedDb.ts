import type { User } from '../generated/prisma/client.ts';
import { OwnerType, Role } from '../generated/prisma/enums.ts';
import { prisma } from '../src/utils/prisma';

type UserInput = Pick<User, 'email' | 'pseudo' | 'role' | 'password'>;

const users: UserInput[] = [
  {
    email: 'antoine@antoine.test',
    password: 'mdp',
    pseudo: 'antoine',
    role: Role.ADMIN,
  },
  {
    email: 'alex@alex.test',
    password: 'mdp',
    pseudo: 'alex',
    role: Role.ADMIN,
  },
  {
    email: 'quentin@quentin.test',
    password: 'mdp',
    pseudo: 'quentin',
    role: Role.ADMIN,
  },
  {
    email: 'julien@julien.test',
    password: 'mdp',
    pseudo: 'julien',
    role: Role.ADMIN,
  },
  {
    email: 'user0@user0.test',
    password: 'mdp',
    pseudo: 'user0',
    role: Role.ARTIST,
  },
  {
    email: 'user1@user1.test',
    password: 'mdp',
    pseudo: 'user1',
    role: Role.ARTIST,
  },
];

const followsLookup: Record<string, string[]> = {
  alex: ['julien'],
  antoine: [],
  julien: ['antoine'],
  quentin: ['user0', 'julien'],
  user0: ['quentin'],
  user1: [],
};

async function seedDb() {
  console.log('Create PLATEFORM owner...');
  await prisma.owner.create({
    data: {
      type: OwnerType.PLATEFORM,
    },
  });

  console.log('Create users...');
  const userPromises = users.map((user) =>
    prisma.user.create({
      data: {
        ...user,
        owner: {
          create: {
            type: OwnerType.USER,
          },
        },
      },
    }),
  );

  await Promise.all(userPromises);

  console.log('Create follows...');
  const followsPromise = Object.entries(followsLookup).map(([pseudo, followingPseudo]) =>
    prisma.user.update({
      data: {
        following: {
          set: followingPseudo.map((pseudo) => ({ pseudo })),
        },
      },
      where: {
        pseudo,
      },
    }),
  );

  for (const promise of followsPromise) {
    await promise;
  }
}

try {
  console.log('Start seeding db....');
  await seedDb();
  console.log('Seeding complete !');
} catch (error) {
  console.error(error);
  process.exit(1);
}
