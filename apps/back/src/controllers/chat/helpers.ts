import type { Conversation } from '../../domain/chat';

export function isAParticipant(userId: string, participants: Conversation['participants']) {
  return participants.find((participant) => participant.id === userId) !== undefined;
}
