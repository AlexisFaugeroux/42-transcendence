import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT } from '../constants';
import { BadRequestError } from '../domain/errors';
import type { PaginationParams } from '../domain/pagination';

function isAbsent(raw: string | undefined): boolean {
  return raw === undefined || raw === '';
}

export function parsePagination(
  pageRaw: string | undefined,
  limitRaw: string | undefined,
): PaginationParams {
  const pageAbsent = isAbsent(pageRaw);
  const limitAbsent = isAbsent(limitRaw);

  if (pageAbsent && limitAbsent) {
    return { unpaginated: true };
  }

  const page = pageAbsent ? 1 : Number(pageRaw);
  const limit = limitAbsent ? PAGINATION_DEFAULT_LIMIT : Number(limitRaw);

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
    unpaginated: false,
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
}

export function toPaginatedResponse<T>(
  pagination: PaginationParams,
  items: T[],
  total: number,
): { items: T[]; total: number; page: number; limit: number } {
  if (pagination.unpaginated) {
    return { items, total, page: 1, limit: total };
  }

  return { items, total, page: pagination.page, limit: pagination.limit };
}
