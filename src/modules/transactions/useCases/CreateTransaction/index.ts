import { validateTransactionRequest } from '@modules/transactions/infra/celebrate/validateTransactionRequest'

import { CreateTransactionController } from './CreateTransactionController'

const createTransactionController = new CreateTransactionController()

export { validateTransactionRequest, createTransactionController }
