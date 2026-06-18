import { ConflictError, NotFoundError } from '../domain/errors';
import { Prisma } from '../generated/prisma/client';

// Translate Prisma-specific errors into domain errors so callers never
// have to know about Prisma error codes.
export function mapError(error: unknown, model: string): Error {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target = (error.meta?.target as string[] | undefined)?.join(', ') ?? 'field';
      return new ConflictError(`A ${model} with this ${target} already exists`);
    }

    if (error.code === 'P2025') {
      return new NotFoundError(`${model} not found`);
    }
  }

  return error instanceof Error ? error : new Error('Unknown database error');
}
