import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import { handleUpload } from "../helpers/functions";
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

//GET ALL DEALS
router.get("/deals", isAuth, getDeals);

//GET DEAL BY ID
router.get("/deal/:id", isAuth, getDeal);

// ADD DEAL
router.post("/deal", isAuth, Validator("addDealSchema"), addDeal);

//UPDATE DEAL
router.put("/deal/:id", isAuth, Validator("updateDealSchema"), updateDeal);

//DELETE DEAL
router.delete("/deal/:id", isAuth, deleteDeal);

// UPLOAD IMAGE
router.patch("/upload-deal/:id", isAuth, handleUpload, uploadDeal);

export default router;
