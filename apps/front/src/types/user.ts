export type PresenceStatus = 'online' | 'offline' | 'live';

export interface User {
  id: string;
  name: string;
  handle: string;
  status: PresenceStatus;
  activity: string;
  listeners: number;
}
