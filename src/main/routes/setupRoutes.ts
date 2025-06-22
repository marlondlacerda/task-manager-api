import { Router } from 'express';
import { configureAuthRoutes } from './auth';
import { makeAuthController } from '@main/factories';

export const setupRoutes = () => {
  const router = Router();

  configureAuthRoutes(router, makeAuthController());

  return router;
};
