import { Router } from 'express';

import { showTransactionController } from '@useCases/TransactionShow';
import { showTransactionFeeController } from '@useCases/TransactionFeeShow';

const transactionsRouter = Router();

transactionsRouter.get('/:publicId', showTransactionController.handle);
transactionsRouter.post('/fee', showTransactionFeeController.handle);

export { transactionsRouter };
