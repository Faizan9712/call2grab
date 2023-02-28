import {
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "./AdminSchema";
import { addProductSchema, updateProductSchema } from "./ProductSchema";
import {
  addUserSchema,
  updateUserSchema,
  changeUserPasswordSchema,
  deactivateUserSchema,
} from "./UserSchema";
import { addCategorySchema, updateCategorySchema } from "./CategorySchema";
import { addProductCartSchema, updateProductCartSchema } from "./CartSchema";
import {
  addParentCategorySchema,
  updateParentCategorySchema,
} from "./ParentCategorySchema";
import { addOrderSchema, updateOrderSchema } from "./OrderSchema";
import { addCouponSchema, updateCouponSchema } from "./CouponSchema";
import { addDealSchema, updateDealSchema } from "./DealSchema";
module.exports = {
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
  addUserSchema,
  updateUserSchema,
  changeUserPasswordSchema,
  deactivateUserSchema,
  addProductSchema,
  updateProductSchema,
  addProductCartSchema,
  updateProductCartSchema,
  addCategorySchema,
  updateCategorySchema,
  addParentCategorySchema,
  updateParentCategorySchema,
  addOrderSchema,
  updateOrderSchema,
  addCouponSchema,
  updateCouponSchema,
  addDealSchema,
  updateDealSchema,
};
