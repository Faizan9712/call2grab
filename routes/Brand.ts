import express, { Express, Request, Response, NextFunction } from "express";
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

//GET ALL Brands
router.get("/brands", isAuth, getBrands);

//GET Brand BY ID
router.get("/brand/:id", isAuth, getBrand);

// ADD Brand
router.post("/brand", isAuth, Validator("addBrandSchema"), addBrand);

// UPDATE Brand
router.put("/brand/:id", isAuth, Validator("updateBrandSchema"), updateBrand);

//DELETE Brand
router.delete("/brand/:id", isAuth, deleteBrand);

//POPULATE Brands
// router.get("/populate-Brands", isAuth, populateBrands);

export default router;
