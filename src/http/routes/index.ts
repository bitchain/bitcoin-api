import { Router } from 'express';

import { notFoundRouter } from './notFound.routes';
import { robotsRouter } from './robots.routes';

import { providersRouter } from './providers.routes';
import { transactionsRouter } from './transactions.routes';
import { walletsRouter } from './wallets.routes';

const routes = Router();

routes.use('/providers', providersRouter);
routes.use('/transactions', transactionsRouter);
routes.use('/wallets', walletsRouter);

routes.use(robotsRouter);

routes.use(notFoundRouter);

export { routes };
