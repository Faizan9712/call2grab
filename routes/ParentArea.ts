import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getParentAreas,
  getParentArea,
  addParentArea,
  updateParentArea,
  deleteParentArea,
  //   populateparentArea
} from "../controllers/ParentAreaController";

dotenv.config();
const router: Express = express();

//GET ALL parentArea
router.get("/parentareas", isAuth, getParentAreas);

//GET area BY ID
router.get("/parentarea/:id", isAuth, getParentArea);

// ADD area
router.post(
  "/parentarea",
  isAuth,
  Validator("addParentAreaSchema"),
  addParentArea
);

// UPDATE area
router.put(
  "/parentarea/:id",
  isAuth,
  Validator("updateParentAreaSchema"),
  updateParentArea
);

//DELETE area
router.delete("/parentarea/:id", isAuth, deleteParentArea);

export default router;
