import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import AppError from './errors/AppError';

import './providers';

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);

application.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      error: 'Internal Server error!',
    });
  },
);

application.listen(3333);
