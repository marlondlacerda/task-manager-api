import express from 'express';
import { logger } from '@shared/logging';
import { setupRoutes } from './routes';
import { errorMiddleware } from './middleware';

const app = express();
app.use(express.json());

app.use(setupRoutes());
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
