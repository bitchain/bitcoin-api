import { Router } from 'express'

import { notFoundHandler } from '../middlewares/notFoundHandler'

const notFoundRouter = Router()

notFoundRouter.get('*', notFoundHandler)
notFoundRouter.post('*', notFoundHandler)
notFoundRouter.put('*', notFoundHandler)
notFoundRouter.delete('*', notFoundHandler)
notFoundRouter.patch('*', notFoundHandler)

export { notFoundRouter }
