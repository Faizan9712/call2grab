import Joi from "joi";

//LOGIN SCHEMA
export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  // .message("Enter Valid Email"),
  password: Joi.string().min(5).max(30).required(),
});

//CHANGE PASSWORD SCHEMA
export const changePasswordSchema = Joi.object({
  password: Joi.string().min(5).max(30).required(),
  newPassword: Joi.string().min(5).max(30).required(),
  confirmNewPassword: Joi.string().min(5).max(30).required(),
});

//UPDATE PROFILE SCHEMA
export const updateProfileSchema = Joi.object({
  adminFirstName: Joi.string().min(3).max(50).optional(),
  adminLastName: Joi.string().min(3).max(50).optional(),
  adminEmail: Joi.string().email().lowercase().optional(),
  adminPassword: Joi.string().min(8).max(30).optional(),
  adminActive: Joi.string().optional(),
});

