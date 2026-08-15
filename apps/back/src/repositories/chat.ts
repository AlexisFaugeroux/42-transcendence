import type { Message } from '../domain/chat';
import type { Conversation } from '../domain/chat';
import type { Conversation as PrismaConversation, PrismaClient } from '../generated/prisma/client';
import type { ConversationParticipant } from '../generated/prisma/client';
import type { Message as PrismaMessage } from '../generated/prisma/client';
import { prisma } from '../utils/prisma';
import { mapError } from './helpers';

class ChatRepository {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async createConversation(idUserA: string, idUserB: string): Promise<Conversation> {
    const pairKey = [idUserA, idUserB].sort().join(':');
    const now = new Date();
    try {
      const conv: PrismaConversation = await this.prisma.$transaction(async (tx) => {
        const conversation = await tx.conversation.create({
          data: {
            lastMessageAt: now,
            pairKey: pairKey,
          },
        });

        await tx.conversationParticipant.createMany({
          data: [idUserA, idUserB].map((userId) => ({
            conversationId: conversation.id,
            userId,
          })),
        });
        return conversation;
      });
      return { messageSorted: [], participantsId: [idUserA, idUserB], ...conv };
    } catch (e) {
      throw mapError(e, 'conversation creation');
    }
  }

  public async createMessage(input: Message): Promise<Message> {
    const now = new Date();
    try {
      const storedMessgage: Message = await this.prisma.$transaction(async (tx) => {
        const newMessage = await tx.message.create({
          data: {
            ...input,
          },
        });
        const participant = await tx.conversationParticipant.findUniqueOrThrow({
          select: {
            conversationId: true,
          },
          where: {
            userId: input.participantId,
          },
        });

        const conversation = await tx.conversation.update({
          data: {
            lastMessageAt: now,
          },
          where: {
            id: participant.conversationId,
          },
        });
        return { conversationId: conversation.id, ...newMessage };
      });

      return storedMessgage;
    } catch (e) {
      throw mapError(e, 'conversation creation');
    }
  }

  public async listMessageByConversationId(idConv: string): Promise<Message[]> {
    const data: PrismaMessage[] = await this.prisma.message.findMany({
      where: {
        author: {
          is: { conversationId: idConv },
        },
      },
    });
    const messages: Message[] = data.map((message) => ({ conversationId: idConv, ...message }));
    return messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  public async listConversationForUser(userId: string): Promise<Conversation[]> {
    const conversations: PrismaConversation[] = await this.prisma.conversation.findMany({
      where: {
        participants: {
          every: {
            userId,
          },
        },
      },
    });
    return await this._formatConversation(
      conversations.sort((a, b) => a.lastMessageAt.getTime() - b.lastMessageAt.getTime()),
    );
  }

  public async listConversationParticipants(idConv: string): Promise<ConversationParticipant[]> {
    return await this.prisma.conversationParticipant.findMany({
      where: {
        conversationId: idConv,
      },
    });
  }

  public async markAsRead(convId: string, userId: string) {
    const now = new Date();
    await this.prisma.conversationParticipant.update({
      data: {
        lastReadAt: now,
      },
      where: {
        conversationId: convId,
        userId,
      },
    });
  }

  public async updateMessage(newContent: string, id: string): Promise<PrismaMessage> {
    return await this.prisma.message.update({
      data: {
        content: newContent,
      },
      where: {
        id,
      },
    });
  }

  public async deleteConversation(idConv: string) {
    await this.prisma.conversation.delete({ where: { id: idConv } });
  }

  public async deleteMessage(id: string) {
    await this.prisma.message.delete({ where: { id } });
  }

  private async _formatConversation(convs: PrismaConversation[]): Promise<Conversation[]> {
    const format: Conversation[] = [];
    for (const conv of convs) {
      const { pairKey, ...rest } = conv;
      const messages = await this.listMessageByConversationId(conv.id);
      format.push({ messageSorted: messages, participantsId: conv.pairKey.split(':'), ...rest });
    }
    return format;
  }
}

export const chatRepository = new ChatRepository(prisma);
