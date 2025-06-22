import { Request, Response } from 'express';
import { TaskRepository } from '@domain/repositories';
import { HttpHelper } from '@presentation/helpers';
import { CreateTask, FindAllTasksByUser, FindTaskById } from '@domain/usecases/task';

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  create = async (req: Request, res: Response) => {
    const { title, dueDate, description = null } = req.body;

    const createTask = new CreateTask(this.taskRepository);
    const task = await createTask.execute({
      title,
      dueDate: new Date(dueDate),
      description,
      userId: req.userId as string,
    });

    return HttpHelper.created(res, task);
  };

  findAllByUser = async (req: Request, res: Response) => {
    const findTasks = new FindAllTasksByUser(this.taskRepository);
    const tasks = await findTasks.execute(req.userId as string);

    return HttpHelper.success(res, tasks);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const findTask = new FindTaskById(this.taskRepository);
    const task = await findTask.execute(id, req.userId as string);

    return HttpHelper.success(res, task);
  };
}
