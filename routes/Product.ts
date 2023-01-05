import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProduct,
} from "../controllers/ProductController";
import upload from "express-fileupload";

dotenv.config();
const router: Express = express();
router.use(upload());

//GET ALL PRODUCTS
router.get("/products", isAuth, getProducts);

//GET PRODUCT BY ID
router.get("/product/:id", isAuth, getProduct);

// ADD PRODUCT
router.post("/product", isAuth, Validator("addProductSchema"), addProduct);

//UPDATE PRODUCT
router.put(
  "/product/:id",
  isAuth,
  Validator("updateProductSchema"),
  updateProduct
);

//DELETE PRODUCT
router.delete("/product/:id", isAuth, deleteProduct);

//UPLOAD PRODUCT IMAGE
router.patch("/upload-product", isAuth, uploadProduct);

export default router;
