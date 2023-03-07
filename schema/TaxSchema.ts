import Joi from "joi";

//ADD TAX SCHEMA
export const addTaxSchema = Joi.object({
  taxName: Joi.string().min(3).max(50).required(),
  taxRate: Joi.number().required(),
  taxCityCode: Joi.number().required(),
  taxActive: Joi.number().required(),
});

//UPDATE TAX SCHEMA
export const updateTaxSchema = Joi.object({
  taxName: Joi.string().min(3).max(50).required(),
  taxRate: Joi.number().required(),
  taxCityCode: Joi.number().required(),
  taxActive: Joi.number().required(),
});
