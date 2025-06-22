import { Request, Response, NextFunction } from 'express';

export const swaggerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }
  next();
};
