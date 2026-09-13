import { useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { type ReactNode, useContext } from 'react';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useFollowing } from '../hooks/useFollowing';
import type { WebSocketEvent } from '../types/event';
import type { UserOnlineStatus } from '../types/user';
import { useSocket } from '../websocket/WebSocketProvider';

interface PresenceData {
  count: number;
  onlineUsers: UserOnlineStatus[] | null;
}

const presenceContext = createContext<PresenceData | null>(null);

export function PresenceProvider({ children }: { children: ReactNode }): JSX.Element {
  const authUser = useAuthUser();
  const { subscribe } = useSocket();
  const { data: following, isLoading } = useFollowing();
  const [followingConnected, setFollowingConnected] = useState<Set<string>>(new Set<string>());

  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (message: WebSocketEvent) => {
      if (message.event === 'onlineFollowingAtConnection') {
        const usersAlreadyConnected = message.data;
        setFollowingConnected(() => {
          const newSet = new Set<string>();
          usersAlreadyConnected.forEach((user) => newSet.add(user));
          return newSet;
        });
      } else if (message.event === 'followingConnected') {
        const userConnectedId = message.data[0];
        setFollowingConnected((current) => {
          const newSet = new Set(current);
          newSet.add(userConnectedId);
          return newSet;
        });
      } else if (message.event === 'followingDisconnected') {
        const userDisconnectedId = message.data[0];
        setFollowingConnected((current) => {
          const newSet = new Set(current);
          newSet.delete(userDisconnectedId);
          return newSet;
        });
      } else if (message.event === 'producerFollowed') {
        if (message.data.length > 1) return;
        const followedUserId = message.data[0];
        setFollowingConnected((current) => {
          const newSet = new Set(current);
          newSet.add(followedUserId);
          return newSet;
        });
      } else if (message.event === 'producerUnfollowed') {
        const unfollowedUserId = message.data[0];
        setFollowingConnected((current) => {
          const newSet = new Set(current);
          newSet.delete(unfollowedUserId);
          return newSet;
        });
      }
    };

    return subscribe(handler);
  }, [subscribe, isLoading, queryClient, authUser.id]);

  if (!following) {
    return (
      <presenceContext.Provider value={{ count: 0, onlineUsers: [] }}>
        {children}
      </presenceContext.Provider>
    );
  }

  const onlineFollowing = following
    .filter((f) => followingConnected.has(f.id))
    .map((f) => ({ ...f, status: 'online' as const }));

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
