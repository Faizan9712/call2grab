import Joi from "joi";

//ADD FEEDBACK SCHEMA
export const addFeedbackSchema = Joi.object({
  feedbackUserId: Joi.number().required(),
  feedbackOrderId: Joi.number().required(),
  feedbackProductId: Joi.number().required(),
  feedbackRating: Joi.string().max(200).required(),
  feedbackTitle: Joi.string().max(200).required(),
  feedbackDescription: Joi.string().max(200).required(),
  feedbackRecommend: Joi.boolean().required(),
  feedbackVerifiedPurchase: Joi.boolean().required(),
});

//UPDATE FEEDBACK SCHEMA
export const updateFeedbackSchema = Joi.object({
  feedbackUserId: Joi.number().optional(),
  feedbackOrderId: Joi.number().optional(),
  feedbackProductId: Joi.number().optional(),
  feedbackRating: Joi.string().max(200).optional(),
  feedbackTitle: Joi.string().max(200).optional(),
  feedbackDescription: Joi.string().max(200).optional(),
  feedbackRecommend: Joi.boolean().optional(),
  feedbackVerifiedPurchase: Joi.boolean().optional(),
});
