import { loginSchema } from "./AdminSchema";
import { addProductSchema, updateProductSchema } from "./ProductSchema";
import { addUserSchema, updateUserSchema } from "./UserSchema";
import { addCategorySchema, updateCategorySchema } from "./CategorySchema";

module.exports = {
  loginSchema,
  addUserSchema,
  updateUserSchema,
  addProductSchema,
  updateProductSchema,
  addCategorySchema,
  updateCategorySchema,
};
