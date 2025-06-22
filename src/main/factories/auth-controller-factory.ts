import { AuthController } from '@presentation/controllers';
import { PrismaUserRepository } from '@infra/repositories';
import { prisma } from '@infra/database/mysql/prisma-client';

export const makeAuthController = (): AuthController => {
  const userRepository = new PrismaUserRepository(prisma);
  return new AuthController(userRepository);
};
