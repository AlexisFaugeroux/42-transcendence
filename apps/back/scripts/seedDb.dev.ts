import { prisma } from '../src/utils/prisma';
import { seed } from './seed/core';
import { devConfig } from './seed/fixtures/dev';

try {
  console.log('Start seeding db....');
  await seed(devConfig);
  console.log('Seeding complete !');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
