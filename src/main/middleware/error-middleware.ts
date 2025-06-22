import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '@shared/errors';
import { HttpHelper } from '@presentation/helpers';

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode, body } = ErrorHandler.toHTTP(err);
  HttpHelper.error(res, body.error, statusCode, body.code);
};
