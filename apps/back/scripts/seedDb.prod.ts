import { prisma } from '../src/utils/prisma';
import { seed } from './seed/core';
import { prodConfig } from './seed/fixtures/prod';

try {
  console.log('Start seeding db....');
  await seed(prodConfig);
  console.log('Seeding complete !');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
