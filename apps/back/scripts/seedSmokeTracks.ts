import { randomUUID } from 'node:crypto';
import { prisma } from '../src/utils/prisma';

const TITLE_PREFIX = '[smoke]';

try {
  const users = await prisma.user.findMany({
    select: { artistName: true, id: true, ownerId: true },
  });

  let created = 0;
  for (const user of users) {
    const existing = await prisma.track.findFirst({
      where: { ownerId: user.ownerId, title: { startsWith: TITLE_PREFIX } },
    });
    if (existing) {
      console.log(`skip ${user.artistName} (${existing.id})`);
      continue;
    }

    const id = randomUUID();
    await prisma.track.create({
      data: {
        bytes: 1024,
        duration: 1000,
        id,
        ownerId: user.ownerId,
        title: `${TITLE_PREFIX} ${user.artistName}`,
        url: `${user.ownerId}/${id}.wav`,
        visibility: 'PUBLIC',
      },
    });
    console.log(`ok   ${user.artistName} → ${id}`);
    created++;
  }

  console.log(`done (${String(created)} created)`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
