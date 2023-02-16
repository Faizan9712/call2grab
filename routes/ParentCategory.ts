import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getParentCategorys,
  getParentCategory,
  addParentCategory,
  updateParentCategory,
  deleteParentCategory,
  populateParentCategories,
} from "../controllers/ParentCategoryController";

dotenv.config();
const router: Express = express();

//GET ALL CATEGORIES
router.get("/parentcategories", isAuth, getParentCategorys);

//GET CATEGORY BY ID
router.get("/parentcategory/:id", isAuth, getParentCategory);

// ADD CATEGORY
router.post(
  "/parentcategory",
  isAuth,
  Validator("addParentCategorySchema"),
  addParentCategory
);

//UPDATE CATEGORY
router.put(
  "/parentcategory/:id",
  isAuth,
  Validator("updateParentCategorySchema"),
  updateParentCategory
);

//DELETE CATEGORY
router.delete("/parentcategory/:id", isAuth, deleteParentCategory);

//POPULATE CATEGORIES
router.get("/populate-parentcategories", isAuth, populateParentCategories);

export default router;
