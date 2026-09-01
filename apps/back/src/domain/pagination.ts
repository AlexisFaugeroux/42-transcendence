export interface UnpaginatedParams {
  unpaginated: true;
}

export interface PaginatedParams {
  unpaginated: false;
  page: number;
  limit: number;
  skip: number;
  take: number;
}

export type PaginationParams = UnpaginatedParams | PaginatedParams;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
