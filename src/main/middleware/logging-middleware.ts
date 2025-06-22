import { Request, Response } from 'express';
import morgan from 'morgan';

export const loggingMiddleware = morgan((tokens: any, req: Request, res: Response) => {
  if (req.path === '/readiness') {
    return null;
  }

  return [
    tokens['http-version'](req, res),
    `status_code=${tokens.status(req, res)}`,
    `${tokens.method(req, res)}=${tokens.url(req, res)}`,
    `response_latency=${tokens['response-time'](req, res)} ms`,
  ].join(' ');
});
