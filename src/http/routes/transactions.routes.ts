import { Router } from 'express';

import {
  validateTransactionRequest,
  createTransactionController,
} from '@useCases/TransactionCreate';
import {
  validateTransactionFeeRequest,
  showTransactionFeeController,
} from '@useCases/TransactionFeeShow';

import { showTransactionController } from '@useCases/TransactionShow';

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

transactionsRouter.get('/:publicId', showTransactionController.handle);

export { transactionsRouter };
