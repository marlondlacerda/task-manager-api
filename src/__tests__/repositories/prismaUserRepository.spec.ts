import { PrismaUserRepository } from '@infra/repositories/prisma-user-repository';
import { prisma } from '@infra/database/mysql/prisma-client';

jest.mock('@infra/database/mysql/prisma-client', () => ({
  prisma: {
    user: { findUnique: jest.fn(), create: jest.fn() },
  },
}));

describe('PrismaUserRepository', () => {
  it('findByEmail chama prisma.user.findUnique', async () => {
    const repo = new PrismaUserRepository(prisma);
    await repo.findByEmail('foo@bar.com');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'foo@bar.com' } });
  });
});
