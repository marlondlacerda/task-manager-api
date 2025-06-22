// src/infra/repositories/prisma-task-repository.ts
import { PrismaClient } from '@prisma/client';
import { TaskRepository } from '@domain/repositories';
import { FindAllTasksParams, Task } from '@domain/entities/task';

export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaClient) {}

  async create(task: Task): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...task,
      },
    });
  }

  async findAllByUser(params: FindAllTasksParams): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId: params.userId,
        ...(params.status && { status: params.status }),
      },
      orderBy: {
        [params.orderBy as string]: params.orderDirection,
      },
    });
  }

  async findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    task: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...task,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
