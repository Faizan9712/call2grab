import Joi from "joi";

//ADD PRODUCT TO CART SCHEMA
export const addProductCartSchema = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
  productQuantity: Joi.number().optional(),
  productCreatedDate: Joi.date().optional(),
  productUpdatedDate: Joi.date().optional(),
});

//UPDATE PRODUCT IN CART SCHEMA
export const updateProductCartSchema = Joi.object({
  userId: Joi.number().optional(),
  productId: Joi.number().optional(),
  productQuantity: Joi.number().optional(),
  productCreatedDate: Joi.date().optional(),
  productUpdatedDate: Joi.date().optional(),
});
