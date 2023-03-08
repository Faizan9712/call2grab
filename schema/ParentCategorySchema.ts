import Joi from "joi";

//ADD PARENT CATEGORY SCHEMA
export const addParentCategorySchema = Joi.object({
  parentCategoryName: Joi.string().min(3).max(50).required(),
  parentCategoryDescription: Joi.string().max(100).required(),
  parentCategoryActive: Joi.number().required(),
});

//UPDATE PARENT CATEGORY SCHEMA
export const updateParentCategorySchema = Joi.object({
  parentCategoryName: Joi.string().min(3).max(50).optional(),
  parentCategoryDescription: Joi.string().max(100).optional(),
  parentCategoryActive: Joi.number().optional(),
});
