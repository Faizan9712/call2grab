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
  deactivateUserSchema
} from "./UserSchema";
import { addCategorySchema, updateCategorySchema } from "./CategorySchema";
import { addProductCartSchema, updateProductCartSchema } from "./CartSchema";

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
};
