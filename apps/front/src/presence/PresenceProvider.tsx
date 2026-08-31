import { type ReactNode, useContext } from 'react';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useFollowing } from '../hooks/useFollowing';
import type { SocketEvent } from '../types/event';
import { useSocket } from '../websocket/WebSocketProvider';
import type { User } from '../types/user';

interface PresenceData {
  count: number;
  onlineUsers: User[] | null;
}

const presenceContext = createContext<PresenceData | null>(null);

export function PresenceProvider({ children }: { children: ReactNode }): JSX.Element {
  const { subscribe } = useSocket();
  const { following, isLoading } = useFollowing();
  const [followingConnected, setFollowingConnected] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    const handler = (message: SocketEvent) => {
      if (message.event === 'OnlineFollowingAtConnection') {
        const usersAlreadyConnected = message.data;
        setFollowingConnected(() => {
          const list = new Set<string>();
          usersAlreadyConnected.forEach((user) => list.add(user));
          return list;
        });
      } else if (message.event === 'FollowingConnected') {
        const userConnectedId = message.data[0];
        setFollowingConnected((current) => {
          const list = new Set<string>(current);
          list.add(userConnectedId);
          return list;
        });
      } else if (message.event === 'FollowingDisconnected') {
        const userDisconnectedId = message.data[0];
        setFollowingConnected((current) => {
          const list = new Set<string>(current);
          list.delete(userDisconnectedId);
          return list;
        });
      }
    };

    return subscribe(handler);
  }, [subscribe, isLoading]);

  if (!following || isLoading) {
    return (
      <presenceContext.Provider value={{ count: 0, onlineUsers: [] }}>
        {children}
      </presenceContext.Provider>
    );
  }

  const onlineFollowing = following.filter((f) => followingConnected.has(f.id));

  return (
    <presenceContext.Provider
      value={{ count: onlineFollowing.length, onlineUsers: onlineFollowing }}
    >
      {children}
    </presenceContext.Provider>
  );
}

export function usePresence() {
  const ctx = useContext(presenceContext);
  if (!ctx) throw new Error('usePresence outside context');
  return ctx;
}
