import 'reflect-metadata'
import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import { sentryConfig } from '@config/sentry'
import * as Sentry from '@sentry/node'

import { errorHandler } from './middlewares/errorHandler'
import { headerHandler } from './middlewares/headerHandler'
import { routes } from './routes'

const application = express()

sentryConfig(application)

application.use(cors())
application.use(express.json())

application.use(headerHandler)
application.use(routes)
application.use(errorHandler)

application.use(Sentry.Handlers.errorHandler())

application.listen(process.env.NETWORK_PORT)
