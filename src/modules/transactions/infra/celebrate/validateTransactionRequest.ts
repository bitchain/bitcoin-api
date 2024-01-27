import { celebrate, Joi, Segments } from 'celebrate'

export const validateTransactionRequest = celebrate({
  [Segments.BODY]: {
    privateKey: Joi.string().required(),
    addressTo: Joi.string().required(),
    value: Joi.number().min(1),
  },
})
