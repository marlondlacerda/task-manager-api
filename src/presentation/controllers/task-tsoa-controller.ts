import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Route,
  Tags,
  Security,
  SuccessResponse,
  Response,
  Path,
} from 'tsoa';
import {
  CreateTaskInput,
  UpdateTaskInput,
  DefaultErrorResponse,
  SuccessDefaultResponse,
} from '../docs/schemas';
import { Task } from '../../domain/entities';

@Route('tasks')
@Tags('Tasks')
export class TaskTsoaController extends Controller {
  /**
   * Cria uma nova tarefa para o usuário autenticado
   *
   * @summary Cria uma nova tarefa
   * @description Endpoint para criação de uma nova tarefa associada ao usuário logado.
   * Requer autenticação via JWT.
   */
  @SuccessResponse('201', 'Created')
  @Response<DefaultErrorResponse>('400', 'Bad Request: Validation error', {
    success: false,
    code: 'ValidationError',
    errors: {
      description: 'Expected string, received number',
    },
  })
  @Response<DefaultErrorResponse>('401', 'Unauthorized: Missing or invalid JWT token', {
    success: false,
    error: 'Token not provided',
    code: 'UnauthorizedError',
  })
  @Security('bearerAuth')
  @Post('/')
  public async createTask(@Body() body: CreateTaskInput): Promise<SuccessDefaultResponse<Task>> {
    const taskData: Task = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: body.title,
      status: 'PENDING',
      dueDate: body.dueDate,
      description: body.description,
      userId: '234e5678-e89b-12d3-a456-426614174001',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      success: true,
      data: taskData,
    };
  }

  /**
   * Busca todas as tarefas do usuário autenticado
   *
   * @summary Busca todas as tarefas
   * @description Endpoint para busca de todas as tarefas associadas ao usuário logado.
   * Requer autenticação via JWT.
   */
  @SuccessResponse('200', 'OK')
  @Response<DefaultErrorResponse>('401', 'Unauthorized: Missing or invalid JWT token', {
    success: false,
    error: 'Token not provided',
    code: 'UnauthorizedError',
  })
  @Security('bearerAuth')
  @Get('/')
  public async findAllByUser(): Promise<SuccessDefaultResponse<Task[]>> {
    const tasks: Task[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Sample Task',
        status: 'PENDING',
        dueDate: new Date(),
        userId: '234e5678-e89b-12d3-a456-426614174001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return {
      success: true,
      data: {
        ...tasks,
      },
    };
  }

  /**
   * Busca uma tarefa específica pelo ID
   *
   * @summary Busca uma tarefa por ID
   * @description Endpoint para busca de uma tarefa específica associada ao usuário logado.
   * Requer autenticação via JWT.
   */
  @SuccessResponse('200', 'OK')
  @Response<DefaultErrorResponse>('401', 'Unauthorized: Missing or invalid JWT token', {
    success: false,
    error: 'Token not provided',
    code: 'UnauthorizedError',
  })
  @Response<DefaultErrorResponse>('403', 'Forbidden: User is not authorized to delete this task', {
    success: false,
    error: 'You are not authorized to delete this task',
    code: 'ForbiddenError',
  })
  @Response<DefaultErrorResponse>('404', 'Not Found: Task not found', {
    success: false,
    error: 'Task not found',
    code: 'NotFoundError',
  })
  @Security('bearerAuth')
  @Get('/{id}')
  public async findById(@Path() id: string): Promise<SuccessDefaultResponse<Task>> {
    const taskData: Task = {
      id,
      title: 'Sample Task',
      status: 'PENDING',
      dueDate: new Date(),
      userId: '234e5678-e89b-12d3-a456-426614174001',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      success: true,
      data: taskData,
    };
  }

  /**
   * Atualiza uma tarefa existente
   *
   * @summary Atualiza uma tarefa
   * @description Endpoint para atualização de uma tarefa associada ao usuário logado.
   * Requer autenticação via JWT.
   */
  @SuccessResponse('200', 'Updated')
  @Response<DefaultErrorResponse>('400', 'Bad Request: Validation error', {
    success: false,
    code: 'ValidationError',
    errors: {
      description: 'Expected string, received number',
    },
  })
  @Response<DefaultErrorResponse>('401', 'Unauthorized: Missing or invalid JWT token', {
    success: false,
    error: 'Token not provided',
    code: 'UnauthorizedError',
  })
  @Response<DefaultErrorResponse>('403', 'Forbidden: User is not authorized to delete this task', {
    success: false,
    error: 'You are not authorized to delete this task',
    code: 'ForbiddenError',
  })
  @Response<DefaultErrorResponse>('404', 'Not Found: Task not found', {
    success: false,
    error: 'Task not found',
    code: 'NotFoundError',
  })
  @Security('bearerAuth')
  @Put('/{id}')
  public async update(
    @Path() id: string,
    @Body() body: UpdateTaskInput,
  ): Promise<SuccessDefaultResponse<Task>> {
    const taskData: Task = {
      id,
      title: body.title || 'Updated Task',
      status: body.status || 'PENDING',
      dueDate: body.dueDate || new Date(),
      description: body.description,
      userId: '234e5678-e89b-12d3-a456-426614174001',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      success: true,
      data: taskData,
    };
  }

  /**
   * Deleta uma tarefa existente
   *
   * @summary Deleta uma tarefa
   * @description Endpoint para deleção de uma tarefa associada ao usuário logado.
   * Requer autenticação via JWT.
   */
  @SuccessResponse('204', 'Deleted')
  @Response<DefaultErrorResponse>('401', 'Unauthorized: Missing or invalid JWT token', {
    success: false,
    error: 'Token not provided',
    code: 'UnauthorizedError',
  })
  @Response<DefaultErrorResponse>('403', 'Forbidden: User is not authorized to delete this task', {
    success: false,
    error: 'You are not authorized to delete this task',
    code: 'ForbiddenError',
  })
  @Response<DefaultErrorResponse>('404', 'Not Found: Task not found', {
    success: false,
    error: 'Task not found',
    code: 'NotFoundError',
  })
  @Security('bearerAuth')
  @Delete('/{id}')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(@Path() id: string): Promise<void> {
    this.setStatus(204);
    return;
  }
}
