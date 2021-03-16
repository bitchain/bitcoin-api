import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';

import 'express-async-errors';
import '@repositories/index';

import { sentryConfig } from '@config/sentry';

import { errorHandler } from './middlewares/errorHandler';
import { headerHandler } from './middlewares/headerHandler';
import { routes } from './routes';

const application = express();

sentryConfig(application);

application.use(cors());
application.use(express.json());

application.use(headerHandler);
application.use(routes);
application.use(errorHandler);

application.use(Sentry.Handlers.errorHandler());

const port = process.env.APPLICATION_PORT || 3333;

application.listen(port);
