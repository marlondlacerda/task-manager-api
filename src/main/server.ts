import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { setupRoutes } from './routes/setupRoutes';
import { errorMiddleware } from './middleware/error-middleware';
import { logger } from '@shared/logging';
import { loggingMiddleware } from './middleware/logging-middleware';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use(loggingMiddleware);
app.use(setupRoutes());
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
