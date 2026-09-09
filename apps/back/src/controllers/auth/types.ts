import type { RouteGenericInterface } from 'fastify';
import type { AuthResponse, LoginBody, RegisterBody } from '../../domain/auth';

export interface RegisterRoute extends RouteGenericInterface {
  Body: RegisterBody;
  Reply: AuthResponse;
}

export interface LoginRoute extends RouteGenericInterface {
  Body: LoginBody;
  Reply: AuthResponse;
}

export interface MeRoute extends RouteGenericInterface {
  Reply: AuthResponse;
}
