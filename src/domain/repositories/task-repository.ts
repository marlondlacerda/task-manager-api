import { Task } from '@domain/entities';

export interface TaskRepository {
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAllByUser(userId: string, filters?: { status?: string }): Promise<Task[]>;
  update(id: string, task: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>): Promise<Task>;
  delete(id: string): Promise<void>;
}
