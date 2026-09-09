import type { Conversation as PrismaConversation } from '../../generated/prisma/client';

export interface HydratedConversation extends PrismaConversation {
  participants: {
    unreadCount: number;
    user: {
      id: string;
      artistName: string;
    };
    messagesReceived: {
      content: string;
      createdAt: Date;
      authorId: string;
      toId: string;
    }[];
    messagesSent: {
      content: string;
      createdAt: Date;
      authorId: string;
      toId: string;
    }[];
  }[];
}
