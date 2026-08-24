import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT } from '../constants';
import { BadRequestError } from '../domain/errors';
import type { PaginationParams } from '../domain/pagination';

export function parsePagination(
  pageRaw: string | undefined,
  limitRaw: string | undefined,
): PaginationParams {
  const page = pageRaw === undefined || pageRaw === '' ? 1 : Number(pageRaw);
  const limit =
    limitRaw === undefined || limitRaw === '' ? PAGINATION_DEFAULT_LIMIT : Number(limitRaw);

  if (!Number.isInteger(page) || page < 1) {
    throw new BadRequestError(`Invalid page: ${pageRaw}`);
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new BadRequestError(`Invalid limit: ${limitRaw}`);
  }
  if (limit > PAGINATION_MAX_LIMIT) {
    throw new BadRequestError(`limit must be <= ${PAGINATION_MAX_LIMIT}`);
  }

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
}
