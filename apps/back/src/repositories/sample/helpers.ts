import { formatISO } from '@transcendence/date';
import type { GetSampleInput, Sample, SampleSort, Visibility } from '../../domain/sample';
import type { Sample as PrismaSample } from '../../generated/prisma/client';
import type {
  SampleOrderByWithRelationInput,
  SampleWhereInput,
} from '../../generated/prisma/models';
import { inFilter } from '../helpers';

const OTHERS_VISIBILITIES: Visibility[] = ['PUBLIC', 'SHARED'];

export function formatSample(sample: PrismaSample): Sample {
  const { createdAt, updatedAt, ...rest } = sample;

  const formattedCreatedAt = formatISO(createdAt);

  return {
    ...rest,
    createdAt: formattedCreatedAt,
    peaksUrl: rest.url.replace(/\.[a-z0-9]+$/i, '.peaks'),
  };
}

const ORDER_BY: Record<SampleSort, SampleOrderByWithRelationInput[]> = {
  recent: [{ createdAt: 'desc' }, { id: 'asc' }],
  name: [{ name: 'asc' }, { id: 'asc' }],
  duration: [{ duration: 'asc' }, { id: 'asc' }],
  size: [{ bytes: 'desc' }, { id: 'asc' }],
  bpm: [{ bpm: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
};

export function orderByFilter(sort: SampleSort = 'recent'): SampleOrderByWithRelationInput[] {
  return ORDER_BY[sort];
}

export function criteriaFilter(input: GetSampleInput): SampleWhereInput {
  const { bpms, families, ids, keys, kinds, modes } = input;

  return {
    bpm: inFilter(bpms),
    family: inFilter(families),
    id: inFilter(ids),
    key: inFilter(keys),
    kind: inFilter(kinds),
    mode: inFilter(modes),
  };
}

export function scopeFilter(input: GetSampleInput): SampleWhereInput {
  const { ownerIds, visibilities } = input;

  const visibility = inFilter(visibilities);

  if (!ownerIds?.length) {
    return { visibility };
  }

  const mine: SampleWhereInput = { ownerId: { in: ownerIds }, visibility };

  const othersVisibilities = visibilities?.length
    ? visibilities.filter((v) => OTHERS_VISIBILITIES.includes(v))
    : OTHERS_VISIBILITIES;

  if (!othersVisibilities.length) {
    return mine;
  }

  return {
    OR: [mine, { ownerId: { notIn: ownerIds }, visibility: { in: othersVisibilities } }],
  };
}

export function buildFilters(input: GetSampleInput): SampleWhereInput {
  return {
    ...criteriaFilter(input),
    ...scopeFilter(input),
  };
}
