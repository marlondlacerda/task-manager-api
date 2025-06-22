import { Response } from 'express';

class HttpHelper {
  static success(res: Response, data: any, statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      data,
    });
  }

  static created(res: Response, data: any) {
    return res.status(201).json({
      success: true,
      data,
    });
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static error(
    res: Response,
    errorMessage: string,
    statusCode = 500,
    code = 'INTERNAL_ERROR',
  ): Response {
    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
      code,
    });
  }
}

export default HttpHelper;
