import Joi from "joi";

//ADD BRAND SCHEMA
export const addBrandSchema = Joi.object({
  brandName: Joi.string().required(),
  brandDescription: Joi.string().required(),
  brandActive: Joi.number().required(),
  brandCreatedDate: Joi.date().optional(),
  brandUpdatedDate: Joi.date().optional(),
});

//UPDATE BRAND SCHEMA
export const updateBrandSchema = Joi.object({
  brandName: Joi.string().optional(),
  brandDescription: Joi.string().optional(),
  brandActive: Joi.number().optional(),
  brandCreatedDate: Joi.date().optional(),
  brandUpdatedDate: Joi.date().optional(),
});
