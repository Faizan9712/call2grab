import Joi from "joi";

//ADD DEAL SCHEMA
export const addDealSchema = Joi.object({
  dealHeadingPrimary: Joi.string().required(),
  dealHeadingSecondary: Joi.string().required(),
  dealHeadingTeritary: Joi.string().required(),
  dealButttonText: Joi.string().required(),
  dealButtonLink: Joi.string().required(),
});

//UPDATE DEAL SCHEMA
export const updateDealSchema = Joi.object({
  dealBannerImage: Joi.string().optional(),
  dealHeadingPrimary: Joi.string().optional(),
  dealHeadingSecondary: Joi.string().optional(),
  dealHeadingTeritary: Joi.string().optional(),
  dealButttonText: Joi.string().optional(),
  dealButtonLink: Joi.string().optional(),
});
