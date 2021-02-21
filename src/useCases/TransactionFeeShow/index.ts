import { ShowTransactionFeeController } from './ShowTransactionFeeController';

import { instanceShowTransactionFeeProvider } from './middlewares/instanceShowTransactionFeeProvider';
import { validateTransactionFeeRequest } from './middlewares/validateTransactionFeeRequest';

const showTransactionFeeController = new ShowTransactionFeeController();

export {
  validateTransactionFeeRequest,
  instanceShowTransactionFeeProvider,
  showTransactionFeeController,
};
