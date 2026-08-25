import type { Message } from './chat';

export type SocketEvent =
  | {
      event: 'OnlineFollowingAtConnection' | 'FollowingConnected' | 'FollowingDisconnected';
      data: string[];
    }
  | {
      event: 'message';
      data: Message;
    };
