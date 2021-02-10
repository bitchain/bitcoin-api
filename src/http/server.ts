import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import 'repositories';

import { ApplicationError } from '@errors/ApplicationError';
import { ValidationError } from '@errors/ValidationError';

import { routes } from './routes';

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);

application.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof ApplicationError || error instanceof ValidationError) {
      return response.status(error.statusCode).json({
        error: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      error: 'Internal Server error!',
    });
  },
);

application.listen(3333);
