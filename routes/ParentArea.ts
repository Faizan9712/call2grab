import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getParentAreas,
  getParentArea,
  addParentArea,
  updateParentArea,
  deleteParentArea,
} from "../controllers/ParentAreaController";

dotenv.config();
const router: Express = express();

//GET ALL PARENT AREAS
router.get("/parentareas", isAuth, getParentAreas);

//GET PARENT AREA BY ID
router.get("/parentarea/:id", isAuth, getParentArea);

// ADD PARENT AREA
router.post(
  "/parentarea",
  isAuth,
  Validator("addParentAreaSchema"),
  addParentArea
);

// UPDATE PARENT AREA
router.put(
  "/parentarea/:id",
  isAuth,
  Validator("updateParentAreaSchema"),
  updateParentArea
);

//DELETE PARENT AREA
router.delete("/parentarea/:id", isAuth, deleteParentArea);

export default router;
