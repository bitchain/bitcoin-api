import { Router } from 'express';

import { transactionsRouter } from './transactions.routes';
import { walletsRouter } from './wallets.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/wallets', walletsRouter);

export { routes };
