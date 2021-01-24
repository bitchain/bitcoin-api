import { Router } from 'express';

import transactionsRouter from '@modules/transactions/http/routes/transactions.routes';
import walletsRouter from '@modules/wallets/http/routes/wallets.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/wallets', walletsRouter);

export default routes;
