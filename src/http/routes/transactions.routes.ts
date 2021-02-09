import { Router } from 'express';

import { createTransactionController } from '@useCases/TransactionCreate';
import { showTransactionFeeController } from '@useCases/TransactionFeeShow';
import { showTransactionController } from '@useCases/TransactionShow';

const transactionsRouter = Router();

transactionsRouter.post('/create', createTransactionController.handle);
transactionsRouter.post('/fee', showTransactionFeeController.handle);
transactionsRouter.get('/:publicId', showTransactionController.handle);

export { transactionsRouter };
