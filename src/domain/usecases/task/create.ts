import { Task } from '@domain/entities';
import { TaskRepository } from '@domain/repositories';
import { BadRequestError } from '@shared/errors/app-error';

interface CreateTaskDTO {
  title: string;
  dueDate: Date;
  description?: string | null;
  userId: string;
}

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: CreateTaskDTO): Promise<Task> {
    const { title, dueDate, description = null, userId } = data;

    if (dueDate < new Date()) {
      throw new BadRequestError('Due date must be in the future');
    }

    return await this.taskRepository.create({
      title,
      status: 'PENDING',
      dueDate,
      description,
      userId,
    });
  }
}
