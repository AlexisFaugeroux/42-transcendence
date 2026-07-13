import type { OwnerType } from '../generated/prisma/enums';
import { prisma } from '../utils/prisma';
import { mapError } from './helpers';

class OwnerRepository {
  public get = async (type: OwnerType) => {
    try {
      const owner = await prisma.owner.findFirstOrThrow({
        where: { type },
      });
      return owner;
    } catch (error) {
      throw mapError(error, 'Owner');
    }
  };
}

export const ownerRepositoty = new OwnerRepository();
