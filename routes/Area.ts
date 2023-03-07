import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getAreas,
  getArea,
  addArea,
  updateArea,
  deleteArea,
} from "../controllers/AreaController";

dotenv.config();
const router: Express = express();

//GET ALL AREAS
router.get("/areas", isAuth, getAreas);

//GET AREA BY ID
router.get("/area/:id", isAuth, getArea);

// ADD AREA
router.post("/area", isAuth, Validator("addAreaSchema"), addArea);

// UPDATE AREA
router.put("/area/:id", isAuth, Validator("updateAreaSchema"), updateArea);

//DELETE AREA
router.delete("/area/:id", isAuth, deleteArea);

export default router;
