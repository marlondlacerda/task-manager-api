import { logger } from '@shared/logging';
import { AppError } from './app-error';

const isProduction = process.env.NODE_ENV === 'production';

class ErrorHandler {
  static toHTTP(error: unknown) {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        body: { error: error.message, code: error.name },
      };
    }

    logger.error('Unexpected error:', error);

    return {
      statusCode: 500,
      body: {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        ...(isProduction ? {} : { stack: (error as Error).stack }),
      },
    };
  }
}

export default ErrorHandler;
