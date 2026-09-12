export interface Message {
  id: string;
  content: string;
  authorId: string;
  conversationId: string;
  createdAt: Date;
  toId: string;
}

export type CreateMessageInput = Omit<Message, 'id' | 'createdAt'>;

export interface Conversation {
  id: string;
  lastMessageAt: Date;
  lastMessage: Omit<Message, 'conversationId' | 'id'> | null;
  updatedAt: Date;
  participants: {
    id: string;
    unreadCount: number;
    handle: string;
    artistName: string;
  }[];
  messageSorted: Omit<Message, 'conversationId' | 'id'>[];
}
