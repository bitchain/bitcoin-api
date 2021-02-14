import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import 'repositories';

import { errorHandler } from './middlewares/errorHandler';
import { routes } from './routes';

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);

application.use(errorHandler);

const port = process.env.APPLICATION_PORT || 3333;

application.listen(port);
