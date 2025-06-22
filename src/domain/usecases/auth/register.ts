import { hash } from 'bcryptjs';
import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { ConflictError } from '@shared/errors';

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const userExists = await this.userRepository.findByEmail(userData.email);

    if (userExists) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await hash(userData.password, 8);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }
}
