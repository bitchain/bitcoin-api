import { Router } from 'express';

import { providersRouter } from './providers.routes';

import { transactionsRouter } from './transactions.routes';
import { walletsRouter } from './wallets.routes';

const routes = Router();

routes.use('/providers', providersRouter);

routes.use('/transactions', transactionsRouter);
routes.use('/wallets', walletsRouter);

export { routes };
