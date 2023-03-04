import Joi from "joi";

//ADD tax SCHEMA
export const addTaxSchema = Joi.object({
  taxName: Joi.string().min(3).max(50).required(),
  taxRate: Joi.number().required(),
  taxCityCode: Joi.number().required(),
  taxActive: Joi.number().required(),
});

//UPDATE tax SCHEMA
export const updateTaxSchema = Joi.object({
  taxName: Joi.string().min(3).max(50).required(),
  taxRate: Joi.number().required(),
  taxCityCode: Joi.number().required(),
  taxActive: Joi.number().required(),
});
