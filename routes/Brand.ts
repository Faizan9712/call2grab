import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
  //   populateBrands
} from "../controllers/BrandController";

dotenv.config();
const router: Express = express();

//GET ALL BRANDS
router.get("/brands", isAuth, getBrands);

//GET BRAND BY ID
router.get("/brand/:id", isAuth, getBrand);

// ADD BRAND
router.post("/brand", isAuth, Validator("addBrandSchema"), addBrand);

// UPDATE BRAND
router.put("/brand/:id", isAuth, Validator("updateBrandSchema"), updateBrand);

//DELETE BRAND
router.delete("/brand/:id", isAuth, deleteBrand);

export default router;
