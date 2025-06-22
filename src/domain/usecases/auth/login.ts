import { compare } from 'bcryptjs';
import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { UnauthorizedError } from '@shared/errors';

type LoginInput = {
  email: string;
  password: string;
};

export class LoginUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: LoginInput): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedError('Invalid credentials');
    }

    return user;
  }
}
