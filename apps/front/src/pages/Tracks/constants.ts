import type { TranslationKey } from '@transcendence/i18n';
import type { Visibility } from '../../types/sample';
import type { Track } from '../../types/track';

export type TrackSortKey = 'recent' | 'title' | 'duration' | 'size' | 'bpm';

export type VisibilityFilter = 'all' | Visibility;

export const TRACK_SORT_ORDER: TrackSortKey[] = ['recent', 'title', 'duration', 'size', 'bpm'];

export const TRACK_SORT_LABEL: Record<TrackSortKey, TranslationKey> = {
  bpm: 'tracks.sort.bpm',
  duration: 'tracks.sort.duration',
  recent: 'tracks.sort.recent',
  size: 'tracks.sort.size',
  title: 'tracks.sort.title',
};

export const TRACK_COMPARATORS: Record<TrackSortKey, (a: Track, b: Track) => number> = {
  bpm: (a, b) => (a.bpm ?? Number.POSITIVE_INFINITY) - (b.bpm ?? Number.POSITIVE_INFINITY),
  duration: (a, b) => a.duration - b.duration,
  recent: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  size: (a, b) => b.bytes - a.bytes,
  title: (a, b) => a.title.localeCompare(b.title),
};
