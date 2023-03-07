import express, { Express } from "express";
import dotenv from "dotenv";
import isAuth from "../middlewares/CheckJWT";
import Validator from "../middlewares/Validator";
import {
  getRefunds,
  getRefund,
  addRefund,
  updateRefund,
  deleteRefund,
} from "../controllers/RefundController";

dotenv.config();
const router: Express = express();

//GET ALL REFUNDS
router.get("/refunds", isAuth, getRefunds);

//GET REFUND BY ID
router.get("/refund/:id", isAuth, getRefund);

// ADD REFUND
router.post("/refund", isAuth, Validator("addRefundSchema"), addRefund);

// UPDATE REFUND
router.put(
  "/refund/:id",
  isAuth,
  Validator("updateRefundSchema"),
  updateRefund
);

//DELETE REFUND
router.delete("/refund/:id", isAuth, deleteRefund);

export default router;
