import Joi from "joi";

//ADD PRODUCT SCHEMA
export const addProductSchema = Joi.object({
  productName: Joi.string().min(3).max(50).required(),
  productStatus: Joi.string().required(),
  productMinPrice: Joi.number().required(),
  productMaxPrice: Joi.number().required(),
  productQuantity: Joi.number().required(),
  productRatingCount: Joi.number().required(),
  productAverageRating: Joi.number().required(),
  productTotalSales: Joi.number().required(),
  productCategoryId: Joi.number().required(),
  productImages: Joi.string().required(),
  productStockQuantity: Joi.number().required(),
  productInStock: Joi.number().required(),
  productOnsale: Joi.number().required(),
  productActive: Joi.string().required(),
  productBrandId: Joi.number().required(),
  productCouponId: Joi.number().required(),
  productCreatedDate: Joi.date().optional(),
  productUpdatedDate: Joi.date().optional(),
});

//UPDATE PRODUCT SCHEMA
export const updateProductSchema = Joi.object({
  productName: Joi.string().min(3).max(50).optional(),
  productStatus: Joi.string().optional(),
  productMinPrice: Joi.number().optional(),
  productMaxPrice: Joi.number().optional(),
  productQuantity: Joi.number().optional(),
  productRatingCount: Joi.number().optional(),
  productAverageRating: Joi.number().optional(),
  productTotalSales: Joi.number().optional(),
  productCategoryId: Joi.number().optional(),
  productImages: Joi.string().optional(),
  productStockQuantity: Joi.number().optional(),
  productInStock: Joi.number().optional(),
  productOnsale: Joi.number().optional(),
  productActive: Joi.string().optional(),
  productBrandId: Joi.number().optional(),
  productCouponId: Joi.number().optional(),
  productCreatedDate: Joi.date().optional(),
  productUpdatedDate: Joi.date().optional(),
});
