import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import AppError from '@errors/AppError';
import '@shared/infra/typeorm';
import routes from '@shared/routes';
import '@shared/container';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '@shared/swagger.json';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1', routes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
app.listen(3333, () => {
  console.log('Server started on port 3333! 🚀');
});
