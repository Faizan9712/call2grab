import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getAreas,
  getArea,
  addArea,
  updateArea,
  deleteArea,
  //   populateareas
} from "../controllers/AreaController";

dotenv.config();
const router: Express = express();

//GET ALL areas
router.get("/areas", isAuth, getAreas);

//GET area BY ID
router.get("/area/:id", isAuth, getArea);

// ADD area
router.post("/area", isAuth, Validator("addAreaSchema"), addArea);

// UPDATE area
router.put("/area/:id", isAuth, Validator("updateAreaSchema"), updateArea);

//DELETE area
router.delete("/area/:id", isAuth, deleteArea);

export default router;
