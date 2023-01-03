import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getCategorys,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController";

dotenv.config();
const router: Express = express();

//GET ALL CATEGORIES
router.get("/categories", isAuth, getCategorys);

//GET CATEGORY BY ID
router.get("/category/:id", isAuth, getCategory);

// ADD CATEGORY
router.post("/category", isAuth, Validator("addCategorySchema"), addCategory);

//UPDATE CATEGORY
router.put(
  "/category/:id",
  isAuth,
  Validator("updateCategorySchema"),
  updateCategory
);

//DELETE CATEGORY
router.delete("/category/:id", isAuth, deleteCategory);

export default router;
