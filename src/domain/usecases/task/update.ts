import { Task } from '@domain/entities';
import { TaskRepository } from '@domain/repositories';
import { BadRequestError, ForbiddenError, NotFoundError } from '@shared/errors/app-error';

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    id: string,
    data: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>,
    userId: string,
  ): Promise<Task> {
    const { title, dueDate, description, status } = data;

    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError('Task not found');
    }

    if (existingTask.userId !== userId) {
      throw new ForbiddenError('You do not have permission to update this task');
    }

    if (dueDate && dueDate < new Date()) {
      throw new BadRequestError('Due date must be in the future');
    }

    return await this.taskRepository.update(id, {
      title,
      dueDate,
      description,
      status,
    });
  }
}
