import { Router, Request, Response } from 'express';
import { asyncHandler } from '@main/middleware';
import { performance } from 'perf_hooks';

// Formatador universal de tempo (segundos → "1h 5m 3s" ou "300ms")
const formatDuration = (seconds: number) => {
  const absSeconds = Math.abs(seconds);

  if (absSeconds < 0.001) return '0ms';
  if (absSeconds < 1) return `${Math.round(seconds * 1000)}ms`;

  const units = [
    { value: 86400, symbol: 'd' },
    { value: 3600, symbol: 'h' },
    { value: 60, symbol: 'm' },
    { value: 1, symbol: 's' },
  ];

  return (
    units
      .reduce((acc, unit) => {
        if (absSeconds >= unit.value) {
          const value = Math.floor(seconds / unit.value);
          return `${acc} ${value}${unit.symbol}`;
        }
        return acc;
      }, '')
      .trim() || '0s'
  );
};

export const configureHealthcheck = (router: Router): Router => {
  router.get(
    ['/', '/readiness'],
    asyncHandler(async (req: Request, res: Response) => {
      const startTime = performance.now();

      const responseTimeMs = performance.now() - startTime;
      const uptimeSeconds = process.uptime();

      return res.status(200).json({
        status: 'OK',
        metrics: {
          response_time: formatDuration(responseTimeMs / 1000),
          uptime: formatDuration(uptimeSeconds),
        },
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      });
    }),
  );

  return router;
};
