import Joi from "joi";

//ADD PARENT AREA SCHEMA
export const addParentAreaSchema = Joi.object({
  parentAreaName: Joi.string().min(3).max(50).required(),
  parentAreaDescription: Joi.string().min(3).max(200).required(),
  parentAreaActive: Joi.number().required(),
});

//UPDATE PARENT AREA SCHEMA
export const updateParentAreaSchema = Joi.object({
  parentAreaName: Joi.string().min(3).max(50).optional(),
  parentAreaDescription: Joi.string().min(3).max(200).optional(),
  parentAreaActive: Joi.number().optional(),
});
