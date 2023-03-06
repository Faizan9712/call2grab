import Joi from "joi";

//ADD Payment SCHEMA
export const addPaymentSchema = Joi.object({
  paymentOrderId: Joi.number().required(),
  paymentProductId: Joi.number().required(),
  paymentUserId: Joi.number().required(),
  paymentAmount: Joi.number().required(),
  paymentStatus: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  paymentTransactionId: Joi.number().required(),
  paymentCardHolderName: Joi.string().required(),
  paymentCardLast4Digits: Joi.number().required(),
  paymentCardCvv: Joi.number().required(),
});

//UPDATE Payment SCHEMA
export const updatePaymentSchema = Joi.object({
  paymentOrderId: Joi.number().optional(),
  paymentProductId: Joi.number().optional(),
  paymentUserId: Joi.number().optional(),
  paymentAmount: Joi.number().optional(),
  paymentStatus: Joi.string().optional(),
  paymentMethod: Joi.string().optional(),
  paymentTransactionId: Joi.number().optional(),
  paymentCardHolderName: Joi.string().optional(),
  paymentCardLast4Digits: Joi.number().optional(),
  paymentCardCvv: Joi.number().optional(),
});
