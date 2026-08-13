export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
}

export interface ConversationPeer {
  id: string;
  artistName: string;
  handle: string;
  // Read from the in-memory socket registry, not from the database. Once #194
  // ships its `usePresence` hook this moves out of the REST payload and only
  // the source of the boolean changes — not the rows that display it.
  online: boolean;
}

export interface ConversationSummary {
  id: string;
  peer: ConversationPeer;
  lastMessage: Pick<ChatMessage, 'body' | 'createdAt' | 'senderId'> | null;
  lastMessageAt: string;
  unreadCount: number;
}
