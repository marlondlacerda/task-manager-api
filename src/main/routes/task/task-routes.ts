import { Router } from 'express';
import { TaskController } from '@presentation/controllers';
import { asyncHandler, authMiddleware, validate } from '@main/middleware';
import { taskSchema } from '@main/validations';

export const configureTaskRoutes = (router: Router, taskController: TaskController): Router => {
  router.use(authMiddleware);

  router.post('/', validate(taskSchema), asyncHandler(taskController.create));
  router.get('/', asyncHandler(taskController.findAllByUser));
  router.get('/:id', asyncHandler(taskController.findById));
  // router.put('/:id', asyncHandler(taskController.update));
  // router.delete('/:id', asyncHandler(taskController.delete));

  return router;
};
