import { Router } from 'express';

import {
  validateTransactionRequest,
  createTransactionController,
} from '@modules/transactions/useCases/CreateTransaction';
import { showTransactionController } from '@modules/transactions/useCases/ShowTransaction';
import {
  validateTransactionFeeRequest,
  showTransactionFeeController,
} from '@modules/transactions/useCases/ShowTransactionFee';

const transactionsRouter = Router();

transactionsRouter.post(
  '/create',
  validateTransactionRequest,
  createTransactionController.handle,
);

transactionsRouter.post(
  '/fee',
  validateTransactionFeeRequest,
  showTransactionFeeController.handle,
);

transactionsRouter.get('/:id', showTransactionController.handle);

export { transactionsRouter };
