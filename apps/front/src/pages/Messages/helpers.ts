import { toAppTime } from '@transcendence/date';

export function formatConversationTime(iso: string, yesterday: string): string {
  const at = toAppTime(iso);
  const now = toAppTime();

  if (at.isSame(now, 'day')) return at.format('LT');
  if (at.isSame(now.subtract(1, 'day'), 'day')) return yesterday;
  if (now.diff(at, 'day') < 7) return at.format('ddd');

  return at.format('D MMM');
}
