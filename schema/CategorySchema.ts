import Joi from "joi";

//ADD CATEGORY SCHEMA
export const addCategorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(50).required(),
  categoryParentId: Joi.number().required(),
  // categoryImage:  Joi.string().required(),
  categoryActive: Joi.number().required(),
});

//UPDATE CATEGORY SCHEMA
export const updateCategorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(50).optional(),
  categoryParentId: Joi.number().optional(),
  // categoryImage:  Joi.string().optional(),
  categoryActive: Joi.number().optional(),
});
