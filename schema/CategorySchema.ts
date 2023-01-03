import Joi from "joi";

//ADD category SCHEMA
export const addCategorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(50).required(),
  categoryDescription: Joi.string().required(),
});

//UPDATE category SCHEMA
export const updateCategorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(50).optional(),
  categoryDescription: Joi.string().optional(),
});
