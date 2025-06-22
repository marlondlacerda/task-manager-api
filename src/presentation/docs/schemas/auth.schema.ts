import { User } from '../../../domain/entities';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: Omit<User, 'password'>;
  token: string;
}
