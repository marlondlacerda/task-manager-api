import { Task } from '@domain/entities';
import { TaskRepository } from '@domain/repositories';
import { NotFoundError, ForbiddenError } from '@shared/errors/app-error';

export class FindTaskById {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenError('You do not have permission to access this task');
    }

    return task;
  }
}
