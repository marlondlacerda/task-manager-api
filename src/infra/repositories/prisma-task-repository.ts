// src/infra/repositories/prisma-task-repository.ts
import { PrismaClient } from '@prisma/client';
import { TaskRepository } from '@domain/repositories';
import { Task } from '@domain/entities/task';

export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaClient) {}

  async create(task: Task): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...task,
      },
    });
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
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
}
