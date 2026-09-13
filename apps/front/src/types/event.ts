import type { Message } from './chat';

export type WebSocketEvent =
  | {
      event:
        | 'onlineFollowingAtConnection'
        | 'followingConnected'
        | 'followingDisconnected'
        | 'producerFollowed'
        | 'producerUnfollowed';
      data: string[];
    }
  | {
      event: 'message';
      data: Message;
    };
