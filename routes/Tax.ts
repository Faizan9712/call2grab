import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getTaxes,
  getTax,
  addTax,
  updateTax,
  deleteTax,
  //   populateTaxs
} from "../controllers/TaxController";

dotenv.config();
const router: Express = express();

//GET ALL Taxs
router.get("/taxes", isAuth, getTaxes);

//GET Tax BY ID
router.get("/tax/:id", isAuth, getTax);

// ADD Tax
router.post("/tax", isAuth, Validator("addTaxSchema"), addTax);

// UPDATE Tax
router.put("/tax/:id", isAuth, Validator("updateTaxSchema"), updateTax);

//DELETE Tax
router.delete("/tax/:id", isAuth, deleteTax);

export default router;
