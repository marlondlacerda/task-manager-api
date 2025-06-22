import { Task } from '@domain/entities';
import { TaskRepository } from '@domain/repositories';

export class FindAllTasksByUser {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    return await this.taskRepository.findAllByUser(userId);
  }
}
