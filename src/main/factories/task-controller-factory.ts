import { TaskController } from '@presentation/controllers';
import { PrismaTaskRepository } from '@infra/repositories';
import { prisma } from '@infra/database/mysql/prisma-client';

export const makeTaskController = (): TaskController => {
  const taskRepository = new PrismaTaskRepository(prisma);
  return new TaskController(taskRepository);
};
