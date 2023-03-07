import Joi from "joi";

//ADD ORDER SCHEMA
export const addOrderSchema = Joi.object({
  orderUserId: Joi.number().required(),
  orderStatus: Joi.string().required(),
  orderCouponId: Joi.number().required(),
  orderSubtotal: Joi.number().required(),
  orderDiscount: Joi.number().required(),
  orderTotal: Joi.number().required(),
  orderShippingAddress: Joi.string().required(),
  orderShippingCity: Joi.string().required(),
  orderBillingAddress: Joi.string().required(),
  orderBillingCity: Joi.string().required(),
  orderPaymentMethod: Joi.string().required(),
  orderTransactionId: Joi.string().required(),
  orderTrackingNumber: Joi.string().required(),
  orderShippingMethod: Joi.string().required(),
  orderShippingCost: Joi.number().required(),
  orderTax: Joi.number().required(),
});

//UPDATE ORDER SCHEMA
export const updateOrderSchema = Joi.object({
  orderUserId: Joi.number().optional(),
  orderStatus: Joi.string().optional(),
  orderCouponId: Joi.number().optional(),
  orderSubtotal: Joi.number().optional(),
  orderDiscount: Joi.number().optional(),
  orderTotal: Joi.number().optional(),
  orderShippingAddress: Joi.string().optional(),
  orderShippingCity: Joi.string().optional(),
  orderBillingAddress: Joi.string().optional(),
  orderBillingCity: Joi.string().optional(),
  orderPaymentMethod: Joi.string().optional(),
  orderTransactionId: Joi.string().optional(),
  orderTrackingNumber: Joi.string().optional(),
  orderShippingMethod: Joi.string().optional(),
  orderShippingCost: Joi.number().optional(),
  orderTax: Joi.number().optional(),
});
