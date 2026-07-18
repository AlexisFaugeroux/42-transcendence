import type { RouteGenericInterface } from 'fastify';

export class InternalServerError extends Error {
  constructor(message = 'internal server error') {
    super(message);
    this.name = 'InternalServerError';
  }
}

export class BadRequestError extends Error {
  constructor(message = 'bad request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends Error {
  constructor(message = 'not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'invalid credentials') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class PayloadTooLargeError extends Error {
  constructor(message = 'request entity too large') {
    super(message);
    this.name = 'PayloadTooLargeError';
  }
}

export interface ErrorReponse extends RouteGenericInterface {
  Reply: {
    error: string;
    status: number;
  };
}
