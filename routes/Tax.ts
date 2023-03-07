import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getTaxes,
  getTax,
  addTax,
  updateTax,
  deleteTax,
} from "../controllers/TaxController";

dotenv.config();
const router: Express = express();

//GET ALL TAXES
router.get("/taxes", isAuth, getTaxes);

//GET TAX BY ID
router.get("/tax/:id", isAuth, getTax);

// ADD TAX
router.post("/tax", isAuth, Validator("addTaxSchema"), addTax);

// UPDATE TAX
router.put("/tax/:id", isAuth, Validator("updateTaxSchema"), updateTax);

//DELETE TAX
router.delete("/tax/:id", isAuth, deleteTax);

export default router;
