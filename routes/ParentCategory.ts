import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getParentCategorys,
  getParentCategory,
  addParentCategory,
  updateParentCategory,
  deleteParentCategory,
} from "../controllers/ParentCategoryController";

dotenv.config();
const router: Express = express();

//GET ALL PARENT CATEGORIES
router.get("/parentcategories", isAuth, getParentCategorys);

//GET PARENTCATEGORY BY ID
router.get("/parentcategory/:id", isAuth, getParentCategory);

// ADD PARENTCATEGORY
router.post(
  "/parentcategory",
  isAuth,
  Validator("addParentCategorySchema"),
  addParentCategory
);

//UPDATE PARENTCATEGORY
router.put(
  "/parentcategory/:id",
  isAuth,
  Validator("updateParentCategorySchema"),
  updateParentCategory
);

//DELETE PARENTCATEGORY
router.delete("/parentcategory/:id", isAuth, deleteParentCategory);

export default router;
