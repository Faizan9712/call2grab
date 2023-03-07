import Joi from "joi";

//ADD COUPON SCHEMA
export const addCouponSchema = Joi.object({
  couponTitle: Joi.string().required(),
  couponCode: Joi.string().required(),
  couponDiscountType: Joi.string().required(),
  CouponDiscountAmount: Joi.number().required(),
  couponMaxUses: Joi.number().required(),
  couponCurrentUses: Joi.number().required(),
  couponActive: Joi.number().required(),
  couponStartDate: Joi.date().required(),
  couponEndDate: Joi.date().required(),

});

//UPDATE COUPON SCHEMA
export const updateCouponSchema = Joi.object({
  couponTitle: Joi.string().optional(),
  couponCode: Joi.string().optional(),
  couponDiscountType: Joi.string().optional(),
  CouponDiscountAmount: Joi.number().optional(),
  couponMaxUses: Joi.number().optional(),
  couponCurrentUses: Joi.number().optional(),
  couponActive: Joi.number().optional(),
  couponStartDate: Joi.date().optional(),
  couponEndDate: Joi.date().optional(),

});
