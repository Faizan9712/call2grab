import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import { getProductInCart } from "../controllers/CartController";

dotenv.config();
const router: Express = express();

//GET PRODUCTS TO CART OF USER
router.get("/getcart", isAuth, getProductInCart);

export default router;
