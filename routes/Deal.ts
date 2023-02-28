import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import { handleUpload, upload } from "../helpers/functions";
import {
  getDeals,
  getDeal,
  addDeal,
  updateDeal,
  deleteDeal,
  uploadDeal,
} from "../controllers/DealController";

dotenv.config();
const router: Express = express();

//GET ALL CATEGORIES
router.get("/deals", isAuth, getDeals);

//GET Deal BY ID
router.get("/deal/:id", isAuth, getDeal);

// ADD Deal
router.post("/deal", isAuth, Validator("addDealSchema"), addDeal);

//UPDATE Deal
router.put("/deal/:id", isAuth, Validator("updateDealSchema"), updateDeal);

//DELETE Deal
router.delete("/deal/:id", isAuth, deleteDeal);

// UPLOAD IMAGE
router.patch("/upload-deal/:id", isAuth, handleUpload, uploadDeal);

export default router;
