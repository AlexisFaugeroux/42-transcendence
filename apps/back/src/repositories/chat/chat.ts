import type { CreateMessageInput, Message } from '../../domain/chat';
import type { Conversation } from '../../domain/chat';
import type {
  Conversation as PrismaConversation,
  PrismaClient,
} from '../../generated/prisma/client';
import type { ConversationParticipant } from '../../generated/prisma/client';
import type { Message as PrismaMessage } from '../../generated/prisma/client';
import { prisma } from '../../utils/prisma';
import { mapError } from '../helpers';
import { formatConversation } from './helpers';

class ChatRepository {
  private readonly prisma: PrismaClient;
  private readonly include = {
    include: {
      participants: {
        include: {
          messagesReceived: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              authorId: true,
              content: true,
              createdAt: true,
              id: true,
              toId: true,
            },
          },
          messagesSent: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              authorId: true,
              content: true,
              createdAt: true,
              id: true,
              toId: true,
            },
          },
          user: {
            select: {
              artistName: true,
              handle: true,
              id: true,
            },
          },
        },
      },
    },
  } as const;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async createConversation(idUserA: string, idUserB: string): Promise<Conversation> {
    const pairKey = [idUserA, idUserB].sort().join(':');
    const now = new Date();
    try {
      const conv: PrismaConversation = await this.prisma.$transaction(async (tx) => {
        const conversationCreated = await tx.conversation.create({
          data: {
            lastMessageAt: now,
            pairKey: pairKey,
          },
        });

        await tx.conversationParticipant.createMany({
          data: [idUserA, idUserB].map((userId) => ({
            conversationId: conversationCreated.id,
            userId,
          })),
        });
        return conversationCreated;
      });

      const conversation = await prisma.conversation.findFirstOrThrow({
        where: { id: conv.id },
        ...this.include,
      });
      const participants = conversation.participants.map(({ unreadCount, user }) => ({
        handle: user.handle,
        id: user.id,
        artistName: user.artistName,
        unreadCount,
      }));

      return {
        lastMessage: null,
        messageSorted: [],
        participants: participants,
        ...conv,
      };
    } catch (e) {
      throw mapError(e, 'conversation creation');
    }
  }

  public async createMessage(input: CreateMessageInput): Promise<Message> {
    const now = new Date();
    try {
      const storedMessgage: Message = await this.prisma.$transaction(async (tx) => {
        const newMessage = await tx.message.create({
          data: {
            ...input,
            createdAt: now,
          },
        });
        const sender = await tx.conversationParticipant.findUniqueOrThrow({
          select: {
            conversationId: true,
          },
          where: {
            conversationId_userId: {
              conversationId: input.conversationId,
              userId: input.authorId,
            },
          },
        });

        await tx.conversation.update({
          data: {
            lastMessageAt: now,
          },
          where: {
            id: sender.conversationId,
          },
        });

        await tx.conversationParticipant.updateMany({
          data: {
            unreadCount: { increment: 1 },
          },
          where: {
            conversationId: input.conversationId,
            userId: {
              not: input.authorId,
            },
          },
        });

        return newMessage;
      });

      return storedMessgage;
    } catch (e) {
      throw mapError(e, 'conversation creation');
    }
  }

  public async listMessageByConversationId(idConv: string): Promise<Message[]> {
    const conversation = await prisma.conversation.findFirstOrThrow({
      where: { id: idConv },
      ...this.include,
    });
    const messages = conversation.participants[0].messagesSent.concat(
      conversation.participants[0].messagesReceived,
    );
    messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return messages.map((message) => ({ ...message, conversationId: idConv }));
  }

  public async listConversationsForUser(userId: string): Promise<Conversation[]> {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      ...this.include,
      orderBy: {
        lastMessageAt: 'desc',
      },
    });
    return conversations.map((conv) => formatConversation(conv));
  }

  public async listConversationParticipants(idConv: string): Promise<ConversationParticipant[]> {
    return await this.prisma.conversationParticipant.findMany({
      where: {
        conversationId: idConv,
      },
    });
  }

  public async listOneConversation(idConv: string): Promise<Conversation> {
    const conversation = await this.prisma.conversation.findFirstOrThrow({
      where: {
        id: idConv,
      },
      ...this.include,
    });
    return formatConversation(conversation);
  }

  public async markAsRead(conversationId: string, userId: string) {
    const now = new Date();
    try {
      await this.prisma.conversationParticipant.update({
        data: {
          lastReadAt: now,
          unreadCount: { set: 0 },
        },
        where: {
          conversationId_userId: {
            conversationId,
            userId,
          },
        },
      });
    } catch (e) {
      throw mapError(e, 'Failed to update read state');
    }
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
    try {
      await this.prisma.conversation.delete({ where: { id: idConv } });
    } catch (e) {
      throw mapError(e, 'Failed to conversation');
    }
  }

  public async deleteMessage(id: string) {
    try {
      await this.prisma.message.delete({ where: { id } });
    } catch (e) {
      throw mapError(e, 'Failed to message');
    }
  }
}

export const chatRepository = new ChatRepository(prisma);
