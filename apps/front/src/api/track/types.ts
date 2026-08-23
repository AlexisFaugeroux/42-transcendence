import type { Key, Mode, Visibility } from '../../types/sample';

export interface GetTracksFilters {
  visibilities?: Visibility[];
  ids?: string[];
  bpms?: number[];
  keys?: Key[];
  modes?: Mode[];
}
