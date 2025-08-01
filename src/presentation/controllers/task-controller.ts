import { Request, Response } from 'express';
import { TaskRepository } from '@domain/repositories';
import { HttpHelper } from '@presentation/helpers';
import {
  CreateTask,
  FindAllTasksByUser,
  FindTaskById,
  UpdateTask,
  DeleteTask,
} from '@domain/usecases/task';

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
    const { status, orderBy, orderDirection } = req.query;

    const findTasks = new FindAllTasksByUser(this.taskRepository);
    const tasks = await findTasks.execute({
      userId: req.userId as string,
      status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | undefined,
      orderBy: orderBy as 'dueDate' | 'createdAt' | undefined,
      orderDirection: orderDirection as 'asc' | 'desc' | undefined,
    });

    return HttpHelper.success(res, tasks);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const findTask = new FindTaskById(this.taskRepository);
    const task = await findTask.execute(id, req.userId as string);

    return HttpHelper.success(res, task);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, dueDate, description = null, status } = req.body;

    const updateTask = new UpdateTask(this.taskRepository);
    const task = await updateTask.execute(
      id,
      {
        title,
        dueDate: new Date(dueDate),
        description,
        status,
      },
      req.userId as string,
    );

    return HttpHelper.success(res, task);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteTask = new DeleteTask(this.taskRepository);
    await deleteTask.execute(id, req.userId as string);

    return HttpHelper.noContent(res);
  };
}
