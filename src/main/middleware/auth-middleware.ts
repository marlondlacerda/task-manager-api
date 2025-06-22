import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@shared/errors';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Token not provided');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { sub } = decoded as { sub: string };

    req.userId = sub;
    return next();
  } catch {
    throw new UnauthorizedError('Invalid token');
  }
}
