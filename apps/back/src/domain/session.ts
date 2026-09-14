export interface Session {
  id: string;
  expiresAt: string;
  createdAt: string;
  userAgent: string | null;
}

export interface SessionListResponse {
  items: Session[];
  total: number;
}
