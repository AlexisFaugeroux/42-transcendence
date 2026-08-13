// Presence is displayed all over the app (home rails, producer cards, chat
// rows), so the type lives here. #194 reduces
// it to 'online' | 'offline' once the socket registry is the source of truth.
export type PresenceStatus = 'online' | 'offline';
