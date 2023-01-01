import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import { getProducts, getProduct } from "../controllers/ProductController";

dotenv.config();
const router: Express = express();

//GET ALL CINEMAS
router.get("/products", isAuth, getProducts);

//GET CINEMA BY ID
router.get("/product/:id", isAuth, getProduct);

//ADD PRODUCT
// router.post("/product/:id", isAuth, addProduct);

// //UPDATE PRODUCT
// router.put("/product/:id", isAuth, updateProduct);

// //DELETE PRODUCT
// router.delete("/product/:id", isAuth, deleteProduct);

export default router;
