import { Router } from 'express';
import { AuthController } from '@presentation/controllers';
import { asyncHandler, validate } from '@main/middleware';
import { loginSchema, registerSchema } from '@main/validations';

export const configureAuthRoutes = (router: Router, authController: AuthController): Router => {
  router.post('/register', validate(registerSchema), asyncHandler(authController.register));
  router.post('/login', validate(loginSchema), asyncHandler(authController.login));

  return router;
};
