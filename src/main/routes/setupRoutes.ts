import { Request, Response, Router } from 'express';
import { configureAuthRoutes } from './auth';
import { makeAuthController, makeTaskController } from '@main/factories';
import { configureTaskRoutes } from './task';
import { configureHealthcheck } from './healthcheck-routes';

export const setupRoutes = () => {
  const router = Router();

  // Configure global middlewares
  configureHealthcheck(router);

  // Configure authentication routes
  configureAuthRoutes(router, makeAuthController());

  // Configure task routes
  const tasksRouter = Router();
  configureTaskRoutes(tasksRouter, makeTaskController());
  router.use('/tasks', tasksRouter);

  router.use((req: Request, res: Response) => {
    res.status(404).json({
      status: 'error',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    });
  });

  return router;
};
