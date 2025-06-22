import { Task } from '@domain/entities';
import { TaskRepository } from '@domain/repositories';

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return this.taskRepository.create(task);
  }
}
