import { Request, Response } from 'express';
import { TaskRepository } from '@domain/repositories';
import { HttpHelper } from '@presentation/helpers';
import { BadRequestError } from '@shared/errors/app-error';

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  create = async (req: Request, res: Response) => {
    const { title, dueDate, description = null } = req.body;

    if (new Date(dueDate) < new Date()) {
      throw new BadRequestError('Due date must be in the future');
    }

    const task = await this.taskRepository.create({
      title,
      status: 'PENDING',
      dueDate: new Date(dueDate),
      description,
      userId: req.userId as string,
    });

    return HttpHelper.created(res, task);
  };
}
