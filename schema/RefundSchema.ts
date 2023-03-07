import Joi from "joi";

//ADD REFUND SCHEMA
export const addRefundSchema = Joi.object({
  refundUserId: Joi.number().required(),
  refundOrderId: Joi.number().required(),
  refundAmount: Joi.number().required(),
  refundReason: Joi.string().required(),
  refundStatus: Joi.string().required(),
  refundMethod: Joi.string().required(),
});

//UPDATE REFUND SCHEMA
export const updateRefundSchema = Joi.object({
  refundUserId: Joi.number().optional(),
  refundOrderId: Joi.number().optional(),
  refundAmount: Joi.number().optional(),
  refundReason: Joi.string().optional(),
  refundStatus: Joi.string().optional(),
  refundMethod: Joi.string().optional(),
});
