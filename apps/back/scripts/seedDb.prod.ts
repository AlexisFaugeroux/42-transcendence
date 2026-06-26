import type { User } from '../src/generated/prisma/client';
import { OwnerType, Role } from '../src/generated/prisma/enums';
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
  const rows = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (SELECT 1 FROM "User") AS "exists"
  `;
  if (rows[0].exists) {
    console.log('Database not empty, skipping seed.');
  }

  await prisma.$transaction(async (tx) => {
    console.log('Create PLATEFORM owner...');
    await tx.owner.create({
      data: {
        type: OwnerType.PLATEFORM,
      },
    });

    console.log('Create users...');
    for (const user of users) {
      await tx.user.create({
        data: {
          ...user,
          owner: {
            create: {
              type: OwnerType.USER,
            },
          },
        },
      });
    }

    console.log('Create follows...');
    for (const [pseudo, followingPseudo] of Object.entries(followsLookup)) {
      await tx.user.update({
        data: {
          following: {
            set: followingPseudo.map((pseudo) => ({ pseudo })),
          },
        },
        where: {
          pseudo,
        },
      });
    }
  });
}

try {
  console.log('Start seeding db....');
  await seedDb();
  console.log('Seeding complete !');
  await prisma.$disconnect();
} catch (error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}
