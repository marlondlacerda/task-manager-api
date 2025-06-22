import { Router } from 'express';
import { configureAuthRoutes } from './auth';
import { makeAuthController, makeTaskController } from '@main/factories';
import { configureTaskRoutes } from './task';

export const setupRoutes = () => {
  const router = Router();
  configureAuthRoutes(router, makeAuthController());

  const tasksRouter = Router();
  configureTaskRoutes(tasksRouter, makeTaskController());
  router.use('/tasks', tasksRouter);

  return router;
};
