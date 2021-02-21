import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@repositories/index';

import { errorHandler } from './middlewares/errorHandler';
import { headerHandler } from './middlewares/headerHandler';
import { routes } from './routes';

const application = express();

application.use(cors());
application.use(express.json());

application.use(headerHandler);
application.use(routes);
application.use(errorHandler);

const port = process.env.APPLICATION_PORT || 3333;

application.listen(port);
