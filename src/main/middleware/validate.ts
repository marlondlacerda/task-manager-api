import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validate = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      .then(() => next())
      .catch((error) => {
        if (error instanceof ZodError) {
          const formattedErrors = error.errors.reduce(
            (acc, curr) => {
              const key = curr.path[curr.path.length - 1] || 'field';
              acc[key] = curr.message;
              return acc;
            },
            {} as Record<string, string>,
          );

          return res.status(400).json({
            success: false,
            errors: formattedErrors,
          });
        }

        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
        });
      });
  };
};

export default validate;
