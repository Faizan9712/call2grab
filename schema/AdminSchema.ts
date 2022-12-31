import Joi from "joi";

//LOGIN SCHEMA
export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).max(20).required(),
});
