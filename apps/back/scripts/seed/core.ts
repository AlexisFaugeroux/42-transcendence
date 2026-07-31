import { randomUUID } from 'node:crypto';
import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join, sep } from 'node:path';
import type { User } from '../../src/domain/user';
import { OwnerType } from '../../src/generated/prisma/enums';
import { prisma } from '../../src/utils/prisma';
import { wavManager } from '../../src/services/wav';
import { deriveSampleMeta } from './meta';
import type { SampleOwner, SeedConfig } from './types';

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested: string[][] = await Promise.all(
    entries.map(async (entry) => {
      if (entry.name === '__MACOSX' || entry.name.startsWith('._')) return [];
      const res = join(dir, entry.name);
      if (entry.isDirectory()) return walk(res);
      return entry.isFile() && entry.name.toLowerCase().endsWith('.wav') ? [res] : [];
    }),
  );
  return nested.flat();
}

export async function seed(config: SeedConfig): Promise<void> {
  const rows = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (SELECT 1 FROM "User") AS "exists"
  `;
  if (rows[0].exists) {
    console.log('Database not empty, skipping seed.');
    return;
  }

  const { platformOwner, users } = await prisma.$transaction(async (tx) => {
    console.log('Create PLATEFORM owner...');
    const platformOwner = await tx.owner.create({
      data: {
        type: OwnerType.PLATEFORM,
      },
    });

    console.log('Create users...');
    const users: User[] = [];
    for (const user of config.users) {
      const createdUser = await tx.user.create({
        data: {
          ...user,
          bio: user.bio ?? undefined,
          links: user.links ?? undefined,
          location: user.location ?? undefined,
          owner: {
            create: {
              type: OwnerType.USER,
            },
          },
        },
      });
      users.push(createdUser);
    }

    console.log('Create follows...');
    for (const [artistName, following] of Object.entries(config.follows)) {
      await tx.user.update({
        data: {
          following: {
            set: following.map((followed) => ({ artistName: followed })),
          },
        },
        where: {
          artistName,
        },
      });
    }

    return { platformOwner, users };
  });

  const resolveOwnerId = (owner: SampleOwner): string => {
    if (owner === 'PLATFORM') return platformOwner.id;
    const user = users.find((candidate) => candidate.artistName === owner.artistName);
    if (!user) throw new Error(`Cannot find user ${owner.artistName}`);
    return user.ownerId;
  };

  console.log('Clean volume directory....');
  await mkdir(config.volumeDir, { recursive: true });
  const stale = await readdir(config.volumeDir);
  await Promise.all(stale.map((name) => rm(join(config.volumeDir, name), { force: true, recursive: true })));

  for (const sampleSet of config.sampleSets) {
    const ownerId = resolveOwnerId(sampleSet.owner);
    const label = sampleSet.owner === 'PLATFORM' ? 'platform' : sampleSet.owner.artistName;
    console.log(`Create ${label} audio files...`);

    const files = await walk(sampleSet.dir);
    const samples = await Promise.all(
      files.map(async (abs, index) => {
        const id = randomUUID();
        const originalName = abs.split(sep).at(-1) ?? 'unknown.wav';
        const ext = originalName.split('.').at(-1) ?? 'wav';
        const url = `${ownerId}/${id}.${ext}`;
        const name = originalName;
        const visibility =
          typeof sampleSet.visibility === 'function' ? sampleSet.visibility(index) : sampleSet.visibility;

        const { durationMs, size } = await wavManager.decodeWav(abs, { channelData: true });
        const { bpm, family, kind } = deriveSampleMeta(originalName);

        return { abs, bpm, durationMs, family, id, kind, name, size, url, visibility };
      }),
    );

    await prisma.$transaction(async (tx) => {
      for (const sample of samples) {
        await tx.audioFile.create({
          data: {
            bpm: sample.bpm,
            bytes: sample.size,
            duration: sample.durationMs,
            family: sample.family,
            id: sample.id,
            kind: sample.kind,
            name: sample.name,
            ownerId,
            url: sample.url,
            visibility: sample.visibility,
          },
        });
      }
    });

    for (const sample of samples) {
      const dest = join(config.volumeDir, sample.url);
      await mkdir(dirname(dest), { recursive: true });
      await copyFile(sample.abs, dest);
    }
  }

  if (config.cleanupDirs) {
    for (const dir of config.cleanupDirs) {
      await rm(dir, { force: true, recursive: true });
    }
  }
}
