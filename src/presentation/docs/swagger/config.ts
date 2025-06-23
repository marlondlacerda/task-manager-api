import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../../../dist/swagger.json';

export const setupSwagger = (app: Express) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(['/openapi', '/docs', '/swagger'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
};
