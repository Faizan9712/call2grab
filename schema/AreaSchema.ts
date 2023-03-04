import Joi from "joi";

//ADD AREA SCHEMA
export const addAreaSchema = Joi.object({
  areaName: Joi.string().min(3).max(50).required(),
  areaDescription: Joi.string().min(3).max(200).required(),
  areaParentId: Joi.number().required(),
  areaPincode: Joi.number().required(),
  areaActive: Joi.number().required(),
});

//UPDATE AREA SCHEMA
export const updateAreaSchema = Joi.object({
  areaName: Joi.string().min(3).max(50).optional(),
  areaDescription: Joi.string().min(3).max(200).optional(),
  areaParentId: Joi.number().optional(),
  areaPincode: Joi.number().optional(),
  areaActive: Joi.number().optional(),
});
