import type { Message } from './chat';

export type SocketEvent =
  | {
      event:
        | 'OnlineFollowingAtConnection'
        | 'FollowingConnected'
        | 'FollowingDisconnected'
        | 'producerFollowed'
        | 'producerUnfollowed';
      data: string[];
    }
  | {
      event: 'message';
      data: Message;
    };
