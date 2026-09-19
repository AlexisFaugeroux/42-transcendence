import { Role } from '@transcendence/permissions';

const linksSchema = {
  items: {
    additionalProperties: false,
    properties: {
      kind: { type: 'string' },
      url: { type: 'string' },
    },
    required: ['kind', 'url'],
    type: 'object',
  },
  type: ['array', 'null'],
};

const roleSchema = { enum: Object.values(Role), type: 'string' };

export const authUserSchema = {
  additionalProperties: false,
  properties: {
    artistName: { type: 'string' },
    avatarUpdatedAt: { type: ['string', 'null'] },
    bio: { type: 'string' },
    email: { type: 'string' },
    firstname: { type: 'string' },
    handle: { type: 'string' },
    id: { type: 'string' },
    joined: { format: 'date-time', type: 'string' },
    lastname: { type: 'string' },
    links: linksSchema,
    location: { type: 'string' },
    ownerId: { type: 'string' },
    role: roleSchema,
  },
  required: [
    'id',
    'ownerId',
    'artistName',
    'email',
    'joined',
    'firstname',
    'lastname',
    'avatarUpdatedAt',
    'handle',
    'role',
  ],
  type: 'object',
};

export const authUserResponseSchema = {
  additionalProperties: false,
  properties: { user: authUserSchema },
  required: ['user'],
  type: 'object',
};

export const meResponseSchema = {
  additionalProperties: false,
  properties: { user: { ...authUserSchema, type: ['object', 'null'] } },
  required: ['user'],
  type: 'object',
};

export const producerSchema = {
  additionalProperties: false,
  properties: {
    artistName: { type: 'string' },
    bio: { type: 'string' },
    handle: { type: 'string' },
    id: { type: 'string' },
    joined: { format: 'date-time', type: 'string' },
    links: linksSchema,
    location: { type: 'string' },
    role: roleSchema,
  },
  required: ['id', 'artistName', 'handle', 'role', 'joined'],
  type: 'object',
};

export const producerProfileResponseSchema = {
  additionalProperties: false,
  properties: {
    producer: {
      additionalProperties: false,
      properties: {
        ...producerSchema.properties,
        followersCount: { minimum: 0, type: 'integer' },
        followingCount: { minimum: 0, type: 'integer' },
        isFollowing: { type: 'boolean' },
        likesReceived: { minimum: 0, type: 'integer' },
      },
      required: [
        ...producerSchema.required,
        'followersCount',
        'followingCount',
        'likesReceived',
        'isFollowing',
      ],
      type: 'object',
    },
  },
  required: ['producer'],
  type: 'object',
};

export const onlineUserSchema = {
  additionalProperties: false,
  properties: {
    artistName: { type: 'string' },
    handle: { type: 'string' },
    id: { type: 'string' },
    role: roleSchema,
    status: { enum: ['online', 'offline'], type: 'string' },
  },
  required: ['id', 'handle', 'status', 'artistName', 'role'],
  type: 'object',
};

export const onlineUsersResponseSchema = {
  items: onlineUserSchema,
  type: 'array',
};

export const adminUserSchema = authUserSchema;
