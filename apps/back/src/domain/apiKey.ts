export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

// The plaintext key is returned once, by the create endpoint, and never stored.
export interface CreatedApiKey extends ApiKey {
  key: string;
}

export interface CreateApiKeyInput {
  name: string;
  expiresInDays?: number;
}

export interface ApiKeyListResponse {
  items: ApiKey[];
  total: number;
}
