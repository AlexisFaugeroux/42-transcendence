export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export interface CreatedApiKey extends ApiKey {
  key: string;
}

export interface CreateApiKeyFields {
  name: string;
  expiresInDays?: number;
}
