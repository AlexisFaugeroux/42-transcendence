import type { RouteGenericInterface } from 'fastify';
import type { PaginatedResponse } from '../../domain/pagination';
import type {
  GetSampleInput,
  Sample,
  SampleStorageUsage,
  UpdateSampleInput,
} from '../../domain/sample';
import type { OwnerType } from '../../generated/prisma/client';

export interface GetSamplesRoute extends RouteGenericInterface {
  Querystring: GetSampleInput & { page?: string; limit?: string; q?: string };
  Reply: PaginatedResponse<Sample & { ownerType: OwnerType }>;
}

export interface UploadSampleRoute extends RouteGenericInterface {
  Reply: Sample;
}

export interface StorageSampleRoute extends RouteGenericInterface {
  Reply: SampleStorageUsage;
}

export interface UpdateSampleRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
  Body: UpdateSampleInput;
  Reply: Sample;
}

export interface DeleteSampleRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
}
