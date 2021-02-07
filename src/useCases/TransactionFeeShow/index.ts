import { ProviderInstance } from './providers';

import { ShowTransactionFeeController } from './ShowTransactionFeeController';

new ProviderInstance().resolve();

const showTransactionFeeController = new ShowTransactionFeeController();

export { showTransactionFeeController };
