export interface Message {
  id: string;
  content: string;
  authorId: string;
  conversationId: string;
  toId: string;
  createdAt: string;
}

export type NewMessage = Omit<Message, 'id' | 'createdAt'>;

export interface Conversation {
  id: string;
  lastMessageAt: string;
  lastMessage: Omit<Message, 'conversationId' | 'id'> | null;
  updatedAt: string;
  participants: {
    id: string;
    unreadCount: number;
    artistName: string;
  }[];
  messageSorted: Message[];
}
