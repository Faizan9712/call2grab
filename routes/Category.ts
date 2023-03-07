import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import { handleUpload, upload } from "../helpers/functions";
import {
  getCategorys,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  uploadCategory,
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

// UPLOAD IMAGE
router.patch("/upload-category/:id", isAuth, handleUpload, uploadCategory);

export default router;
