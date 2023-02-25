import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import { getBrands } from "../controllers/BrandController";

dotenv.config();
const router: Express = express();

//Get All Brands
router.get("/brands", isAuth, getBrands);

export default router;
