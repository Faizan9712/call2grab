import Joi from "joi";

//ADD PRODUCT SCHEMA
export const addUserSchema = Joi.object({
  userFirstName: Joi.string().min(3).max(20).required(),
  userMiddleName: Joi.string().min(3).max(20).required(),
  userLastName: Joi.string().min(3).max(20).required(),
  userEmail: Joi.string().email().lowercase().required(),
  userAlternativeEmail: Joi.string().email().optional(),
  userPassword: Joi.string().min(8).max(30).required(),
  userPhoto: Joi.string().max(50).required(),
  userPresentAddress: Joi.string().min(3).max(50).required(),
  userPermanentAddress: Joi.string().min(3).max(50).required(),
  userPincode: Joi.string().length(6).required(),
  userState: Joi.string().min(3).max(50).required(),
  userCity: Joi.string().min(3).max(50).required(),
  userPhoneNumber: Joi.string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .optional(),
  userMobileNumber: Joi.string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .optional(),
  userGender: Joi.string().required(),
  userDob: Joi.date().required(),
  userActive: Joi.string().required(),
  userLastLogin: Joi.date().required(),
  userCreatedDate: Joi.date().optional(),
  userUpdatedDate: Joi.date().optional(),
});

//UPDATE PRODUCT SCHEMA
export const updateUserSchema = Joi.object({
  userFirstName: Joi.string().min(3).max(20).optional(),
  userMiddleName: Joi.string().min(3).max(20).optional(),
  userLastName: Joi.string().min(3).max(20).optional(),
  userEmail: Joi.string().email().lowercase().optional(),
  userAlternativeEmail: Joi.string().email().optional(),
  userPassword: Joi.string().min(8).max(30).optional(),
  userPhoto: Joi.string().max(50).optional(),
  userPresentAddress: Joi.string().min(3).max(50).optional(),
  userPermanentAddress: Joi.string().min(3).max(50).optional(),
  userPincode: Joi.string().length(6).optional(),
  userState: Joi.string().min(3).max(50).optional(),
  userCity: Joi.string().min(3).max(50).optional(),
  userPhoneNumber: Joi.string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .optional(),
  userMobileNumber: Joi.string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .optional(),
  userGender: Joi.string().optional(),
  userDob: Joi.date().optional(),
  userActive: Joi.string().optional(),
  userLastLogin: Joi.date().optional(),
  userCreatedDate: Joi.date().optional(),
  userUpdatedDate: Joi.date().optional(),
});

export const changeUserPasswordSchema = Joi.object({
  userPassword: Joi.string().min(8).max(30).required(),
});

export const deactivateUserSchema = Joi.object({
  userActive: Joi.string().required(),
});
