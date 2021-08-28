import { Router } from 'express';

import {
  validateTransactionRequest,
  instanceCreateTransactionProvider,
  createTransactionController,
} from '@modules/transactions/useCases/CreateTransaction';
import {
  validateTransactionFeeRequest,
  instanceShowTransactionFeeProvider,
  showTransactionFeeController,
} from '@modules/transactions/useCases/TransactionFeeShow';

import {
  instanceShowTransactionProvider,
  showTransactionController,
} from '@modules/transactions/useCases/TransactionShow';

const transactionsRouter = Router();

transactionsRouter.post(
  '/create',
  validateTransactionRequest,
  instanceCreateTransactionProvider,
  createTransactionController.handle,
);

// transactionsRouter.post(
//   '/fee',
//   validateTransactionFeeRequest,
//   instanceShowTransactionFeeProvider,
//   showTransactionFeeController.handle,
// );

// transactionsRouter.get(
//   '/:id',
//   instanceShowTransactionProvider,
//   showTransactionController.handle,
// );

export { transactionsRouter };
