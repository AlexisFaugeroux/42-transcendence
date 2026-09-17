import { can, Permissions } from '@transcendence/permissions';
import type { Conversation } from '../../domain/chat';

export function isAParticipant(userId: string, participants: Conversation['participants']) {
  return participants.find((participant) => participant.id === userId) !== undefined;
}

export function chatRecipientIds(participants: Conversation['participants']): string[] {
  return participants
    .filter((participant) => can(participant.role, Permissions.CHAT_ACCESS))
    .map((participant) => participant.id);
}
