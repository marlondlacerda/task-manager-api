import { Task, FindAllTasksParams } from '@domain/entities';
import { TaskRepository } from '@domain/repositories';

export class FindAllTasksByUser {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params: FindAllTasksParams): Promise<Task[]> {
    return await this.taskRepository.findAllByUser({
      userId: params.userId,
      status: params.status,
      orderBy: params.orderBy || 'createdAt',
      orderDirection: params.orderDirection || 'asc',
    });
  }
}
