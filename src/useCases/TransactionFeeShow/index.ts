import { ProviderInstance } from './providers';

import { validateTransactionFeeRequest } from './middlewares/validateTransactionFeeRequest';
import { ShowTransactionFeeController } from './ShowTransactionFeeController';

new ProviderInstance().resolve();

const showTransactionFeeController = new ShowTransactionFeeController();

export { validateTransactionFeeRequest, showTransactionFeeController };
