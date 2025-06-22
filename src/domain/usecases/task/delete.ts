import { TaskRepository } from '@domain/repositories';
import { ForbiddenError, NotFoundError } from '@shared/errors/app-error';

export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError('Task not found');
    }

    if (existingTask.userId !== userId) {
      throw new ForbiddenError('You do not have permission to delete this task');
    }

    await this.taskRepository.delete(id);
  }
}
