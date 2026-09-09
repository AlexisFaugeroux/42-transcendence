export interface User {
  id: string;
  name: string;
  handle: string;
  status: 'online' | 'offline';
  activity: string;
  listeners: number;
}
