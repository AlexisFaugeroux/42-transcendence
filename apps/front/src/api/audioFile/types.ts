import type { Family, Key, Kind, Mode, Visibility } from '../../types/audioFile';

export interface GetSamplesFilters {
  kinds?: Kind[];
  visibilities?: Visibility[];
}

export interface FamilyUsage {
  family: Family | null;
  bytes: number;
}

export interface AudioStorageUsage {
  usedBytes: number;
  quotaBytes: number;
  byFamily: FamilyUsage[];
}

export interface UploadSampleFields {
  visibility: Visibility;
  family?: Family;
  bpm?: number;
  kind?: Kind;
  key?: Key;
  mode?: Mode;
}

export interface UpdateSampleFields {
  name?: string;
  visibility?: Visibility;
  family?: Family | null;
  bpm?: number | null;
  kind?: Kind | null;
  key?: Key | null;
  mode?: Mode | null;
}
