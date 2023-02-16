import Joi from "joi";

//ADD category SCHEMA
export const addParentCategorySchema = Joi.object({
  parentCategoryName: Joi.string().min(3).max(50).required(),
  parentCategoryDescription:  Joi.string().max(100).required(),
});

//UPDATE category SCHEMA
export const updateParentCategorySchema = Joi.object({
    parentCategoryName: Joi.string().min(3).max(50).optional(),
    parentCategoryDescription:  Joi.string().max(100).optional(),
});
