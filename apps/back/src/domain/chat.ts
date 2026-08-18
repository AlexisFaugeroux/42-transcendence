export interface Message {
  id: string;
  content: string;
  participantId: string;
  conversationId: string;
  createdAt: Date | null;
}

export interface Conversation {
  id: string;
  lastMessageAt: Date;
  updatedAt: Date;
  participantsId: string[];
  messageSorted: Message[];
}
