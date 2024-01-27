import { celebrate, Joi, Segments } from 'celebrate'

export const validateTransactionFeeRequest = celebrate({
  [Segments.BODY]: {
    addressFrom: Joi.string().required(),
    addressTo: Joi.string().required(),
    value: Joi.number().min(1),
  },
})
