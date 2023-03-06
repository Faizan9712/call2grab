import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getRefunds,
  getRefund,
  addRefund,
  updateRefund,
  deleteRefund,
  //   populateRefunds
} from "../controllers/RefundController";

dotenv.config();
const router: Express = express();

//GET ALL Refunds
router.get("/refunds", isAuth, getRefunds);

//GET Refund BY ID
router.get("/refund/:id", isAuth, getRefund);

// ADD Refund
router.post("/refund", isAuth, Validator("addRefundSchema"), addRefund);

// UPDATE Refund
router.put(
  "/refund/:id",
  isAuth,
  Validator("updateRefundSchema"),
  updateRefund
);

//DELETE Refund
router.delete("/refund/:id", isAuth, deleteRefund);

export default router;
